# AI Blueprint — Phase B Preparation (PROPOSAL ONLY)

> **NOT IMPLEMENTED in Phase A.** This document is a preparation draft for Phase B
> work in `DaddysCoder/blue-print-ai-app`. Nothing in it is approved, built, migrated,
> or deployed. No schema has been created. No data has moved. No auth, storage, or
> infrastructure described here exists yet. Phase A keeps WHATBIT marketing
> (`/ai-blueprint` + `/api/ai-blueprint/early-access`) untouched and makes zero
> deploy / DNS / Stripe changes.

Source of truth for the current (Phase A) state: `DaddysCoder/whatbit-web`,
branch `cursor/blueprint-app-separation-8256` (files reviewed: `lib/products.ts`,
`lib/ai-blueprint.ts`, `app/api/ai-blueprint/early-access/route.ts`,
`app/api/contact/route.ts`, `components/AiBlueprintPage.tsx`, `app/robots.ts`,
`app/sitemap.ts`, `README.md`, `.env.example`, `lib/ai-blueprint/email.ts`,
`lib/ai-blueprint/db.ts`, `migrations/0001_ai_blueprint_assessment_v1.sql`,
`lib/ai-blueprint/admin-auth.ts`).

---

## 1. Current D1 / KV entities + fields (Phase A, as built in whatbit-web)

### 1a. D1 — `assessments` table (`migrations/0001_ai_blueprint_assessment_v1.sql`)

Single-table design around the nested `AssessmentSubmissionV1` payload
(`lib/ai-blueprint/assessment/types.ts`, spec §9). Dropped-and-recreated
(pre-launch, no real Paid/Started/Submitted rows expected); apply via
`wrangler d1 execute … --file=migrations/0001_ai_blueprint_assessment_v1.sql`.
Indexes: `idx_assessments_status (status)`, `idx_assessments_token (token)`.

| Column | Type / default | Notes |
|---|---|---|
| `id` | TEXT PRIMARY KEY | Assessment id (server-generated). |
| `token` | TEXT NOT NULL UNIQUE | Customer magic-link token; customer routes key off this, never `id`. |
| `status` | TEXT NOT NULL DEFAULT `'Paid'` | `Paid \| Started \| Submitted \| Reviewing \| Ready \| Delivered`. Customer-writable only while `Paid`/`Started` (`WRITABLE_STATUSES`); submit flips to `Submitted`; admin moves to `Reviewing`/`Ready`/`Delivered`. |
| `schema_version` | TEXT NOT NULL DEFAULT `'whatbit_rai_readiness_v1'` | Payload schema tag. |
| `contact_name` | TEXT NOT NULL DEFAULT `''` | Set once at checkout. |
| `contact_email` | TEXT NOT NULL DEFAULT `''` | Set once at checkout; also the early-access identity. |
| `contact_phone` | TEXT NOT NULL DEFAULT `''` | Set once at checkout. |
| `stripe_session_id` | TEXT NOT NULL DEFAULT `''` | Checkout session that created the row. |
| `business_name` | TEXT NOT NULL DEFAULT `''` | Denormalised for admin queue list/search only; derived from `draft_json`/`submission_json`, never a source of truth. |
| `draft_json` | TEXT NOT NULL DEFAULT `'{}'` | In-progress raw answers (`AssessmentDraft`: `consentedToScope`, `organisationAnswers`, `tools[]`, `useCases[]` answers-only, `attachments[]`, `step`, `activeUseCaseIndex`). Customer-writable while `Paid`/`Started`. Never contains E/G points, S/U flags, or attention level. |
| `submission_json` | TEXT (nullable) | Complete immutable `AssessmentSubmissionV1` (organisation, respondent, tools, organisation_answers, use_cases[] WITH `.computed` triage, attachments, `computed{}`). Written exactly once, server-side, at submit. Reviewer/admin use only; no customer-facing code may read/write it. |
| `reviewer` | TEXT NOT NULL DEFAULT `''` | Assigned reviewer label (admin-only). |
| `reviewer_notes` | TEXT NOT NULL DEFAULT `''` | Free-text reviewer notes (admin-only). |
| `reviewer_confirmed_attention` | TEXT NOT NULL DEFAULT `''` | `'' \| Low \| Moderate \| Higher Attention` — the ONLY attention values ever shown to a customer, and only once delivered. |
| `reviewer_decisions_json` | TEXT NOT NULL DEFAULT `'[]'` | Append-only audit trail `[{ atIso, reviewerName, useCaseId?, previousAttention?, confirmedAttention, adjustmentReason? }]`. |
| `suggested_controls_json` | TEXT NOT NULL DEFAULT `'{}'` | `{ [controlId C01..C22]: boolean }` — reviewer's checked subset of the control catalogue. |
| `qa_checked_json` | TEXT NOT NULL DEFAULT `'{}'` | QA checklist state. |
| `outcome` | TEXT NOT NULL DEFAULT `''` | Review outcome text. |
| `purchased_at` | TEXT NOT NULL DEFAULT `''` | ISO timestamps throughout (all TEXT). |
| `started_at` | TEXT NOT NULL DEFAULT `''` | Set on first draft write (`Paid` → `Started`). |
| `submitted_at` | TEXT NOT NULL DEFAULT `''` | Set at submit. |
| `due_at` | TEXT NOT NULL DEFAULT `''` | `submitted_at` + 5 business days (server-computed). |
| `delivered_at` | TEXT NOT NULL DEFAULT `''` | Set by `markDelivered`. |
| `created_at` | TEXT NOT NULL DEFAULT `''` | Row creation. |
| `updated_at` | TEXT NOT NULL DEFAULT `''` | Last write. |

