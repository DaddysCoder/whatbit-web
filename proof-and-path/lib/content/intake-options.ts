export const PRODUCT_SERVICE_OPTIONS = ["Product", "Service", "I'm not sure"] as const;

export const OUTCOME_OPTIONS = [
  "Refund",
  "Repair",
  "Replacement",
  "Service fixed/repeated",
  "Cancellation",
  "Information only",
  "I'm not sure",
  "Something else",
] as const;

export const DRAFT_STYLE_OPTIONS = ["Neutral", "Concise", "Detailed"] as const;

export type DraftStyle = (typeof DRAFT_STYLE_OPTIONS)[number];

export const PERMISSION_DEFS = [
  { key: "view" as const, label: "View case" },
  { key: "edit" as const, label: "Add/edit information" },
  { key: "upload" as const, label: "Upload evidence" },
  { key: "export" as const, label: "Export" },
];

export const DEMO_CASE_TITLE = "Wrong size — jeans, Kmart";
export const DEMO_CASE_STATUS = "Gathering evidence";
export const DEMO_CASE_ID = "demo";
export const DEMO_REMINDER = "Follow up with Kmart — due Friday 28 August";
export const DEMO_DUE_DATE = "Friday 28 August";
export const DEMO_NEXT_STEP = "Add proof of purchase";

export const PROGRESS_LABELS = [
  "Understand the problem",
  "Gather evidence",
  "Prepare request",
  "Contact business",
  "Track response",
  "Escalate if needed",
] as const;

export const DEMO_DRAFT_TEXT = `Dear Kmart,

I purchased a pair of jeans from your store on or around 5 August 2026. Unfortunately the size is incorrect and I no longer have the receipt.

I would like to request a replacement in the correct size.

Could you please let me know how to proceed?

Regards,`;

export const EXTRACTION_FINDING = {
  label: "We found a possible purchase date",
  value: "12 June 2026",
  footnote:
    "Check this against your document. We won't treat it as confirmed until you do.",
};

export const SUPPORT_PERSON = {
  name: "Jamie Lin",
  status: "Active",
  lastActivity: "Viewed the case on 24 August.",
};
