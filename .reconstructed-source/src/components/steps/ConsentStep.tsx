import React from "react";

interface ConsentStepProps {
  consented: boolean;
  onConsentChange: (val: boolean) => void;
  onProceed: () => void;
  error?: string;
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  consented,
  onConsentChange,
  onProceed,
  error,
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-3 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          AI Blueprint by WHATBIT • V1.1
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink)]">
          Responsible AI Readiness Assessment
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
          A structured, practical assessment for Australian organisations to review AI adoption,
          identify governance gaps, and receive tailored next steps.
        </p>
        <div className="inline-flex items-center gap-4 text-xs text-stone-500 pt-1">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ~15–20 minutes
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Human-reviewed report within 5 business days
          </span>
        </div>
      </div>

      {/* Product Boundary Notice Card */}
      <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--color-ink)]">Product Boundary & Scope</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Please review how this assessment operates before starting.
            </p>
          </div>
        </div>

        <blockquote className="p-4 rounded-xl bg-stone-50 border-l-4 border-[var(--color-accent)] text-xs sm:text-sm text-stone-700 italic leading-relaxed">
          &ldquo;AI Blueprint by WHATBIT is a practical responsible AI readiness assessment. It is not legal,
          privacy, cyber security, employment, clinical or financial advice; it is not certification; and it does
          not determine whether an organisation is compliant with law. The result reflects the information
          provided and the use cases reviewed at the assessment date.&rdquo;
        </blockquote>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Assessment Outcome Levels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h4 className="text-xs font-bold text-emerald-950">Low</h4>
              </div>
              <p className="text-xs text-stone-600 leading-snug">
                Reviewed uses appear relatively contained and foundational controls are mostly present.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <h4 className="text-xs font-bold text-amber-950">Moderate</h4>
              </div>
              <p className="text-xs text-stone-600 leading-snug">
                One or more uses or control gaps need planned attention and structured follow-up.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/70 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <h4 className="text-xs font-bold text-purple-950">Higher Attention</h4>
              </div>
              <p className="text-xs text-stone-600 leading-snug">
                Context, impact, autonomy, data, or material control gaps warrant prompt, deeper review.
              </p>
            </div>
          </div>
        </div>

        {/* Consent acknowledgement */}
        <div className="pt-4 border-t border-[var(--color-line)] space-y-3">
          <label className="flex items-start gap-3.5 cursor-pointer group p-3 rounded-xl hover:bg-stone-50 transition-colors">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => onConsentChange(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)] border-stone-300 transition-colors cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-medium text-[var(--color-ink)] leading-snug select-none">
              I understand that this assessment is a practical readiness diagnostic, not legal or formal compliance advice, and I agree to proceed on this basis.
            </span>
          </label>

          {error && <p className="text-xs font-semibold text-red-600 px-3">{error}</p>}
        </div>
      </div>

      {/* Action button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onProceed}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 rounded-xl shadow-sm transition-all cursor-pointer"
        >
          Begin Assessment
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
