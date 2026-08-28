import type { QuestionDef } from "../types";

// Section C — repeated once per material use case (Q10–Q19).
// `visibleIf(orgAnswers, useCaseAnswers)` implements spec §5 branching.
// Non-public/non-"none" check used by rules 2 and 3.
const Q12_DATA_TOUCHES_ANYTHING_SENSITIVE = (uc: Record<string, unknown> = {}) => {
  const v = (uc["Q12"] as string[] | undefined) ?? [];
  const onlyPublicOrNone = v.every((x) => x === "public" || x === "none");
  return v.length > 0 && !onlyPublicOrNone;
};

const Q12_HAS_PERSONAL_OR_SENSITIVE = (uc: Record<string, unknown> = {}) => {
  const v = (uc["Q12"] as string[] | undefined) ?? [];
  return v.some((x) =>
    ["personal_customer", "personal_worker", "sensitive", "financial", "children"].includes(x),
  );
};

export const sectionC: QuestionDef[] = [
  {
    id: "Q10",
    section: "C",
    perUseCase: true,
    kind: "compound",
    prompt: "How often and at what scale is this AI use expected to operate?",
    followUps: [
      {
        id: "Q10_frequency",
        prompt: "Frequency",
        kind: "single_select",
        options: [
          { value: "rarely_one_off", label: "Rarely/one-off" },
          { value: "monthly", label: "Monthly" },
          { value: "weekly", label: "Weekly" },
          { value: "daily", label: "Daily" },
          { value: "continuously_automatically", label: "Continuously/automatically" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
      {
        id: "Q10_reach",
        prompt: "Reach per month",
        kind: "single_select",
        options: [
          { value: "internal_lt10", label: "Internal only, fewer than 10 people" },
          { value: "10_99", label: "10–99 people/items" },
          { value: "100_999", label: "100–999" },
          { value: "1000_plus", label: "1,000+" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "Q11",
    section: "C",
    perUseCase: true,
    kind: "multi_select",
    prompt: "What can the AI do in this use?",
    options: [
      { value: "draft_for_review", label: "Create a draft for a person to review" },
      { value: "summarise_classify_rank", label: "Summarise/classify/rank information" },
      { value: "recommend_outcome", label: "Recommend an outcome or next step" },
      { value: "communicate_directly", label: "Communicate directly with people" },
      { value: "update_records", label: "Update records or systems" },
      {
        value: "transactions",
        label: "Make bookings, purchases, payments or other transactions",
      },
      { value: "trigger_other_system", label: "Trigger another system or tool" },
      { value: "browse_retrieve", label: "Browse the internet or retrieve external content" },
      {
        value: "open_ended_multi_purpose",
        label: "Operate through open-ended instructions for more than one purpose",
      },
      { value: "none_other", label: "None of these/other" },
    ],
    followUps: [
      {
        id: "Q11_preapproval",
        prompt: "Does it act before a person approves the specific output or action?",
        kind: "single_select",
        options: [
          { value: "never", label: "Never" },
          { value: "sometimes", label: "Sometimes" },
          { value: "usually_always", label: "Usually/always" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "Q12",
    section: "C",
    perUseCase: true,
    kind: "multi_select",
    hasNotSure: true,
    prompt:
      "What information can the AI access, receive in prompts, recordings or files, or create as output?",
    options: [
      { value: "public", label: "Public information" },
      { value: "internal_ordinary", label: "Ordinary internal business information" },
      {
        value: "confidential_ip",
        label: "Commercially confidential information or intellectual property",
      },
      { value: "personal_customer", label: "Personal information about customers/clients" },
      { value: "personal_worker", label: "Personal information about workers/applicants" },
      {
        value: "sensitive",
        label:
          "Sensitive information (e.g. health, disability, biometric, racial or ethnic origin, political/religious beliefs, sexual orientation or criminal-record information)",
      },
      { value: "financial", label: "Financial/account/payment details" },
      { value: "children", label: "Children's information" },
      { value: "credentials", label: "Passwords, API keys or security credentials" },
      { value: "none", label: "None" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "Q13",
    section: "C",
    perUseCase: true,
    kind: "multi_select",
    hasNotSure: true,
    prompt: "Which safeguards apply before this information is used with AI?",
    // Rule 2: show when Q12 has anything other than public/none.
    visibleIf: (_o, uc) => Q12_DATA_TOUCHES_ANYTHING_SENSITIVE(uc),
    options: [
      { value: "deidentified", label: "Identifying details are removed or replaced" },
      { value: "minimum_necessary", label: "Only the minimum necessary information is used" },
      { value: "tool_approved_for_data", label: "The tool is approved for this data" },
      {
        value: "contract_restricts_training",
        label: "A contract or enterprise setting restricts provider use/training",
      },
      { value: "role_based_access", label: "Access is limited by role" },
      {
        value: "notified_or_consent",
        label: "The person has been notified or consent obtained where required",
      },
      { value: "privacy_security_review", label: "A privacy/security review was completed" },
      { value: "staff_told_not_to_enter", label: "Staff are told not to enter this category" },
      { value: "other", label: "Other" },
      { value: "none", label: "None" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q13_public_or_personal_tool",
        prompt:
          "Is any personal or sensitive information entered into a publicly available or personal-account AI tool?",
        kind: "single_select",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "Q14",
    section: "C",
    perUseCase: true,
    kind: "single_select",
    hasNotSure: true,
    prompt: "Does the AI collect, create, predict or infer information about an identifiable person?",
    // Rule 3: show when Q12 includes personal/worker/sensitive/financial/children, or Q16 concerns people.
    visibleIf: (_o, uc) =>
      Q12_HAS_PERSONAL_OR_SENSITIVE(uc) ||
      ["recommendation", "rank_shortlist", "determines"].includes(
        (uc?.["Q16"] as string) ?? "",
      ) ||
      (uc?.["Q16"] as string) === "not_sure",
    options: [
      { value: "no", label: "No" },
      { value: "low_impact_only", label: "Yes, but only low-impact drafts/inferences" },
      { value: "supports_action_decision", label: "Yes, used to support an action or decision" },
      { value: "stored_in_record", label: "Yes, stored as part of the person's record" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q14_detail",
        prompt: "What is inferred/created, where is it stored and how is accuracy checked?",
        kind: "long_text",
        maxLength: 800,
        showIf: (parent) => parent !== "no",
      },
    ],
  },
  {
    id: "Q15",
    section: "C",
    perUseCase: true,
    kind: "single_select",
    hasNotSure: true,
    prompt:
      "Does a customer, client, worker or member of the public interact directly with this AI or receive its unreviewed content?",
    options: [
      { value: "no", label: "No" },
      {
        value: "narrow_script_takeover",
        label: "Yes, but only within a narrow script and a person can take over",
      },
      {
        value: "varied_with_escalation",
        label: "Yes, it generates varied answers with a clear human escalation path",
      },
      {
        value: "varied_without_escalation",
        label: "Yes, it generates varied answers without reliable human escalation",
      },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q15_detail",
        prompt: "Briefly describe how a person can take over, or how the escalation path works.",
        kind: "long_text",
        maxLength: 800,
        // Rule 4: show follow-up text only when the answer is not "No".
        showIf: (parent) => parent !== "no",
      },
    ],
  },
  {
    id: "Q16",
    section: "C",
    perUseCase: true,
    kind: "single_select",
    hasNotSure: true,
    prompt: "Does this AI make, recommend, rank or materially influence decisions about people?",
    options: [
      { value: "no", label: "No" },
      { value: "admin_no_influence", label: "Administrative support only, with no material influence" },
      { value: "recommendation", label: "It gives a recommendation that a person reviews before deciding" },
      { value: "rank_shortlist", label: "It ranks, shortlists or prioritises people" },
      { value: "determines", label: "It normally determines the outcome" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q16_detail",
        prompt: "Describe the decision, the decision-maker and the evidence reviewed.",
        kind: "long_text",
        maxLength: 800,
        // Rule 5: show when recommendation, ranking, determination or unsure.
        showIf: (parent) =>
          ["recommendation", "rank_shortlist", "determines", "not_sure"].includes(
            parent as string,
          ),
      },
    ],
  },
  {
    id: "Q17",
    section: "C",
    perUseCase: true,
    kind: "multi_select",
    hasNotSure: true,
    prompt: "Could this use affect any of the following?",
    options: [
      { value: "health_clinical_disability", label: "Health, clinical care or disability support" },
      { value: "physical_workplace_safety", label: "Physical safety or workplace safety" },
      {
        value: "employment_recruitment_discipline",
        label: "Employment, recruitment, performance or discipline",
      },
      { value: "credit_insurance_financial", label: "Credit, insurance, payment or financial position" },
      { value: "legal_rights_justice", label: "Legal rights or access to justice" },
      {
        value: "essential_service_access",
        label: "Eligibility, priority or access to an essential/public/community service",
      },
      { value: "education", label: "Education admission, assessment or discipline" },
      { value: "housing", label: "Housing/accommodation" },
      { value: "reputation_opportunities", label: "Reputation or important opportunities" },
      { value: "none", label: "No material impact expected" },
      { value: "not_sure", label: "Not sure" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "Q18",
    section: "C",
    perUseCase: true,
    kind: "multi_select",
    hasNotSure: true,
    prompt:
      "Could this use affect people who may face greater difficulty understanding, avoiding or challenging the outcome?",
    options: [
      { value: "children_young_people", label: "Children/young people" },
      { value: "older_people", label: "Older people" },
      { value: "people_with_disability", label: "People with disability" },
      {
        value: "limited_english_digital_access",
        label: "People with limited English or digital access",
      },
      {
        value: "atsi_communities",
        label: "Aboriginal or Torres Strait Islander peoples/communities",
      },
      {
        value: "financial_hardship_crisis",
        label: "People experiencing financial hardship, crisis or dependency on a service",
      },
      { value: "other_vulnerable_group", label: "Other vulnerable, marginalised or underrepresented group" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q18_detail",
        prompt: "Which group, and how were their needs considered?",
        kind: "long_text",
        maxLength: 800,
        // Rule 6: show when any group or "Not sure" is selected.
        showIf: (parent) => {
          const v = (parent as string[] | undefined) ?? [];
          return v.some((x) => x !== "no");
        },
      },
    ],
  },
  {
    id: "Q19",
    section: "C",
    perUseCase: true,
    kind: "single_select",
    hasNotSure: true,
    prompt: "If the AI is wrong or behaves unexpectedly, how serious and reversible could the effect be?",
    options: [
      { value: "minor_easy_correct", label: "Minor and easy to correct before anyone is affected" },
      {
        value: "noticeable_readily_corrected",
        label: "Noticeable but readily corrected with little lasting effect",
      },
      {
        value: "material_effect",
        label: "Material effect requiring time, money or formal correction",
      },
      {
        value: "serious_hard_to_reverse",
        label: "Serious, hard to reverse or difficult to provide redress",
      },
      { value: "not_sure", label: "Not sure" },
    ],
    // Rule 7: show contestability whenever Q15/Q16/Q17/Q18 indicate people may be affected.
    followUps: [
      {
        id: "Q19_contestability",
        prompt: "Can an affected person question the use or outcome and reach a person?",
        kind: "single_select",
        options: [
          { value: "yes_clearly", label: "Yes, clearly" },
          { value: "sometimes_indirectly", label: "Sometimes/indirectly" },
          { value: "no", label: "No" },
          { value: "not_sure", label: "Not sure" },
          { value: "not_applicable", label: "Not applicable" },
        ],
      },
    ],
  },
];

/** Whether people may plausibly be affected by this use case (drives Q19 contestability + reviewer prompts). */
export function peopleMayBeAffected(uc: Record<string, unknown> = {}): boolean {
  const q15 = uc["Q15"] as string | undefined;
  const q16 = uc["Q16"] as string | undefined;
  const q17 = (uc["Q17"] as string[] | undefined) ?? [];
  const q18 = (uc["Q18"] as string[] | undefined) ?? [];
  const q15Affects = !!q15 && q15 !== "no";
  const q16Affects = !!q16 && !["no", "admin_no_influence"].includes(q16);
  const q17Affects = q17.some((x) => x !== "none");
  const q18Affects = q18.some((x) => x !== "no");
  return q15Affects || q16Affects || q17Affects || q18Affects;
}
