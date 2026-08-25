"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { PERMISSION_DEFS } from "@/lib/content/intake-options";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export default function SupportInvitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { permissions, togglePermission, sendInvite } = useDemoCase();

  const handleSendInvite = () => {
    sendInvite();
    router.push(caseHref(id, "/support/active"));
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>
        Invite a support person
      </h1>
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          display: "block",
          marginBottom: 6,
        }}
      >
        Their email address
      </label>
      <input
        type="email"
        placeholder="name@example.com"
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: 16,
          border: `1.5px solid ${pp.borderInput}`,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
        What can they do?
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
            cursor: "pointer",
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
      <p
        style={{
          fontSize: 13,
          color: pp.subtle,
          margin: "12px 0 24px",
          lineHeight: 1.5,
        }}
      >
        Confirming your desired outcome and correspondence stays with you.
      </p>
      <PrimaryButton onClick={handleSendInvite} fullWidth>
        Send invite
      </PrimaryButton>
    </div>
  );
}
