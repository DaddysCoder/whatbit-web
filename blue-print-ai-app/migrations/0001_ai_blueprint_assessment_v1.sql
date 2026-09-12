-- AI Blueprint by WHATBIT — assessment table migration to the V1.1
-- responsible-AI-readiness schema (whatbit_rai_readiness_v1).
--
-- The `assessments` table was originally created ad hoc (no prior migration
-- files exist in this repo) to back a placeholder 10-field flat form. This
-- migration replaces it with a table shaped around the full nested
-- AssessmentSubmissionV1 payload (see
-- .reconstructed-source-derived spec, section 9, now at
-- lib/ai-blueprint/assessment/types.ts).
--
-- Confirmed with the product owner before writing this file: the live table
-- holds no real Paid/Started/Submitted rows yet (pre-launch/test data only),
-- so this drops and recreates rather than attempting an in-place data
-- migration. If that ever changes before this runs, back up the table
-- first (`SELECT * FROM assessments`) and re-derive a data-preserving
-- migration instead of running this as-is.
--
-- Apply with:
--   wrangler d1 execute <DATABASE_NAME_OR_ID> --remote --file=migrations/0001_ai_blueprint_assessment_v1.sql
-- (or paste into the D1 console in the Cloudflare dashboard). This has NOT
-- been run against the live database — nothing in this repo has execute
-- access to Cloudflare from this environment.

DROP TABLE IF EXISTS assessments;

CREATE TABLE assessments (
  id                            TEXT PRIMARY KEY,
  token                         TEXT NOT NULL UNIQUE,
  status                        TEXT NOT NULL DEFAULT 'Paid', -- Paid | Started | Submitted | Reviewing | Ready | Delivered
  schema_version                TEXT NOT NULL DEFAULT 'whatbit_rai_readiness_v1',

  -- Purchase / contact context, set once at checkout (unchanged from before).
  contact_name                  TEXT NOT NULL DEFAULT '',
  contact_email                 TEXT NOT NULL DEFAULT '',
  contact_phone                 TEXT NOT NULL DEFAULT '',
  stripe_session_id             TEXT NOT NULL DEFAULT '',

  -- Denormalised for the admin queue list/search only — always derived from
  -- draft_json / submission_json, never itself a source of truth.
  business_name                 TEXT NOT NULL DEFAULT '',

  -- In-progress raw answers (AssessmentDraftPayload: consentedToScope,
  -- organisationAnswers, tools[], useCases[] with .answers only — no
  -- .computed, attachments[], step, activeUseCaseIndex). Customer-writable
  -- while status is Paid/Started. Never contains E/G points, screening (S)
  -- flags, urgent (U) flags or a draft attention level.
  draft_json                    TEXT NOT NULL DEFAULT '{}',

  -- The complete, immutable AssessmentSubmissionV1 payload (organisation,
  -- respondent, tools, organisation_answers, use_cases[] WITH .computed
  -- triage, attachments, computed{}). Written exactly once, server-side, at
  -- submit time from draft_json. No customer-facing code path may read or
  -- write this column after it is set; it is for reviewer/admin use only.
  submission_json               TEXT,

  -- Reviewer workflow (admin-only).
  reviewer                      TEXT NOT NULL DEFAULT '',
  reviewer_notes                TEXT NOT NULL DEFAULT '',
  reviewer_confirmed_attention  TEXT NOT NULL DEFAULT '', -- '' | Low | Moderate | Higher Attention — the ONLY attention values ever shown to the customer, and only once delivered
  reviewer_decisions_json       TEXT NOT NULL DEFAULT '[]', -- append-only audit trail: [{ atIso, reviewerName, useCaseId?, previousAttention?, confirmedAttention, adjustmentReason? }, ...]
  suggested_controls_json       TEXT NOT NULL DEFAULT '{}', -- { [controlId: 'C01'..'C22']: boolean } — reviewer's checked subset of the catalogue
  qa_checked_json               TEXT NOT NULL DEFAULT '{}',
  outcome                       TEXT NOT NULL DEFAULT '',

  -- Timestamps.
  purchased_at                  TEXT NOT NULL DEFAULT '',
  started_at                    TEXT NOT NULL DEFAULT '',
  submitted_at                  TEXT NOT NULL DEFAULT '',
  due_at                        TEXT NOT NULL DEFAULT '',
  delivered_at                  TEXT NOT NULL DEFAULT '',
  created_at                    TEXT NOT NULL DEFAULT '',
  updated_at                    TEXT NOT NULL DEFAULT ''
);

CREATE INDEX idx_assessments_status ON assessments (status);
CREATE INDEX idx_assessments_token ON assessments (token);
