"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inviteSupportAction } from "@/lib/actions/app-actions";
import { PERMISSION_DEFS } from "@/lib/content/intake-options";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export function SupportInviteClient({ caseId }: { caseId: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState({
    view: true,
    edit: true,
    upload: true,
    export: false,
  });

  const toggle = (key: keyof typeof permissions) => {
    setPermissions((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSend = async () => {
    if (!email.trim()) return;
    await inviteSupportAction(caseId, email.trim(), permissions);
    router.push(caseHref(caseId, "/support/active"));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>Invite a support person</h1>
      <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 6 }}>
        Their email address
      </label>
      <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: 16,
          border: `1.5px solid ${pp.borderInput}`,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>What can they do?</div>
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
            checked={permissions[perm.key as keyof typeof permissions]}
            onChange={() => toggle(perm.key as keyof typeof permissions)}
            style={{ width: 18, height: 18 }}
          />
          {perm.label}
        </label>
      ))}
      <p style={{ fontSize: 13, color: pp.subtle, margin: "12px 0 24px", lineHeight: 1.5 }}>
        Confirming your desired outcome and correspondence stays with you.
      </p>
      <PrimaryButton onClick={handleSend} fullWidth>
        Send invite
      </PrimaryButton>
    </div>
  );
}
