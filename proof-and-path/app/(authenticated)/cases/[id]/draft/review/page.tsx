import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import {
  assertCaseAccess,
  getDraftForCase,
  getEvidenceForCase,
} from "@/lib/services/cases";
import { getDraftMetadata } from "@/lib/services/drafts";
import { DraftReviewClient } from "@/components/proof-path/draft-review-client";

export default async function DraftReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireSession();
  const { id } = await params;

  let caseRecord;
  try {
    caseRecord = await assertCaseAccess(id, session);
  } catch {
    notFound();
  }

  const [draft, evidence] = await Promise.all([
    getDraftForCase(id),
    getEvidenceForCase(id),
  ]);

  if (!draft) {
    notFound();
  }

  const metadata = getDraftMetadata(caseRecord, evidence);

  return (
    <DraftReviewClient
      caseId={id}
      initialContent={draft.content}
      tone={draft.tone}
      factsUsed={metadata.factsUsed}
      missing={metadata.missing}
    />
  );
}
