import React from "react";
import type { UseCaseRecord, ToolRecord } from "../../types";
import { sectionC } from "../../data/questionsC";
import { QuestionRenderer } from "../QuestionRenderer";

interface UseCaseModuleStepProps {
  useCases: UseCaseRecord[];
  activeUseCaseIndex: number;
  onSelectUseCaseIndex: (idx: number) => void;
  orgAnswers: Record<string, unknown>;
  onUseCaseAnswerChange: (useCaseIndex: number, key: string, value: unknown) => void;
  availableTools: ToolRecord[];
  errors?: Record<string, string>;
}

export const UseCaseModuleStep: React.FC<UseCaseModuleStepProps> = ({
  useCases,
  activeUseCaseIndex,
  onSelectUseCaseIndex,
  orgAnswers,
  onUseCaseAnswerChange,
  availableTools,
  errors = {},
}) => {
  if (useCases.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center bg-white rounded-xl border border-stone-200">
        <p className="text-sm text-stone-600">No use cases selected. Please go back to select at least one use case.</p>
      </div>
    );
  }

  const currentUc = useCases[activeUseCaseIndex] || useCases[0];
  const linkedToolNames = (currentUc.linked_tool_ids || [])
    .map((id) => availableTools.find((t) => t.tool_id === id)?.name || id)
    .join(", ");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 mb-1">
          Section C • Deep Dive Module
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          Use Case Assessment
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Answer detailed questions about system capabilities, information flows, human oversight, and potential impacts.
        </p>
      </div>

      {/* Use Case Tabs / Selector if more than 1 use case */}
      {useCases.length > 1 && (
        <div className="flex items-center gap-2 p-1.5 bg-stone-100/80 rounded-xl border border-[var(--color-line)]">
          {useCases.map((uc, idx) => {
            const isActive = idx === activeUseCaseIndex;
            return (
              <button
                type="button"
                key={uc.use_case_id}
                onClick={() => onSelectUseCaseIndex(idx)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer truncate ${
                  isActive
                    ? "bg-white text-[var(--color-ink)] shadow-xs border border-stone-200/60 font-bold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                }`}
              >
                <span className="font-mono text-xs opacity-75 mr-1.5">#{idx + 1}</span>
                {uc.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Use Case Banner */}
      <div className="p-4 bg-[var(--color-accent-soft)] rounded-xl border border-[var(--color-accent)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Reviewing Use Case {activeUseCaseIndex + 1} of {useCases.length}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
            {currentUc.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-1">{currentUc.business_purpose}</p>
        </div>
        <div className="text-xs text-stone-500 flex sm:flex-col items-start sm:items-end gap-1 shrink-0">
          <span>Status: <strong className="text-stone-700 capitalize">{currentUc.status}</strong></span>
          {linkedToolNames && <span>Tools: <strong className="text-stone-700">{linkedToolNames}</strong></span>}
        </div>
      </div>

      {/* Questions Q10 through Q19 */}
      <div className="space-y-5">
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

      {/* Navigation between multiple use cases */}
      {useCases.length > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)]">
          <button
            type="button"
            disabled={activeUseCaseIndex === 0}
            onClick={() => onSelectUseCaseIndex(activeUseCaseIndex - 1)}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &larr; Previous Use Case
          </button>
          <span className="text-xs text-stone-500 font-medium">
            Use Case {activeUseCaseIndex + 1} of {useCases.length}
          </span>
          <button
            type="button"
            disabled={activeUseCaseIndex === useCases.length - 1}
            onClick={() => onSelectUseCaseIndex(activeUseCaseIndex + 1)}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next Use Case &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
