import Link from "next/link";
import {
  DEMO_CASE_ID,
  DEMO_CASE_TITLE,
  DEMO_CASE_STATUS,
  DEMO_DUE_DATE,
  DEMO_NEXT_STEP,
  DEMO_REMINDER,
} from "@/lib/content/intake-options";
import { pp, PrimaryButton, StatusBadge } from "@/components/proof-path/shell";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, margin: "0 0 18px" }}>Your cases</h1>
      <div
        style={{
          background: pp.card,
          border: `1px solid ${pp.border}`,
          boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
          borderRadius: 16,
          padding: 18,
          marginBottom: 14,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
          {DEMO_CASE_TITLE}
        </div>
        <div style={{ marginBottom: 12 }}>
          <StatusBadge>{DEMO_CASE_STATUS}</StatusBadge>
        </div>
        <div style={{ fontSize: 14, color: pp.muted, marginBottom: 2 }}>
          <strong>Next:</strong> {DEMO_NEXT_STEP}
        </div>
        <div style={{ fontSize: 14, color: pp.muted, marginBottom: 14 }}>
          <strong>Due:</strong> {DEMO_DUE_DATE}
        </div>
        <PrimaryButton href={`/cases/${DEMO_CASE_ID}`} fullWidth>
          Continue case
        </PrimaryButton>
      </div>
      <Link
        href="/cases/new?step=1"
        style={{
          display: "block",
          width: "100%",
          background: "none",
          border: `1.5px dashed ${pp.borderInput}`,
          borderRadius: 16,
          padding: 16,
          fontSize: 15,
          fontWeight: 600,
          color: pp.ink,
          textAlign: "center",
          textDecoration: "none",
          marginBottom: 28,
        }}
      >
        + Start another case
      </Link>

      <div
        style={{
          borderTop: `1px solid ${pp.border}`,
          paddingTop: 18,
        }}
      >
        <h3 style={{ fontSize: 16, margin: "0 0 10px" }}>Reminders</h3>
        <div style={{ fontSize: 14, color: pp.muted, marginBottom: 18 }}>
          {DEMO_REMINDER}
        </div>
        <h3 style={{ fontSize: 16, margin: "0 0 10px" }}>Support access</h3>
        <div style={{ fontSize: 14, color: pp.muted }}>
          No support person added yet.{" "}
          <Link
            href={`/cases/${DEMO_CASE_ID}/support`}
            style={{ textDecoration: "underline", color: pp.accent }}
          >
            Invite someone
          </Link>
        </div>
      </div>
    </div>
  );
}
