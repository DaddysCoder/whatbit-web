import type {
  AssessmentRow,
  AssessmentDraft,
  ReviewerPatch,
  SubmitResult,
} from "./db";

export type { AssessmentRow, AssessmentDraft, ReviewerPatch, SubmitResult };

/**
 * Storage boundary for AI Blueprint assessments.
 *
 * CURRENT impl = D1/KV adapter (db.ts — `assessmentRepository` below maps
 * these exact functions, behaviour identical).
 * LATER = Nhost/Postgres adapter (Phase B). Route handlers should depend on
 * this interface so the swap is mechanical.
 */
export interface AssessmentRepository {
  createAssessment(input: {
    id: string;
    token: string;
    contactEmail: string;
    contactName?: string;
    stripeSessionId?: string;
  }): Promise<void>;
  getAssessmentByToken(token: string): Promise<AssessmentRow | null>;
  getAssessmentById(id: string): Promise<AssessmentRow | null>;
  listAssessments(status?: string): Promise<AssessmentRow[]>;
  saveAssessmentDraft(token: string, patch: Partial<AssessmentDraft>): Promise<AssessmentRow | null>;
  submitAssessmentFinal(token: string, draft: AssessmentDraft): Promise<SubmitResult | null>;
  updateAssessmentReview(id: string, patch: ReviewerPatch): Promise<AssessmentRow | null>;
  markDelivered(id: string): Promise<AssessmentRow | null>;
}
