export type CaseStatus =
  | "draft"
  | "understanding"
  | "gathering_evidence"
  | "preparing"
  | "acting"
  | "tracking"
  | "escalating"
  | "closed";

export type ProductServiceType = "product" | "service" | "unsure";

export type CaseProgressStep =
  | "understand"
  | "gather"
  | "prepare"
  | "act"
  | "track"
  | "escalate";

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  statusLabel: string;
  productServiceType?: ProductServiceType;
  item?: string;
  retailer?: string;
  when?: string;
  method?: string;
  location?: string;
  whatHappened?: string;
  outcome?: string;
  intakeStep?: number;
  currentProgressStep: CaseProgressStep;
  nextAction?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
