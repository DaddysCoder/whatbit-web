import type { Case } from "@/db/schema";
import type { EvidenceItem } from "@/db/schema";

type DraftTone = "Neutral" | "Concise" | "Detailed";

function toneIntro(tone: DraftTone) {
  if (tone === "Concise") return "";
  if (tone === "Detailed") {
    return "I am writing to follow up on a purchase issue and would appreciate your assistance in resolving it.\n\n";
  }
  return "";
}

function toneClosing(tone: DraftTone) {
  if (tone === "Concise") return "Please advise.\n\nRegards,";
  if (tone === "Detailed") {
    return "I would appreciate a clear response about the next steps. Thank you for your time.\n\nKind regards,";
  }
  return "Could you please let me know how to proceed?\n\nRegards,";
}

export function generateDraftContent(
  caseRecord: Case,
  tone: string,
): string {
  const retailer = caseRecord.retailer ?? "the business";
  const item = caseRecord.item ?? "an item";
  const when = caseRecord.whenApprox ?? "recently";
  const outcome = caseRecord.desiredOutcome ?? "a resolution";
  const t = (tone as DraftTone) || "Neutral";

  const body =
    `${toneIntro(t)}` +
    `Dear ${retailer},\n\n` +
    `I purchased ${item} from your store ${when}. ${caseRecord.whatHappened ?? ""}\n\n` +
    `I would like to request ${outcome.toLowerCase()}.\n\n` +
    toneClosing(t);

  return body.trim();
}

export function getDraftMetadata(
  caseRecord: Case,
  evidence: EvidenceItem[],
) {
  const factsUsed: string[] = [];
  if (caseRecord.item) factsUsed.push("Item");
  if (caseRecord.retailer) factsUsed.push("Retailer");
  if (caseRecord.whenApprox) factsUsed.push("Approximate purchase date");
  if (caseRecord.desiredOutcome) factsUsed.push("Desired outcome");

  const missing: string[] = [];
  const receipt = evidence.find((e) => e.templateId === "receipt");
  const altproof = evidence.find((e) => e.templateId === "altproof");
  if (
    receipt?.status !== "confirmed" &&
    altproof?.status !== "confirmed"
  ) {
    missing.push("Proof of purchase — not yet confirmed");
  }

  return {
    factsUsed: factsUsed.join(", "),
    missing: missing.join("; ") || "None",
  };
}

export function getConfirmedFacts(caseRecord: Case) {
  return {
    item: caseRecord.item,
    retailer: caseRecord.retailer,
    when: caseRecord.whenApprox,
    outcome: caseRecord.desiredOutcome,
    whatHappened: caseRecord.whatHappened,
  };
}
