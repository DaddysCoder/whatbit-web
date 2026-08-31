import React from "react";
import type { ToolRecord, UseCaseRecord } from "../../types";

interface ReviewSubmitStepProps {
  orgAnswers: Record<string, unknown>;
  tools: ToolRecord[];
  useCases: UseCaseRecord[];
  onGoToStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string;
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({
  orgAnswers,
  tools,
  useCases,
  onGoToStep,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  const formatList = (val: unknown): string => {
    if (!val) return "None selected";
    if (Array.isArray(val)) {
      if (val.length === 0) return "None selected";
      return val.map((item) => String(item).replace(/_/g, " ")).join(", ");
    }
    return String(val).replace(/_/g, " ");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[var(--color-accent-soft)] text-[var(--color-accent)] mb-1">
          Final Step
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
          Review & Submit Your Assessment
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Please review your responses below before submitting. You can click &ldquo;Edit&rdquo; on any section to make updates.
        </p>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* 1. Organisation & Respondent */}
      <div className="bg-white rounded-xl border border-[var(--color-line)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            1. Organisation & Respondent
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            Edit Section
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-stone-500 block text-xs">Organisation Name</span>
            <span className="font-semibold text-stone-900">
              {(orgAnswers.Q01_name as string) || "Not specified"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">State / Territory</span>
            <span className="font-semibold text-stone-900 uppercase">
              {(orgAnswers.Q01_state as string) || "Not specified"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">Organisation Size</span>
            <span className="font-semibold text-stone-900 capitalize">
              {formatList(orgAnswers.Q02)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-xs">Respondent</span>
            <span className="font-semibold text-stone-900">
              {(orgAnswers.Q04_name as string) || "Not specified"} ({(orgAnswers.Q04_role_title as string) || "Role"})
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-stone-500 block text-xs">Work Areas</span>
            <span className="text-stone-800">{formatList(orgAnswers.Q03)}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-stone-500 block text-xs">Formal Obligations</span>
            <span className="text-stone-800">{formatList(orgAnswers.Q05)}</span>
          </div>
        </div>
      </div>

      {/* 2. Tool Inventory */}
      <div className="bg-white rounded-xl border border-[var(--color-line)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            2. AI Tool Inventory ({tools.length} recorded)
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            Edit Section
          </button>
        </div>

        <div className="space-y-2">
          {tools.map((t, idx) => (
            <div
              key={t.tool_id}
              className="p-3 bg-stone-50 rounded-lg text-xs flex items-center justify-between gap-2"
            >
              <div>
                <span className="font-bold text-stone-900">{idx + 1}. {t.name}</span>
                {t.provider && <span className="text-stone-500 ml-1">({t.provider})</span>}
                <span className="text-stone-500 block">{t.purpose}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-stone-700 bg-white border border-stone-200 text-2xs font-medium uppercase shrink-0">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Material Use Cases */}
      <div className="bg-white rounded-xl border border-[var(--color-line)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            3. Material Use Cases ({useCases.length} assessed)
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(3)}
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            Edit Section
          </button>
        </div>

        <div className="space-y-3">
          {useCases.map((uc, idx) => (
            <div key={uc.use_case_id} className="p-3.5 bg-stone-50 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900">
                  #{idx + 1} {uc.name}
                </span>
                <span className="px-2 py-0.5 rounded text-blue-800 bg-blue-50 border border-blue-200 text-2xs font-semibold uppercase">
                  {uc.status}
                </span>
              </div>
              <p className="text-stone-600">{uc.business_purpose}</p>
              <div className="grid grid-cols-2 gap-2 text-stone-500 pt-1 border-t border-stone-200/60">
                <div>Team: <strong className="text-stone-700">{uc.team}</strong></div>
                <div>Recipients: <strong className="text-stone-700">{uc.users_or_recipients}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Controls & Records Summary */}
      <div className="bg-white rounded-xl border border-[var(--color-line)] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            4. Governance & Organisation Controls
          </h3>
          <button
            type="button"
            onClick={() => onGoToStep(5)}
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline cursor-pointer"
          >
            Edit Sections
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-stone-500 block">Senior Accountability (Q20)</span>
            <span className="font-semibold text-stone-900 capitalize">
              {formatList(orgAnswers.Q20)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block">Human Review Procedure (Q22)</span>
            <span className="font-semibold text-stone-900 capitalize">
              {formatList(orgAnswers.Q22)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block">Staff AI Rules (Q25)</span>
            <span className="font-semibold text-stone-900 capitalize">
              {formatList(orgAnswers.Q25)}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block">Incident History (Q33)</span>
            <span className="font-semibold text-stone-900 capitalize">
              {formatList(orgAnswers.Q33)}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-stone-500 block">Assessment Goals (Q35)</span>
            <span className="text-stone-800">{formatList(orgAnswers.Q35)}</span>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Card */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-stone-800 text-[var(--color-accent-soft)] mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base">Ready to Submit for WHATBIT Review</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Upon submission, your responses will be encrypted in transit and queued for review by WHATBIT&rsquo;s responsible AI specialists. You will receive your tailored report and governance pack within 5 business days.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 disabled:opacity-50 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Assessment...
              </>
            ) : (
              <>
                Submit Assessment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
