import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import {
  assertCaseAccess,
  getEvidenceForCase,
  getTimelineForCase,
} from "@/lib/services/cases";
import { formatCaseStatus } from "@/lib/services/case-presenters";
import { CaseOverviewContent } from "@/components/proof-path/case-overview-content";
import NewCaseWizard from "../new/wizard";
import { StatusBadge } from "@/components/proof-path/shell";

export default async function CaseOverviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ step?: string }>;
}) {
  const session = await requireSession();
  const { id } = await params;
  const { step } = await searchParams;

  if (step) {
    try {
      await assertCaseAccess(id, session);
    } catch {
      notFound();
    }
    return <NewCaseWizard caseId={id} />;
  }

  let caseRecord;
  try {
    caseRecord = await assertCaseAccess(id, session);
  } catch {
    notFound();
  }

  const [evidence, timeline] = await Promise.all([
    getEvidenceForCase(id),
    getTimelineForCase(id),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: 23, margin: "0 0 6px" }}>{caseRecord.title}</h1>
      <div style={{ marginBottom: 20 }}>
        <StatusBadge>{formatCaseStatus(caseRecord.status)}</StatusBadge>
      </div>
      <CaseOverviewContent
        caseId={id}
        caseRecord={caseRecord}
        evidence={evidence}
        timeline={timeline}
      />
    </div>
  );
}
