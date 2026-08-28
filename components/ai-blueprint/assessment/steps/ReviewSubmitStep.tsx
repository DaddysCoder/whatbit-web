"use client";

import type { ToolRecord, UseCaseRecord } from "@/lib/ai-blueprint/assessment/types";
import styles from "../assessment.module.css";

interface ReviewSubmitStepProps {
  orgAnswers: Record<string, unknown>;
  tools: ToolRecord[];
  useCases: UseCaseRecord[];
  onGoToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string;
}

function formatList(val: unknown): string {
  if (!val) return "None selected";
  if (Array.isArray(val)) {
    if (val.length === 0) return "None selected";
    return val.map((item) => String(item).replace(/_/g, " ")).join(", ");
  }
  return String(val).replace(/_/g, " ");
}

export function ReviewSubmitStep({ orgAnswers, tools, useCases, onGoToStep, onSubmit, isSubmitting, submitError }: ReviewSubmitStepProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge} style={{ background: "var(--ab-accent-soft)", color: "var(--ab-accent)" }}>
          Final Step
        </span>
        <h2 className={styles.heading2}>Review & Submit Your Assessment</h2>
        <p className={styles.subcopy}>
          Please review your responses below before submitting. You can click &ldquo;Edit&rdquo; on any section to make updates.
        </p>
      </div>

      {submitError && <div className={styles.submitErrorBox}>{submitError}</div>}

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHead}>
          <h3 className={styles.reviewCardTitle}>1. Organisation & Respondent</h3>
          <button type="button" onClick={() => onGoToStep(1)} className={styles.reviewEditLink}>
            Edit Section
          </button>
        </div>
        <div className={styles.reviewGrid}>
          <div>
            <span className={styles.reviewKey}>Organisation Name</span>
            <span className={styles.reviewValue}>{(orgAnswers.Q01_name as string) || "Not specified"}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>State / Territory</span>
            <span className={styles.reviewValue}>{(orgAnswers.Q01_state as string) || "Not specified"}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>Organisation Size</span>
            <span className={styles.reviewValue}>{formatList(orgAnswers.Q02)}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>Respondent</span>
            <span className={styles.reviewValue}>
              {(orgAnswers.Q04_name as string) || "Not specified"} ({(orgAnswers.Q04_role_title as string) || "Role"})
            </span>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <span className={styles.reviewKey}>Work Areas</span>
            <span>{formatList(orgAnswers.Q03)}</span>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <span className={styles.reviewKey}>Formal Obligations</span>
            <span>{formatList(orgAnswers.Q05)}</span>
          </div>
        </div>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHead}>
          <h3 className={styles.reviewCardTitle}>2. AI Tool Inventory ({tools.length} recorded)</h3>
          <button type="button" onClick={() => onGoToStep(2)} className={styles.reviewEditLink}>
            Edit Section
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tools.map((t, idx) => (
            <div key={t.tool_id} style={{ padding: 10, background: "#fafaf9", borderRadius: 10, fontSize: 12, display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div>
                <strong>
                  {idx + 1}. {t.name}
                </strong>
                {t.provider && <span style={{ color: "#78716c", marginLeft: 4 }}>({t.provider})</span>}
                <span style={{ display: "block", color: "#78716c" }}>{t.purpose}</span>
              </div>
              <span className={styles.itemStatus} style={{ background: "#fff", borderColor: "#e7e5e4", color: "#57534e", flexShrink: 0 }}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHead}>
          <h3 className={styles.reviewCardTitle}>3. Material Use Cases ({useCases.length} assessed)</h3>
          <button type="button" onClick={() => onGoToStep(3)} className={styles.reviewEditLink}>
            Edit Section
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {useCases.map((uc, idx) => (
            <div key={uc.use_case_id} style={{ padding: 12, background: "#fafaf9", borderRadius: 10, fontSize: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13 }}>
                  #{idx + 1} {uc.name}
                </strong>
                <span className={styles.itemStatus} style={{ background: "#eaf1fb", color: "#1a5fb4", borderColor: "#cfe0f7" }}>
                  {uc.status}
                </span>
              </div>
              <p style={{ margin: 0, color: "#57534e" }}>{uc.business_purpose}</p>
              <div style={{ display: "flex", gap: 16, color: "#78716c", paddingTop: 6, borderTop: "1px solid #e7e5e4" }}>
                <span>
                  Team: <strong style={{ color: "#44403c" }}>{uc.team}</strong>
                </span>
                <span>
                  Recipients: <strong style={{ color: "#44403c" }}>{uc.users_or_recipients}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewCard}>
        <div className={styles.reviewCardHead}>
          <h3 className={styles.reviewCardTitle}>4. Governance & Organisation Controls</h3>
          <button type="button" onClick={() => onGoToStep(5)} className={styles.reviewEditLink}>
            Edit Sections
          </button>
        </div>
        <div className={styles.reviewGrid}>
          <div>
            <span className={styles.reviewKey}>Senior Accountability (Q20)</span>
            <span className={styles.reviewValue}>{formatList(orgAnswers.Q20)}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>Human Review Procedure (Q22)</span>
            <span className={styles.reviewValue}>{formatList(orgAnswers.Q22)}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>Staff AI Rules (Q25)</span>
            <span className={styles.reviewValue}>{formatList(orgAnswers.Q25)}</span>
          </div>
          <div>
            <span className={styles.reviewKey}>Incident History (Q33)</span>
            <span className={styles.reviewValue}>{formatList(orgAnswers.Q33)}</span>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <span className={styles.reviewKey}>Assessment Goals (Q35)</span>
            <span>{formatList(orgAnswers.Q35)}</span>
          </div>
        </div>
      </div>

      <div className={styles.reviewSubmitCard}>
        <div>
          <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Ready to Submit for WHATBIT Review</h4>
          <p className={styles.reviewSubmitBody}>
            Upon submission, your responses will be encrypted in transit and queued for review by WHATBIT&rsquo;s responsible AI
            specialists. You will receive your tailored report and governance pack within 5 business days.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" disabled={isSubmitting} onClick={onSubmit} className={styles.buttonPrimary} style={{ padding: "13px 28px" }}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                Submitting Assessment...
              </>
            ) : (
              "Submit Assessment →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
