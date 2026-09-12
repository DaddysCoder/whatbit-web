"use client";

import type { QuestionDef, FollowUpDef, OptionDef } from "@/lib/ai-blueprint/assessment/types";
import styles from "./assessment.module.css";

interface QuestionRendererProps {
  question: QuestionDef;
  answers: Record<string, unknown>;
  useCaseAnswers?: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

// Mutually exclusive value check for multi-select groups.
function isExclusiveOption(val: string): boolean {
  const normalized = val.toLowerCase();
  return (
    normalized === "none" ||
    normalized === "none_known" ||
    normalized === "none_other" ||
    normalized === "none_not_sure" ||
    normalized === "not_sure" ||
    normalized === "no" ||
    normalized === "no_monitoring" ||
    normalized === "no_defined_review" ||
    normalized === "no_regular_checking" ||
    normalized === "no_material_impact" ||
    normalized === "not_applicable" ||
    normalized === "n_a_sole_operator" ||
    normalized === "n_a_only_me"
  );
}

export function QuestionRenderer({
  question,
  answers,
  useCaseAnswers,
  onChange,
  errors = {},
}: QuestionRendererProps) {
  if (question.visibleIf && !question.visibleIf(answers, useCaseAnswers)) {
    return null;
  }

  const effectiveAnswers = useCaseAnswers || answers;
  const mainValue = effectiveAnswers[question.id];

  const handleSingleSelect = (id: string, val: string) => onChange(id, val);

  const handleMultiSelect = (id: string, val: string) => {
    const currentList = Array.isArray(effectiveAnswers[id]) ? (effectiveAnswers[id] as string[]) : [];

    let nextList: string[];
    if (isExclusiveOption(val)) {
      nextList = currentList.includes(val) ? [] : [val];
    } else {
      const nonExclusive = currentList.filter((x) => !isExclusiveOption(x));
      nextList = nonExclusive.includes(val) ? nonExclusive.filter((x) => x !== val) : [...nonExclusive, val];
    }
    onChange(id, nextList);
  };

  const handleTextChange = (id: string, val: string) => onChange(id, val);

  const renderFollowUp = (fu: FollowUpDef, parentVal: unknown) => {
    if (fu.showIf && !fu.showIf(parentVal, effectiveAnswers)) return null;

    const fuValue = effectiveAnswers[fu.id];
    const fuError = errors[fu.id];

    return (
      <div key={fu.id} className={styles.followUp}>
        <label className={styles.fieldLabel}>{fu.prompt}</label>

        {fu.kind === "single_select" && fu.options && (
          <div className={styles.optionGrid}>
            {fu.options.map((opt: OptionDef) => {
              const isSelected = fuValue === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleSingleSelect(fu.id, opt.value)}
                  className={`${styles.optionButton} ${isSelected ? styles.optionButtonSelected : ""}`}
                >
                  <span className={`${styles.optionMark} ${isSelected ? styles.optionMarkSelected : ""}`}>
                    {isSelected && <span className={styles.optionMarkDot} />}
                  </span>
                  <span className={styles.optionLabel}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {fu.kind === "multi_select" && fu.options && (
          <div className={styles.optionGrid}>
            {fu.options.map((opt: OptionDef) => {
              const selectedList = Array.isArray(fuValue) ? (fuValue as string[]) : [];
              const isSelected = selectedList.includes(opt.value);
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleMultiSelect(fu.id, opt.value)}
                  className={`${styles.optionButton} ${isSelected ? styles.optionButtonSelected : ""}`}
                >
                  <span
                    className={`${styles.optionMark} ${styles.optionMarkSquare} ${isSelected ? styles.optionMarkSelected : ""}`}
                  >
                    {isSelected && "✓"}
                  </span>
                  <span className={styles.optionLabel}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {fu.kind === "short_text" && (
          <div>
            <input
              type="text"
              value={(fuValue as string) || ""}
              maxLength={fu.maxLength || 120}
              onChange={(e) => handleTextChange(fu.id, e.target.value)}
              placeholder="Enter details..."
              className={styles.textInput}
            />
            {fu.maxLength && (
              <div className={styles.charCount}>
                {((fuValue as string) || "").length} / {fu.maxLength}
              </div>
            )}
          </div>
        )}

        {fu.kind === "long_text" && (
          <div>
            <textarea
              rows={3}
              value={(fuValue as string) || ""}
              maxLength={fu.maxLength || 800}
              onChange={(e) => handleTextChange(fu.id, e.target.value)}
              placeholder="Provide context (avoid pasting sensitive personal data)..."
              className={styles.textarea}
            />
            {fu.maxLength && (
              <div className={styles.charCount}>
                {((fuValue as string) || "").length} / {fu.maxLength}
              </div>
            )}
          </div>
        )}

        {fuError && <p className={styles.errorText}>{fuError}</p>}
      </div>
    );
  };

  const questionError = errors[question.id];

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.qId}>{question.id}</span>
        <h3 className={styles.cardTitle}>{question.prompt}</h3>
      </div>

      {question.helper && <p className={styles.helperBox}>{question.helper}</p>}

      {question.kind === "single_select" && question.options && (
        <div className={styles.optionGrid}>
          {question.options.map((opt: OptionDef) => {
            const isSelected = mainValue === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleSingleSelect(question.id, opt.value)}
                className={`${styles.optionButton} ${isSelected ? styles.optionButtonSelected : ""}`}
              >
                <span className={`${styles.optionMark} ${isSelected ? styles.optionMarkSelected : ""}`}>
                  {isSelected && <span className={styles.optionMarkDot} />}
                </span>
                <span className={styles.optionLabel}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.kind === "multi_select" && question.options && (
        <div className={styles.optionGrid}>
          {question.options.map((opt: OptionDef) => {
            const selectedList = Array.isArray(mainValue) ? (mainValue as string[]) : [];
            const isSelected = selectedList.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleMultiSelect(question.id, opt.value)}
                className={`${styles.optionButton} ${isSelected ? styles.optionButtonSelected : ""}`}
              >
                <span
                  className={`${styles.optionMark} ${styles.optionMarkSquare} ${isSelected ? styles.optionMarkSelected : ""}`}
                >
                  {isSelected && "✓"}
                </span>
                <span className={styles.optionLabel}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.kind === "short_text" && (
        <div>
          <input
            type="text"
            value={(mainValue as string) || ""}
            maxLength={question.maxLength || 120}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            placeholder="Type your response..."
            className={styles.textInput}
          />
          {question.maxLength && (
            <div className={styles.charCount}>
              {((mainValue as string) || "").length} / {question.maxLength}
            </div>
          )}
        </div>
      )}

      {question.kind === "long_text" && (
        <div>
          <textarea
            rows={4}
            value={(mainValue as string) || ""}
            maxLength={question.maxLength || 800}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            placeholder="Provide context (avoid pasting sensitive personal records)..."
            className={styles.textarea}
          />
          {question.maxLength && (
            <div className={styles.charCount}>
              {((mainValue as string) || "").length} / {question.maxLength}
            </div>
          )}
        </div>
      )}

      {questionError && <p className={styles.errorText}>{questionError}</p>}

      {question.followUps && question.followUps.length > 0 && (
        <div className={styles.followUps}>{question.followUps.map((fu) => renderFollowUp(fu, mainValue))}</div>
      )}
    </div>
  );
}
