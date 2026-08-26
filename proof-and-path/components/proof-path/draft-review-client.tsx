"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveDraftAction } from "@/lib/actions/app-actions";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export function DraftReviewClient({
  caseId,
  initialContent,
  tone,
  factsUsed,
  missing,
}: {
  caseId: string;
  initialContent: string;
  tone: string;
  factsUsed: string;
  missing: string;
}) {
  const router = useRouter();
  const [draftText, setDraftText] = useState(initialContent);

  const handleConfirm = async () => {
    await saveDraftAction(caseId, tone, draftText, true);
    router.push(caseHref(caseId));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>Review your draft</h1>
      <p style={{ fontSize: 14, color: pp.subtle, margin: "0 0 16px" }}>
        Nothing is sent from here. Copy, print or export when you&apos;re ready.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={tagStyle("#DCEFE7", pp.accentDark)}>AI-assisted</span>
        <span style={tagStyle("#EEF3F0", "#2F6E4B")}>Editable</span>
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
        <div style={metaLabelStyle}>Facts used</div>
        <div style={{ fontSize: 14, color: pp.muted, marginBottom: 10 }}>{factsUsed}</div>
        <div style={{ ...metaLabelStyle, color: "#8A5A16" }}>Missing information</div>
        <div style={{ fontSize: 14, color: pp.muted }}>{missing}</div>
      </div>

      <PrimaryButton onClick={handleConfirm} fullWidth>
        Confirm draft
      </PrimaryButton>
    </div>
  );
}

function tagStyle(bg: string, color: string) {
  return {
    fontSize: 12,
    fontWeight: 700,
    background: bg,
    color,
    padding: "3px 10px",
    borderRadius: 999,
  } as const;
}

const metaLabelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: pp.subtle,
  textTransform: "uppercase" as const,
  marginBottom: 6,
};
