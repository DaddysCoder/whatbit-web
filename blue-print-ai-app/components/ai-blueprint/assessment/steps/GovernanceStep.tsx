"use client";

import { sectionD } from "@/lib/ai-blueprint/assessment/data/questionsD";
import { QuestionRenderer } from "../QuestionRenderer";
import styles from "../assessment.module.css";

interface GovernanceStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function GovernanceStep({ answers, onChange, errors = {} }: GovernanceStepProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section D</span>
        <h2 className={styles.heading2}>Governance & Human Control</h2>
        <p className={styles.subcopy}>
          Review overall accountability, human review checkpoints, intervention & fallback mechanisms, and verification
          standards.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sectionD.map((q) => (
          <QuestionRenderer key={q.id} question={q} answers={answers} onChange={onChange} errors={errors} />
        ))}
      </div>
    </div>
  );
}
