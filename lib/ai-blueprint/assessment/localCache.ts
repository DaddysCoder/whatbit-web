import type { AttachmentRecord, ToolRecord, UseCaseRecord } from "./types";

const KEY_PREFIX = "whatbit_ai_blueprint_draft_v1_";

export interface DraftState {
  assessment_id: string;
  started_at: string;
  consented_to_scope: boolean;
  organisation_answers: Record<string, unknown>;
  tools: ToolRecord[];
  use_cases: UseCaseRecord[];
  attachments: AttachmentRecord[];
  step: number;
  active_use_case_index: number;
}

interface CachedDraft {
  savedAt: string;
  state: DraftState;
}

function cacheKey(token: string) {
  return `${KEY_PREFIX}${token}`;
}

/**
 * Crash-resilience fallback ONLY. The server (`/api/ai-blueprint/assessment/[token]`)
 * is the authoritative source of truth on load. This cache exists purely to
 * cover the narrow window between a keystroke and the debounced autosave PUT
 * reaching the server — e.g. the tab or browser crashes mid-edit. It is
 * written on every change and read back only when the server load fails, or
 * when the cache is demonstrably newer than the server's last save (see
 * `loadLocalDraft`'s `savedAt` field).
 */
export function saveLocalDraft(token: string, state: DraftState): void {
  try {
    const payload: CachedDraft = { savedAt: new Date().toISOString(), state };
    localStorage.setItem(cacheKey(token), JSON.stringify(payload));
  } catch {
    // best effort only — an unavailable localStorage must never block the assessment
  }
}

export function loadLocalDraft(token: string): CachedDraft | null {
  try {
    const raw = localStorage.getItem(cacheKey(token));
    return raw ? (JSON.parse(raw) as CachedDraft) : null;
  } catch {
    return null;
  }
}

export function clearLocalDraft(token: string): void {
  try {
    localStorage.removeItem(cacheKey(token));
  } catch {
    // ignore
  }
}
