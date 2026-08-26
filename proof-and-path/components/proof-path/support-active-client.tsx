"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  revokeSupportAction,
  updateSupportPermissionsAction,
} from "@/lib/actions/app-actions";
import { PERMISSION_DEFS } from "@/lib/content/intake-options";
import { caseHref, pp } from "@/components/proof-path/shell";

export function SupportActiveClient({
  caseId,
  inviteId,
  email,
  initialPermissions,
  lastViewed,
}: {
  caseId: string;
  inviteId: string;
  email: string;
  initialPermissions: Record<string, boolean>;
  lastViewed: string;
}) {
  const router = useRouter();
  const [permissions, setPermissions] = useState(initialPermissions);

  const toggle = async (key: string) => {
    const next = { ...permissions, [key]: !permissions[key] };
    setPermissions(next);
    await updateSupportPermissionsAction(inviteId, next);
  };

  const revoke = async () => {
    await revokeSupportAction(inviteId);
    router.push(caseHref(caseId));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 4px" }}>Support access</h1>
      <p style={{ fontSize: 14, color: pp.subtle, margin: "0 0 20px" }}>
        {email} — <span style={{ color: "#2F6E4B", fontWeight: 600 }}>Active</span>
      </p>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Permissions</div>
      {PERMISSION_DEFS.map((perm) => (
        <label
          key={perm.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={!!permissions[perm.key]}
            onChange={() => toggle(perm.key)}
            style={{ width: 18, height: 18 }}
          />
          {perm.label}
        </label>
      ))}
      <div style={{ fontSize: 14, fontWeight: 600, margin: "20px 0 10px" }}>Activity</div>
      <div style={{ fontSize: 14, color: pp.muted, marginBottom: 24 }}>{lastViewed}</div>
      <button
        type="button"
        onClick={revoke}
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
