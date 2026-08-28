"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AttachmentRecord, ToolRecord, UseCaseRecord } from "@/lib/ai-blueprint/assessment/types";
import { loadLocalDraft, saveLocalDraft, clearLocalDraft } from "@/lib/ai-blueprint/assessment/localCache";
import { saveAssessmentDraft, submitAssessmentDraft, type AssessmentDraftPayload } from "./api";

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface WizardInitialState {
  assessmentId: string;
  startedAt: string;
  updatedAt: string;
  draft: AssessmentDraftPayload;
}

/**
 * Owns all in-progress wizard state and persistence. The server is
 * authoritative on load: `initial` is whatever the page's server fetch
 * returned. The one exception is a narrow crash-resilience case — if this
 * browser's local cache for this token is newer than the server's last
 * recorded save (i.e. a debounced autosave never landed before the tab
 * closed), that local snapshot is used instead so the customer doesn't lose
 * work. Every change after that autosaves to both the local cache and the
 * server.
 */
export function useAssessmentWizard(token: string, initial: WizardInitialState) {
  const recovered = (() => {
    const cached = loadLocalDraft(token);
    if (cached && cached.savedAt > initial.updatedAt) return cached.state;
    return null;
  })();

  const seed: AssessmentDraftPayload = recovered
    ? {
        consentedToScope: recovered.consented_to_scope,
        organisationAnswers: recovered.organisation_answers,
        tools: recovered.tools,
        useCases: recovered.use_cases,
        attachments: recovered.attachments,
        step: recovered.step,
        activeUseCaseIndex: recovered.active_use_case_index,
      }
    : initial.draft;

  const [step, setStep] = useState<number>(seed.step);
  const [consentedToScope, setConsentedToScope] = useState<boolean>(seed.consentedToScope);
  const [organisationAnswers, setOrganisationAnswers] = useState<Record<string, unknown>>(seed.organisationAnswers);
  const [tools, setTools] = useState<ToolRecord[]>(seed.tools);
  const [useCases, setUseCases] = useState<UseCaseRecord[]>(seed.useCases);
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState<number>(seed.activeUseCaseIndex);
  const [attachments] = useState<AttachmentRecord[]>(seed.attachments);

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const isInitialized = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isInitialized.current = true;
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized.current) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(() => {
      const draft: AssessmentDraftPayload = {
        consentedToScope,
        organisationAnswers,
        tools,
        useCases,
        attachments,
        step,
        activeUseCaseIndex,
      };

      saveLocalDraft(token, {
        assessment_id: initial.assessmentId,
        started_at: initial.startedAt,
        consented_to_scope: draft.consentedToScope,
        organisation_answers: draft.organisationAnswers,
        tools: draft.tools,
        use_cases: draft.useCases,
        attachments: draft.attachments,
        step: draft.step,
        active_use_case_index: draft.activeUseCaseIndex,
      });

      saveAssessmentDraft(token, draft).then((result) => {
        setIsSaving(false);
        if (result.ok) setLastSaved(new Date());
      });
    }, 500);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [token, initial.assessmentId, initial.startedAt, step, activeUseCaseIndex, consentedToScope, organisationAnswers, tools, useCases, attachments]);

  const setAnswer = useCallback((key: string, value: unknown) => {
    setOrganisationAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setUseCaseAnswer = useCallback((useCaseIdx: number, key: string, value: unknown) => {
    setUseCases((prev) => {
      const next = [...prev];
      if (!next[useCaseIdx]) return prev;
      next[useCaseIdx] = { ...next[useCaseIdx], answers: { ...next[useCaseIdx].answers, [key]: value } };
      return next;
    });
  }, []);

  const addTool = useCallback((tool: ToolRecord) => {
    setTools((prev) => (prev.length >= 10 ? prev : [...prev, tool]));
  }, []);

  const updateTool = useCallback((toolId: string, updated: Partial<ToolRecord>) => {
    setTools((prev) => prev.map((t) => (t.tool_id === toolId ? { ...t, ...updated } : t)));
  }, []);

  const removeTool = useCallback((toolId: string) => {
    setTools((prev) => prev.filter((t) => t.tool_id !== toolId));
    setUseCases((prev) => prev.map((uc) => ({ ...uc, linked_tool_ids: uc.linked_tool_ids.filter((id) => id !== toolId) })));
  }, []);

  const addUseCase = useCallback((useCase: UseCaseRecord) => {
    setUseCases((prev) => (prev.length >= 3 ? prev : [...prev, useCase]));
  }, []);

  const updateUseCase = useCallback((useCaseId: string, updated: Partial<UseCaseRecord>) => {
    setUseCases((prev) => prev.map((uc) => (uc.use_case_id === useCaseId ? { ...uc, ...updated } : uc)));
  }, []);

  const removeUseCase = useCallback((useCaseId: string) => {
    setUseCases((prev) => prev.filter((uc) => uc.use_case_id !== useCaseId));
    setActiveUseCaseIndex((prevIdx) => Math.max(0, prevIdx - 1));
  }, []);

  // Step validation — mirrors the original SPA's rules, including the fix
  // that validates EVERY use case on step 4 (not just the active tab) and
  // reports which one to focus.
  const validateStep = useCallback(
    (stepIdx: number): FormValidationResult => {
      const errors: Record<string, string> = {};

      if (stepIdx === 0) {
        if (!consentedToScope) errors.consented_to_scope = "You must acknowledge the assessment boundary to proceed.";
      } else if (stepIdx === 1) {
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
        if (tools.length === 0) errors.tools = "Please record at least one current or planned AI tool.";
        if (!organisationAnswers.Q07) errors.Q07 = "Please answer the unapproved AI usage question.";
        if (!Array.isArray(organisationAnswers.Q08) || organisationAnswers.Q08.length === 0) {
          errors.Q08 = "Please select at least one purpose for which AI is used across the organisation.";
        }
      } else if (stepIdx === 3) {
        if (useCases.length === 0) errors.use_cases = "Please add at least one material AI use case (up to 3).";
      } else if (stepIdx === 4) {
        // Validate EVERY use case, not just the currently active tab — a
        // customer can switch tabs without finishing the one they leave.
        if (useCases.length === 0) {
          errors.use_cases = "No use cases found. Please go back to select a use case.";
        } else {
          let firstIncompleteIdx: number | null = null;
          useCases.forEach((uc, idx) => {
            const missing: string[] = [];
            if (!uc.answers.Q10_frequency) missing.push("Q10_frequency");
            if (!uc.answers.Q10_reach) missing.push("Q10_reach");
            if (!Array.isArray(uc.answers.Q11) || (uc.answers.Q11 as string[]).length === 0) missing.push("Q11");
            if (!uc.answers.Q11_preapproval) missing.push("Q11_preapproval");
            if (!Array.isArray(uc.answers.Q12) || (uc.answers.Q12 as string[]).length === 0) missing.push("Q12");
            if (missing.length > 0 && firstIncompleteIdx === null) firstIncompleteIdx = idx;
            if (missing.length > 0) {
              errors[`use_case_${idx}_incomplete`] = `"${uc.name || `Use case ${idx + 1}`}" is missing required answers (Q10–Q12).`;
            }
          });
          if (firstIncompleteIdx !== null) errors.active_use_case_index_to_focus = String(firstIncompleteIdx);
        }
      }

      return { isValid: Object.keys(errors).length === 0, errors };
    },
    [consentedToScope, organisationAnswers, tools, useCases],
  );

  const submit = useCallback(async () => {
    const draft: AssessmentDraftPayload = {
      consentedToScope,
      organisationAnswers,
      tools,
      useCases,
      attachments,
      step,
      activeUseCaseIndex,
    };
    const result = await submitAssessmentDraft(token, draft);
    if (result.ok) clearLocalDraft(token);
    return result;
  }, [token, consentedToScope, organisationAnswers, tools, useCases, attachments, step, activeUseCaseIndex]);

  return {
    assessmentId: initial.assessmentId,
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
  };
}
