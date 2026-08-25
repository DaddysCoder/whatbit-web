"use client";

import Link from "next/link";
import { useDemoCase } from "@/lib/demo-case-context";
import { caseHref, pp } from "@/components/proof-path/shell";

export function CaseOverviewContent({ caseId }: { caseId: string }) {
  const { progressSteps, evidenceSummary, timelineSummary } = useDemoCase();
  const base = caseHref(caseId);

  return (
    <>
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
            <span style={{ fontWeight: 700 }}>{step.mark}</span>
            {step.label}
          </div>
        ))}
      </div>

      <SectionLink
        href={`${base}/evidence`}
        label="Evidence"
        summary={`${evidenceSummary} — View evidence →`}
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
        <FooterLink href={`${base}/support`}>Invite a support person</FooterLink>
        <FooterLink href={`${base}/export/success`}>
          Export case summary
        </FooterLink>
        <FooterLink href={`${base}/delete`} danger>
          Delete case
        </FooterLink>
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
  const parts = summary.split(" — ");
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
      <div style={{ fontSize: 15, color: accentOnly ? pp.accent : pp.ink }}>
        {accentOnly ? (
          <span style={{ fontWeight: 600 }}>{summary}</span>
        ) : (
          <>
            {parts[0]}
            {parts[1] ? (
              <>
                {" — "}
                <span style={{ color: pp.accent, fontWeight: 600 }}>
                  {parts[1]}
                </span>
              </>
            ) : null}
          </>
        )}
      </div>
    </Link>
  );
}

function FooterLink({
  href,
  children,
  danger,
}: {
  href: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        textAlign: "left",
        background: "none",
        border: "none",
        color: danger ? pp.danger : pp.accent,
        fontSize: 14,
        fontWeight: 600,
        padding: "2px 0",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}
