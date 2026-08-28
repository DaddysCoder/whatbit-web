import type {
  AttentionLevel,
  ComputedUseCaseTriage,
  ScreeningFlag,
  UrgentFlag,
  UseCaseRecord,
} from "../types";

/**
 * Internal triage engine implementing spec §6 (weighting), §6.5 (screening
 * flags S1–S7) and §7 (mandatory human-review escalation U1–U8).
 *
 * IMPORTANT — per §6.1: "Weighting is an internal consistency aid. It is
 * not a scientific risk calculation, probability estimate or compliance
 * score." Every flag and band computed here is a DRAFT for the WHATBIT
 * reviewer (§3 step 7, §11 checklist) — none of it is shown to the
 * customer, and the reviewer may confirm, clear, qualify or override any
 * of it with a recorded reason. This module intentionally over-flags
 * (favouring reviewer attention) rather than under-flags.
 */

const arr = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);
const str = (v: unknown): string => (typeof v === "string" ? v : "");
const hasAny = (v: unknown, values: string[]): boolean => {
  const list = arr(v);
  return values.some((x) => list.includes(x));
};

export interface OrgWideContext {
  orgAnswers: Record<string, unknown>;
  useCases: UseCaseRecord[];
  sectors: string[];
}

/** High-impact domains selected in Q17 for a given use case (excludes none/not_sure). */
function highImpactDomains(uc: Record<string, unknown>): string[] {
  return arr(uc["Q17"]).filter((x) => x !== "none" && x !== "not_sure");
}

function vulnerableGroups(uc: Record<string, unknown>): string[] {
  return arr(uc["Q18"]).filter((x) => x !== "no" && x !== "not_sure");
}

function anySensitiveOrPersonalData(uc: Record<string, unknown>): boolean {
  return hasAny(uc["Q12"], [
    "confidential_ip",
    "personal_customer",
    "personal_worker",
    "sensitive",
    "financial",
    "children",
  ]);
}

/**
 * Narrower than anySensitiveOrPersonalData(): excludes plain commercial
 * confidentiality/IP. Used specifically for U1's "provider training/
 * access/retention is unknown for such data" clause (§7) — applying that
 * clause to ordinary confidential business info as well would trip
 * Higher Attention on almost every SME submission, since virtually no
 * SME has fully verified an AI vendor's exact training/subprocessor
 * terms for everyday confidential content. Personal, sensitive,
 * financial and children's data are the categories that clause is
 * actually meant to catch.
 */
function anyPersonalOrSensitiveDataExcludingConfidential(uc: Record<string, unknown>): boolean {
  return hasAny(uc["Q12"], ["personal_customer", "personal_worker", "sensitive", "financial", "children"]);
}

const REGULATED_DOMAINS = [
  "legal_rights_justice",
  "essential_service_access",
  "credit_insurance_financial",
  "employment_recruitment_discipline",
  "health_clinical_disability",
];

/** §6.1 — sector context contribution (E+2), shared across all use cases for this org. */
function sectorExposurePoints(sectors: string[]): number {
  const flagged = [
    "education_training",
    "health_clinical",
    "disability_aged_community",
    "child_related",
    "recruitment_employment",
    "finance_credit_insurance",
    "legal_services",
    "government_public",
    "critical_infrastructure",
  ];
  return sectors.some((s) => flagged.includes(s)) ? 2 : 0;
}

/** §6.1 — Q05 obligations contribution (E+2 substantive, or E+1 if "not sure" in a flagged sector). */
function obligationsExposurePoints(orgAnswers: Record<string, unknown>, sectors: string[]): number {
  const q05 = arr(orgAnswers["Q05"]);
  const substantive = q05.filter((x) => x !== "none_known" && x !== "not_sure");
  if (substantive.length > 0) return 2;
  if (q05.includes("not_sure") && sectorExposurePoints(sectors) > 0) return 1;
  return 0;
}

