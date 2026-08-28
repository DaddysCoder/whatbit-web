import React, { useState } from "react";
import type { AssessmentSubmissionV1 } from "./types";
import { useAssessmentForm } from "./hooks/useAssessmentForm";
import { ProgressBar } from "./components/ProgressBar";
import { ConsentStep } from "./components/steps/ConsentStep";
import { OrgProfileStep } from "./components/steps/OrgProfileStep";
import { ToolInventoryStep } from "./components/steps/ToolInventoryStep";
import { UseCaseSelectStep } from "./components/steps/UseCaseSelectStep";
import { UseCaseModuleStep } from "./components/steps/UseCaseModuleStep";
import { GovernanceStep } from "./components/steps/GovernanceStep";
import { PeopleTransparencyStep } from "./components/steps/PeopleTransparencyStep";
import { VendorsRecordsStep } from "./components/steps/VendorsRecordsStep";
import { ReviewSubmitStep } from "./components/steps/ReviewSubmitStep";
import { PostSubmitScreen } from "./components/steps/PostSubmitScreen";
import {
  assembleSubmissionPayload,
  submitAssessment,
  downloadSubmissionJson,
} from "./lib/submission";
import { clearDraft } from "./lib/storage";

const STEP_TITLES = [
  "Scope & Consent",
  "Organisation",
  "Tool Inventory",
  "Material Uses",
  "Use Case Assessment",
  "Governance",
  "People & Training",
  "Vendors & Records",
  "Review & Submit",
];

export default function App() {
  const {
    assessmentId,
    startedAt,
    step,
    setStep,
    consentedToScope,
    setConsentedToScope,
    organisationAnswers,
    setAnswer,
    tools,
    addTool,
    updateTool,
    removeTool,
    useCases,
    addUseCase,
    updateUseCase,
    removeUseCase,
    activeUseCaseIndex,
    setActiveUseCaseIndex,
    setUseCaseAnswer,
    attachments,
    hasDraft,
    resumeDraft,
    startFresh,
    lastSaved,
    isSaving,
    validateStep,
  } = useAssessmentForm();

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [completedSubmission, setCompletedSubmission] = useState<AssessmentSubmissionV1 | null>(
    null,
  );
  const [submissionWasStubbed, setSubmissionWasStubbed] = useState<boolean>(false);

  const handleNextStep = () => {
    const { isValid, errors } = validateStep(step);
    if (!isValid) {
      setStepErrors(errors);
      // If the failure is "one of the use cases is incomplete", jump the
      // active tab to it — otherwise the customer sees an error banner
      // while looking at a tab that's already fine.
      if (step === 4 && errors.active_use_case_index_to_focus !== undefined) {
        setActiveUseCaseIndex(Number(errors.active_use_case_index_to_focus));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStepErrors({});
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStepErrors({});
    setStep(Math.max(0, step - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToStep = (targetStep: number) => {
    setStepErrors({});
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    // Run full validation across all steps before submit
    for (let s = 0; s <= 7; s++) {
      const { isValid, errors } = validateStep(s);
      if (!isValid) {
        setStep(s);
        setStepErrors(errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    const payload = assembleSubmissionPayload({
      assessmentId,
      startedAt,
      consentedToScope,
      organisationAnswers,
      tools,
      useCases,
      attachments,
    });

    const result = await submitAssessment(payload);
    setIsSubmitting(false);

    if (result.success) {
      clearDraft();
      setCompletedSubmission(payload);
      setSubmissionWasStubbed(result.stubMode);
      setStep(9); // Post submit screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitError(
        result.error || "There was an error submitting your assessment. Please try again.",
      );
    }
  };

  const handleDownloadCopy = () => {
    if (completedSubmission) {
      downloadSubmissionJson(completedSubmission);
    } else {
      const payload = assembleSubmissionPayload({
        assessmentId,
        startedAt,
        consentedToScope,
        organisationAnswers,
        tools,
        useCases,
        attachments,
      });
      downloadSubmissionJson(payload);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-accent)]">
      {/* Draft Resume Modal Dialog */}
      {hasDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[var(--color-line)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center font-bold">
                ↻
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--color-ink)]">
                  Resume your assessment?
                </h3>
                <p className="text-xs text-stone-500">
                  We found a previous draft saved on this device.
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Would you like to continue where you left off, or discard the saved progress and start a
              fresh assessment?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={startFresh}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                Start Fresh
              </button>
              <button
                type="button"
                onClick={resumeDraft}
                className="px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 rounded-lg shadow-xs transition-all cursor-pointer"
              >
                Resume Saved Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Progress & Brand Header */}
      <ProgressBar
        currentStep={step}
        totalSteps={STEP_TITLES.length}
        stepTitles={STEP_TITLES}
        onSelectStep={handleGoToStep}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {step === 0 && (
          <ConsentStep
            consented={consentedToScope}
            onConsentChange={setConsentedToScope}
            onProceed={handleNextStep}
            error={stepErrors.consented_to_scope}
          />
        )}

        {step === 1 && (
          <OrgProfileStep
            answers={organisationAnswers}
            onChange={setAnswer}
            errors={stepErrors}
          />
        )}

        {step === 2 && (
          <ToolInventoryStep
            tools={tools}
            onAddTool={addTool}
            onUpdateTool={updateTool}
            onRemoveTool={removeTool}
            answers={organisationAnswers}
            onChangeAnswer={setAnswer}
            errors={stepErrors}
          />
        )}

        {step === 3 && (
          <UseCaseSelectStep
            useCases={useCases}
            tools={tools}
            onAddUseCase={addUseCase}
            onUpdateUseCase={updateUseCase}
            onRemoveUseCase={removeUseCase}
            errors={stepErrors}
          />
        )}

        {step === 4 && (
          <UseCaseModuleStep
            useCases={useCases}
            activeUseCaseIndex={activeUseCaseIndex}
            onSelectUseCaseIndex={setActiveUseCaseIndex}
            orgAnswers={organisationAnswers}
            onUseCaseAnswerChange={setUseCaseAnswer}
            availableTools={tools}
            errors={stepErrors}
          />
        )}

        {step === 5 && (
          <GovernanceStep
            answers={organisationAnswers}
            onChange={setAnswer}
            errors={stepErrors}
          />
        )}

        {step === 6 && (
          <PeopleTransparencyStep
            answers={organisationAnswers}
            onChange={setAnswer}
            errors={stepErrors}
          />
        )}

        {step === 7 && (
          <VendorsRecordsStep
            answers={organisationAnswers}
            onChange={setAnswer}
            errors={stepErrors}
          />
        )}

        {step === 8 && (
          <ReviewSubmitStep
            orgAnswers={organisationAnswers}
            tools={tools}
            useCases={useCases}
            onGoToStep={handleGoToStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {step === 9 && completedSubmission && (
          <PostSubmitScreen
            submission={completedSubmission}
            onDownloadJson={handleDownloadCopy}
            onStartNew={startFresh}
            stubMode={submissionWasStubbed}
          />
        )}

        {/* Wizard Footer Navigation Buttons (Steps 1 to 7) */}
        {step > 0 && step < 8 && (
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 pt-8 mt-8 border-t border-[var(--color-line)]">
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Save & Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--color-line)]/80 py-6 px-4 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Blueprint by WHATBIT • Responsible AI Readiness Assessment (V1.1)</span>
          <span>© 2026 WHATBIT. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
