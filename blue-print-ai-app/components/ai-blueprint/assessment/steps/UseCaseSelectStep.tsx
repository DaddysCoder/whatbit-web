"use client";

import type { ToolRecord, UseCaseRecord } from "@/lib/ai-blueprint/assessment/types";
import { sectionB } from "@/lib/ai-blueprint/assessment/data/questionsAB";
import { RepeatGroupEditor } from "../RepeatGroupEditor";
import styles from "../assessment.module.css";

interface UseCaseSelectStepProps {
  useCases: UseCaseRecord[];
  tools: ToolRecord[];
  onAddUseCase: (useCase: UseCaseRecord) => void;
  onUpdateUseCase: (id: string, updated: Partial<UseCaseRecord>) => void;
  onRemoveUseCase: (id: string) => void;
  errors?: Record<string, string>;
}

export function UseCaseSelectStep({ useCases, tools, onAddUseCase, onUpdateUseCase, onRemoveUseCase, errors = {} }: UseCaseSelectStepProps) {
  const q09Def = sectionB.find((q) => q.id === "Q09");

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section B • Part 2</span>
        <h2 className={styles.heading2}>Material AI Use Cases</h2>
        <p className={styles.subcopy}>
          Select the AI uses that could matter most if they produced a wrong, unfair, private, or unexpected result.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <span className={styles.qId}>Q09</span>
          <h3 className={styles.cardTitle}>{q09Def?.prompt || "Choose the AI use that could matter most"}</h3>
        </div>
        {q09Def?.helper && <p className={styles.helperBox}>{q09Def.helper}</p>}

        <RepeatGroupEditor
          type="use_case"
          items={useCases}
          availableTools={tools}
          onAdd={onAddUseCase}
          onUpdate={onUpdateUseCase}
          onRemove={onRemoveUseCase}
          maxItems={3}
          minItems={1}
          error={errors.use_cases}
        />
      </div>
    </div>
  );
}
