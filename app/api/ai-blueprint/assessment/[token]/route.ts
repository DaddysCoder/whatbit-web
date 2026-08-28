import { NextResponse } from "next/server";
import {
  formFromRow,
  getAssessmentByToken,
  saveAssessmentProgress,
  submitAssessment,
  type AssessmentForm,
} from "@/lib/ai-blueprint/db";
import { sendAiBlueprintEmail } from "@/lib/ai-blueprint/email";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "hello@primitiveai.com.au";

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const { token } = await params;
  const row = await getAssessmentByToken(token);
  if (!row) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  return NextResponse.json({
    status: row.status,
    step: row.step,
    form: formFromRow(row),
  });
}

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function stringArray(value: unknown, max = 20) {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").slice(0, max);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const { token } = await params;
  const row = await getAssessmentByToken(token);
  if (!row) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  if (row.status === "Submitted" || row.status === "Reviewing" || row.status === "Ready" || row.status === "Delivered") {
    return NextResponse.json({ error: "This assessment has already been submitted." }, { status: 409 });
  }

  let body: { form?: Partial<AssessmentForm>; step?: number; submit?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch: Partial<AssessmentForm> & { step?: number } = {};
  if (body.form) {
    const f = body.form;
    if (f.businessName !== undefined) patch.businessName = text(f.businessName, 200);
    if (f.industry !== undefined) patch.industry = text(f.industry, 200);
    if (f.teamSize !== undefined) patch.teamSize = text(f.teamSize, 20);
    if (f.tools !== undefined) patch.tools = stringArray(f.tools);
    if (f.otherTool !== undefined) patch.otherTool = text(f.otherTool, 300);
    if (f.mainTask !== undefined) patch.mainTask = text(f.mainTask, 1000);
    if (f.mainData !== undefined) patch.mainData = text(f.mainData, 1000);
    if (f.reviewed !== undefined) patch.reviewed = text(f.reviewed, 20);
    if (f.extraNotes !== undefined) patch.extraNotes = text(f.extraNotes, 4000);
    if (f.controls !== undefined) patch.controls = stringArray(f.controls);
  }
  if (typeof body.step === "number") patch.step = Math.max(0, Math.min(4, Math.round(body.step)));

  const saved = await saveAssessmentProgress(token, patch);
  if (!saved) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  if (body.submit) {
    const form = formFromRow(saved);
    if (!form.businessName || !form.mainTask || !form.mainData) {
      return NextResponse.json(
        { error: "Please complete your business name and the material use case before submitting." },
        { status: 400 },
      );
    }

    const submitted = await submitAssessment(token);

    await sendAiBlueprintEmail(
      CONTACT_EMAIL,
      `[AI Blueprint] Assessment submitted — ${form.businessName}`,
      [
        `${form.businessName} has submitted their AI Blueprint assessment.`,
        "",
        `Review it in the admin queue: ${SITE_URL}/admin/ai-blueprint`,
      ].join("\n"),
    );

    return NextResponse.json({
      status: submitted?.status || "Submitted",
      step: submitted?.step ?? patch.step ?? row.step,
      form: submitted ? formFromRow(submitted) : formFromRow(saved),
    });
  }

  return NextResponse.json({ status: saved.status, step: saved.step, form: formFromRow(saved) });
}
