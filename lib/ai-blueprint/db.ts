import { d1Query } from "./cloudflare";
import type { AssessmentSubmissionV1, AttachmentRecord, ToolRecord, UseCaseRecord } from "./assessment/types";
import { assembleSubmissionPayload } from "./assessment/submission";

export type AssessmentStatus = "Paid" | "Started" | "Submitted" | "Reviewing" | "Ready" | "Delivered";
export type ConfirmedAttention = "" | "Low" | "Moderate" | "Higher Attention";

export type AssessmentRow = {
  id: string;
  token: string;
  status: AssessmentStatus;
  schema_version: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  stripe_session_id: string;
  business_name: string;
  /** In-progress raw answers only. Never contains E/G points or S/U flags. */
  draft_json: string;
  /** The complete, immutable AssessmentSubmissionV1 payload — set once at
   * submit. Reviewer/admin use only; no customer-facing code may read this. */
  submission_json: string | null;
  reviewer: string;
  reviewer_notes: string;
  reviewer_confirmed_attention: ConfirmedAttention;
  reviewer_decisions_json: string;
  suggested_controls_json: string;
  qa_checked_json: string;
  outcome: string;
  purchased_at: string;
  started_at: string;
  submitted_at: string;
  due_at: string;
  delivered_at: string;
  created_at: string;
  updated_at: string;
};

/** The customer-facing wizard's in-progress state (spec §9's raw-answer shape, pre-submit). */
export interface AssessmentDraft {
  consentedToScope: boolean;
  organisationAnswers: Record<string, unknown>;
  tools: ToolRecord[];
  useCases: UseCaseRecord[];
  attachments: AttachmentRecord[];
  step: number;
  activeUseCaseIndex: number;
}

const EMPTY_DRAFT: AssessmentDraft = {
  consentedToScope: false,
  organisationAnswers: {},
  tools: [],
  useCases: [],
  attachments: [],
  step: 0,
  activeUseCaseIndex: 0,
};

const WRITABLE_STATUSES: AssessmentStatus[] = ["Paid", "Started"];

export function draftFromRow(row: AssessmentRow): AssessmentDraft {
  try {
    const parsed = JSON.parse(row.draft_json);
    return {
      consentedToScope: Boolean(parsed.consentedToScope),
      organisationAnswers: parsed.organisationAnswers && typeof parsed.organisationAnswers === "object" ? parsed.organisationAnswers : {},
      tools: Array.isArray(parsed.tools) ? parsed.tools : [],
      useCases: Array.isArray(parsed.useCases) ? parsed.useCases : [],
      attachments: Array.isArray(parsed.attachments) ? parsed.attachments : [],
      step: typeof parsed.step === "number" ? parsed.step : 0,
      activeUseCaseIndex: typeof parsed.activeUseCaseIndex === "number" ? parsed.activeUseCaseIndex : 0,
    };
  } catch {
    return { ...EMPTY_DRAFT };
  }
}

/** Never call this for a customer-facing response — admin/reviewer use only. */
export function submissionFromRow(row: AssessmentRow): AssessmentSubmissionV1 | null {
  if (!row.submission_json) return null;
  try {
    return JSON.parse(row.submission_json) as AssessmentSubmissionV1;
  } catch {
    return null;
  }
}

