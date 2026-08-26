import type { Case, EvidenceItem } from "@/db/schema";
import { PROGRESS_LABELS } from "@/lib/content/intake-options";

const STATUS_LABELS: Record<string, string> = {
  understanding: "Understanding",
  gathering_evidence: "Gathering evidence",
  preparing: "Preparing request",
  acting: "Contacting business",
  tracking: "Tracking response",
  escalating: "Escalation options",
  closed: "Closed",
};

export function formatCaseStatus(status: string) {
  return STATUS_LABELS[status] ?? status.replace(/_/g, " ");
}

export function getNextStep(caseRecord: Case, evidence: EvidenceItem[]) {
  const missingNeeded = evidence.filter(
    (e) => e.level === "Needed" && e.status !== "confirmed",
  );
  if (missingNeeded.length > 0) {
    const template = missingNeeded[0];
    if (template.templateId === "receipt") return "Add proof of purchase";
    return `Add ${template.templateId}`;
  }
  if (caseRecord.status === "gathering_evidence") return "Review guidance";
  if (caseRecord.status === "preparing") return "Prepare correspondence";
  return "Continue your case";
}

export function getProgressSteps(currentIdx: number) {
  return PROGRESS_LABELS.map((label, i) => ({
    label,
    mark: i < currentIdx ? "✓" : i === currentIdx ? "→" : "○",
    color: i < currentIdx ? "#2F6E4B" : i === currentIdx ? "#1C2430" : "#9AA0A6",
  }));
}

export function progressIndexForCase(caseRecord: Case) {
  const map: Record<string, number> = {
    understand: 0,
    gather: 1,
    prepare: 2,
    act: 3,
    track: 4,
    escalate: 5,
  };
  return map[caseRecord.progressStep] ?? 1;
}

export function evidenceSummary(evidence: EvidenceItem[]) {
  const confirmed = evidence.filter((e) => e.status === "confirmed").length;
  const missingNeeded = evidence.filter(
    (e) => e.level === "Needed" && e.status !== "confirmed",
  ).length;
  return `${confirmed} confirmed, ${missingNeeded} needed missing`;
}

export function formatTimelineDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function whatHappensNext(caseRecord: Case, evidence: EvidenceItem[]) {
  const missingNeeded = evidence.filter(
    (e) => e.level === "Needed" && e.status !== "confirmed",
  );
  if (missingNeeded.length > 0) {
    const retailer = caseRecord.retailer ?? "the business";
    return `You haven't added evidence yet — a receipt or another proof of purchase would help before you contact ${retailer}.`;
  }
  return "Review your guidance and prepare a clear request when you're ready.";
}
