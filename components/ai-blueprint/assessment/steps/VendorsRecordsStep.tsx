"use client";

import { sectionF } from "@/lib/ai-blueprint/assessment/data/questionsF";
import { QuestionRenderer } from "../QuestionRenderer";
import styles from "../assessment.module.css";

interface VendorsRecordsStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function VendorsRecordsStep({ answers, onChange, errors = {} }: VendorsRecordsStepProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section F</span>
        <h2 className={styles.heading2}>Vendors, Security, Monitoring & Records</h2>
        <p className={styles.subcopy}>
          Review vendor due diligence, technical safeguards, lifecycle monitoring, incident history, and existing governance
          documentation.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sectionF.map((q) => (
          <QuestionRenderer key={q.id} question={q} answers={answers} onChange={onChange} errors={errors} />
        ))}
      </div>
    </div>
  );
}
