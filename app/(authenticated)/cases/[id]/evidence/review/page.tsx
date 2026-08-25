"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { EXTRACTION_FINDING } from "@/lib/content/intake-options";
import { caseHref, pp } from "@/components/proof-path/shell";

export default function EvidenceReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { confirmExtraction } = useDemoCase();

  const handleConfirm = () => {
    confirmExtraction();
    router.push(caseHref(id, "/evidence"));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 8px" }}>Check what we found</h1>
      <p
        style={{
          fontSize: 15,
          color: pp.muted,
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}
      >
        We found some possible information in your document. Please check it
        before we add it to your case.
      </p>

      <div
        style={{
          background: pp.card,
          border: `1px solid ${pp.border}`,
          boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: pp.subtle,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {EXTRACTION_FINDING.label}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
          {EXTRACTION_FINDING.value}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              flex: 1,
              background: pp.card,
              color: pp.accentDark,
              border: `1.5px solid ${pp.accent}`,
              borderRadius: 12,
              padding: 11,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Correct
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              background: "none",
              border: `1.5px solid ${pp.borderInput}`,
              borderRadius: 12,
              padding: 11,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Change
          </button>
        </div>
      </div>
      <p style={{ fontSize: 13, color: pp.subtle, margin: "0 0 24px" }}>
        {EXTRACTION_FINDING.footnote}
      </p>
    </div>
  );
}
