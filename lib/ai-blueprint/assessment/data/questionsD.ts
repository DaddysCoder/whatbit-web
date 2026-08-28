import type { QuestionDef } from "../types";

export const sectionD: QuestionDef[] = [
  {
    id: "Q20",
    section: "D",
    kind: "single_select",
    hasNotSure: true,
    prompt: "Is a senior person clearly accountable for how AI is used across the organisation?",
    options: [
      { value: "yes_named", label: "Yes, named and communicated" },
      { value: "yes_informally", label: "Yes, informally" },
      { value: "being_assigned", label: "Being assigned" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
    ],
    followUps: [
      {
        id: "Q20_name_role",
        prompt: "Name/role (optional)",
        kind: "short_text",
        maxLength: 120,
        showIf: (parent) => parent === "yes_named" || parent === "yes_informally",
      },
    ],
  },
  {
    id: "Q21",
    section: "D",
    kind: "single_select",
    hasNotSure: true,
    prompt: "Does each material AI system or use have a person responsible for its operation and outcomes?",
    options: [
      { value: "yes_documented_all", label: "Yes, documented for all" },
      { value: "for_some", label: "For some" },
      { value: "informally_only", label: "Informally only" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "Q22",
    section: "D",
    kind: "single_select",
    hasNotSure: true,
    prompt:
      "When AI output could affect a person, customer, safety, money, rights or an important business decision, when does a capable person review it?",
    options: [
      { value: "before_use", label: "Before it is used or acted on" },
      { value: "before_use_higher_impact_only", label: "Before use for higher-impact cases only" },
      { value: "sampled_after_use", label: "Sampled or checked after use" },
      { value: "only_when_concern_raised", label: "Only when a concern is raised" },
      { value: "no_defined_review", label: "No defined review" },
      { value: "not_applicable", label: "Not applicable" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "Q23",
    section: "D",
    kind: "compound",
    prompt: "Can an authorised person pause, override, roll back or safely stop each material AI use?",
    followUps: [
      {
        id: "Q23_override",
        prompt: "Override/stop capability",
        kind: "single_select",
        options: [
          { value: "yes_tested_understood", label: "Yes, tested and understood" },
          { value: "yes_not_tested", label: "Yes, but not tested/documented" },
          { value: "only_partly", label: "Only partly" },
          { value: "no", label: "No" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
      {
        id: "Q23_fallback",
        prompt: "Is there a workable non-AI fallback for critical functions?",
        kind: "single_select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "partly", label: "Partly" },
          { value: "no", label: "No" },
          { value: "not_applicable", label: "Not applicable" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "Q24",
    section: "D",
    kind: "multi_select",
    hasNotSure: true,
    prompt: "How are AI outputs checked before they are relied on?",
    options: [
      { value: "against_reliable_source", label: "Checked against reliable source material" },
      { value: "subject_matter_review", label: "Reviewed by a person with relevant subject knowledge" },
      { value: "calculations_independently_checked", label: "Calculations/data are independently checked" },
      { value: "citations_verified", label: "Citations/links are opened and verified" },
      { value: "bias_fairness_checked", label: "Bias/fairness is checked where people may be affected" },
      { value: "second_approval_higher_impact", label: "A second approval is required for higher-impact outputs" },
      { value: "documented_checklist", label: "A documented checklist is used" },
      { value: "only_informal", label: "Only informal checking" },
      { value: "no_regular_checking", label: "No regular checking" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
];
