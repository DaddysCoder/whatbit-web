"use client";

import { useRouter } from "next/navigation";
import { addTimelineEventAction } from "@/lib/actions/app-actions";
import { formatTimelineDate } from "@/lib/services/case-presenters";
import type { TimelineEvent } from "@/db/schema";
import { pp, PrimaryButton } from "@/components/proof-path/shell";

export function TimelineClient({
  caseId,
  events,
  hasFollowUp,
  retailer,
}: {
  caseId: string;
  events: TimelineEvent[];
  hasFollowUp: boolean;
  retailer: string;
}) {
  const router = useRouter();

  const handleRecord = async () => {
    await addTimelineEventAction(caseId, `Response recorded from ${retailer}`);
    router.refresh();
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>Timeline</h1>
      {hasFollowUp ? (
        <div
          style={{
            background: "#FCF1DF",
            border: "1px solid #E9CE99",
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 14,
            color: "#6B4A16",
          }}
        >
          Your follow-up is due — record what happened when {retailer} responds.
        </div>
      ) : null}
      {events.map((ev) => (
        <div
          key={ev.id}
          style={{
            display: "flex",
            gap: 12,
            padding: "10px 0",
            borderBottom: "1px solid #EDE6D8",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: pp.accent,
              marginTop: 6,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.title}</div>
            <div style={{ fontSize: 13, color: pp.subtle }}>
              {formatTimelineDate(ev.occurredAt)}
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 18 }}>
        <PrimaryButton onClick={handleRecord} fullWidth>
          Record a response
        </PrimaryButton>
      </div>
    </div>
  );
}
