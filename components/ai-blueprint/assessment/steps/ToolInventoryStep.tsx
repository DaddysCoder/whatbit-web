"use client";

import type { ToolRecord } from "@/lib/ai-blueprint/assessment/types";
import { sectionB } from "@/lib/ai-blueprint/assessment/data/questionsAB";
import { QuestionRenderer } from "../QuestionRenderer";
import { RepeatGroupEditor } from "../RepeatGroupEditor";
import styles from "../assessment.module.css";

interface ToolInventoryStepProps {
  tools: ToolRecord[];
  onAddTool: (tool: ToolRecord) => void;
  onUpdateTool: (id: string, updated: Partial<ToolRecord>) => void;
  onRemoveTool: (id: string) => void;
  answers: Record<string, unknown>;
  onChangeAnswer: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export function ToolInventoryStep({
  tools,
  onAddTool,
  onUpdateTool,
  onRemoveTool,
  answers,
  onChangeAnswer,
  errors = {},
}: ToolInventoryStepProps) {
  const q06Def = sectionB.find((q) => q.id === "Q06");
  const otherSectionB = sectionB.filter((q) => q.id === "Q07" || q.id === "Q08");

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section B • Part 1</span>
        <h2 className={styles.heading2}>AI Tool Inventory</h2>
        <p className={styles.subcopy}>
          Catalog the AI tools, software features, and AI services used or planned across your organisation.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <span className={styles.qId}>Q06</span>
          <h3 className={styles.cardTitle}>{q06Def?.prompt || "Which AI tools or AI-enabled systems are currently used or planned?"}</h3>
        </div>
        {q06Def?.helper && <p className={styles.helperBox}>{q06Def.helper}</p>}

        <RepeatGroupEditor
          type="tool"
          items={tools}
          onAdd={onAddTool}
          onUpdate={onUpdateTool}
          onRemove={onRemoveTool}
          maxItems={10}
          minItems={1}
          error={errors.tools}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {otherSectionB.map((q) => (
          <QuestionRenderer key={q.id} question={q} answers={answers} onChange={onChangeAnswer} errors={errors} />
        ))}
      </div>
    </div>
  );
}
