import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertCaseAccess } from "@/lib/services/cases";
import { DraftGenerateClient } from "@/components/proof-path/draft-generate-client";

export default async function DraftPage({
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
  return <DraftGenerateClient caseId={id} />;
}