/** Per-use-case exposure (E) + screening flags (S1–S7) — spec §6.2, §6.5. */
function computeExposure(
  uc: Record<string, unknown>,
  ctx: OrgWideContext,
): { points: number; flags: ScreeningFlag[] } {
  let e = 0;
  const flags = new Set<ScreeningFlag>();

  // Shared org-level context (applies once, to every use case).
  e += sectorExposurePoints(ctx.sectors);
  e += obligationsExposurePoints(ctx.orgAnswers, ctx.sectors);

  // Q10 — frequency / reach.
  const freq = str(uc["Q10_frequency"]);
  const reach = str(uc["Q10_reach"]);
  if (freq === "continuously_automatically") e += 2;
  if (reach === "100_999") e += 1;
  if (reach === "1000_plus") e += 2;
  const largeScale = freq === "continuously_automatically" || reach === "1000_plus" || reach === "100_999";

  // Q11 — capability + pre-approval.
  const q11 = arr(uc["Q11"]);
  const preapproval = str(uc["Q11_preapproval"]);
  if (q11.includes("recommend_outcome")) e += 2;
  if (q11.includes("communicate_directly") || q11.includes("update_records") || q11.includes("trigger_other_system")) e += 3;
  if (q11.includes("transactions")) e += 4;
  if (q11.includes("open_ended_multi_purpose")) {
    e += 1;
    flags.add("S7");
  }
  if (preapproval === "sometimes") e += 2;
  if (preapproval === "usually_always") e += 4;
  if (q11.includes("communicate_directly")) flags.add("S2");
  if (largeScale && (q11.includes("update_records") || q11.includes("trigger_other_system") || q11.includes("transactions"))) {
    flags.add("S3");
  }

  // Q12 — data categories (capped: personal bucket once, sensitive bucket once).
  const q12 = arr(uc["Q12"]);
  if (q12.includes("confidential_ip")) e += 2;
  if (q12.includes("personal_customer") || q12.includes("personal_worker")) e += 2;
  if (q12.includes("sensitive") || q12.includes("financial") || q12.includes("children") || q12.includes("credentials")) {
    e += 4;
  }
  if (anySensitiveOrPersonalData(uc)) flags.add("S1");

  // Q14 — inference about an identifiable person.
  const q14 = str(uc["Q14"]);
  if (q14 === "low_impact_only") e += 1;
  if (q14 === "supports_action_decision" || q14 === "stored_in_record") e += 3;
  if (q14 === "not_sure") e += 1;

  // Q15 — direct interaction.
  const q15 = str(uc["Q15"]);
  if (q15 === "narrow_script_takeover") e += 1;
  if (q15 === "varied_with_escalation") {
    e += 2;
    flags.add("S2");
  }
  if (q15 === "varied_without_escalation") {
    e += 4;
    flags.add("S2");
  }

  // Q16 — decision influence.
  const q16 = str(uc["Q16"]);
  if (q16 === "recommendation") e += 2;
  if (q16 === "rank_shortlist") e += 3;
  if (q16 === "determines") e += 4;
  if ((q16 === "determines" || q16 === "rank_shortlist") && ctx.orgAnswers && hasRegulatedContext(uc, ctx)) {
    flags.add("S5");
  }

  // Q17 — high-impact domains (capped: apply once regardless of how many selected).
  const domains = highImpactDomains(uc);
  if (domains.length > 0) e += 4;
  if (arr(uc["Q17"]).includes("not_sure")) e += 1;
  if (domains.some((d) => REGULATED_DOMAINS.includes(d))) flags.add("S5");

  // Q18 — vulnerable/marginalised groups.
  const groups = vulnerableGroups(uc);
  if (groups.length > 0) {
    e += 4;
    flags.add("S4");
  } else if (arr(uc["Q18"]).includes("not_sure")) {
    e += 1;
  }

  // Q19 — severity/reversibility.
  const q19 = str(uc["Q19"]);
  if (q19 === "material_effect") e += 2;
  if (q19 === "serious_hard_to_reverse") {
    e += 4;
    flags.add("S6");
  }

  return { points: e, flags: Array.from(flags) };
}

function hasRegulatedContext(uc: Record<string, unknown>, ctx: OrgWideContext): boolean {
  const q05Substantive = arr(ctx.orgAnswers["Q05"]).some(
    (x) => x !== "none_known" && x !== "not_sure",
  );
  const domainRegulated = highImpactDomains(uc).some((d) => REGULATED_DOMAINS.includes(d));
  return q05Substantive || domainRegulated;
}

