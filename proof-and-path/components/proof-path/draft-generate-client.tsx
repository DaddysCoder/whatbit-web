"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateDraftAction } from "@/lib/actions/app-actions";
import { DRAFT_STYLE_OPTIONS } from "@/lib/content/intake-options";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export function DraftGenerateClient({ caseId }: { caseId: string }) {
  const router = useRouter();
  const [draftStyle, setDraftStyle] = useState("Neutral");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    await generateDraftAction(caseId, draftStyle);
    router.push(caseHref(caseId, "/draft/review"));
  };

  if (generating) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: pp.muted }}>
          Preparing your draft using confirmed facts…
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: pp.accent, marginBottom: 6 }}>
        Prepare
      </div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>
        Ask the business to resolve the problem
      </h1>
      <p style={{ fontSize: 15, color: pp.muted, margin: "0 0 16px" }}>
        Choose a tone for the draft.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
        {DRAFT_STYLE_OPTIONS.map((label) => {
          const selected = draftStyle === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setDraftStyle(label)}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: `1.5px solid ${selected ? pp.accent : "#C9BFA9"}`,
                background: selected ? "#DCEFE7" : pp.warm,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <PrimaryButton onClick={handleGenerate} fullWidth>
        Generate draft
      </PrimaryButton>
    </div>
  );
}
