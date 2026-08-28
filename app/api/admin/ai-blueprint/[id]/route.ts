import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/ai-blueprint/admin-auth";
import { formFromRow, getAssessmentById, safeParseRecord, updateAssessmentReview } from "@/lib/ai-blueprint/db";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";

type RouteParams = { params: Promise<{ id: string }> };

function serialize(row: NonNullable<Awaited<ReturnType<typeof getAssessmentById>>>) {
  return {
    id: row.id,
    status: row.status,
    contactEmail: row.contact_email,
    contactName: row.contact_name,
    form: formFromRow(row),
    reviewer: row.reviewer,
    reviewerNotes: row.reviewer_notes,
    attentionRating: row.attention_rating,
    suggestedControls: safeParseRecord(row.suggested_controls_json),
    qaChecked: safeParseRecord(row.qa_checked_json),
    outcome: row.outcome,
    purchasedAt: row.purchased_at,
    submittedAt: row.submitted_at,
    dueAt: row.due_at,
    deliveredAt: row.delivered_at,
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const row = await getAssessmentById(id);
  if (!row) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  return NextResponse.json(serialize(row));
}

export async function PUT(request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  let body: {
    reviewerNotes?: string;
    attentionRating?: string;
    suggestedControls?: Record<string, boolean>;
    qaChecked?: Record<string, boolean>;
    outcome?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const updated = await updateAssessmentReview(id, {
    reviewer: session.reviewer,
    reviewerNotes: body.reviewerNotes,
    attentionRating: body.attentionRating,
    suggestedControls: body.suggestedControls,
    qaChecked: body.qaChecked,
    outcome: body.outcome,
  });

  if (!updated) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  return NextResponse.json(serialize(updated));
}
