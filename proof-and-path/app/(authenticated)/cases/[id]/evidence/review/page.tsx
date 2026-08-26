import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertCaseAccess, getEvidenceForCase } from "@/lib/services/cases";
import { ExtractionReviewClient } from "@/components/proof-path/extraction-review-client";

export default async function EvidenceReviewPage({
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

  const evidence = await getEvidenceForCase(id);
  const pending = evidence.find(
    (e) => e.templateId === "altproof" && e.status === "pending",
  );
  const fields = pending?.extractedFields
    ? (JSON.parse(pending.extractedFields) as { possiblePurchaseDate?: string })
    : {};
  const purchaseDate = fields.possiblePurchaseDate ?? "12 June 2026";

  return <ExtractionReviewClient caseId={id} purchaseDate={purchaseDate} />;
}