Key `lib/ai-blueprint/db.ts` behaviours to preserve in any redesign: `saveAssessmentDraft`
merges partial drafts and promotes `Paid`→`Started`, refusing writes once submitted;
`submitAssessmentFinal` validates consent/org-name/≥1 use case, assembles the scored
payload server-side via `assembleSubmissionPayload`, and freezes the record;
`updateAssessmentReview` appends (never overwrites) attention-decision audit entries.

### 1b. KV — `ai-blueprint-admin-sessions` (`lib/ai-blueprint/admin-auth.ts`)

- Key shape: `session:{sessionId}` where `sessionId` = 48 hex chars (24 random bytes).
- Value shape: `{ reviewer: string, createdAt: number }` (reviewer display label + epoch ms).
- TTL: 12 hours (`SESSION_TTL_SECONDS = 60 * 60 * 12`), set via `kvPut` expiry.
- Cookie: `aiblueprint_admin_session = {sessionId}.{hmacSha256Hex(AI_BLUEPRINT_ADMIN_SESSION_SECRET, sessionId)}`; verified in `verifyAdminSession` (HMAC check + KV existence check); destroyed with `kvDelete` on sign-out.
- Gate model: single shared password (`AI_BLUEPRINT_ADMIN_PASSWORD`); no per-reviewer accounts, no roles, no customer sessions in KV.
- Access pattern: Cloudflare D1/KV over REST (`lib/ai-blueprint/cloudflare.ts`), no Workers bindings — runs on any Next.js host.

### 1c. Adjacent Phase A context (stays in whatbit-web)

- Early access (`app/api/ai-blueprint/early-access/route.ts`): validates email, sends a
  plain-text Resend email to `hello@primitiveai.com.au`, returns `{ ok: true }`. Writes
  nothing to D1/KV. Resend helper pattern (`lib/ai-blueprint/email.ts`, mirrored in
  `app/api/contact/route.ts`): `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` (default
  `website@whatbit.dev`), `POST https://api.resend.com/emails`, log-and-continue on
  missing key for Blueprint / `503` for the public contact form.
- Marketing CTA/footer (`components/AiBlueprintPage.tsx`): CTAs point at
  `AI_BLUEPRINT_EARLY_ACCESS_HREF = "/ai-blueprint#early-access"`; footer legal links
  are `/ai-blueprint/privacy` and `/ai-blueprint/terms`. Future open-app/terms/privacy
  links derive from `AI_BLUEPRINT_APP_URL` (`lib/products.ts`,
  `NEXT_PUBLIC_AI_BLUEPRINT_APP_URL`, empty until owner approves domain).
- `app/robots.ts` disallows `/admin/`, `/api/`, `/ai-blueprint/assessment`,
  `/ai-blueprint/success`; `app/sitemap.ts` lists only the public `/ai-blueprint` page.

---

## 2. Proposed Nhost / Postgres entities (PROPOSAL ONLY — schema NOT approved/built)

The following is a draft entity list for Phase B discussion. No tables exist; names,
columns, and relations are all unconfirmed.

- `organisations` — Customer tenant root. One row per buying business; owns assessments,
  members, and deliveries so a re-purchase or multi-site customer stays one account.
- `users` — Nhost Auth–backed identity (one row per login). Holds profile/contact fields;
  never stores passwords or OTP secrets (those live in Nhost Auth).
- `organisation_members` — Join between `users` and `organisations` with a customer role
  (`owner | member`). Gates which assessments a signed-in user may open and resume.
- `assessments` — One row per purchased assessment lifecycle. Carries status, schema
  version, contact/purchase context, denormalised `business_name` for queues, reviewer
  fields, decision/audit JSON, and lifecycle timestamps (direct successor of the D1 row).
- `assessment_drafts` — Mutable working copy per assessment (successor of `draft_json`).
  One active row per assessment; autosaved raw answers only, never scored triage.
