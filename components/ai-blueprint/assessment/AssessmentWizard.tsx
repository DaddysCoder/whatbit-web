"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { ConsentStep } from "./steps/ConsentStep";
import { OrgProfileStep } from "./steps/OrgProfileStep";
import { ToolInventoryStep } from "./steps/ToolInventoryStep";
import { UseCaseSelectStep } from "./steps/UseCaseSelectStep";
import { UseCaseModuleStep } from "./steps/UseCaseModuleStep";
import { GovernanceStep } from "./steps/GovernanceStep";
import { PeopleTransparencyStep } from "./steps/PeopleTransparencyStep";
import { VendorsRecordsStep } from "./steps/VendorsRecordsStep";
import { ReviewSubmitStep } from "./steps/ReviewSubmitStep";
import { useAssessmentWizard, type WizardInitialState } from "./useAssessmentWizard";
import styles from "./assessment.module.css";

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

export function AssessmentWizard({
  token,
  initial,
  preview = false,
}: {
  token: string;
  initial: WizardInitialState;
  preview?: boolean;
}) {
  const router = useRouter();
  const {
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
    lastSaved,
    isSaving,
    validateStep,
    submit,
  } = useAssessmentWizard(token, initial, { preview });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNextStep = () => {
    const { isValid, errors } = validateStep(step);
    if (!isValid) {
      setStepErrors(errors);
      if (step === 4 && errors.active_use_case_index_to_focus !== undefined) {
        setActiveUseCaseIndex(Number(errors.active_use_case_index_to_focus));
      }
      scrollTop();
      return;
    }
    setStepErrors({});
    setStep(step + 1);
    scrollTop();
  };

  const handlePrevStep = () => {
    setStepErrors({});
    setStep(Math.max(0, step - 1));
    scrollTop();
  };

  const handleGoToStep = (targetStep: number) => {
    setStepErrors({});
    setStep(targetStep);
    scrollTop();
  };

  const handleSubmit = async () => {
    for (let s = 0; s <= 7; s++) {
      const { isValid, errors } = validateStep(s);
      if (!isValid) {
        setStep(s);
        setStepErrors(errors);
        scrollTop();
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    const result = await submit();
    setIsSubmitting(false);

    if (result.ok) {
      router.push("/ai-blueprint/submitted");
    } else {
      setSubmitError(result.error || "There was an error submitting your assessment. Please try again.");
    }
  };

  return (
    <div className={styles.root}>
      {preview && (
        <div
          style={{
            background: "#171717",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            textAlign: "center",
            padding: "6px 12px",
            letterSpacing: "0.03em",
          }}
        >
          PREVIEW MODE — nothing here is saved or submitted
        </div>
      )}
      <ProgressBar
        currentStep={step}
        totalSteps={STEP_TITLES.length}
        stepTitles={STEP_TITLES}
        onSelectStep={handleGoToStep}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      <main className={styles.main}>
        {step === 0 && (
          <ConsentStep consented={consentedToScope} onConsentChange={setConsentedToScope} onProceed={handleNextStep} error={stepErrors.consented_to_scope} />
        )}

        {step === 1 && <OrgProfileStep answers={organisationAnswers} onChange={setAnswer} errors={stepErrors} />}

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

        {step === 5 && <GovernanceStep answers={organisationAnswers} onChange={setAnswer} errors={stepErrors} />}

        {step === 6 && <PeopleTransparencyStep answers={organisationAnswers} onChange={setAnswer} errors={stepErrors} />}

        {step === 7 && <VendorsRecordsStep answers={organisationAnswers} onChange={setAnswer} errors={stepErrors} />}

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

        {step > 0 && step < 8 && (
          <div className={styles.footerRow}>
            <button type="button" onClick={handlePrevStep} className={styles.buttonSecondary}>
              ← Previous
            </button>
            <button type="button" onClick={handleNextStep} className={styles.buttonPrimary}>
              Save & Continue →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
