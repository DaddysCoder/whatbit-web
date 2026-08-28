"use client";

import type { UseCaseRecord, ToolRecord } from "@/lib/ai-blueprint/assessment/types";
import { sectionC } from "@/lib/ai-blueprint/assessment/data/questionsC";
import { QuestionRenderer } from "../QuestionRenderer";
import styles from "../assessment.module.css";

interface UseCaseModuleStepProps {
  useCases: UseCaseRecord[];
  activeUseCaseIndex: number;
  onSelectUseCaseIndex: (idx: number) => void;
  orgAnswers: Record<string, unknown>;
  onUseCaseAnswerChange: (useCaseIndex: number, key: string, value: unknown) => void;
  availableTools: ToolRecord[];
  errors?: Record<string, string>;
}

export function UseCaseModuleStep({
  useCases,
  activeUseCaseIndex,
  onSelectUseCaseIndex,
  orgAnswers,
  onUseCaseAnswerChange,
  availableTools,
  errors = {},
}: UseCaseModuleStepProps) {
  if (useCases.length === 0) {
    return (
      <div className={styles.section}>
        <div className={styles.emptyState}>
          <p className={styles.subcopy}>No use cases selected. Please go back to select at least one use case.</p>
        </div>
      </div>
    );
  }

  const currentUc = useCases[activeUseCaseIndex] || useCases[0];
  const linkedToolNames = (currentUc.linked_tool_ids || []).map((id) => availableTools.find((t) => t.tool_id === id)?.name || id).join(", ");

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionBadge}>Section C • Deep Dive Module</span>
        <h2 className={styles.heading2}>Use Case Assessment</h2>
        <p className={styles.subcopy}>
          Answer detailed questions about system capabilities, information flows, human oversight, and potential impacts.
        </p>
      </div>

      {useCases.length > 1 && (
        <div className={styles.tabRow}>
          {useCases.map((uc, idx) => (
            <button
              type="button"
              key={uc.use_case_id}
              onClick={() => onSelectUseCaseIndex(idx)}
              className={`${styles.tab} ${idx === activeUseCaseIndex ? styles.tabActive : ""}`}
            >
              #{idx + 1} {uc.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.activeUseCaseBanner}>
        <div>
          <div className={styles.activeUseCaseLabel}>
            Reviewing Use Case {activeUseCaseIndex + 1} of {useCases.length}
          </div>
          <h3 style={{ margin: "2px 0", fontSize: 16, fontWeight: 700 }}>{currentUc.name}</h3>
          <p className={styles.subcopy} style={{ fontSize: 12 }}>
            {currentUc.business_purpose}
          </p>
        </div>
        <div style={{ fontSize: 12, color: "#57534e", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
          <span>
            Status: <strong>{currentUc.status}</strong>
          </span>
          {linkedToolNames && (
            <span>
              Tools: <strong>{linkedToolNames}</strong>
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sectionC.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            answers={orgAnswers}
            useCaseAnswers={currentUc.answers || {}}
            onChange={(key, val) => onUseCaseAnswerChange(activeUseCaseIndex, key, val)}
            errors={errors}
          />
        ))}
      </div>

      {useCases.length > 1 && (
        <div className={styles.useCaseNav}>
          <button
            type="button"
            disabled={activeUseCaseIndex === 0}
            onClick={() => onSelectUseCaseIndex(activeUseCaseIndex - 1)}
            className={styles.buttonSecondary}
          >
            ← Previous Use Case
          </button>
          <span className={styles.subcopy}>
            Use Case {activeUseCaseIndex + 1} of {useCases.length}
          </span>
          <button
            type="button"
            disabled={activeUseCaseIndex === useCases.length - 1}
            onClick={() => onSelectUseCaseIndex(activeUseCaseIndex + 1)}
            className={styles.buttonSecondary}
          >
            Next Use Case →
          </button>
        </div>
      )}
    </div>
  );
}