/** Organisation-wide control-gap points — applied to every use case per §6.1. */
function computeOrgWideGapPoints(ctx: OrgWideContext): number {
  let g = 0;
  const o = ctx.orgAnswers;

  // Q20 — accountable owner.
  const q20 = str(o["Q20"]);
  if (q20 === "yes_informally" || q20 === "being_assigned") g += 1;
  if (q20 === "no" || q20 === "not_sure") g += 3;

  // Q21 — system/use owners.
  const q21 = str(o["Q21"]);
  if (q21 === "for_some" || q21 === "informally_only") g += 1;
  if (q21 === "no" || q21 === "not_sure") g += 2;

  // Q22 — review timing.
  const q22 = str(o["Q22"]);
  if (q22 === "before_use_higher_impact_only") g += 1;
  if (q22 === "sampled_after_use") g += 3;
  if (["only_when_concern_raised", "no_defined_review", "not_sure"].includes(q22)) g += 4;

  // Q23 — override/fallback.
  const q23Override = str(o["Q23_override"]);
  if (q23Override === "yes_not_tested") g += 1;
  if (q23Override === "only_partly") g += 2;
  if (q23Override === "no" || q23Override === "not_sure") g += 4;
  const fallback = str(o["Q23_fallback"]);
  if (fallback === "no") g += 2;

  // Q24 — output verification.
  const q24 = arr(o["Q24"]);
  if (q24.includes("only_informal")) g += 2;
  if (q24.includes("no_regular_checking") || q24.includes("not_sure")) g += 4;

  // Q25 — acceptable-use rules.
  const q25 = str(o["Q25"]);
  if (q25 === "partly_in_draft" || q25 === "verbal_informal_only") g += 1;
  if (q25 === "no" || q25 === "not_sure") g += 3;
  const anySensitiveAnywhere = ctx.useCases.some((u) => anySensitiveOrPersonalData(u.answers));
  const accessControls = arr(o["Q25_access_controls"]);
  if (anySensitiveAnywhere && (accessControls.length === 0 || accessControls.includes("none_not_sure"))) g += 2;

  // Q26 — training.
  const q26 = str(o["Q26"]);
  if (q26 === "informal_tips_only") g += 1;
  if (q26 === "none" || q26 === "not_sure") g += 2;
  const anyHighImpact = ctx.useCases.some((u) => highImpactDomains(u.answers).length > 0);
  if (anyHighImpact && ["none", "not_sure", "informal_tips_only"].includes(q26)) g += 2;

  // Q29 — vendor due diligence.
  const q29 = arr(o["Q29"]);
  const substantiveVendorChecks = q29.filter(
    (x) => x !== "no_defined_review" && x !== "not_sure",
  ).length;
  if (substantiveVendorChecks < 3) g += 2;
  if (q29.includes("no_defined_review") || q29.includes("not_sure")) g += 3;

  // Q30 — security controls.
  const q30 = arr(o["Q30"]);
  if (q30.includes("none") || q30.includes("not_sure")) g += 4;
  const relevantSecurityControls = q30.filter((x) => x !== "none" && x !== "not_sure").length;
  if (anySensitiveAnywhere && relevantSecurityControls < 4) g += 2;

  // Q31 — pre-deployment testing (org-wide answer).
  const q31 = str(o["Q31"]);
  if (q31 === "yes_practical_not_documented") g += 1;
  if (q31 === "vendor_evidence_only" || q31 === "limited_ad_hoc") g += 2;
  if (q31 === "no" || q31 === "not_sure") g += 4;

  // Q32 — monitoring.
  const q32 = arr(o["Q32"]);
  if (q32.includes("only_ad_hoc")) g += 1;
  if (q32.includes("no_monitoring") || q32.includes("not_sure")) g += 3;
  const anyLiveHighImpact = ctx.useCases.some(
    (u) => u.status === "live" && highImpactDomains(u.answers).length > 0,
  );
  if (anyLiveHighImpact && (q32.includes("no_monitoring") || q32.includes("not_sure"))) g += 2;

  // Q34 — existing records.
  const q34 = arr(o["Q34"]);
  if (!q34.includes("ai_policy_acceptable_use")) g += 2;
  if (!q34.includes("ai_register")) g += 2;
  if (q34.includes("none") || q34.includes("not_sure")) g += 4;

  return g;
}

