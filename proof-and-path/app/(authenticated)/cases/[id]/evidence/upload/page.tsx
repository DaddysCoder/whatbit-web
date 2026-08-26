import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertCaseAccess } from "@/lib/services/cases";
import EvidenceUploadPage from "@/components/proof-path/evidence-upload-client";

export default async function EvidenceUploadRoute({
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
  return <EvidenceUploadPage caseId={id} />;
}
