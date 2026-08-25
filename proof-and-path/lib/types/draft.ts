export type DraftTone = "Neutral" | "Concise" | "Detailed";

export type DraftStatus = "draft" | "confirmed";

export interface Draft {
  id: string;
  text: string;
  tone: DraftTone;
  status: DraftStatus;
  factsUsed?: string[];
  missingInfo?: string[];
}
