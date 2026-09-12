// AI Blueprint by WHATBIT — types mirroring spec §9 "Implementation data
// structure" as closely as practical for a client-side form. Internal
// scoring fields (`computed`) are populated client-side for hand-off to
// the reviewer/report pipeline and are NEVER rendered in the customer UI.

export type AttentionLevel = "low" | "moderate" | "higher_attention";
export type UseStatus = "planned" | "trial" | "live" | "paused";
export type YesPartlyNo = "yes" | "partly" | "no";

export type ScreeningFlag = "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7";
export type UrgentFlag =
  | "U1"
  | "U2"
  | "U3"
  | "U4"
  | "U5"
  | "U6"
  | "U7"
  | "U8";

export interface ToolRecord {
  tool_id: string;
  name: string;
  provider?: string;
  status: "in_use" | "trial" | "planned" | "retired";
  account_type: string;
  approval_status: string;
  business_areas: string[];
  purpose: string;
}

export interface UseCaseRecord {
  use_case_id: string;
  name: string;
  linked_tool_ids: string[];
  business_purpose: string;
  team: string;
  status: UseStatus;
  users_or_recipients: string;
  accountable_person?: string;
  // Q10–Q19 answers for this specific use case, keyed by question id.
  answers: Record<string, unknown>;
  computed?: ComputedUseCaseTriage;
}

export interface ComputedUseCaseTriage {
  exposure_points: number;
  control_gap_points: number;
  exposure_band: "contained" | "material" | "elevated";
  gap_band: "supported" | "developing" | "material_gaps";
  screening_flags: ScreeningFlag[];
  urgent_flags: UrgentFlag[];
  draft_attention: AttentionLevel;
  recommended_control_ids: string[];
}

export interface AttachmentRecord {
  attachment_id: string;
  filename: string;
  description?: string;
  customer_confirmed_redacted: boolean;
}

export interface AssessmentSubmissionV1 {
  schema_version: "whatbit_rai_readiness_v1";
  assessment_id: string;
  started_at: string;
  submitted_at?: string;
  consented_to_scope: boolean;

  organisation: {
    legal_or_trading_name: string;
    abn?: string;
    website?: string;
    state_or_territory: string;
    description: string;
    size_band: string;
    sectors: string[];
    possible_obligations: string[];
  };

  respondent: {
    name: string;
    role: string;
    email: string;
    respondent_type: string;
    organisation_wide_visibility: YesPartlyNo;
  };

  tools: ToolRecord[];

  // Q07, Q08, Q20–Q35, keyed by question id.
  organisation_answers: Record<string, unknown>;

  use_cases: UseCaseRecord[];

  attachments: AttachmentRecord[];

  computed: {
    contradiction_flags: string[];
    completeness_flags: string[];
    suggested_controls: string[]; // C01–C22
    draft_overall_attention: AttentionLevel;
  };
}

// ---- Question-definition types (form engine, not part of the customer
// payload schema above) ---------------------------------------------------

export type AnswerKind =
  | "org_profile" // Q01 structured org fields
  | "single_select"
  | "multi_select"
  | "short_text"
  | "long_text"
  | "tool_repeat_group" // Q06
  | "use_case_repeat_group" // Q09
  | "compound"; // e.g. Q11 (multi-select + follow-up single-select)

export interface OptionDef {
  value: string;
  label: string;
}

export interface FollowUpDef {
  id: string; // sub-question id, e.g. "Q11_preapproval"
  prompt: string;
  kind: "single_select" | "short_text" | "long_text" | "multi_select";
  options?: OptionDef[];
  maxLength?: number;
  /** Only show this follow-up if the parent answer matches. */
  showIf?: (parentAnswer: unknown, allAnswers: Record<string, unknown>) => boolean;
}

export interface QuestionDef {
  id: string; // "Q01".."Q35"
  section: "A" | "B" | "C" | "D" | "E" | "F";
  perUseCase?: boolean; // true for Q10–Q19
  prompt: string;
  helper?: string;
  kind: AnswerKind;
  options?: OptionDef[];
  maxLength?: number;
  followUps?: FollowUpDef[];
  /** Section §5 branching: whether this question is shown at all. */
  visibleIf?: (
    answers: Record<string, unknown>,
    useCaseAnswers?: Record<string, unknown>,
  ) => boolean;
  /** Marks fields the reviewer treats as uncertainty rather than a hard "no". */
  hasNotSure?: boolean;
}
