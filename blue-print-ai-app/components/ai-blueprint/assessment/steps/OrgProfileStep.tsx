"use client";

import { sectionA } from "@/lib/ai-blueprint/assessment/data/questionsAB";
import { QuestionRenderer } from "../QuestionRenderer";
import styles from "../assessment.module.css";

interface OrgProfileStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function OrgProfileStep({ answers, onChange, errors = {} }: OrgProfileStepProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section A</span>
        <h2 className={styles.heading2}>Organisation & Scope</h2>
        <p className={styles.subcopy}>
          Provide key organisation context, who is completing the assessment, and applicable legal or industry obligations.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sectionA.map((q) => (
          <QuestionRenderer key={q.id} question={q} answers={answers} onChange={onChange} errors={errors} />
        ))}
      </div>
    </div>
  );
}
