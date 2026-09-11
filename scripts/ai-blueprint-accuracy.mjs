import assert from "node:assert/strict";
import { applyStrictReviewGates } from "../lib/ai-blueprint/assessment/strict-review.ts";
import {
  confirmedCanonicalValue,
  createEvidenceBoundPlanAction,
  verificationAction,
} from "../lib/ai-blueprint/assessment/plan-evidence.ts";

const useCase = (answers, status = "live") => ({
  use_case_id: "test",
  name: "test",
  linked_tool_ids: [],
  business_purpose: "test",
  team: "test",
  status,
  users_or_recipients: "test",
  answers,
});
const context = (orgAnswers = {}) => ({ orgAnswers, useCases: [], sectors: [] });
const base = {
  exposure_points: 0,
  control_gap_points: 0,
  exposure_band: "contained",
  gap_band: "supported",
  screening_flags: [],
  urgent_flags: [],
  draft_attention: "low",
  recommended_control_ids: [],
};

const reviewCases = [
  ["Q13 uncertain personal-data tool escalates U1", useCase({ Q12: ["personal_customer"], Q13_public_or_personal_tool: "not_sure" }), context(), "U1", true],
  ["Q13 known-safe tool does not add strict U1", useCase({ Q12: ["personal_customer"], Q13_public_or_personal_tool: "no" }), context(), "U1", false],
  ["Q14 decision inference high-impact + no review escalates U2", useCase({ Q14: "supports_action_decision", Q17: ["health_clinical_disability"] }), context({ Q22: "no_defined_review" }), "U2", true],
  ["Q14 stored record high-impact + after-use review escalates U2", useCase({ Q14: "stored_in_record", Q17: ["employment_recruitment_discipline"] }), context({ Q22: "sampled_after_use" }), "U2", true],
  ["Q14 before-use review does not add strict U2", useCase({ Q14: "stored_in_record", Q17: ["employment_recruitment_discipline"] }), context({ Q22: "before_use" }), "U2", false],
  ["Public high-impact + no transparency escalates U3", useCase({ Q15: "varied_with_escalation", Q17: ["health_clinical_disability"], Q16: "no" }), context({ Q27: "no", Q28: "formal_ai_process" }), "U3", true],
  ["Public high-impact + no redress escalates U3", useCase({ Q15: "narrow_script_takeover", Q17: ["essential_service_access"], Q16: "no" }), context({ Q27: "clear_notice", Q28: "no" }), "U3", true],
  ["Public high-impact + disclosure/redress does not add strict U3", useCase({ Q15: "varied_with_escalation", Q17: ["health_clinical_disability"], Q16: "no" }), context({ Q27: "clear_notice", Q28: "formal_ai_process" }), "U3", false],
  ["Vulnerable + high-impact no review evidence escalates U7", useCase({ Q18: ["people_with_disability"], Q17: ["essential_service_access"], Q18_detail: "needs considered" }), context(), "U7", true],
  ["Q18 narrative does not falsely clear U7", useCase({ Q18: ["children_young_people"], Q16: "determines", Q18_detail: "we considered children" }), context(), "U7", true],
  ["Customer-injected reviewer-looking field cannot clear U7", useCase({ Q18: ["children_young_people"], Q16: "determines", __impact_review_evidence_confirmed: true }), context(), "U7", true],
  ["High-impact sampled-after-use without subject review escalates U8", useCase({ Q17: ["legal_rights_justice"] }), context({ Q22: "sampled_after_use", Q24: ["accuracy_check"] }), "U8", true],
  ["High-impact with subject-matter review does not add strict U8", useCase({ Q17: ["legal_rights_justice"] }), context({ Q22: "no_defined_review", Q24: ["subject_matter_review"] }), "U8", false],
  ["Low-impact internal drafting remains un-escalated", useCase({ Q15: "no", Q16: "no", Q17: ["none"], Q18: ["no"], Q12: ["ordinary_internal"] }), context({ Q22: "before_use", Q27: "clear_notice", Q28: "formal_ai_process", Q24: ["subject_matter_review"] }), null, false],
  ["Housing public AI without transparency is caught", useCase({ Q15: "varied_with_escalation", Q17: ["housing_accommodation"], Q16: "recommendation" }), context({ Q27: "not_sure", Q28: "formal_ai_process" }), "U3", true],
  ["Education public AI without redress is caught", useCase({ Q15: "narrow_script_takeover", Q17: ["education_admission_assessment_discipline"], Q16: "recommendation" }), context({ Q27: "clear_notice", Q28: "not_sure" }), "U3", true],
  ["Safety information sampled after use escalates U8", useCase({ Q17: ["physical_safety_workplace_safety"] }), context({ Q22: "sampled_after_use", Q24: [] }), "U8", true],
  ["Sensitive high-impact inference with before-use review avoids strict U2", useCase({ Q12: ["sensitive"], Q14: "stored_in_record", Q17: ["health_clinical_disability"] }), context({ Q22: "before_use" }), "U2", false],
  ["No vulnerable group means strict U7 is not added", useCase({ Q18: ["no"], Q17: ["health_clinical_disability"] }), context(), "U7", false],
  ["Vulnerable but low-stakes non-decision use does not add strict U7", useCase({ Q18: ["people_with_disability"], Q17: ["none"], Q16: "no" }), context(), "U7", false],
];