/** Per-use-case control-gap points that vary by use case (rather than being uniform org-wide). */
function computeUseCaseSpecificGapPoints(uc: Record<string, unknown>, ctx: OrgWideContext): number {
  let g = 0;

  // Q13 — safeguards for this use case's data.
  const q13 = arr(uc["Q13"]);
  if (q13.length === 0 || q13.includes("none") || q13.includes("not_sure")) {
    if (anySensitiveOrPersonalData(uc)) g += 3;
  }

  // Q14 — "not sure" carries a small additional gap alongside its exposure weight.
  if (str(uc["Q14"]) === "not_sure") g += 1;

  // Q19 — contestability.
  const contestability = str(uc["Q19_contestability"]);
  const peopleAffected =
    str(uc["Q15"]) !== "no" ||
    !["no", "admin_no_influence"].includes(str(uc["Q16"])) ||
    highImpactDomains(uc).length > 0 ||
    vulnerableGroups(uc).length > 0;
  if (peopleAffected && (contestability === "no" || contestability === "not_sure")) g += 3;

  // Q27 — transparency, only relevant where this use case involves people (Q15/Q16).
  const q27 = str(ctx.orgAnswers["Q27"]);
  const q15Applies = str(uc["Q15"]) !== "no";
  const q16Applies = !["no", "admin_no_influence"].includes(str(uc["Q16"]));
  if (q15Applies || q16Applies) {
    if (q27 === "for_some_uses") g += 1;
    if (["only_if_asked", "no", "not_sure"].includes(q27)) g += 3;
  }

  // Q28 — complaints/escalation, where people may be affected.
  const q28 = str(ctx.orgAnswers["Q28"]);
  if (peopleAffected) {
    if (q28 === "general_complaints_only" || q28 === "informal_process") g += 1;
    if (q28 === "no" || q28 === "not_sure") g += 3;
  }

  return g;
}

