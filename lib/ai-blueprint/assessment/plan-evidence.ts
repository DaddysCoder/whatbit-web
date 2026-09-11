export type CanonicalReviewStatus = "confirmed" | "uncertain" | "needs_confirmation";

export interface CanonicalField<T> {
  value?: T;
  source_question_ids: string[];
  review_status: CanonicalReviewStatus;
  confirmed_by?: string;
  limitation?: string;
}

export type PlanActionBasis = "confirmed_gap" | "uncertainty" | "urgent_flag";

export interface PlanActionInput {
  title: string;
  rationale: string;
  basis: PlanActionBasis;
  source_question_ids: string[];
  owner?: CanonicalField<string>;
  due_date?: CanonicalField<string>;
}

export interface SafePlanAction {
  title: string;
  rationale: string;
  basis: PlanActionBasis;
  source_question_ids: string[];
  owner: string | null;
  due_date: string | null;
  completion_placeholders: string[];
}

function cleanSources(ids: string[]): string[] {
  return Array.from(new Set(ids.map((id) => id.trim()).filter(Boolean)));
}

/**
 * A canonical field may become a customer-facing fact only after human
 * confirmation and only when its source is traceable. Missing/uncertain values
 * stay unknown; the generator must not convert them into plausible defaults.
 */
export function confirmedCanonicalValue<T>(field: CanonicalField<T> | undefined): T | null {
  if (!field) return null;
  if (field.review_status !== "confirmed") return null;
  if (!field.confirmed_by?.trim()) return null;
  if (cleanSources(field.source_question_ids).length === 0) return null;
  if (field.value === undefined || field.value === null) return null;
  if (typeof field.value === "string" && field.value.trim().length === 0) return null;
  return field.value;
}

/**
 * Creates a plan action without inventing operational facts. Recommendations
 * need an explicit evidence basis and at least one source question. Unknown
 * owner/date values become visible completion placeholders rather than guesses.
 */
export function createEvidenceBoundPlanAction(input: PlanActionInput): SafePlanAction {
  const sourceIds = cleanSources(input.source_question_ids);
  if (sourceIds.length === 0) {
    throw new Error("Plan action requires at least one source question ID.");
  }
  if (!input.title.trim()) throw new Error("Plan action requires a title.");
  if (!input.rationale.trim()) throw new Error("Plan action requires an evidence-based rationale.");

  const owner = confirmedCanonicalValue(input.owner);
  const dueDate = confirmedCanonicalValue(input.due_date);
  const placeholders: string[] = [];

  if (input.owner && owner === null) placeholders.push("Confirm action owner");
  if (input.due_date && dueDate === null) placeholders.push("Confirm target date");

  return {
    title: input.title.trim(),
    rationale: input.rationale.trim(),
    basis: input.basis,
    source_question_ids: sourceIds,
    owner,
    due_date: dueDate,
    completion_placeholders: placeholders,
  };
}

/**
 * Converts uncertainty into a verification action, not a negative factual
 * statement. Use this when an assessment answer is Not sure / not confirmed.
 */
export function verificationAction(
  title: string,
  sourceQuestionIds: string[],
  uncertainty: string,
): SafePlanAction {
  return createEvidenceBoundPlanAction({
    title,
    rationale: `Verify before treating as fact: ${uncertainty}`,
    basis: "uncertainty",
    source_question_ids: sourceQuestionIds,
  });
}
