import {
  DEMO_GUIDANCE_BLOCKS,
  GUIDANCE_DISCLAIMER,
} from "@/lib/content/guidance";
import { pp } from "@/components/proof-path/shell";

const tierStyles = {
  source: {
    background: pp.card,
    border: `1px solid ${pp.border}`,
    labelColor: pp.subtle,
    titleColor: pp.ink,
    bodyColor: pp.muted,
  },
  app: {
    background: "#FEF9EE",
    border: "1px solid #E9CE99",
    labelColor: "#8A5A16",
    titleColor: pp.ink,
    bodyColor: "#5C4315",
  },
  decision: {
    background: "#EEF3F0",
    border: "1px solid #C9DACD",
    labelColor: "#2F6E4B",
    titleColor: pp.ink,
    bodyColor: "#294E37",
  },
};

export default function GuidancePage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, margin: "0 0 18px" }}>Current guidance</h1>
      {DEMO_GUIDANCE_BLOCKS.map((block) => {
        const styles = tierStyles[block.tier];
        return (
          <div
            key={block.label}
            style={{
              background: styles.background,
              border: styles.border,
              boxShadow:
                block.tier === "source"
                  ? "0 1px 3px rgba(28,36,48,0.05)"
                  : undefined,
              borderRadius: 16,
              padding: block.tier === "source" ? 18 : "14px 16px",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: styles.labelColor,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: block.tier === "source" ? 10 : 6,
              }}
            >
              {block.label}
            </div>
            {block.title ? (
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  marginBottom: 8,
                }}
              >
                {block.title}
              </div>
            ) : null}
            <div
              style={{
                fontSize: block.tier === "source" ? 15 : 14,
                color: styles.bodyColor,
                lineHeight: block.tier === "source" ? 1.55 : 1.5,
                marginBottom: block.tier === "source" ? 12 : 0,
              }}
            >
              {block.body}
            </div>
            {block.source ? (
              <>
                <div style={{ fontSize: 13, color: pp.subtle, marginBottom: 2 }}>
                  Source: {block.source}
                </div>
                <div
                  style={{ fontSize: 13, color: pp.subtle, marginBottom: 12 }}
                >
                  Reviewed: {block.reviewed}
                </div>
                <a
                  href={block.sourceLink}
                  style={{ fontSize: 14, fontWeight: 600, color: pp.accent }}
                >
                  View source
                </a>
              </>
            ) : null}
          </div>
        );
      })}
      <p
        style={{
          fontSize: 13,
          color: pp.subtle,
          lineHeight: 1.5,
          marginBottom: 18,
        }}
      >
        {GUIDANCE_DISCLAIMER}
      </p>
    </div>
  );
}
