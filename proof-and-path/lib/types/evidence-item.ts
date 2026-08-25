export type EvidenceLevel = "Needed" | "Useful" | "Optional";

export type EvidenceStatus = "confirmed" | "missing" | "not_added";

export interface EvidenceItem {
  id: string;
  name: string;
  level: EvidenceLevel;
  why: string;
  status: EvidenceStatus;
}
