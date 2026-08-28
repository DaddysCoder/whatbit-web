import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/ai-blueprint/admin-auth";
import { getAssessmentById, markDelivered } from "@/lib/ai-blueprint/db";
import { sendAiBlueprintEmail } from "@/lib/ai-blueprint/email";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const existing = await getAssessmentById(id);
  if (!existing) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  const updated = await markDelivered(id);
  if (!updated) return NextResponse.json({ error: "Assessment not found." }, { status: 404 });

  if (existing.contact_email) {
    await sendAiBlueprintEmail(
      existing.contact_email,
      "Your AI Blueprint pack is ready",
      [
        `Hi${existing.contact_name ? ` ${existing.contact_name}` : ""},`,
        "",
        `Your AI Readiness Report and toolkit for ${existing.business_name || "your business"} are ready.`,
        "We'll follow up separately with the documents attached.",
        "",
        "Questions? Just reply to this email.",
      ].join("\n"),
    );
  }

  return NextResponse.json({ status: updated.status, deliveredAt: updated.delivered_at });
}
