/// <reference types="vite/client" />
import type {
  AssessmentSubmissionV1,
  ToolRecord,
  UseCaseRecord,
  AttachmentRecord,
  YesPartlyNo,
} from "../types";
import {
  computeUseCaseTriage,
  computeOverallAttention,
  aggregateSuggestedControls,
  type OrgWideContext,
} from "./scoring";
import { computeCompletenessFlags, computeContradictionFlags } from "./completeness";
import { saveSubmittedBackup } from "./storage";

export interface BuildSubmissionParams {
  assessmentId: string;
  startedAt: string;
  consentedToScope: boolean;
  organisationAnswers: Record<string, unknown>;
  tools: ToolRecord[];
  useCases: UseCaseRecord[];
  attachments?: AttachmentRecord[];
}

export function assembleSubmissionPayload(params: BuildSubmissionParams): AssessmentSubmissionV1 {
  const {
    assessmentId,
    startedAt,
    consentedToScope,
    organisationAnswers,
    tools,
    useCases,
    attachments = [],
  } = params;

  const sectors = Array.isArray(organisationAnswers.Q03)
    ? (organisationAnswers.Q03 as string[])
    : [];

  const obligations = Array.isArray(organisationAnswers.Q05)
    ? (organisationAnswers.Q05 as string[])
    : [];

  const respondentVisibility = (organisationAnswers.Q04_confirm_visibility as YesPartlyNo) || "yes";

  // Build OrgWideContext for scoring engine
  const ctx: OrgWideContext = {
    orgAnswers: organisationAnswers,
    useCases,
    sectors,
  };

  // Run triage for each use case
  const computedUseCases: UseCaseRecord[] = useCases.map((uc) => {
    const computed = computeUseCaseTriage(uc, ctx);
    return {
      ...uc,
      computed,
    };
  });

  const overallAttention = computeOverallAttention(computedUseCases);
  const suggestedControls = aggregateSuggestedControls(computedUseCases);

  const organisation = {
    legal_or_trading_name: String(organisationAnswers.Q01_name || ""),
    abn: organisationAnswers.Q01_abn ? String(organisationAnswers.Q01_abn) : undefined,
    website: organisationAnswers.Q01_website ? String(organisationAnswers.Q01_website) : undefined,
    state_or_territory: String(organisationAnswers.Q01_state || ""),
    description: String(organisationAnswers.Q01_description || ""),
    size_band: String(organisationAnswers.Q02 || ""),
    sectors,
    possible_obligations: obligations,
  };

  const respondent = {
    name: String(organisationAnswers.Q04_name || ""),
    role: String(organisationAnswers.Q04_role_title || ""),
    email: String(organisationAnswers.Q04_email || ""),
    respondent_type: String(organisationAnswers.Q04_role_type || ""),
    organisation_wide_visibility: respondentVisibility,
  };

  const completenessFlags = computeCompletenessFlags({
    respondent,
    tools,
    use_cases: computedUseCases,
    organisation_answers: organisationAnswers,
  });

  const contradictionFlags = computeContradictionFlags(organisationAnswers);

  const payload: AssessmentSubmissionV1 = {
    schema_version: "whatbit_rai_readiness_v1",
    assessment_id: assessmentId,
    started_at: startedAt,
    submitted_at: new Date().toISOString(),
    consented_to_scope: consentedToScope,
    organisation,
    respondent,
    tools,
    organisation_answers: organisationAnswers,
    use_cases: computedUseCases,
    attachments,
    computed: {
      contradiction_flags: contradictionFlags,
      completeness_flags: completenessFlags,
      suggested_controls: suggestedControls,
      draft_overall_attention: overallAttention,
    },
  };

  return payload;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
  /** True when no real backend received this — it only exists in the
   * browser's local backup and (if the customer clicks it) a downloaded
   * JSON file. The UI MUST surface this to whoever is operating the site. */
  stubMode: boolean;
}

export async function submitAssessment(payload: AssessmentSubmissionV1): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_SUBMISSION_ENDPOINT;

  // Always keep a local backup before attempting network submission, so a
  // failed POST or an unconfigured endpoint never means total data loss —
  // only "it's sitting in this browser's localStorage until someone
  // downloads or resubmits it."
  saveSubmittedBackup(payload);

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      return { success: true, stubMode: false };
    } catch (err: any) {
      console.error("[AI Blueprint Submission Error]", err);
      return {
        success: false,
        stubMode: false,
        error: err.message || "Failed to transmit submission to the remote server.",
      };
    }
  }

  // Stub mode fallback — no real backend configured yet. This is loud on
  // purpose: silently reporting success here is how submissions quietly
  // disappear. `stubMode: true` must be surfaced in the UI, not just logged.
  console.warn(
    "[AI Blueprint Submission] ⚠ STUB MODE — no VITE_SUBMISSION_ENDPOINT configured. " +
      "This submission was NOT sent anywhere. It is backed up in this browser's " +
      "localStorage only. Set VITE_SUBMISSION_ENDPOINT before real customers use this.",
    payload,
  );

  return { success: true, stubMode: true };
}

export function downloadSubmissionJson(payload: AssessmentSubmissionV1) {
  try {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    const orgNameSanitized = (payload.organisation.legal_or_trading_name || "assessment")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    downloadAnchor.setAttribute(
      "download",
      `ai-blueprint-${orgNameSanitized}-${payload.assessment_id.slice(0, 8)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error("Failed to download JSON copy", err);
  }
}
