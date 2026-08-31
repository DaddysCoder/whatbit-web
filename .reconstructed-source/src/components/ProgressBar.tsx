import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onSelectStep: (step: number) => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onSelectStep,
  isSaving,
  lastSaved,
}) => {
  // If we are on post-submit screen (step > totalSteps - 1), don't show full stepper
  if (currentStep >= totalSteps) {
    return null;
  }

  const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-line)] py-3 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-2.5">
        {/* Top bar: Brand & Auto-save status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
              <span className="font-extrabold text-sm tracking-tight text-[var(--color-ink)]">
                WHATBIT
              </span>
            </div>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold text-stone-600">
              AI Blueprint Readiness
            </span>
          </div>

          <div className="flex items-center gap-2 text-2xs text-stone-500">
            {isSaving ? (
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Saving draft...
              </span>
            ) : lastSaved ? (
              <span className="flex items-center gap-1 text-stone-500">
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Draft saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            ) : null}
          </div>
        </div>

        {/* Step indicator pills (desktop) */}
        <div className="hidden md:flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {stepTitles.map((title, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <button
                type="button"
                key={title}
                onClick={() => isCompleted && onSelectStep(idx)}
                disabled={!isCompleted && !isCurrent}
                className={`flex items-center gap-1.5 py-1 px-2 rounded-md text-2xs font-medium transition-all truncate ${
                  isCurrent
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-bold ring-1 ring-[var(--color-accent)]/30"
                    : isCompleted
                    ? "text-stone-700 hover:text-stone-900 cursor-pointer"
                    : "text-stone-400 cursor-not-allowed"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-3xs font-mono font-bold shrink-0 ${
                    isCurrent
                      ? "bg-[var(--color-accent)] text-white"
                      : isCompleted
                      ? "bg-stone-200 text-stone-700"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </span>
                <span className="truncate">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Compact progress bar (mobile & tablet) */}
        <div className="space-y-1 md:hidden">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
            <span>
              Step {currentStep + 1} of {totalSteps}: {stepTitles[currentStep]}
            </span>
            <span className="text-stone-500 font-mono text-2xs">{progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
