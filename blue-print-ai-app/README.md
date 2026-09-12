# blue-print-ai-app

Standalone AI Blueprint app. This directory is the base that will later be
promoted to the `DaddysCoder/blue-print-ai-app` repo.

## Backend: Phase A (transitional)

Phase A uses a transitional Cloudflare D1/KV backend. D1/KV access is
currently offline in this environment — no live reads or writes are expected
until credentials and bindings are provided.

## Coolify deploy notes

- Not deployed yet.
- Git-based service, containerised via `Dockerfile` (multi-stage
  `node:20-alpine`, `npm ci` → `npm run build` → `npm start`).
- Listens on port 3000. No Vercel-specific code or assumptions.

## Environment

| Variable | Purpose |
| --- | --- |
| `AI_BLUEPRINT_APP_URL` | Canonical public URL of this app (used for links in operational emails) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID for D1/KV API access |
| `CLOUDFLARE_AI_BLUEPRINT_API_TOKEN` | API token for D1/KV access |
| `AI_BLUEPRINT_D1_DATABASE_ID` | D1 database ID |
| `AI_BLUEPRINT_KV_NAMESPACE_ID` | KV namespace ID |
| `AI_BLUEPRINT_ADMIN_PASSWORD` | Admin login password |
| `AI_BLUEPRINT_ADMIN_SESSION_SECRET` | Secret used to sign admin sessions |
| `AI_BLUEPRINT_STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key for operational emails |
| `CONTACT_FROM_EMAIL` | From address for operational emails |

Phase B `NHOST_*` placeholders are commented in `.env.example` and must not
be populated yet.

## Verify

```bash
npm ci
npm run lint
npm run build
npm start
```

## URLs

- Webhook: `{AI_BLUEPRINT_APP_URL}/api/checkout-webhook`
- Success: `{AI_BLUEPRINT_APP_URL}/success`

## Phase B pointer

Phase B migrates the transitional D1/KV backend to Nhost. No Phase B code
exists in this base yet.
