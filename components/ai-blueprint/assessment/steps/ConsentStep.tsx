"use client";

import styles from "../assessment.module.css";

interface ConsentStepProps {
  consented: boolean;
  onConsentChange: (val: boolean) => void;
  onProceed: () => void;
  error?: string;
}

export function ConsentStep({ consented, onConsentChange, onProceed, error }: ConsentStepProps) {
  return (
    <div className={styles.section}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <span className={styles.sectionBadge} style={{ alignSelf: "center", background: "var(--ab-accent-soft)", color: "var(--ab-accent)" }}>
          AI Blueprint by WHATBIT • V1.1
        </span>
        <h1 className={styles.heading1}>Responsible AI Readiness Assessment</h1>
        <p className={styles.subcopy}>
          A structured, practical assessment for Australian organisations to review AI adoption, identify governance gaps, and
          receive tailored next steps.
        </p>
        <p className={styles.subcopy}>~15–20 minutes • A real person reviews your report within 5 business days</p>
      </div>

      <div className={styles.noticeCard}>
        <div>
          <h2 className={styles.heading2} style={{ fontSize: 16 }}>
            Product Boundary & Scope
          </h2>
          <p className={styles.subcopy}>Please review how this assessment operates before starting.</p>
        </div>

        <blockquote className={styles.quote}>
          &ldquo;AI Blueprint by WHATBIT is a practical responsible AI readiness assessment. It is not legal, privacy, cyber
          security, employment, clinical or financial advice; it is not certification; and it does not determine whether an
          organisation is compliant with law. The result reflects the information provided and the use cases reviewed at the
          assessment date.&rdquo;
        </blockquote>

        <div>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#78716c", marginBottom: 8 }}>
            Assessment Outcome Levels
          </h3>
          <div className={styles.outcomeGrid}>
            <div className={`${styles.outcomeCard} ${styles.outcomeLow}`}>
              <div className={styles.outcomeTitle}>
                <span className={styles.outcomeDot} style={{ background: "#1f7a4d" }} />
                Low
              </div>
              <p className={styles.outcomeBody}>Reviewed uses appear relatively contained and foundational controls are mostly present.</p>
            </div>
            <div className={`${styles.outcomeCard} ${styles.outcomeModerate}`}>
              <div className={styles.outcomeTitle}>
                <span className={styles.outcomeDot} style={{ background: "#8a6116" }} />
                Moderate
              </div>
              <p className={styles.outcomeBody}>One or more uses or control gaps need planned attention and structured follow-up.</p>
            </div>
            <div className={`${styles.outcomeCard} ${styles.outcomeHigher}`}>
              <div className={styles.outcomeTitle}>
                <span className={styles.outcomeDot} style={{ background: "#7b2ff7" }} />
                Higher Attention
              </div>
              <p className={styles.outcomeBody}>Context, impact, autonomy, data, or material control gaps warrant prompt, deeper review.</p>
            </div>
          </div>
        </div>

        <label className={styles.consentRow}>
          <input type="checkbox" checked={consented} onChange={(e) => onConsentChange(e.target.checked)} style={{ marginTop: 3 }} />
          <span className={styles.consentText}>
            I understand that this assessment is a practical readiness diagnostic, not legal or formal compliance advice, and I
            agree to proceed on this basis.
          </span>
        </label>

        {error && <p className={styles.errorText}>{error}</p>}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="button" onClick={onProceed} className={styles.buttonPrimary}>
          Begin Assessment →
        </button>
      </div>
    </div>
  );
}
