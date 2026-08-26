import Link from "next/link";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export default async function ExportSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#EEF3F0",
          color: "#2F6E4B",
          fontSize: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
        }}
        aria-hidden
      >
        ✓
      </div>
      <h1 style={{ fontSize: 21, margin: "0 0 8px" }}>Case summary ready</h1>
      <p style={{ fontSize: 15, color: pp.muted, margin: "0 0 16px" }}>
        Your case facts, evidence index, draft and timeline have been prepared as a PDF.
      </p>
      <a
        href={`/api/export/${id}`}
        style={{
          display: "inline-block",
          marginBottom: 16,
          color: pp.accent,
          fontWeight: 600,
        }}
      >
        Download PDF
      </a>
      <div>
        <PrimaryButton href={caseHref(id)}>Back to case</PrimaryButton>
      </div>
    </div>
  );
}
