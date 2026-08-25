import Link from "next/link";
import {
  DEMO_CASE_STATUS,
  DEMO_CASE_TITLE,
} from "@/lib/content/intake-options";
import { CaseOverviewContent } from "@/components/proof-path/case-overview-content";
import { pp, StatusBadge } from "@/components/proof-path/shell";

export default async function CaseOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 style={{ fontSize: 23, margin: "0 0 6px" }}>{DEMO_CASE_TITLE}</h1>
      <div style={{ marginBottom: 20 }}>
        <StatusBadge>{DEMO_CASE_STATUS}</StatusBadge>
      </div>

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
          You haven&apos;t added evidence yet — a receipt or another proof of
          purchase would help before you contact Kmart.
        </div>
      </div>

      <CaseOverviewContent caseId={id} />
    </div>
  );
}
