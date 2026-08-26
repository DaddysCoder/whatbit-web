import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { exportCasePdfAction } from "@/lib/actions/app-actions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ caseId: string }> },
) {
  try {
    await requireSession();
    const { caseId } = await params;
    const base64 = await exportCasePdfAction(caseId);
    const buffer = Buffer.from(base64, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="proof-and-path-case-${caseId}.pdf"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
