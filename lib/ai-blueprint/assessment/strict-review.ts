import type { ComputedUseCaseTriage, UseCaseRecord } from "./types";
import type { OrgWideContext } from "./scoring";

const arr = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);
const str = (value: unknown): string => (typeof value === "string" ? value : "");

function highImpactDomains(answers: Record<string, unknown>): string[] {
  return arr(answers.Q17).filter((value) => value !== "none" && value !== "not_sure");
}

function vulnerableGroups(answers: Record<string, unknown>): string[] {
  return arr(answers.Q18).filter((value) => value !== "no" && value !== "not_sure");
}

function hasPersonalOrSensitiveData(answers: Record<string, unknown>): boolean {
  return arr(answers.Q12).some((value) =>
    ["personal_customer", "personal_worker", "sensitive", "financial", "children"].includes(value),
  );
}

/**
 * Conservative post-triage gates for cases where the V1.1 source specification
 * requires reviewer attention but the base numeric matrix can otherwise look
 * reassuring. These gates never turn uncertainty into a factual failure: they
 * only force human review and the controls needed to resolve the uncertainty.
 *
 * Customer-submitted answers can never clear a reviewer-only escalation. In
 * particular, Q18 narrative text is not proof that a documented impact review
 * exists. U7 is raised here and may only be cleared later by the authenticated
 * human-review workflow with a recorded reason/evidence trail.
 */
export function applyStrictReviewGates(
  useCase: UseCaseRecord,
  ctx: OrgWideContext,
  base: ComputedUseCaseTriage,
): ComputedUseCaseTriage {
  const answers = useCase.answers;
  const org = ctx.orgAnswers;
  const flags = new Set(base.urgent_flags);
  const controls = new Set(base.recommended_control_ids);

  const highImpact = highImpactDomains(answers).length > 0;
  const groups = vulnerableGroups(answers);
  const q16 = str(answers.Q16);
  const q22 = str(org.Q22);
  const peopleAffected =
    str(answers.Q15) !== "no" ||
    !["no", "admin_no_influence"].includes(q16) ||
    highImpact ||
    groups.length > 0;

  // Q13: "Not sure" about public/personal tool use with personal/sensitive
  // information is a reviewer escalation. Do not silently treat uncertainty as No.
  if (hasPersonalOrSensitiveData(answers) && str(answers.Q13_public_or_personal_tool) === "not_sure") {
    flags.add("U1");
    controls.add("C07");
    controls.add("C10");
    controls.add("C11");
  }

  // Q14: material inference or storage in a high-impact setting requires capable
  // pre-action review. Sampling after use does not satisfy this gate.
  const q14 = str(answers.Q14);
  const reviewedBeforeUse = q22 === "before_use" || q22 === "before_use_higher_impact_only";
  if (["supports_action_decision", "stored_in_record"].includes(q14) && highImpact && !reviewedBeforeUse) {
    flags.add("U2");
    controls.add("C12");
    controls.add("C14");
  }

  // U3: higher-impact public-facing AI requires disclosure plus a usable human
  // escalation/challenge path. A chatbot handoff alone is not enough if the
  // organisation has no disclosure or redress process.
  const publicFacing = str(answers.Q15) !== "no";
  const transparencyWeak = ["only_if_asked", "no", "not_sure", ""].includes(str(org.Q27));
  const redressWeak = peopleAffected && ["no", "not_sure", ""].includes(str(org.Q28));
  if (publicFacing && highImpact && (transparencyWeak || redressWeak)) {
    flags.add("U3");
    controls.add("C15");
    controls.add("C16");
  }

  // U7: a customer narrative cannot prove a documented impact review exists.
  // Always escalate vulnerable + higher-stakes combinations for authenticated
  // reviewer confirmation; the later review workflow may clear it with evidence.
  const higherStakes = highImpact || ["rank_shortlist", "determines"].includes(q16);
  if (groups.length > 0 && higherStakes) {
    flags.add("U7");
    controls.add("C05");
  }

  // U8: high-impact generated information needs subject-matter review before it
  // is treated as final. After-use sampling is not equivalent to qualified review.
  const subjectMatterReview = arr(org.Q24).includes("subject_matter_review");
  const weakReviewTiming = [
    "sampled_after_use",
    "only_when_concern_raised",
    "no_defined_review",
    "not_sure",
    "",
  ].includes(q22);
  if (highImpact && !subjectMatterReview && weakReviewTiming) {
    flags.add("U8");
    controls.add("C12");
    controls.add("C14");
  }

  return {
    ...base,
    urgent_flags: Array.from(flags),
    draft_attention: flags.size > 0 ? "higher_attention" : base.draft_attention,
    recommended_control_ids: Array.from(controls),
  };
}