- `ai_tools` — Normalised inventory of AI tools declared in a draft (successor of the
  `tools[]` array inside `draft_json`). One row per tool per assessment.
- `ai_use_cases` — Normalised material AI use cases with raw answers (successor of the
  `useCases[]` array). Computed triage (E/G, S/U, attention) is never stored here.
- `submissions` — Immutable frozen payload per assessment (successor of `submission_json`).
  Written exactly once server-side at submit; reviewer/admin-read-only afterwards, never
  customer-readable in raw form.
- `review_decisions` — Append-only per-decision audit rows (successor of
  `reviewer_decisions_json`). One row per attention confirmation/adjustment with actor,
  before/after, reason, and timestamp.
- `review_events` — General review workflow log (status moves, assignments, QA checks,
  delivery). Complements `review_decisions`; feeds the admin timeline.
- `controls` — The C01–C22 control catalogue plus per-assessment selections (successor of
  `suggested_controls_json`). Catalogue rows are shared; selection rows link control →
  assessment with reviewer + timestamp.
- `attachments` — Metadata for customer evidence uploads (filename, MIME, size, hash,
  storage key, uploader, timestamp). Bytes live in object storage (§6); this table is the
  queryable record and the Phase A metadata to preserve.
- `deliveries` — Generated customer deliverables (report + 9 toolkit docs) per assessment,
  with version, storage keys, delivery channel, and delivered-at. Supports re-issue
  without mutating the frozen submission.

---

## 3. Proposed migration mapping (PROPOSAL ONLY — direction, not a script)

| D1 `assessments` column / KV key | Proposed target | Notes |
|---|---|---|
| `id`, `status`, `schema_version` | `assessments.id / status / schema_version` | Direct carry; status vocabulary unchanged. |
| `contact_name/email/phone`, `stripe_session_id`, `purchased_at` | `assessments.*` + `organisations`/`users` linkage | Purchase context stays on the assessment; canonical contact moves to `users` + `organisation_members` once customer auth exists. |
| `business_name` | `assessments.business_name` (still derived) | Remains a queue/search denormalisation, never source of truth. |
| `draft_json` | `assessment_drafts` + `ai_tools` + `ai_use_cases` + `attachments` | Decompose: scalar draft fields → `assessment_drafts`; `tools[]` → `ai_tools` rows; `useCases[]` (answers only) → `ai_use_cases` rows; `attachments[]` metadata → `attachments` rows; `step`/`activeUseCaseIndex` → draft cursor columns. |
| `submission_json` | `submissions` (one frozen row) + read-model rows | Decompose a copy into queryable `ai_tools`/`ai_use_cases`/computed-triage mirrors if needed, but the frozen JSON remains the immutable record. |
| `reviewer`, `reviewer_notes`, `reviewer_confirmed_attention`, `outcome` | `assessments.*` | Direct carry; attention values still the only customer-visible set. |
| `reviewer_decisions_json` | `review_decisions` | One array entry → one row (actor, previous, confirmed, reason, at). |
| `suggested_controls_json` | `controls` (selections) | Each `true` entry → one selection row. |
| `qa_checked_json` | `review_events` (QA events) | Each checked item → one QA event row. |
| `started_at`, `submitted_at`, `due_at`, `delivered_at`, `created_at`, `updated_at` | `assessments.*` + `deliveries.delivered_at` | Lifecycle timestamps carry; delivery moment also recorded on the `deliveries` row. |
| KV `session:{id}` → `{ reviewer, createdAt }`, 12h TTL | Nhost Auth sessions + `review_events` (login trail) | No KV carry: reviewer identity becomes a Nhost user with a reviewer role (§5); ephemeral session blobs are not migrated, only an audit note of active reviewers if needed. |

Ordering sketch (to confirm in Phase B): organisations/users/memberships →
assessments → drafts/tools/use-cases/attachments → submissions →
decisions/events/controls → deliveries; backfill `business_name` last; verify
row counts and hash-compare frozen payloads before cutover.

---

## 4. Proposed customer auth model (PROPOSAL ONLY)

- Signup/sign-in via email magic link or OTP (Nhost Auth); no passwords for customers.
- Successful verification yields a Nhost user (`users` row); first purchase/checkout
  creates (or links) an `organisation` and an `organisation_members` owner row.
- Assessment access = membership check: a user may list/open/resume only assessments
  belonging to organisations they belong to; the old token-magic-link becomes at most a
  one-time claim mechanism that binds an assessment to an organisation, then expires.
- Draft autosave and submit require an authenticated membership; submitted/frozen data
  stays server-side and customer UI never receives scored triage, mirroring the current
  `submission_json` restriction.

## 5. Proposed reviewer auth / role model (PROPOSAL ONLY)