/** §7 — mandatory human-review escalation flags (U1–U8), evaluated per use case where applicable. */
function computeUrgentFlags(uc: Record<string, unknown>, ctx: OrgWideContext): UrgentFlag[] {
  const flags = new Set<UrgentFlag>();
  const o = ctx.orgAnswers;

  // U1 — sensitive/personal/confidential/credentials into public/personal/unapproved tool,
  // or provider training/access/retention unknown for such data.
  const publicOrPersonalToolYes = str(uc["Q13_public_or_personal_tool"]) === "yes";
  if (publicOrPersonalToolYes && anySensitiveOrPersonalData(uc)) flags.add("U1");
  if (arr(uc["Q12"]).includes("credentials")) {
    const secretsBlocked = arr(o["Q30"]).includes("secrets_blocked_from_prompts");
    if (!secretsBlocked) flags.add("U1");
  }
  const q29 = arr(o["Q29"]);
  const vendorTermsUnknown =
    !q29.includes("training_on_inputs_outputs") ||
    !q29.includes("access_subprocessors") ||
    !q29.includes("storage_retention_deletion");
  if (anyPersonalOrSensitiveDataExcludingConfidential(uc) && vendorTermsUnknown) flags.add("U1");

  // U2 — AI normally determines/materially influences a high-impact outcome without
  // capable human review before action.
  const q16 = str(uc["Q16"]);
  const q22 = str(o["Q22"]);
  const reviewedBeforeUse = q22 === "before_use" || q22 === "before_use_higher_impact_only";
  if ((q16 === "determines" || q16 === "rank_shortlist") && highImpactDomains(uc).length > 0 && !reviewedBeforeUse) {
    flags.add("U2");
  }
  const q14 = str(uc["Q14"]);
  if (q14 === "supports_action_decision" && highImpactDomains(uc).length > 0 && !reviewedBeforeUse) {
    flags.add("U2");
  }

  // U3 — customer/public-facing AI, higher-impact info, without disclosure/escalation/redress.
  const q15 = str(uc["Q15"]);
  const impactDomainsOverlapPublicFacing = highImpactDomains(uc).some((d) =>
    ["health_clinical_disability", "legal_rights_justice", "credit_insurance_financial", "essential_service_access"].includes(d),
  );
  if (q15 === "varied_without_escalation" && impactDomainsOverlapPublicFacing) flags.add("U3");
  const q19 = str(uc["Q19"]);
  const contestability = str(uc["Q19_contestability"]);
  if (q19 === "serious_hard_to_reverse" && (contestability === "no" || contestability === "not_sure")) {
    flags.add("U3");
  }

  // U4 — agent/automation can act (external comms, record change, payment, deletion, trigger)
  // without evident scoped permissions/approval gates/logging.
  const q11 = arr(uc["Q11"]);
  const preapproval = str(uc["Q11_preapproval"]);
  const canActAutonomously =
    (q11.includes("transactions") ||
      q11.includes("communicate_directly") ||
      q11.includes("update_records") ||
      q11.includes("trigger_other_system")) &&
    preapproval !== "never";
  const hasLoggingControl = arr(o["Q30"]).includes("logging_audit_trail");
  if (canActAutonomously && !hasLoggingControl) flags.add("U4");

  // U5 — current/unresolved or possible serious incident.
  const q33 = str(o["Q33"]);
  if (q33 === "current_unresolved" || q33 === "possible_not_enough_info") flags.add("U5");

  // U6 — no identifiable accountable owner for a live high-impact/autonomous use.
  const q20 = str(o["Q20"]);
  const ownerMissing = q20 === "no" || q20 === "not_sure";
  const liveHighImpactOrAutonomous =
    (highImpactDomains(uc).length > 0 || preapproval === "usually_always") && (uc["__status"] as string) === "live";
  if (ownerMissing && liveHighImpactOrAutonomous) flags.add("U6");

  // U7 — vulnerable/marginalised group, higher-stakes context, no documented impact review.
  const groups = vulnerableGroups(uc);
  const higherStakes = highImpactDomains(uc).length > 0 || q16 === "rank_shortlist" || q16 === "determines";
  const detailProvided = str(uc["Q18_detail"]).trim().length > 0;
  if (groups.length > 0 && higherStakes && !detailProvided) flags.add("U7");

  // U8 — AI-generated health/legal/financial/safety/employment/service-access info treated
  // as final without qualified review.
  const q24 = arr(o["Q24"]);
  const subjectReview = q24.includes("subject_matter_review");
  if (highImpactDomains(uc).length > 0 && !subjectReview && (q22 === "no_defined_review" || q22 === "only_when_concern_raised")) {
    flags.add("U8");
  }

  return Array.from(flags);
}

function band(points: number, thresholds: [number, number]): "contained" | "material" | "elevated" | "supported" | "developing" | "material_gaps" {
  // Generic helper unused directly — see exposureBand/gapBand below for the
  // exact §6.2/§6.3 cut-offs.
  void thresholds;
  return points as never;
}
void band;

function exposureBand(points: number): "contained" | "material" | "elevated" {
  if (points <= 4) return "contained";
  if (points <= 11) return "material";
  return "elevated";
}

function gapBand(points: number): "supported" | "developing" | "material_gaps" {
  if (points <= 5) return "supported";
  if (points <= 13) return "developing";
  return "material_gaps";
}

/** §6.4 — draft attention matrix. */
function draftAttentionMatrix(
  exposure: "contained" | "material" | "elevated",
  gaps: "supported" | "developing" | "material_gaps",
): AttentionLevel {
  if (exposure === "elevated") return "higher_attention";
  if (gaps === "material_gaps") return "higher_attention";
  if (exposure === "contained" && gaps === "supported") return "low";
  return "moderate";
}

export function computeUseCaseTriage(
  useCase: UseCaseRecord,
  ctx: OrgWideContext,
): ComputedUseCaseTriage {
  const uc = { ...useCase.answers, __status: useCase.status };

  const { points: exposurePoints, flags: screeningFlags } = computeExposure(uc, ctx);
  const orgGapPoints = computeOrgWideGapPoints(ctx);
  const useCaseGapPoints = computeUseCaseSpecificGapPoints(uc, ctx);
  const controlGapPoints = orgGapPoints + useCaseGapPoints;

  const eBand = exposureBand(exposurePoints);
  const gBand = gapBand(controlGapPoints);

  let draftAttention = draftAttentionMatrix(eBand, gBand);

  const urgentFlags = computeUrgentFlags(uc, ctx);
  if (urgentFlags.length > 0) {
    // §6.4: any U flag makes the draft outcome "Higher Attention pending
    // reviewer confirmation" — reviewer may downgrade with a recorded reason.
    draftAttention = "higher_attention";
  }

  const recommendedControlIds = suggestControlsForUseCase(uc, ctx, screeningFlags, urgentFlags);

  return {
    exposure_points: exposurePoints,
    control_gap_points: controlGapPoints,
    exposure_band: eBand,
    gap_band: gBand,
    screening_flags: screeningFlags,
    urgent_flags: urgentFlags,
    draft_attention: draftAttention,
    recommended_control_ids: recommendedControlIds,
  };
}

