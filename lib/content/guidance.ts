export type GuidanceBlock = {
  tier: "source" | "app" | "decision";
  label: string;
  title?: string;
  body: string;
  source?: string;
  reviewed?: string;
  sourceLink?: string;
};

export const GUIDANCE_DISCLAIMER =
  "This is general information from the source shown above. Your circumstances may differ. Proof & Path cannot decide whether you are legally entitled to a particular outcome.";

export const DEMO_GUIDANCE_BLOCKS: GuidanceBlock[] = [
  {
    tier: "source",
    label: "Source information",
    title: "Returns without a receipt",
    body: "A business can still choose to accept other reasonable proof of purchase, such as a bank or card statement, packaging, or a loyalty account record.",
    source: "Australian consumer law guidance",
    reviewed: "March 2026",
    sourceLink: "#",
  },
  {
    tier: "app",
    label: "Proof & Path guidance",
    body: "Gathering an alternative proof of purchase before you contact Kmart may make your request easier to assess.",
  },
  {
    tier: "decision",
    label: "Your decision",
    body: "You decide what to send and when. This screen does not decide anything for you.",
  },
];