- Reviewers are Nhost Auth users with a `reviewer` role (role claim, not a shared
  password); the current `AI_BLUEPRINT_ADMIN_PASSWORD` + KV-session gate is retired.
- Admin UI actions (assign, decide attention, select controls, QA, deliver) require the
  reviewer role; every mutation writes a `review_decisions` / `review_events` row with
  actor + timestamp, preserving the append-only audit guarantee.
- Session lifetime and revocation follow Nhost Auth defaults (short-lived JWT + refresh);
  the 12h KV TTL concept does not carry over as infrastructure, only as a UX ceiling to
  revisit (e.g. re-authentication for delivery actions).

---

## 6. Proposed storage design (PROPOSAL ONLY)

- Evidence uploads and generated deliverables (report + toolkit docs) live in Nhost
  Storage / S3-compatible object storage — never on the Next.js container filesystem
  (containers are ephemeral; local disk is not a store).
- `attachments` holds metadata per file (original name, MIME, byte size, content hash,
  storage key, uploader, uploaded-at) — the Phase A attachment metadata carried forward
  so admin review keeps filename/type/size context.
- `deliveries` holds generated-doc metadata (doc kind, version, storage key, hash,
  generated-at, delivery channel/message id); bytes immutable once delivered, re-issue
  creates a new version row rather than overwriting.
- Access via short-lived signed URLs: customers download only their own organisation's
  deliverables; reviewers access evidence only through authorised assessment scope;
  no public buckets.

---

## 7. Proposed Coolify / Nhost compose architecture (PROPOSAL ONLY — adapt upstream, harden for Coolify)

- Start from the upstream Nhost docker-compose and adapt for Coolify deployment:
  Postgres, Hasura, Auth, Storage, (Functions/Mailhog as needed) as Coolify-managed
  services on one private network; the Next.js app as a separate Coolify service.
- No redundant public Traefik: use Coolify's built-in reverse proxy as the single edge;
  do not publish a second Traefik/public router from the compose file.
- Private networking: Postgres and internal APIs (Hasura admin endpoint, Nhost
  internal secrets) attach to a private network only; only the app's HTTPS route and
  (if needed) the Nhost public endpoints sit behind Coolify domains.
- Persistent volumes: Postgres data dir, Storage bucket dir, and any Auth mail-queue
  dirs on named/persistent volumes so redeploys and restarts keep data.
- Env/secrets: all credentials via Coolify environment/secret storage (never committed);
  distinct secrets per environment (dev/staging/prod); rotate on contributor change.
- Healthchecks: Postgres `pg_isready`, Hasura `/healthz`, Auth/Storage HTTP checks, and
  app route checks wired into Coolify so unhealthy services restart and block cutover.
- Backups: scheduled Postgres dumps (e.g. nightly `pg_dump` to versioned object
  storage, tested restores) plus storage-bucket sync; document RPO/RTO before launch.
- MUST NOT expose publicly: Postgres port, Hasura admin console/endpoint, Nhost
  service secrets, Auth JWT secrets, Storage internal keys, or any `*_SECRET` /
  `*_API_TOKEN` values. Public surface is HTTPS app + explicitly-approved Nhost public
  endpoints only.

---

## 8. Unresolved decisions

1. Standalone app domain (owner approval pending) — `NEXT_PUBLIC_AI_BLUEPRINT_APP_URL`
   stays empty until decided; blocks marketing open-app/terms/privacy links.
2. Nhost vs. plain Postgres + Auth alternative — proposal assumes Nhost compose; confirm
   before building (affects §§2–7).
3. Customer identity key — email-only magic link vs. OTP vs. both; account recovery path.
4. Token-magic-link claim flow — whether Phase A `token` links get a claim/forward path
   or hard-expire at cutover.
5. Control catalogue versioning — C01–C22 as seed data vs. fully admin-editable rows.
6. Scoring location — keep server-side assembly (current `assembleSubmissionPayload`)
   vs. isolated function/service; who may invoke it.
7. File limits — per-file and per-assessment upload caps, allowed MIME types, virus
   scanning yes/no.
8. Deliverable generation — template engine and regeneration policy; who signs off a
   re-issue.
9. Multi-org users — can one login belong to several organisations (accountant/advisor)?
10. Data residency/backups — hosting region, backup cadence/retention, tested-restore
    owner, Stripe webhook secret rotation plan.
11. Cutover plan — freeze window for whatbit-web operational routes, row-count/hash
    verification, rollback trigger.
12. Deletion/rename execution order in whatbit-web (prepared, NOT applied — see return
    message): operational pages, APIs, components, libs, migration file, robots
    disallows, README/`.env` secret vars — only after blue-print-ai-app builds green.

---

*End of Phase B prep draft. No code, schema, migration, auth, storage, or infrastructure
has been implemented from this document.*
