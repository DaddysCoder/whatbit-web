import React from "react";
import { sectionF } from "../../data/questionsF";
import { QuestionRenderer } from "../QuestionRenderer";

interface VendorsRecordsStepProps {
  answers: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export const VendorsRecordsStep: React.FC<VendorsRecordsStepProps> = ({
  answers,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-100 text-stone-700 mb-1">
          Section F
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          Vendors, Security, Monitoring & Records
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Review vendor due diligence, technical safeguards, lifecycle monitoring, incident history, and existing governance documentation.
        </p>
      </div>

      <div className="space-y-5">
        {sectionF.map((q) => (
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
