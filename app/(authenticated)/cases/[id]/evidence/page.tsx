"use client";

import Link from "next/link";
import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { EVIDENCE_BANNER_COPY } from "@/lib/content/evidence-templates";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export default function EvidencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getEvidenceItems } = useDemoCase();
  const evidenceItems = getEvidenceItems();

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>Evidence</h1>
      <p style={{ fontSize: 15, color: pp.muted, margin: "0 0 20px" }}>
        Here&apos;s what could help with this case.
      </p>

      <div
        style={{
          background: "#FCF1DF",
          border: "1px solid #E9CE99",
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 20,
          fontSize: 14,
          color: "#6B4A16",
          lineHeight: 1.5,
        }}
      >
        {EVIDENCE_BANNER_COPY}
      </div>

      {evidenceItems.map((ev) => (
        <div
          key={ev.id}
          style={{
            border: `1px solid ${pp.border}`,
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 10,
            background: pp.warm,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15 }}>{ev.name}</div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: pp.subtle,
                whiteSpace: "nowrap",
              }}
            >
              {ev.level}
            </div>
          </div>
          <div style={{ fontSize: 14, color: pp.muted, marginBottom: 10 }}>
            {ev.why}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 999,
                background: ev.statusBg,
                color: ev.statusColor,
              }}
            >
              {ev.statusLabel}
            </span>
            {!ev.confirmed ? (
              <Link
                href={caseHref(id, "/evidence/upload")}
                style={{
                  background: "none",
                  border: `1.5px solid ${pp.accent}`,
                  color: pp.accent,
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Add
              </Link>
            ) : null}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <PrimaryButton href={caseHref(id, "/evidence/upload")} fullWidth>
          Add evidence
        </PrimaryButton>
      </div>
    </div>
  );
}
