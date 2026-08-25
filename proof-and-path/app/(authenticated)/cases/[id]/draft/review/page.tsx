"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export default function DraftReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { draftText, setDraftText, confirmDraft } = useDemoCase();

  const handleConfirm = () => {
    confirmDraft();
    router.push(caseHref(id));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>Review your draft</h1>
      <p style={{ fontSize: 14, color: pp.subtle, margin: "0 0 16px" }}>
        Nothing is sent from here. Copy, print or export when you&apos;re ready.
      </p>

      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            background: "#DCEFE7",
            color: pp.accentDark,
            padding: "3px 10px",
            borderRadius: 999,
          }}
        >
          AI-assisted
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            background: "#EEF3F0",
            color: "#2F6E4B",
            padding: "3px 10px",
            borderRadius: 999,
          }}
        >
          Editable
        </span>
      </div>

      <textarea
        value={draftText}
        onChange={(e) => setDraftText(e.target.value)}
        rows={10}
        style={{
          width: "100%",
          padding: 14,
          fontSize: 15,
          border: `1.5px solid ${pp.borderInput}`,
          borderRadius: 12,
          marginBottom: 16,
          lineHeight: 1.5,
          resize: "vertical",
        }}
      />

      <div
        style={{
          background: pp.card,
          border: `1px solid ${pp.border}`,
          boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: pp.subtle,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Facts used
        </div>
        <div style={{ fontSize: 14, color: pp.muted, marginBottom: 10 }}>
          Item, retailer, approximate purchase date, desired outcome
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#8A5A16",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Missing information
        </div>
        <div style={{ fontSize: 14, color: pp.muted }}>
          Proof of purchase — not yet confirmed
        </div>
      </div>

      <PrimaryButton onClick={handleConfirm} fullWidth>
        Confirm draft
      </PrimaryButton>
    </div>
  );
}