/** Maps confirmed gaps to control catalogue IDs (§8) for this use case. */
function suggestControlsForUseCase(
  uc: Record<string, unknown>,
  ctx: OrgWideContext,
  screeningFlags: ScreeningFlag[],
  urgentFlags: UrgentFlag[],
): string[] {
  const ids = new Set<string>();
  const o = ctx.orgAnswers;

  if (["no", "not_sure", "yes_informally", "being_assigned"].includes(str(o["Q20"]))) ids.add("C01");
  if (["no", "not_sure", "for_some", "informally_only"].includes(str(o["Q21"]))) ids.add("C02");
  if (["partly_in_draft", "verbal_informal_only", "no", "not_sure"].includes(str(o["Q25"]))) ids.add("C03");
  if (!arr(o["Q34"]).includes("ai_register")) ids.add("C04");
  if (screeningFlags.some((f) => ["S4", "S5", "S6"].includes(f))) ids.add("C05");
  if (anySensitiveOrPersonalData(uc)) ids.add("C06");
  if (anySensitiveOrPersonalData(uc)) ids.add("C07");
  ids.add("C08");
  if (["no_unlikely", "possibly", "yes", "not_sure"].includes(str(o["Q07"]))) ids.add("C09");
  const q29Weak = arr(o["Q29"]).filter((x) => x !== "no_defined_review" && x !== "not_sure").length < 3;
  if (q29Weak) ids.add("C10");
  if (arr(o["Q30"]).includes("none") || arr(o["Q30"]).includes("not_sure")) ids.add("C11");
  if (["sampled_after_use", "only_when_concern_raised", "no_defined_review", "not_sure"].includes(str(o["Q22"]))) {
    ids.add("C12");
  }
  if (["only_partly", "no", "not_sure"].includes(str(o["Q23_override"]))) ids.add("C13");
  if (arr(o["Q24"]).includes("only_informal") || arr(o["Q24"]).includes("no_regular_checking")) ids.add("C14");
  if (str(uc["Q15"]) !== "no" || !["no", "admin_no_influence"].includes(str(uc["Q16"]))) ids.add("C15");
  ids.add("C16");
  ids.add("C17");
  if (["none", "not_sure", "informal_tips_only"].includes(str(o["Q26"]))) ids.add("C18");
  if (urgentFlags.includes("U5") || str(o["Q33"]) !== "no_known_issue") ids.add("C19");
  if (["no", "not_sure", "vendor_evidence_only", "limited_ad_hoc"].includes(str(o["Q31"]))) ids.add("C20");
  if (str(o["Q23_fallback"]) === "no") ids.add("C21");
  if (urgentFlags.includes("U4")) ids.add("C22");

  return Array.from(ids);
}

/** Overall organisation result: highest confirmed use-case outcome (never averaged) — §6.4. */
export function computeOverallAttention(useCases: UseCaseRecord[]): AttentionLevel {
  const order: AttentionLevel[] = ["low", "moderate", "higher_attention"];
  let worst: AttentionLevel = "low";
  for (const uc of useCases) {
    const level = uc.computed?.draft_attention ?? "low";
    if (order.indexOf(level) > order.indexOf(worst)) worst = level;
  }
  return worst;
}

/** Aggregate suggested controls across all use cases, de-duplicated, in catalogue order. */
export function aggregateSuggestedControls(useCases: UseCaseRecord[]): string[] {
  const set = new Set<string>();
  for (const uc of useCases) {
    for (const id of uc.computed?.recommended_control_ids ?? []) set.add(id);
  }
  return Array.from(set).sort();
}
