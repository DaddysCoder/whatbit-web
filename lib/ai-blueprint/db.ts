import { d1Query } from "./cloudflare";

export type AssessmentStatus = "Paid" | "Started" | "Submitted" | "Reviewing" | "Ready" | "Delivered";

export type AssessmentRow = {
  id: string;
  token: string;
  status: AssessmentStatus;
  business_name: string;
  industry: string;
  team_size: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  tools_json: string;
  other_tool: string;
  main_task: string;
  main_data: string;
  reviewed: string;
  extra_notes: string;
  controls_json: string;
  step: number;
  stripe_session_id: string;
  reviewer: string;
  reviewer_notes: string;
  attention_rating: string;
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

/** The subset of a record the client-facing assessment page is allowed to read/write. */
export type AssessmentForm = {
  businessName: string;
  industry: string;
  teamSize: string;
  tools: string[];
  otherTool: string;
  mainTask: string;
  mainData: string;
  reviewed: string;
  extraNotes: string;
  controls: string[];
};

export function formFromRow(row: AssessmentRow): AssessmentForm {
  return {
    businessName: row.business_name,
    industry: row.industry,
    teamSize: row.team_size,
    tools: safeParseArray(row.tools_json),
    otherTool: row.other_tool,
    mainTask: row.main_task,
    mainData: row.main_data,
    reviewed: row.reviewed,
    extraNotes: row.extra_notes,
    controls: safeParseArray(row.controls_json),
  };
}

function safeParseArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
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

/** Client-facing autosave: updates form fields and step, promoting Paid -> Started on first write. */
export async function saveAssessmentProgress(
  token: string,
  patch: Partial<AssessmentForm> & { step?: number },
): Promise<AssessmentRow | null> {
  const existing = await getAssessmentByToken(token);
  if (!existing) return null;

  const next: AssessmentForm = { ...formFromRow(existing), ...patch };
  const started = existing.status === "Paid" ? nowIso() : existing.started_at;
  const status = existing.status === "Paid" ? "Started" : existing.status;

  await d1Query(
    `UPDATE assessments SET
      business_name = ?, industry = ?, team_size = ?, tools_json = ?, other_tool = ?,
      main_task = ?, main_data = ?, reviewed = ?, extra_notes = ?, controls_json = ?,
      step = ?, status = ?, started_at = ?, updated_at = ?
     WHERE token = ?`,
    [
      next.businessName,
      next.industry,
      next.teamSize,
      JSON.stringify(next.tools),
      next.otherTool,
      next.mainTask,
      next.mainData,
      next.reviewed,
      next.extraNotes,
      JSON.stringify(next.controls),
      typeof patch.step === "number" ? patch.step : existing.step,
      status,
      started,
      nowIso(),
      token,
    ],
  );

  return getAssessmentByToken(token);
}

export async function submitAssessment(token: string): Promise<AssessmentRow | null> {
  const existing = await getAssessmentByToken(token);
  if (!existing) return null;

  const now = new Date();
  const dueAt = addBusinessDays(now, 5).toISOString();

  await d1Query(
    `UPDATE assessments SET status = 'Submitted', submitted_at = ?, due_at = ?, updated_at = ? WHERE token = ?`,
    [now.toISOString(), dueAt, now.toISOString(), token],
  );

  return getAssessmentByToken(token);
}

export type ReviewerPatch = {
  reviewer?: string;
  reviewerNotes?: string;
  attentionRating?: string;
  suggestedControls?: Record<string, boolean>;
  qaChecked?: Record<string, boolean>;
  outcome?: string;
  status?: AssessmentStatus;
};

export async function updateAssessmentReview(id: string, patch: ReviewerPatch): Promise<AssessmentRow | null> {
  const existing = await getAssessmentById(id);
  if (!existing) return null;

  const status = patch.status || (existing.status === "Submitted" ? "Reviewing" : existing.status);

  await d1Query(
    `UPDATE assessments SET
      reviewer = ?, reviewer_notes = ?, attention_rating = ?, suggested_controls_json = ?,
      qa_checked_json = ?, outcome = ?, status = ?, updated_at = ?
     WHERE id = ?`,
    [
      patch.reviewer ?? existing.reviewer,
      patch.reviewerNotes ?? existing.reviewer_notes,
      patch.attentionRating ?? existing.attention_rating,
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

export { safeParseRecord };
