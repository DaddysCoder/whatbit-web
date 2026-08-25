import Link from "next/link";
import { caseHref, pp } from "@/components/proof-path/shell";

export default async function DeleteCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1
        style={{
          fontSize: 22,
          margin: "0 0 12px",
          color: pp.danger,
        }}
      >
        Delete this case?
      </h1>
      <p
        style={{
          fontSize: 15,
          color: pp.muted,
          margin: "0 0 20px",
          lineHeight: 1.55,
        }}
      >
        Deleting this case removes it from your account. Download a copy first
        if you may need it later.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Link
          href={caseHref(id, "/export/success")}
          style={{
            background: "none",
            border: `1.5px solid ${pp.borderInput}`,
            borderRadius: 12,
            padding: 14,
            fontSize: 15,
            fontWeight: 600,
            textAlign: "center",
            textDecoration: "none",
            color: pp.ink,
          }}
        >
          Export first
        </Link>
        <Link
          href="/dashboard"
          style={{
            background: pp.danger,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: 14,
            fontSize: 15,
            fontWeight: 600,
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Delete case
        </Link>
        <Link
          href={caseHref(id)}
          style={{
            background: "none",
            border: "none",
            color: pp.subtle,
            fontSize: 14,
            textAlign: "center",
            textDecoration: "none",
            padding: 8,
          }}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
