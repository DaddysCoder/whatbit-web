import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import {
  assertCaseAccess,
  getRemindersForUser,
  getTimelineForCase,
} from "@/lib/services/cases";
import { TimelineClient } from "@/components/proof-path/timeline-client";

export default async function TimelinePage({
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

  const [events, reminders] = await Promise.all([
    getTimelineForCase(id),
    getRemindersForUser(session.id),
  ]);

  return (
    <TimelineClient
      caseId={id}
      events={events}
      hasFollowUp={reminders.some((r) => r.caseId === id)}
      retailer={caseRecord.retailer ?? "the business"}
    />
  );
}
