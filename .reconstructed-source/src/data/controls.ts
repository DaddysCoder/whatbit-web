export interface ControlDef {
  id: string;
  name: string;
  triggeredMainlyBy: string;
  documentDestination: string;
}

// Spec §8 — Recommended control catalogue. Stable IDs so the report/document
// pipeline can consume `recommended_control_ids` without re-deriving them
// from raw answers.
export const CONTROLS: ControlDef[] = [
  { id: "C01", name: "Appoint overall responsible-AI owner", triggeredMainlyBy: "Q20 gap", documentDestination: "AI Policy; Responsibility Schedule" },
  { id: "C02", name: "Assign owner for every material AI system/use", triggeredMainlyBy: "Q09, Q21", documentDestination: "AI Register; Role Schedule" },
  { id: "C03", name: "Written acceptable-use and prohibited-use rules", triggeredMainlyBy: "Q07, Q25, Q34", documentDestination: "AI Acceptable Use Policy; Staff Guide" },
  { id: "C04", name: "Complete AI tool and use-case register", triggeredMainlyBy: "Q06, Q08–Q09, Q34", documentDestination: "AI Register" },
  { id: "C05", name: "Use-case screening and stakeholder impact assessment", triggeredMainlyBy: "Q16–Q19, S4–S6", documentDestination: "Risk/Impact Assessment" },
  { id: "C06", name: "Data-input classification and minimisation rules", triggeredMainlyBy: "Q12–Q13, Q30", documentDestination: "Data Handling Standard; Staff Guide" },
  { id: "C07", name: "Privacy review / PIA and notices where relevant", triggeredMainlyBy: "Q12–Q14, Q27, Q29", documentDestination: "Privacy Review Checklist; Notice Update Brief" },
  { id: "C08", name: "Purpose and scope boundaries for each use", triggeredMainlyBy: "Q09–Q11", documentDestination: "AI Register; Use-Case Card" },
  { id: "C09", name: "Approved tools/accounts/access list", triggeredMainlyBy: "Q06–Q07, Q25", documentDestination: "Approved AI Tools Register" },
  { id: "C10", name: "Vendor due diligence and contract checks", triggeredMainlyBy: "Q13, Q29", documentDestination: "Vendor Review Checklist" },
  { id: "C11", name: "AI security baseline", triggeredMainlyBy: "Q12–Q13, Q25, Q30", documentDestination: "Security Addendum; Access Checklist" },
  { id: "C12", name: "Meaningful human review and approval thresholds", triggeredMainlyBy: "Q11, Q15–Q17, Q22", documentDestination: "Human Oversight Procedure" },
  { id: "C13", name: "Intervention, override and emergency-stop process", triggeredMainlyBy: "Q11, Q23", documentDestination: "Human Oversight Procedure; Incident Plan" },
  { id: "C14", name: "Output verification and acceptance criteria", triggeredMainlyBy: "Q14, Q16, Q24, Q31", documentDestination: "Output Verification Checklist; Test Plan" },
  { id: "C15", name: "Transparent AI interaction/content/decision notices", triggeredMainlyBy: "Q15–Q16, Q27", documentDestination: "Transparency Statement; Notice Copy Brief" },
  { id: "C16", name: "Challenge, complaints, escalation and redress", triggeredMainlyBy: "Q15–Q19, Q28", documentDestination: "Complaints/Contestability Procedure" },
  { id: "C17", name: "Records identify AI-generated/inferred information and provenance", triggeredMainlyBy: "Q14, Q24, Q34", documentDestination: "Recordkeeping Standard; AI Register" },
  { id: "C18", name: "Role-based AI literacy and refresher training", triggeredMainlyBy: "Q20, Q24–Q26", documentDestination: "Training Plan; Staff Guide" },
  { id: "C19", name: "AI incident reporting, containment and learning", triggeredMainlyBy: "Q30, Q33–Q34", documentDestination: "AI Incident Response Procedure; Incident Log" },
  { id: "C20", name: "Pre-deployment testing and ongoing monitoring", triggeredMainlyBy: "Q10, Q24, Q31–Q32", documentDestination: "Test & Monitoring Plan; Review Log" },
  { id: "C21", name: "Non-AI fallback and continuity plan", triggeredMainlyBy: "Q23", documentDestination: "Continuity Addendum" },
  { id: "C22", name: "Agent/action constraints", triggeredMainlyBy: "Q11, U4", documentDestination: "Agent Controls Schedule" },
];

export function controlName(id: string): string {
  return CONTROLS.find((c) => c.id === id)?.name ?? id;
}
