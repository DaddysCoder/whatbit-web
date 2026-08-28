import type { AttachmentRecord, ToolRecord, UseCaseRecord } from "@/lib/ai-blueprint/assessment/types";

/**
 * Adapter between the ported wizard and whatbit-web's own backend
 * (`/api/ai-blueprint/assessment/[token]`) — replaces the standalone SPA's
 * localStorage-only persistence and stub POST. The server is authoritative;
 * `lib/ai-blueprint/assessment/localCache.ts` covers the crash-resilience
 * gap only (see that module's doc comment).
 *
 * Raw answers only travel over this API — `UseCaseRecord.computed` is never
 * set by the client and the server never echoes triage/score data back.
 */
export interface AssessmentDraftPayload {
  consentedToScope: boolean;
  organisationAnswers: Record<string, unknown>;
  tools: ToolRecord[];
  useCases: UseCaseRecord[];
  attachments: AttachmentRecord[];
  step: number;
  activeUseCaseIndex: number;
}

export type LoadOutcome =
  | {
      kind: "ok";
      status: string;
      updatedAt: string;
      assessmentId: string;
      startedAt: string;
      draft: AssessmentDraftPayload;
    }
  | { kind: "not_found" }
  | { kind: "already_submitted" }
  | { kind: "error" };

function endpoint(token: string) {
  return `/api/ai-blueprint/assessment/${encodeURIComponent(token)}`;
}

const SUBMITTED_STATUSES = new Set(["Submitted", "Reviewing", "Ready", "Delivered"]);

export async function loadAssessment(token: string): Promise<LoadOutcome> {
  try {
    const res = await fetch(endpoint(token));
    if (res.status === 404) return { kind: "not_found" };
    if (!res.ok) return { kind: "error" };

    const data = (await res.json()) as {
      status: string;
      updatedAt: string;
      assessmentId: string;
      startedAt: string;
      draft: AssessmentDraftPayload;
    };

    if (SUBMITTED_STATUSES.has(data.status)) return { kind: "already_submitted" };

    return { kind: "ok", ...data };
  } catch {
    return { kind: "error" };
  }
}

export async function saveAssessmentDraft(
  token: string,
  patch: Partial<AssessmentDraftPayload>,
): Promise<{ ok: boolean; updatedAt?: string }> {
  try {
    const res = await fetch(endpoint(token), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft: patch }),
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as { updatedAt?: string };
    return { ok: true, updatedAt: data.updatedAt };
  } catch {
    return { ok: false };
  }
}

export async function submitAssessmentDraft(
  token: string,
  draft: AssessmentDraftPayload,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(endpoint(token), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draft, submit: true }),
    });
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    if (!res.ok) {
      return { ok: false, error: data?.error || "Something went wrong submitting your assessment. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong submitting your assessment. Please try again." };
  }
}
