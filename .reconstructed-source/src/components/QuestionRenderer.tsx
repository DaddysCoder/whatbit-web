import React from "react";
import type { QuestionDef, FollowUpDef, OptionDef } from "../types";

interface QuestionRendererProps {
  question: QuestionDef;
  answers: Record<string, unknown>;
  useCaseAnswers?: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

// Mutually exclusive value check for multi-select groups
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

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  answers,
  useCaseAnswers,
  onChange,
  errors = {},
}) => {
  // Check question-level visibility
  if (question.visibleIf && !question.visibleIf(answers, useCaseAnswers)) {
    return null;
  }

  const effectiveAnswers = useCaseAnswers || answers;
  const mainValue = effectiveAnswers[question.id];

  const handleSingleSelect = (id: string, val: string) => {
    onChange(id, val);
  };

  const handleMultiSelect = (id: string, val: string) => {
    const currentList = Array.isArray(effectiveAnswers[id])
      ? (effectiveAnswers[id] as string[])
      : [];

    let nextList: string[];
    if (isExclusiveOption(val)) {
      // If clicking an exclusive option, it replaces everything else
      if (currentList.includes(val)) {
        nextList = [];
      } else {
        nextList = [val];
      }
    } else {
      // If clicking a normal option, remove any exclusive options first
      const nonExclusive = currentList.filter((x) => !isExclusiveOption(x));
      if (nonExclusive.includes(val)) {
        nextList = nonExclusive.filter((x) => x !== val);
      } else {
        nextList = [...nonExclusive, val];
      }
    }
    onChange(id, nextList);
  };

  const handleTextChange = (id: string, val: string) => {
    onChange(id, val);
  };

  const renderFollowUp = (fu: FollowUpDef, parentVal: unknown) => {
    if (fu.showIf && !fu.showIf(parentVal, effectiveAnswers)) {
      return null;
    }

    const fuValue = effectiveAnswers[fu.id];
    const fuError = errors[fu.id];

    return (
      <div
        key={fu.id}
        className="mt-4 pt-4 border-t border-[var(--color-line)]/70 pl-2 sm:pl-4 border-l-2 border-l-[var(--color-accent)]/50"
      >
        <label className="block text-sm font-semibold text-[var(--color-ink)] mb-1.5">
          {fu.prompt}
        </label>
        {fu.kind === "single_select" && fu.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {fu.options.map((opt: OptionDef) => {
              const isSelected = fuValue === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleSingleSelect(fu.id, opt.value)}
                  className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-150 flex items-start space-x-2.5 ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-ink)] font-medium shadow-xs"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-line)] hover:bg-stone-50 text-[var(--color-ink)]"
                  }`}
                >
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                        : "border-stone-400 bg-white"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <span className="leading-snug">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {fu.kind === "multi_select" && fu.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {fu.options.map((opt: OptionDef) => {
              const selectedList = Array.isArray(fuValue) ? (fuValue as string[]) : [];
              const isSelected = selectedList.includes(opt.value);
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleMultiSelect(fu.id, opt.value)}
                  className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-150 flex items-start space-x-2.5 ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-ink)] font-medium shadow-xs"
                      : "border-[var(--color-line)] bg-white hover:bg-stone-50 text-[var(--color-ink)]"
                  }`}
                >
                  <span
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                        : "border-stone-400 bg-white"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="leading-snug">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {fu.kind === "short_text" && (
          <div className="mt-1.5">
            <input
              type="text"
              value={(fuValue as string) || ""}
              maxLength={fu.maxLength || 120}
              onChange={(e) => handleTextChange(fu.id, e.target.value)}
              placeholder="Enter details..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            />
            {fu.maxLength && (
              <div className="text-right text-xs text-stone-500 mt-1">
                {((fuValue as string) || "").length} / {fu.maxLength}
              </div>
            )}
          </div>
        )}

        {fu.kind === "long_text" && (
          <div className="mt-1.5">
            <textarea
              rows={3}
              value={(fuValue as string) || ""}
              maxLength={fu.maxLength || 800}
              onChange={(e) => handleTextChange(fu.id, e.target.value)}
              placeholder="Provide context (avoid pasting sensitive personal data)..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            />
            {fu.maxLength && (
              <div className="text-right text-xs text-stone-500 mt-1">
                {((fuValue as string) || "").length} / {fu.maxLength}
              </div>
            )}
          </div>
        )}

        {fuError && <p className="text-xs text-red-600 mt-1.5">{fuError}</p>}
      </div>
    );
  };

  const questionError = errors[question.id];

  return (
    <div className="bg-white/80 backdrop-blur-xs rounded-xl border border-[var(--color-line)] p-5 sm:p-6 shadow-xs hover:shadow-sm transition-shadow">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            {question.id}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-ink)] leading-snug">
            {question.prompt}
          </h3>
        </div>
      </div>

      {question.helper && (
        <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-200/60">
          {question.helper}
        </p>
      )}

      {/* Main question controls */}
      {question.kind === "single_select" && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
          {question.options.map((opt: OptionDef) => {
            const isSelected = mainValue === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleSingleSelect(question.id, opt.value)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 flex items-start space-x-3 cursor-pointer ${
                  isSelected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-ink)] font-medium ring-1 ring-[var(--color-accent)]/30"
                    : "border-[var(--color-line)] bg-white hover:bg-stone-50 text-[var(--color-ink)]"
                }`}
              >
                <span
                  className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className="leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.kind === "multi_select" && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
          {question.options.map((opt: OptionDef) => {
            const selectedList = Array.isArray(mainValue) ? (mainValue as string[]) : [];
            const isSelected = selectedList.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleMultiSelect(question.id, opt.value)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 flex items-start space-x-3 cursor-pointer ${
                  isSelected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-ink)] font-medium ring-1 ring-[var(--color-accent)]/30"
                    : "border-[var(--color-line)] bg-white hover:bg-stone-50 text-[var(--color-ink)]"
                }`}
              >
                <span
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                      : "border-stone-400 bg-white"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.kind === "short_text" && (
        <div className="mt-3">
          <input
            type="text"
            value={(mainValue as string) || ""}
            maxLength={question.maxLength || 120}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            placeholder="Type your response..."
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
          />
          {question.maxLength && (
            <div className="text-right text-xs text-stone-500 mt-1">
              {((mainValue as string) || "").length} / {question.maxLength}
            </div>
          )}
        </div>
      )}

      {question.kind === "long_text" && (
        <div className="mt-3">
          <textarea
            rows={4}
            value={(mainValue as string) || ""}
            maxLength={question.maxLength || 800}
            onChange={(e) => handleTextChange(question.id, e.target.value)}
            placeholder="Provide context (avoid pasting sensitive personal records)..."
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
          />
          {question.maxLength && (
            <div className="text-right text-xs text-stone-500 mt-1">
              {((mainValue as string) || "").length} / {question.maxLength}
            </div>
          )}
        </div>
      )}

      {questionError && <p className="text-xs text-red-600 font-medium mt-2">{questionError}</p>}

      {/* Follow-up sub-questions */}
      {question.followUps && question.followUps.length > 0 && (
        <div className="space-y-3 mt-4">
          {question.followUps.map((fu: FollowUpDef) => renderFollowUp(fu, mainValue))}
        </div>
      )}
    </div>
  );
};