function safeParseRecord(value: string): Record<string, boolean> {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export interface ReviewerDecisionEntry {
  atIso: string;
  reviewerName: string;
  previousAttention: ConfirmedAttention;
  confirmedAttention: ConfirmedAttention;
  adjustmentReason: string;
}

function safeParseDecisions(value: string): ReviewerDecisionEntry[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function nowIso() {
  return new Date().toISOString();
}

function addBusinessDays(date: Date, days: number) {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return result;
}

export async function createAssessment(input: {
  id: string;
  token: string;
  contactEmail: string;
  contactName?: string;
  stripeSessionId?: string;
}): Promise<void> {
  const now = nowIso();
  await d1Query(
    `INSERT INTO assessments
      (id, token, status, contact_email, contact_name, stripe_session_id, purchased_at, created_at, updated_at)
     VALUES (?, ?, 'Paid', ?, ?, ?, ?, ?, ?)`,
    [input.id, input.token, input.contactEmail, input.contactName || "", input.stripeSessionId || "", now, now, now],
  );
}

export async function getAssessmentByToken(token: string): Promise<AssessmentRow | null> {
  const result = await d1Query<AssessmentRow>("SELECT * FROM assessments WHERE token = ? LIMIT 1", [token]);
  return result.results[0] || null;
}

export async function getAssessmentById(id: string): Promise<AssessmentRow | null> {
  const result = await d1Query<AssessmentRow>("SELECT * FROM assessments WHERE id = ? LIMIT 1", [id]);
  return result.results[0] || null;
}

export async function listAssessments(status?: string): Promise<AssessmentRow[]> {
  if (status && status !== "All") {
    const result = await d1Query<AssessmentRow>(
      "SELECT * FROM assessments WHERE status = ? ORDER BY purchased_at DESC",
      [status],
    );
    return result.results;
  }
  const result = await d1Query<AssessmentRow>("SELECT * FROM assessments ORDER BY purchased_at DESC");
  return result.results;
}

function orgNameFrom(patch: Partial<AssessmentDraft>, fallback: string): string {
  const name = patch.organisationAnswers?.Q01_name;
  return typeof name === "string" && name.trim() ? name.trim() : fallback;
}

/**
 * Client-facing autosave: merges a partial draft and promotes Paid -> Started
 * on first write. Refuses to write once the assessment has been submitted —
 * a submitted record is immutable from the customer side, enforced here as
 * well as at the route layer.
 */
export async function saveAssessmentDraft(token: string, patch: Partial<AssessmentDraft>): Promise<AssessmentRow | null> {
  const existing = await getAssessmentByToken(token);
  if (!existing) return null;
  if (!WRITABLE_STATUSES.includes(existing.status)) return null;

  const current = draftFromRow(existing);
  const next: AssessmentDraft = { ...current, ...patch };

  const started = existing.status === "Paid" ? nowIso() : existing.started_at;
  const status: AssessmentStatus = existing.status === "Paid" ? "Started" : existing.status;

  await d1Query(
    `UPDATE assessments SET draft_json = ?, business_name = ?, status = ?, started_at = ?, updated_at = ? WHERE token = ?`,
    [JSON.stringify(next), orgNameFrom(patch, existing.business_name), status, started, nowIso(), token],
  );

  return getAssessmentByToken(token);
}

export type SubmitResult = { row: AssessmentRow } | { error: string };

/**
 * Computes and persists the full AssessmentSubmissionV1 payload (including
 * E/G scoring, S/U flags and the draft attention level) server-side from the
 * customer's raw draft, then marks the record Submitted. The computed block
 * is never returned to the caller of the customer-facing route — only
 * admin/reviewer code paths read `submission_json`.
 */
export async function submitAssessmentFinal(token: string, draft: AssessmentDraft): Promise<SubmitResult | null> {
  const existing = await getAssessmentByToken(token);
  if (!existing) return null;
  if (!WRITABLE_STATUSES.includes(existing.status)) return { error: "This assessment has already been submitted." };

  if (!draft.consentedToScope) {
    return { error: "Please acknowledge the assessment boundary before submitting." };
  }
  const orgName = draft.organisationAnswers?.Q01_name;
  if (typeof orgName !== "string" || !orgName.trim()) {
    return { error: "Please complete your organisation name before submitting." };
  }
  if (draft.useCases.length === 0) {
    return { error: "Please add at least one material AI use case before submitting." };
  }

  const now = new Date();
  const startedAt = existing.started_at || now.toISOString();

  const payload = assembleSubmissionPayload({
    assessmentId: existing.id,
    startedAt,
    consentedToScope: draft.consentedToScope,
    organisationAnswers: draft.organisationAnswers,
    tools: draft.tools,
    useCases: draft.useCases,
    attachments: draft.attachments,
  });

  const dueAt = addBusinessDays(now, 5).toISOString();

  await d1Query(
    `UPDATE assessments SET
      draft_json = ?, submission_json = ?, business_name = ?, status = 'Submitted',
      started_at = ?, submitted_at = ?, due_at = ?, updated_at = ?
     WHERE token = ?`,
    [
      JSON.stringify(draft),
      JSON.stringify(payload),
      orgNameFrom(draft, existing.business_name),
      startedAt,
      now.toISOString(),
      dueAt,
      now.toISOString(),
      token,
    ],
  );

  const row = await getAssessmentByToken(token);
  return row ? { row } : null;
}

export type ReviewerPatch = {
  reviewer?: string;
  reviewerNotes?: string;
  reviewerConfirmedAttention?: ConfirmedAttention;
  adjustmentReason?: string;
  suggestedControls?: Record<string, boolean>;
  qaChecked?: Record<string, boolean>;
  outcome?: string;
  status?: AssessmentStatus;
};

/**
 * Admin-only review workflow update. A change to `reviewerConfirmedAttention`
 * appends an audit entry rather than silently overwriting the prior
 * decision (spec §9: "Reviewer changes must append an audit event").
 */
export async function updateAssessmentReview(id: string, patch: ReviewerPatch): Promise<AssessmentRow | null> {
  const existing = await getAssessmentById(id);
  if (!existing) return null;

  const status = patch.status || (existing.status === "Submitted" ? "Reviewing" : existing.status);
  const reviewerName = patch.reviewer ?? existing.reviewer;

  let decisions = safeParseDecisions(existing.reviewer_decisions_json);
  if (patch.reviewerConfirmedAttention !== undefined && patch.reviewerConfirmedAttention !== existing.reviewer_confirmed_attention) {
    decisions = [
      ...decisions,
      {
        atIso: nowIso(),
        reviewerName,
        previousAttention: existing.reviewer_confirmed_attention,
        confirmedAttention: patch.reviewerConfirmedAttention,
        adjustmentReason: patch.adjustmentReason ?? "",
      },
    ];
  }

  await d1Query(
    `UPDATE assessments SET
      reviewer = ?, reviewer_notes = ?, reviewer_confirmed_attention = ?, reviewer_decisions_json = ?,
      suggested_controls_json = ?, qa_checked_json = ?, outcome = ?, status = ?, updated_at = ?
     WHERE id = ?`,
    [
      reviewerName,
      patch.reviewerNotes ?? existing.reviewer_notes,
      patch.reviewerConfirmedAttention ?? existing.reviewer_confirmed_attention,
      JSON.stringify(decisions),
      JSON.stringify(patch.suggestedControls ?? safeParseRecord(existing.suggested_controls_json)),
      JSON.stringify(patch.qaChecked ?? safeParseRecord(existing.qa_checked_json)),
      patch.outcome ?? existing.outcome,
      status,
      nowIso(),
      id,
    ],
  );

  return getAssessmentById(id);
}

export async function markDelivered(id: string): Promise<AssessmentRow | null> {
  const now = nowIso();
  await d1Query(`UPDATE assessments SET status = 'Delivered', delivered_at = ?, updated_at = ? WHERE id = ?`, [
    now,
    now,
    id,
  ]);
  return getAssessmentById(id);
}

export { safeParseRecord, safeParseDecisions };
