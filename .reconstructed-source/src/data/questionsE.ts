import type { QuestionDef } from "../types";

export const sectionE: QuestionDef[] = [
  {
    id: "Q25",
    section: "E",
    kind: "single_select",
    hasNotSure: true,
    prompt:
      "Are there clear rules about who may use AI, which tools they may use and what information they must not enter?",
    options: [
      { value: "yes_written_communicated", label: "Yes, written and communicated" },
      { value: "partly_in_draft", label: "Partly/in draft" },
      { value: "verbal_informal_only", label: "Verbal or informal only" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q25_access_controls",
        prompt: "Which access controls are in place?",
        kind: "multi_select",
        options: [
          { value: "org_accounts", label: "Organisation accounts" },
          { value: "mfa_sso", label: "MFA/SSO" },
          { value: "role_based_access", label: "Role-based access" },
          { value: "periodic_access_removal", label: "Periodic access removal" },
          { value: "logs_audit_trail", label: "Logs/audit trail" },
          { value: "none_not_sure", label: "None/not sure" },
        ],
        // Rule 8: shown when there's more than one user, or any sensitive
        // data anywhere in the assessment — evaluated at submit-time using
        // org size + tool/use-case data, so default to shown here and let
        // the UI wrapper decide (see AssessmentWizard).
      },
    ],
  },
  {
    id: "Q26",
    section: "E",
    kind: "single_select",
    hasNotSure: true,
    prompt: "What practical AI training have staff and contractors received?",
    options: [
      { value: "role_specific_with_records", label: "Role-specific training with records" },
      { value: "basic_for_everyone", label: "Basic training for everyone who uses AI" },
      { value: "informal_tips_only", label: "Informal tips only" },
      { value: "none", label: "None" },
      { value: "not_sure", label: "Not sure" },
      { value: "n_a_sole_operator", label: "Not applicable — sole operator" },
    ],
    followUps: [
      {
        id: "Q26_topics",
        prompt: "Which topics were covered?",
        kind: "multi_select",
        options: [
          { value: "data_privacy", label: "Data/privacy" },
          { value: "verification", label: "Verification" },
          { value: "bias", label: "Bias" },
          { value: "security_prompt_injection", label: "Security/prompt injection" },
          { value: "approved_tools", label: "Approved tools" },
          { value: "incidents", label: "Incidents" },
          { value: "human_oversight", label: "Human oversight" },
        ],
        showIf: (parent) =>
          ["role_specific_with_records", "basic_for_everyone"].includes(parent as string),
      },
    ],
  },
  {
    id: "Q27",
    section: "E",
    kind: "single_select",
    hasNotSure: true,
    prompt:
      "When people interact with AI, receive AI-generated content or are materially affected by AI-assisted decisions, are they told clearly?",
    options: [
      { value: "yes_consistently", label: "Yes, consistently and appropriately" },
      { value: "for_some_uses", label: "For some uses" },
      { value: "only_if_asked", label: "Only if asked" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
      { value: "not_applicable", label: "Not applicable" },
    ],
    followUps: [
      {
        id: "Q27_detail",
        prompt: "Describe the label/notice and where it appears.",
        kind: "long_text",
        maxLength: 800,
        showIf: (parent) => !["no", "not_applicable"].includes(parent as string),
      },
    ],
  },
  {
    id: "Q28",
    section: "E",
    kind: "single_select",
    hasNotSure: true,
    prompt:
      "Can affected people report a problem, question an AI-assisted outcome and receive a meaningful human response?",
    options: [
      { value: "yes_clear_process", label: "Yes, clear process with owner and response pathway" },
      { value: "general_complaints_only", label: "General complaints channel only" },
      { value: "informal_process", label: "Informal process" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
      { value: "not_applicable", label: "Not applicable" },
    ],
  },
];
