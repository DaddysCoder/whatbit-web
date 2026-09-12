import type { AssessmentSubmissionV1 } from "./types";

/**
 * Non-scoring flags that don't affect the attention level but must surface
 * to the reviewer per §5 rule 11, §4 Q35 contradiction note, and §11
 * "Scope and completeness" checklist.
 */
export function computeCompletenessFlags(submission: {
  respondent: AssessmentSubmissionV1["respondent"];
  tools: AssessmentSubmissionV1["tools"];
  use_cases: AssessmentSubmissionV1["use_cases"];
  organisation_answers: Record<string, unknown>;
}): string[] {
  const flags: string[] = [];

  // Rule 11 — limited respondent visibility.
  if (submission.respondent.organisation_wide_visibility !== "yes") {
    flags.push("limited_respondent_visibility");
  }

  // §4 Q06 note — permit one planned tool, label pre-adoption.
  const anyInUseOrTrial = submission.tools.some((t) => t.status === "in_use" || t.status === "trial");
  if (!anyInUseOrTrial && submission.tools.length > 0) {
    flags.push("pre_adoption");
  }

  // §3 — more than three material use cases requires disclosure of sampling.
  // (The UI caps entry at 3, so this flags cases where the customer noted
  // additional uses exist in Q35 notes but weren't formally captured.)
  const notes = String(submission.organisation_answers["Q35_notes"] ?? "").toLowerCase();
  if (submission.use_cases.length >= 3 && /more|other use|another use|several/.test(notes)) {
    flags.push("possible_additional_material_uses_not_assessed");
  }

  return flags;
}

export function computeContradictionFlags(organisationAnswers: Record<string, unknown>): string[] {
  const flags: string[] = [];
  const q35 = Array.isArray(organisationAnswers["Q35"]) ? (organisationAnswers["Q35"] as string[]) : [];
  const q33 = organisationAnswers["Q33"];
  if (q35.includes("respond_to_concern_incident") && q33 === "no_known_issue") {
    flags.push("q35_incident_purpose_but_q33_no_known_issue");
  }
  return flags;
}
