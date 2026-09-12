"use client";

import { sectionE } from "@/lib/ai-blueprint/assessment/data/questionsE";
import { QuestionRenderer } from "../QuestionRenderer";
import styles from "../assessment.module.css";

interface PeopleTransparencyStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function PeopleTransparencyStep({ answers, onChange, errors = {} }: PeopleTransparencyStepProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section E</span>
        <h2 className={styles.heading2}>People, Transparency & Contestability</h2>
        <p className={styles.subcopy}>
          Assess acceptable-use policies, staff training, disclosure to end-users, and human contestability channels.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sectionE.map((q) => (
          <QuestionRenderer key={q.id} question={q} answers={answers} onChange={onChange} errors={errors} />
        ))}
      </div>
    </div>
  );
}
