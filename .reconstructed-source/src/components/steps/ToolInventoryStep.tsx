import React from "react";
import type { ToolRecord } from "../../types";
import { sectionB } from "../../data/questionsAB";
import { QuestionRenderer } from "../QuestionRenderer";
import { RepeatGroupEditor } from "../RepeatGroupEditor";

interface ToolInventoryStepProps {
  tools: ToolRecord[];
  onAddTool: (tool: ToolRecord) => void;
  onUpdateTool: (id: string, updated: Partial<ToolRecord>) => void;
  onRemoveTool: (id: string) => void;
  answers: Record<string, unknown>;
  onChangeAnswer: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export const ToolInventoryStep: React.FC<ToolInventoryStepProps> = ({
  tools,
  onAddTool,
  onUpdateTool,
  onRemoveTool,
  answers,
  onChangeAnswer,
  errors = {},
}) => {
  const q06Def = sectionB.find((q) => q.id === "Q06");
  const otherSectionB = sectionB.filter((q) => q.id === "Q07" || q.id === "Q08");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 mb-1">
          Section B • Part 1
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          AI Tool Inventory
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Catalog the AI tools, software features, and AI services used or planned across your organisation.
        </p>
      </div>

      {/* Q06 Tool Inventory */}
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border border-[var(--color-line)] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            Q06
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-ink)] leading-snug">
            {q06Def?.prompt || "Which AI tools or AI-enabled systems are currently used or planned?"}
          </h3>
        </div>
        {q06Def?.helper && (
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-200/60">
            {q06Def.helper}
          </p>
        )}

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

      {/* Q07 & Q08 */}
      <div className="space-y-5">
        {otherSectionB.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            answers={answers}
            onChange={onChangeAnswer}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
};
