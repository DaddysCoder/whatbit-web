import Link from "next/link";
import type { ReactNode } from "react";

export const pp = {
  bg: "#F1F2F4",
  ink: "#1C2430",
  muted: "#3B4452",
  subtle: "#6B7280",
  accent: "#0F9D74",
  accentDark: "#0B7A5C",
  danger: "#9E3A2E",
  card: "#FFFFFF",
  warm: "#FBF8F2",
  border: "rgba(28,36,48,0.08)",
  borderInput: "rgba(28,36,48,0.18)",
} as const;

export function ProofPathShell({
  children,
  showBack,
  backHref,
}: {
  children: ReactNode;
  showBack?: boolean;
  backHref?: string;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: pp.bg,
        color: pp.ink,
        display: "flex",
        flexDirection: "column",
        fontFamily:
          '"Source Sans 3", ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "#FAFAFA",
          borderBottom: `1px solid ${pp.border}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: pp.ink,
          }}
        >
          <ProofPathLogo />
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.2 }}>
            Proof & Path
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {showBack && backHref ? (
            <Link
              href={backHref}
              style={{
                background: "none",
                border: "none",
                color: pp.ink,
                fontSize: 15,
                padding: "6px 4px",
                textDecoration: "none",
              }}
            >
              ← Back
            </Link>
          ) : null}
          <Link
            href="/dashboard"
            style={{
              background: "none",
              border: "none",
              color: pp.ink,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
        </div>
      </header>
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "0 0 60px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            padding: "24px 20px",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

function ProofPathLogo() {
  return (
    <svg width="30" height="14" viewBox="0 0 120 56" aria-hidden>
      <rect
        x="18"
        y="16"
        width="26"
        height="26"
        rx="6"
        fill="none"
        stroke="#0F9D74"
        strokeWidth="5"
      />
      <rect x="50" y="24" width="26" height="26" rx="6" fill="#0F9D74" />
      <path
        d="M80 37 L96 37 M90 30 L98 37 L90 44"
        stroke="#0F9D74"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrimaryButton({
  href,
  onClick,
  children,
  fullWidth,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  const style = {
    display: "inline-block" as const,
    width: fullWidth ? "100%" : undefined,
    background: pp.card,
    color: pp.accentDark,
    border: `1.5px solid ${pp.accent}`,
    borderRadius: 12,
    padding: "14px 20px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "center" as const,
    textDecoration: "none",
  };
  if (href) return <Link href={href} style={style}>{children}</Link>;
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "rgba(184,121,40,0.14)",
        color: "#8A5A16",
        fontSize: 13,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 999,
      }}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: pp.card,
        border: `1px solid ${pp.border}`,
        boxShadow: "0 1px 3px rgba(28,36,48,0.05)",
        borderRadius: 16,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        color: pp.subtle,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export function caseHref(id: string, path = "") {
  return `/cases/${id}${path}`;
}
