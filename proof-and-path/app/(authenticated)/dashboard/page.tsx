import Link from "next/link";
import { requireSession } from "@/lib/auth/session";
import {
  getRemindersForUser,
  getSupportInviteForCase,
  listCasesForUser,
  seedDemoCase,
} from "@/lib/services/cases";
import {
  formatCaseStatus,
  getNextStep,
} from "@/lib/services/case-presenters";
import { getEvidenceForCase } from "@/lib/services/cases";
import { createCaseAction } from "@/lib/actions/app-actions";
import { pp, PrimaryButton, StatusBadge } from "@/components/proof-path/shell";

export default async function DashboardPage() {
  const session = await requireSession();
  await seedDemoCase(session.id);
  const caseList = await listCasesForUser(session.id);
  const reminders = await getRemindersForUser(session.id);

  const firstCase = caseList[0];
  let nextStep = "Continue your case";
  if (firstCase) {
    const evidence = await getEvidenceForCase(firstCase.id);
    nextStep = getNextStep(firstCase, evidence);
  }

  const supportCaseId = firstCase?.id;
  const supportInvite = supportCaseId
    ? await getSupportInviteForCase(supportCaseId)
    : null;

  return (
    <div>
      <h1 style={{ fontSize: 24, margin: "0 0 18px" }}>Your cases</h1>

      {caseList.length === 0 ? (
        <p style={{ color: pp.muted, marginBottom: 18 }}>
          You don&apos;t have any cases yet.
        </p>
      ) : (
        caseList.map((caseRecord) => (
          <div
            key={caseRecord.id}
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
              {caseRecord.title}
            </div>
            <div style={{ marginBottom: 12 }}>
              <StatusBadge>{formatCaseStatus(caseRecord.status)}</StatusBadge>
            </div>
            <div style={{ fontSize: 14, color: pp.muted, marginBottom: 2 }}>
              <strong>Next:</strong> {nextStep}
            </div>
            {reminders[0] ? (
              <div style={{ fontSize: 14, color: pp.muted, marginBottom: 14 }}>
                <strong>Due:</strong>{" "}
                {new Date(reminders[0].dueDate).toLocaleDateString("en-AU", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
            ) : (
              <div style={{ marginBottom: 14 }} />
            )}
            <PrimaryButton href={`/cases/${caseRecord.id}`} fullWidth>
              Continue case
            </PrimaryButton>
          </div>
        ))
      )}

      <form action={createCaseAction}>
        <button
          type="submit"
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
            cursor: "pointer",
            marginBottom: 28,
          }}
        >
          + Start another case
        </button>
      </form>

      <div
        id="reminders"
        style={{
          borderTop: `1px solid ${pp.border}`,
          paddingTop: 18,
        }}
      >
        <h3 style={{ fontSize: 16, margin: "0 0 10px" }}>Reminders</h3>
        {reminders.length === 0 ? (
          <div style={{ fontSize: 14, color: pp.muted, marginBottom: 18 }}>
            No reminders yet.
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              style={{ fontSize: 14, color: pp.muted, marginBottom: 18 }}
            >
              {reminder.message}
            </div>
          ))
        )}
        <h3 style={{ fontSize: 16, margin: "0 0 10px" }}>Support access</h3>
        <div style={{ fontSize: 14, color: pp.muted }}>
          {supportInvite ? (
            <>
              {supportInvite.email} has active access.{" "}
              <Link
                href={`/cases/${supportCaseId}/support/active`}
                style={{ textDecoration: "underline", color: pp.accent }}
              >
                Manage access
              </Link>
            </>
          ) : (
            <>
              No support person added yet.{" "}
              {supportCaseId ? (
                <Link
                  href={`/cases/${supportCaseId}/support`}
                  style={{ textDecoration: "underline", color: pp.accent }}
                >
                  Invite someone
                </Link>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
