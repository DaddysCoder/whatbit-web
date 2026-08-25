export type EscalationPathway = {
  name: string;
  desc: string;
  source: string;
};

export const ESCALATION_PATHWAYS: EscalationPathway[] = [
  {
    name: "State or territory consumer affairs office",
    desc: "Can provide information and, in some cases, help resolve disputes with a business.",
    source: "Your state/territory consumer affairs office",
  },
  {
    name: "Australian Competition and Consumer Commission (ACCC)",
    desc: "Regulates consumer guarantees nationally; does not resolve individual disputes.",
    source: "accc.gov.au",
  },
];

export const ESCALATION_DISCLAIMER =
  "This is general information, not an assessment of your case. These organisations decide independently whether and how they can help.";

export const ESCALATION_INTRO =
  "The business hasn't resolved this yet. Here are organisations that may be able to help.";
