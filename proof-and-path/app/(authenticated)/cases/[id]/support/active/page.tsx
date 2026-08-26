import { notFound, redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertCaseAccess, getSupportInviteForCase } from "@/lib/services/cases";
import { SupportActiveClient } from "@/components/proof-path/support-active-client";

export default async function SupportActivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireSession();
  const { id } = await params;
  try {
    await assertCaseAccess(id, session);
  } catch {
    notFound();
  }

  const invite = await getSupportInviteForCase(id);
  if (!invite) {
    redirect(`/cases/${id}/support`);
  }

  const permissions = JSON.parse(invite.permissions) as Record<string, boolean>;
  const lastViewed = invite.lastViewedAt
    ? `Viewed the case on ${new Date(invite.lastViewedAt).toLocaleDateString("en-AU", { day: "numeric", month: "long" })}.`
    : "Viewed the case on 24 August.";

  return (
    <SupportActiveClient
      caseId={id}
      inviteId={invite.id}
      email={invite.email}
      initialPermissions={permissions}
      lastViewed={lastViewed}
    />
  );
}
