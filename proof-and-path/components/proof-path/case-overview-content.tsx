"use client";

import Link from "next/link";
import { caseHref, pp } from "@/components/proof-path/shell";
import type { Case, EvidenceItem, TimelineEvent } from "@/db/schema";
import {
  evidenceSummary,
  getProgressSteps,
  progressIndexForCase,
  whatHappensNext,
} from "@/lib/services/case-presenters";

export function CaseOverviewContent({
  caseId,
  caseRecord,
  evidence,
  timeline,
}: {
  caseId: string;
  caseRecord: Case;
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
}) {
  const progressSteps = getProgressSteps(progressIndexForCase(caseRecord));
  const evSummary = evidenceSummary(evidence);
  const timelineSummary =
    timeline.length > 1
      ? `${timeline.length - 1} update${timeline.length > 2 ? "s" : ""}`
      : "No responses recorded yet";
  const base = caseHref(caseId);

  return (
    <>
      <div
        style={{
          background: pp.card,
          border: `1px solid ${pp.border}`,
          boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            color: pp.subtle,
            marginBottom: 8,
          }}
        >
          What happens next
        </div>
        <div style={{ fontSize: 15, color: pp.ink, lineHeight: 1.5 }}>
          {whatHappensNext(caseRecord, evidence)}
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            color: pp.subtle,
            marginBottom: 10,
          }}
        >
          Your progress
        </div>
        {progressSteps.map((step) => (
          <div
            key={step.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 0",
              fontSize: 15,
              color: step.color,
            }}
          >
            <span style={{ fontWeight: 700 }} aria-hidden="true">
              {step.mark}
            </span>
            <span className="sr-only">
              {step.mark === "✓"
                ? "Completed: "
                : step.mark === "→"
                  ? "Current step: "
                  : "Upcoming: "}
            </span>
            {step.label}
          </div>
        ))}
      </div>

      <SectionLink
        href={`${base}/evidence`}
        label="Evidence"
        summary={`${evSummary} — View evidence →`}
      />
      <SectionLink
        href={`${base}/guidance`}
        label="Guidance"
        summary="View current guidance →"
        accentOnly
      />
      <SectionLink
        href={`${base}/draft`}
        label="Correspondence"
        summary="Prepare a request →"
        accentOnly
      />
      <SectionLink
        href={`${base}/timeline`}
        label="Timeline"
        summary={`${timelineSummary} — View timeline →`}
      />
      <SectionLink
        href={`${base}/escalation`}
        label="Escalation"
        summary="View escalation options →"
        accentOnly
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderTop: `1px solid ${pp.border}`,
          paddingTop: 16,
        }}
      >
        <Link
          href={`${base}/support`}
          style={{
            textAlign: "left",
            color: pp.accent,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Invite a support person
        </Link>
        <a
          href={`/api/export/${caseId}`}
          style={{
            textAlign: "left",
            color: pp.accent,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Export case summary
        </a>
        <Link
          href={`${base}/delete`}
          style={{
            textAlign: "left",
            color: pp.danger,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Delete case
        </Link>
      </div>
    </>
  );
}

function SectionLink({
  href,
  label,
  summary,
  accentOnly,
}: {
  href: string;
  label: string;
  summary: string;
  accentOnly?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: pp.card,
        border: `1px solid ${pp.border}`,
        boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        textDecoration: "none",
        color: pp.ink,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          color: pp.subtle,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 15,
          color: accentOnly ? pp.accent : pp.ink,
          fontWeight: accentOnly ? 600 : 400,
        }}
      >
        {summary}
      </div>
    </Link>
  );
}
