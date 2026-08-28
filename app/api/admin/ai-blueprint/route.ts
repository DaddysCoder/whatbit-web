import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/ai-blueprint/admin-auth";
import { listAssessments } from "@/lib/ai-blueprint/db";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";

export async function GET(request: Request) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const status = new URL(request.url).searchParams.get("status") || undefined;
  const rows = await listAssessments(status);

  return NextResponse.json({
    rows: rows.map((row) => ({
      id: row.id,
      businessName: row.business_name || "(no business name yet)",
      contactEmail: row.contact_email,
      status: row.status,
      purchasedAt: row.purchased_at,
      reviewer: row.reviewer,
      dueAt: row.due_at,
    })),
  });
}
