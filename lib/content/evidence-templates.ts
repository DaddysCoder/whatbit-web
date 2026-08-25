export type EvidenceLevel = "Needed" | "Useful" | "Optional";

export type EvidenceId =
  | "receipt"
  | "altproof"
  | "photo"
  | "tag"
  | "correspondence";

export type EvidenceTemplate = {
  id: EvidenceId;
  name: string;
  level: EvidenceLevel;
  why: string;
};

export const EVIDENCE_TEMPLATES: EvidenceTemplate[] = [
  {
    id: "receipt",
    name: "Receipt or order confirmation",
    level: "Needed",
    why: "Shows what you bought, when, and from where.",
  },
  {
    id: "altproof",
    name: "Alternative proof of purchase (bank statement, packaging, loyalty account)",
    level: "Needed",
    why: "Can help show your purchase even without a receipt.",
  },
  {
    id: "photo",
    name: "Photo of the item",
    level: "Useful",
    why: "Shows the item and the size issue.",
  },
  {
    id: "tag",
    name: "Photo of the size label or tag",
    level: "Useful",
    why: "Confirms the size you received.",
  },
  {
    id: "correspondence",
    name: "Previous messages with the store",
    level: "Optional",
    why: "Useful if you've already contacted Kmart about this.",
  },
];

export const EVIDENCE_BANNER_COPY =
  "A receipt can help, but it may not be the only way to show what you bought.";

export const DEMO_EVIDENCE_INITIAL = {
  photo: true,
  tag: true,
  receipt: false,
  altproof: false,
  correspondence: false,
} as const;
