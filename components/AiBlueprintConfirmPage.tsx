import Link from "next/link";
import styles from "./AiBlueprintConfirmPage.module.css";

type Step = { title: string; body: string };

type AiBlueprintConfirmPageProps = {
  icon: "check" | "envelope";
  title: string;
  body: string;
  steps?: Step[];
  infoLabel?: string;
  infoBody?: React.ReactNode;
  cta?: { href: string; label: string };
  footerNote: React.ReactNode;
};

export function AiBlueprintConfirmPage({
  icon,
  title,
  body,
  steps,
  infoLabel,
  infoBody,
  cta,
  footerNote,
}: AiBlueprintConfirmPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span style={{ color: "#0B0B0C" }}>What</span>
          <span style={{ color: "#7B2FF7" }}>Bit</span>
        </Link>
        <div className={styles.crumb}>
          <span>/</span>
          <span className={styles.crumbCurrent}>AI Blueprint</span>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.content}>
          {icon === "check" ? (
            <div className={styles.iconCheck}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : (
            <div className={styles.iconEnvelope}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M4 8l9 6 9-6" stroke="#7B2FF7" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="4" y="5" width="18" height="16" rx="2.5" stroke="#7B2FF7" strokeWidth="2.4" />
              </svg>
            </div>
          )}

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lede}>{body}</p>

          {steps ? (
            <div className={styles.stepsCard}>
              {steps.map((step, i) => (
                <div key={step.title} className={styles.stepRow}>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <div>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepBody}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {infoLabel ? (
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>{infoLabel}</div>
              <div className={styles.infoBody}>{infoBody}</div>
            </div>
          ) : null}

          {cta ? (
            <Link href={cta.href} className={styles.cta}>
              {cta.label}
            </Link>
          ) : null}

          <div className={styles.footNote}>{footerNote}</div>
        </div>
      </div>

      <div className={styles.footer}>
        <span>AI Blueprint by WhatBit · Australia</span>
        <div className={styles.footerLinks}>
          <Link href="/ai-blueprint/privacy">Privacy</Link>
          <Link href="/ai-blueprint/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
}
