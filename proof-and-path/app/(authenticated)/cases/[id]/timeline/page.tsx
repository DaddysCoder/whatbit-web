"use client";

import { use } from "react";
import { useDemoCase } from "@/lib/demo-case-context";
import { pp, PrimaryButton } from "@/components/proof-path/shell";

export default function TimelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  use(params);
  const {
    baseTimelineEvents,
    timelineEvents,
    addContactEvent,
    hasFollowUp,
  } = useDemoCase();

  const allEvents = [...baseTimelineEvents, ...timelineEvents];

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
          Your follow-up is due — record what happened when Kmart responds.
        </div>
      ) : null}
      {allEvents.map((ev) => (
        <div
          key={`${ev.title}-${ev.date}`}
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
            <div style={{ fontSize: 13, color: pp.subtle }}>{ev.date}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 18 }}>
        <PrimaryButton onClick={addContactEvent} fullWidth>
          Record a response
        </PrimaryButton>
      </div>
    </div>
  );
}
