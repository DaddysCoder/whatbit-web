import React from "react";
import { sectionA } from "../../data/questionsAB";
import { QuestionRenderer } from "../QuestionRenderer";

interface OrgProfileStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export const OrgProfileStep: React.FC<OrgProfileStepProps> = ({
  answers,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 mb-1">
          Section A
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          Organisation & Scope
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Provide key organisation context, who is completing the assessment, and applicable legal or industry obligations.
        </p>
      </div>

      <div className="space-y-5">
        {sectionA.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            answers={answers}
            onChange={onChange}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
};
