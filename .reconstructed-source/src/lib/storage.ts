const STORAGE_KEY = "whatbit_ai_blueprint_assessment_v1";
const SUBMITTED_BACKUP_KEY = "whatbit_ai_blueprint_submitted_backup_v1";

/**
 * Backup of the last assembled submission payload, kept in localStorage
 * regardless of whether the real submission endpoint is configured.
 *
 * This exists because of a real failure mode: if `VITE_SUBMISSION_ENDPOINT`
 * isn't set (or a real POST fails), the assessment is otherwise held only
 * in React state — closing the tab loses it permanently. This backup is a
 * safety net, not a substitute for a real backend; it lives in the
 * customer's own browser only.
 */
export function saveSubmittedBackup(payload: unknown): void {
  try {
    localStorage.setItem(SUBMITTED_BACKUP_KEY, JSON.stringify(payload));
  } catch {
    // ignore — best effort only
  }
}

export function loadSubmittedBackup(): unknown | null {
  try {
    const raw = localStorage.getItem(SUBMITTED_BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSubmittedBackup(): void {
  try {
    localStorage.removeItem(SUBMITTED_BACKUP_KEY);
  } catch {
    // ignore
  }
}

export interface DraftState {
  assessment_id: string;
  started_at: string;
  organisation_answers: Record<string, unknown>;
  tools: unknown[];
  use_cases: unknown[];
  attachments: unknown[];
  step: number;
  active_use_case_index: number;
}

export function loadDraft(): DraftState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DraftState;
  } catch {
    return null;
  }
}

export function saveDraft(state: DraftState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private browsing, quota) — fail silently;
    // the customer can still complete the assessment in one sitting.
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function newAssessmentId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ab-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
