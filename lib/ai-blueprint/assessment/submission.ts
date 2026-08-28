import type {
  AssessmentSubmissionV1,
  AttachmentRecord,
  ToolRecord,
  UseCaseRecord,
  YesPartlyNo,
} from "./types";
import {
  computeUseCaseTriage,
  computeOverallAttention,
  aggregateSuggestedControls,
  type OrgWideContext,
} from "./scoring";
import { computeCompletenessFlags, computeContradictionFlags } from "./completeness";

/**
 * Assembles the full V1 submission payload — raw answers plus computed
 * triage — from in-progress wizard state. This is pure computation; the
 * whatbit-web API route is what actually persists it and is the only place
 * responsible for keeping the `computed` block out of customer-facing
 * responses (spec §9: "Do not expose E/G points through the customer
 * interface or report").
 */
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

  const ctx: OrgWideContext = {
    orgAnswers: organisationAnswers,
    useCases,
    sectors,
  };

  const computedUseCases: UseCaseRecord[] = useCases.map((uc) => ({
    ...uc,
    computed: computeUseCaseTriage(uc, ctx),
  }));

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

  return {
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
}
