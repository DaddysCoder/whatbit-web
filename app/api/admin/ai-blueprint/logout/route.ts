import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, destroyAdminSession } from "@/lib/ai-blueprint/admin-auth";
import { isCloudflareConfigured } from "@/lib/ai-blueprint/cloudflare";

export async function POST(request: Request) {
  const cookieValue = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  if (cookieValue && isCloudflareConfigured()) await destroyAdminSession(cookieValue);

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
