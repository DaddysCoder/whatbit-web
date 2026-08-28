import { NextResponse } from "next/server";
import {
  draftFromRow,
  getAssessmentByToken,
  saveAssessmentDraft,
  submitAssessmentFinal,
  type AssessmentDraft,
} from "@/lib/ai-blueprint/db";
import { sendAiBlueprintEmail } from "@/lib/ai-blueprint/email";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "hello@primitiveai.com.au";
const SUBMITTED_STATUSES = new Set(["Submitted", "Reviewing", "Ready", "Delivered"]);
const MAX_BODY_BYTES = 300_000;

type RouteParams = { params: Promise<{ token: string }> };

// NOTE: this response shape must never include `submission_json` /
// `computed` triage data (E/G points, S/U flags, draft attention) — those
// are reviewer-only (see lib/ai-blueprint/db.ts's submissionFromRow doc
// comment) and are simply never read here.
export async function GET(_request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const { token } = await params;
  const row = await getAssessmentByToken(token);
  if (!row) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  if (SUBMITTED_STATUSES.has(row.status)) {
    return NextResponse.json({ status: row.status, updatedAt: row.updated_at });
  }

  return NextResponse.json({
    status: row.status,
    updatedAt: row.updated_at,
    assessmentId: row.id,
    startedAt: row.started_at || row.purchased_at || row.created_at,
    draft: draftFromRow(row),
  });
}

/** Caps array/object sizes generously — the client already enforces per-field
 * character limits and record counts; this is a blunt defence against abuse,
 * not a re-implementation of the spec's exact field-level validation. */
function sanitizeDraftPatch(input: unknown): Partial<AssessmentDraft> {
  const patch: Partial<AssessmentDraft> = {};
  if (!input || typeof input !== "object") return patch;
  const body = input as Record<string, unknown>;

  if (typeof body.consentedToScope === "boolean") patch.consentedToScope = body.consentedToScope;

  if (body.organisationAnswers && typeof body.organisationAnswers === "object" && !Array.isArray(body.organisationAnswers)) {
    patch.organisationAnswers = body.organisationAnswers as Record<string, unknown>;
  }

  if (Array.isArray(body.tools)) {
    patch.tools = body.tools.slice(0, 10) as AssessmentDraft["tools"];
  }

  if (Array.isArray(body.useCases)) {
    // Never trust a client-supplied `.computed` block — strip it if present
    // so a tampered request can't smuggle a fabricated triage result in.
    patch.useCases = body.useCases.slice(0, 3).map((uc) => {
      if (uc && typeof uc === "object") {
        const rest = { ...(uc as Record<string, unknown>) };
        delete rest.computed;
        return rest;
      }
      return uc;
    }) as AssessmentDraft["useCases"];
  }

  if (Array.isArray(body.attachments)) {
    patch.attachments = body.attachments.slice(0, 20) as AssessmentDraft["attachments"];
  }

  if (typeof body.step === "number") patch.step = Math.max(0, Math.min(8, Math.round(body.step)));
  if (typeof body.activeUseCaseIndex === "number") {
    patch.activeUseCaseIndex = Math.max(0, Math.min(2, Math.round(body.activeUseCaseIndex)));
  }

  return patch;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const { token } = await params;
  const row = await getAssessmentByToken(token);
  if (!row) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  if (SUBMITTED_STATUSES.has(row.status)) {
    return NextResponse.json({ error: "This assessment has already been submitted." }, { status: 409 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: { draft?: unknown; submit?: boolean };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch = sanitizeDraftPatch(body.draft);

  if (body.submit) {
    const merged: AssessmentDraft = { ...draftFromRow(row), ...patch };
    const result = await submitAssessmentFinal(token, merged);
    if (!result) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

    await sendAiBlueprintEmail(
      CONTACT_EMAIL,
      `[AI Blueprint] Assessment submitted — ${result.row.business_name || "(no name)"}`,
      [
        `${result.row.business_name || "A customer"} has submitted their AI Blueprint assessment.`,
        "",
        `Review it in the admin queue: ${SITE_URL}/admin/ai-blueprint`,
      ].join("\n"),
    );

    return NextResponse.json({ status: result.row.status, updatedAt: result.row.updated_at });
  }

  const saved = await saveAssessmentDraft(token, patch);
  if (!saved) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  return NextResponse.json({ status: saved.status, updatedAt: saved.updated_at });
}
