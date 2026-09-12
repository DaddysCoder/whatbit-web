import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, checkAdminPassword, createAdminSession } from "@/lib/ai-blueprint/admin-auth";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";

export async function POST(request: Request) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  let body: { password?: string; reviewer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const reviewer = (typeof body.reviewer === "string" && body.reviewer.trim().slice(0, 60)) || "Reviewer";
  const cookieValue = await createAdminSession(reviewer);

  const response = NextResponse.json({ ok: true, reviewer });
  response.cookies.set(ADMIN_SESSION_COOKIE, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
