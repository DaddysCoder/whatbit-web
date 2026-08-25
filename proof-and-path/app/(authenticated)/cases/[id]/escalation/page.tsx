import {
  ESCALATION_DISCLAIMER,
  ESCALATION_INTRO,
  ESCALATION_PATHWAYS,
} from "@/lib/content/escalation-pathways";
import { caseHref, pp, PrimaryButton } from "@/components/proof-path/shell";

export default async function EscalationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 8px" }}>Escalation options</h1>
      <p
        style={{
          fontSize: 15,
          color: pp.muted,
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}
      >
        {ESCALATION_INTRO}
      </p>
      {ESCALATION_PATHWAYS.map((pathway) => (
        <div
          key={pathway.name}
          style={{
            border: `1px solid ${pp.border}`,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            background: pp.warm,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
            {pathway.name}
          </div>
          <div
            style={{
              fontSize: 14,
              color: pp.muted,
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            {pathway.desc}
          </div>
          <div style={{ fontSize: 12, color: pp.subtle }}>
            Source: {pathway.source}
          </div>
        </div>
      ))}
      <p
        style={{
          fontSize: 13,
          color: pp.subtle,
          margin: "14px 0 20px",
          lineHeight: 1.5,
        }}
      >
        {ESCALATION_DISCLAIMER}
      </p>
      <PrimaryButton href={caseHref(id, "/export/success")} fullWidth>
        Export case summary
      </PrimaryButton>
    </div>
  );
}
