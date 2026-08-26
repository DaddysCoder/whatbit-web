import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertCaseAccess } from "@/lib/services/cases";
import { SupportInviteClient } from "@/components/proof-path/support-invite-client";

export default async function SupportInvitePage({
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
  return <SupportInviteClient caseId={id} />;
}
