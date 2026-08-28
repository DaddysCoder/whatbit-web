import { useState, useEffect, useCallback, useRef } from "react";
import type { ToolRecord, UseCaseRecord, AttachmentRecord } from "../types";
import { loadDraft, saveDraft, clearDraft, newAssessmentId, type DraftState } from "../lib/storage";

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function useAssessmentForm() {
  const [assessmentId, setAssessmentId] = useState<string>(() => newAssessmentId());
  const [startedAt, setStartedAt] = useState<string>(() => new Date().toISOString());
  const [step, setStep] = useState<number>(0);
  const [consentedToScope, setConsentedToScope] = useState<boolean>(false);
  const [organisationAnswers, setOrganisationAnswers] = useState<Record<string, unknown>>({});
  const [tools, setTools] = useState<ToolRecord[]>([]);
  const [useCases, setUseCases] = useState<UseCaseRecord[]>([]);
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState<number>(0);
  const [attachments, setAttachments] = useState<AttachmentRecord[]>([]);

  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [pendingDraft, setPendingDraft] = useState<DraftState | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const isInitialized = useRef<boolean>(false);
  const saveTimeoutRef = useRef<number | null>(null);

  // Check for existing draft on initial mount
  useEffect(() => {
    const draft = loadDraft();
    if (
      draft &&
      (Object.keys(draft.organisation_answers || {}).length > 0 ||
        (draft.tools && draft.tools.length > 0) ||
        (draft.use_cases && draft.use_cases.length > 0))
    ) {
      setHasDraft(true);
      setPendingDraft(draft);
    }
    isInitialized.current = true;
  }, []);

  // Debounced auto-save whenever state changes
  useEffect(() => {
    if (!isInitialized.current || hasDraft) return;

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    saveTimeoutRef.current = window.setTimeout(() => {
      const stateToSave: DraftState = {
        assessment_id: assessmentId,
        started_at: startedAt,
        step,
        active_use_case_index: activeUseCaseIndex,
        organisation_answers: {
          ...organisationAnswers,
          __consented_to_scope: consentedToScope,
        },
        tools,
        use_cases: useCases,
        attachments,
      };

      saveDraft(stateToSave);
      setLastSaved(new Date());
      setIsSaving(false);
    }, 400);

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    assessmentId,
    startedAt,
    step,
    activeUseCaseIndex,
    consentedToScope,
    organisationAnswers,
    tools,
    useCases,
    attachments,
    hasDraft,
  ]);

  const resumeDraft = useCallback(() => {
    if (!pendingDraft) return;
    setAssessmentId(pendingDraft.assessment_id || newAssessmentId());
    setStartedAt(pendingDraft.started_at || new Date().toISOString());
    setStep(pendingDraft.step || 0);
    setActiveUseCaseIndex(pendingDraft.active_use_case_index || 0);

    const orgAns = pendingDraft.organisation_answers || {};
    setConsentedToScope(Boolean(orgAns.__consented_to_scope));
    setOrganisationAnswers(orgAns);

    setTools((pendingDraft.tools as ToolRecord[]) || []);
    setUseCases((pendingDraft.use_cases as UseCaseRecord[]) || []);
    setAttachments((pendingDraft.attachments as AttachmentRecord[]) || []);

    setHasDraft(false);
    setPendingDraft(null);
  }, [pendingDraft]);

  const startFresh = useCallback(() => {
    clearDraft();
    setAssessmentId(newAssessmentId());
    setStartedAt(new Date().toISOString());
    setStep(0);
    setConsentedToScope(false);
    setOrganisationAnswers({});
    setTools([]);
    setUseCases([]);
    setActiveUseCaseIndex(0);
    setAttachments([]);
    setHasDraft(false);
    setPendingDraft(null);
  }, []);

  const setAnswer = useCallback((key: string, value: unknown) => {
    setOrganisationAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setUseCaseAnswer = useCallback(
    (useCaseIdx: number, key: string, value: unknown) => {
      setUseCases((prev) => {
        const next = [...prev];
        if (!next[useCaseIdx]) return prev;
        next[useCaseIdx] = {
          ...next[useCaseIdx],
          answers: {
            ...next[useCaseIdx].answers,
            [key]: value,
          },
        };
        return next;
      });
    },
    [],
  );

  const addTool = useCallback((tool: ToolRecord) => {
    setTools((prev) => {
      if (prev.length >= 10) return prev;
      return [...prev, tool];
    });
  }, []);

  const updateTool = useCallback((toolId: string, updated: Partial<ToolRecord>) => {
    setTools((prev) =>
      prev.map((t) => (t.tool_id === toolId ? { ...t, ...updated } : t)),
    );
  }, []);

  const removeTool = useCallback((toolId: string) => {
    setTools((prev) => prev.filter((t) => t.tool_id !== toolId));
    // Also remove tool references from linked use-cases
    setUseCases((prev) =>
      prev.map((uc) => ({
        ...uc,
        linked_tool_ids: uc.linked_tool_ids.filter((id) => id !== toolId),
      })),
    );
  }, []);

  const addUseCase = useCallback((useCase: UseCaseRecord) => {
    setUseCases((prev) => {
      if (prev.length >= 3) return prev;
      return [...prev, useCase];
    });
  }, []);

  const updateUseCase = useCallback(
    (useCaseId: string, updated: Partial<UseCaseRecord>) => {
      setUseCases((prev) =>
        prev.map((uc) => (uc.use_case_id === useCaseId ? { ...uc, ...updated } : uc)),
      );
    },
    [],
  );

  const removeUseCase = useCallback((useCaseId: string) => {
    setUseCases((prev) => {
      const next = prev.filter((uc) => uc.use_case_id !== useCaseId);
      return next;
    });
    setActiveUseCaseIndex((prevIdx) => Math.max(0, prevIdx - 1));
  }, []);

  // Step validation helpers
  const validateStep = useCallback(
    (stepIdx: number): FormValidationResult => {
      const errors: Record<string, string> = {};

      if (stepIdx === 0) {
        if (!consentedToScope) {
          errors.consented_to_scope = "You must acknowledge the assessment boundary to proceed.";
        }
      } else if (stepIdx === 1) {
        // Org Profile Step
        if (!organisationAnswers.Q01_name) errors.Q01_name = "Legal or trading name is required.";
        if (!organisationAnswers.Q01_state) errors.Q01_state = "Please select the main state or territory.";
        if (!organisationAnswers.Q01_description) errors.Q01_description = "Please provide a brief description.";
        if (!organisationAnswers.Q02) errors.Q02 = "Please select your organisation size.";
        if (!Array.isArray(organisationAnswers.Q03) || organisationAnswers.Q03.length === 0) {
          errors.Q03 = "Please select at least one area of work.";
        }
        if (!organisationAnswers.Q04_name) errors.Q04_name = "Your name is required.";
        if (!organisationAnswers.Q04_role_title) errors.Q04_role_title = "Your role title is required.";
        if (!organisationAnswers.Q04_email) errors.Q04_email = "Your email address is required.";
        if (!organisationAnswers.Q04_role_type) errors.Q04_role_type = "Please select your role type.";
        if (!organisationAnswers.Q04_confirm_visibility) errors.Q04_confirm_visibility = "Please confirm your organisation visibility.";
        if (!Array.isArray(organisationAnswers.Q05) || organisationAnswers.Q05.length === 0) {
          errors.Q05 = "Please select applicable obligations, None known, or Not sure.";
        }
      } else if (stepIdx === 2) {
        // Tool Inventory Step
        if (tools.length === 0) {
          errors.tools = "Please record at least one current or planned AI tool.";
        }
        if (!organisationAnswers.Q07) errors.Q07 = "Please answer the unapproved AI usage question.";
        if (!Array.isArray(organisationAnswers.Q08) || organisationAnswers.Q08.length === 0) {
          errors.Q08 = "Please select at least one purpose for which AI is used across the organisation.";
        }
      } else if (stepIdx === 3) {
        // Use Case Selection Step
        if (useCases.length === 0) {
          errors.use_cases = "Please add at least one material AI use case (up to 3).";
        }
      } else if (stepIdx === 4) {
        // Use Case Module Step — validate EVERY use case, not just the
        // currently active tab, since a customer can switch tabs without
        // finishing the one they leave.
        if (useCases.length === 0) {
          errors.use_cases = "No use cases found. Please go back to select a use case.";
        } else {
          let firstIncompleteIdx: number | null = null;
          useCases.forEach((uc, idx) => {
            const missing: string[] = [];
            if (!uc.answers.Q10_frequency) missing.push("Q10_frequency");
            if (!uc.answers.Q10_reach) missing.push("Q10_reach");
            if (!Array.isArray(uc.answers.Q11) || (uc.answers.Q11 as string[]).length === 0) {
              missing.push("Q11");
            }
            if (!uc.answers.Q11_preapproval) missing.push("Q11_preapproval");
            if (!Array.isArray(uc.answers.Q12) || (uc.answers.Q12 as string[]).length === 0) {
              missing.push("Q12");
            }
            if (missing.length > 0 && firstIncompleteIdx === null) {
              firstIncompleteIdx = idx;
            }
            if (missing.length > 0) {
              errors[`use_case_${idx}_incomplete`] = `"${uc.name || `Use case ${idx + 1}`}" is missing required answers (Q10–Q12).`;
            }
          });
          if (firstIncompleteIdx !== null) {
            errors.active_use_case_index_to_focus = String(firstIncompleteIdx);
          }
        }
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
    [consentedToScope, organisationAnswers, tools, useCases, activeUseCaseIndex],
  );

  return {
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
    setTools,
    useCases,
    addUseCase,
    updateUseCase,
    removeUseCase,
    setUseCases,
    activeUseCaseIndex,
    setActiveUseCaseIndex,
    setUseCaseAnswer,
    attachments,
    setAttachments,
    hasDraft,
    resumeDraft,
    startFresh,
    lastSaved,
    isSaving,
    validateStep,
  };
}
