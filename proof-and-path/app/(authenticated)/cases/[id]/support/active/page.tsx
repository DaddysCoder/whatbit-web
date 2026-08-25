"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { PERMISSION_DEFS, SUPPORT_PERSON } from "@/lib/content/intake-options";
import { caseHref, pp } from "@/components/proof-path/shell";

export default function SupportActivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { permissions, togglePermission, revokeSupport } = useDemoCase();

  const handleRevoke = () => {
    revokeSupport();
    router.push(caseHref(id));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>Support access</h1>
      <p style={{ fontSize: 14, color: pp.subtle, margin: "0 0 20px" }}>
        {SUPPORT_PERSON.name} —{" "}
        <span style={{ color: "#2F6E4B", fontWeight: 600 }}>
          {SUPPORT_PERSON.status}
        </span>
      </p>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
        Permissions
      </div>
      {PERMISSION_DEFS.map((perm) => (
        <label
          key={perm.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            fontSize: 15,
          }}
        >
          <input
            type="checkbox"
            checked={permissions[perm.key]}
            onChange={() => togglePermission(perm.key)}
            style={{ width: 18, height: 18 }}
          />
          {perm.label}
        </label>
      ))}
      <div style={{ fontSize: 14, fontWeight: 600, margin: "20px 0 10px" }}>
        Activity
      </div>
      <div style={{ fontSize: 14, color: pp.muted, marginBottom: 24 }}>
        {SUPPORT_PERSON.lastActivity}
      </div>
      <button
        type="button"
        onClick={handleRevoke}
        style={{
          width: "100%",
          background: "none",
          border: `1.5px solid ${pp.danger}`,
          color: pp.danger,
          borderRadius: 12,
          padding: 13,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Revoke access
      </button>
    </div>
  );
}
