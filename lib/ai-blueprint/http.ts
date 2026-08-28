import { NextResponse } from "next/server";
import { isCloudflareConfigured } from "./cloudflare";

/** Returns a 503 response if the D1/KV credentials AI Blueprint needs aren't configured, else null. */
export function requireCloudflareConfigured(): NextResponse | null {
  if (isCloudflareConfigured()) return null;
  console.error("AI Blueprint is missing CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_AI_BLUEPRINT_API_TOKEN.");
  return NextResponse.json({ error: "AI Blueprint is temporarily unavailable. Please try again shortly." }, { status: 503 });
}