let reviewPass = 0;
for (const [name, uc, ctx, flag, expected] of reviewCases) {
  const result = applyStrictReviewGates(uc, ctx, base);
  const actual = flag ? result.urgent_flags.includes(flag) : result.urgent_flags.length > 0;
  if (actual === expected) reviewPass += 1;
  else console.error("REVIEW FAIL", name, { expected, actual, result });
}

const planTests = [];
const testPlan = (name, fn) => planTests.push([name, fn]);

testPlan("confirmed canonical value requires source and confirmer", () => {
  assert.equal(confirmedCanonicalValue({ value: "Pol", source_question_ids: ["Q20"], review_status: "confirmed", confirmed_by: "reviewer" }), "Pol");
});
testPlan("uncertain canonical value cannot become fact", () => {
  assert.equal(confirmedCanonicalValue({ value: "Probably Sarah", source_question_ids: ["Q20"], review_status: "uncertain" }), null);
});
testPlan("confirmed value without source cannot become fact", () => {
  assert.equal(confirmedCanonicalValue({ value: "Sarah", source_question_ids: [], review_status: "confirmed", confirmed_by: "reviewer" }), null);
});
testPlan("confirmed value without confirmer cannot become fact", () => {
  assert.equal(confirmedCanonicalValue({ value: "Sarah", source_question_ids: ["Q20"], review_status: "confirmed" }), null);
});
testPlan("plan action rejects unsupported recommendation", () => {
  assert.throws(() => createEvidenceBoundPlanAction({ title: "Add oversight", rationale: "Needed", basis: "confirmed_gap", source_question_ids: [] }));
});
testPlan("unconfirmed owner becomes placeholder rather than invented owner", () => {
  const action = createEvidenceBoundPlanAction({
    title: "Confirm AI owner",
    rationale: "Q20 is uncertain",
    basis: "uncertainty",
    source_question_ids: ["Q20"],
    owner: { value: "Maybe Sarah", source_question_ids: ["Q20"], review_status: "uncertain" },
  });
  assert.equal(action.owner, null);
  assert.ok(action.completion_placeholders.includes("Confirm action owner"));
});
testPlan("confirmed owner is retained with provenance", () => {
  const action = createEvidenceBoundPlanAction({
    title: "Run quarterly review",
    rationale: "Existing control should be maintained",
    basis: "confirmed_gap",
    source_question_ids: ["Q22"],
    owner: { value: "AI Lead", source_question_ids: ["Q20"], review_status: "confirmed", confirmed_by: "reviewer" },
  });
  assert.equal(action.owner, "AI Lead");
});
testPlan("not-sure answer becomes verification action, not failure", () => {
  const action = verificationAction("Verify vendor retention settings", ["Q29"], "Retention/deletion terms were not confirmed");
  assert.equal(action.basis, "uncertainty");
  assert.match(action.rationale, /^Verify before treating as fact:/);
});

let planPass = 0;
for (const [name, fn] of planTests) {
  try {
    fn();
    planPass += 1;
  } catch (error) {
    console.error("PLAN FAIL", name, error);
  }
}

const reviewAccuracy = (reviewPass / reviewCases.length) * 100;
const planAccuracy = (planPass / planTests.length) * 100;
const totalPass = reviewPass + planPass;
const total = reviewCases.length + planTests.length;
const overallAccuracy = (totalPass / total) * 100;

console.log(JSON.stringify({
  review: { pass: reviewPass, total: reviewCases.length, accuracy: reviewAccuracy },
  planEvidence: { pass: planPass, total: planTests.length, accuracy: planAccuracy },
  overall: { pass: totalPass, total, accuracy: overallAccuracy },
}, null, 2));

assert.ok(reviewAccuracy >= 90, `Review-gate accuracy ${reviewAccuracy}% is below 90%`);
assert.ok(planAccuracy >= 90, `Plan-evidence accuracy ${planAccuracy}% is below 90%`);
