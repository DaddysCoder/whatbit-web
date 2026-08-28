import React from "react";
import type { ToolRecord, UseCaseRecord } from "../../types";
import { sectionB } from "../../data/questionsAB";
import { RepeatGroupEditor } from "../RepeatGroupEditor";

interface UseCaseSelectStepProps {
  useCases: UseCaseRecord[];
  tools: ToolRecord[];
  onAddUseCase: (useCase: UseCaseRecord) => void;
  onUpdateUseCase: (id: string, updated: Partial<UseCaseRecord>) => void;
  onRemoveUseCase: (id: string) => void;
  errors?: Record<string, string>;
}

export const UseCaseSelectStep: React.FC<UseCaseSelectStepProps> = ({
  useCases,
  tools,
  onAddUseCase,
  onUpdateUseCase,
  onRemoveUseCase,
  errors = {},
}) => {
  const q09Def = sectionB.find((q) => q.id === "Q09");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 mb-1">
          Section B • Part 2
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          Material AI Use Cases
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Select the AI uses that could matter most if they produced a wrong, unfair, private, or unexpected result.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xs rounded-xl border border-[var(--color-line)] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            Q09
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-ink)] leading-snug">
            {q09Def?.prompt || "Choose the AI use that could matter most"}
          </h3>
        </div>
        {q09Def?.helper && (
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-200/60">
            {q09Def.helper}
          </p>
        )}

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
};
