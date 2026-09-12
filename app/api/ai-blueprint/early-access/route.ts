import { NextResponse } from "next/server";

const CONTACT_EMAIL = "hello@primitiveai.com.au";
const DEFAULT_FROM_EMAIL = "website@whatbit.dev";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Minimal Resend sender for the marketing waitlist. WHATBIT keeps
 * RESEND_API_KEY for the contact form and this early-access form only —
 * operational Blueprint mail lives in blue-print-ai-app. */
async function sendWaitlistEmail(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Resend is not configured for AI Blueprint early access.");
    return;
  }
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `AI Blueprint by WhatBit <${fromEmail}>`,
      to,
      subject,
      text,
    }),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => null);
    console.error(
      "Resend rejected an AI Blueprint early-access email.",
      response.status,
      (result as { message?: string } | null)?.message,
    );
  }
}

/** Early-access waitlist signup — AI Blueprint is pre-launch, so this just
 * notifies the team rather than writing to D1 (no purchase, no assessment
 * token, nothing to look up later beyond "who asked to be notified"). */
export async function POST(request: Request) {
  let body: { email?: string; businessName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const businessName = typeof body.businessName === "string" ? body.businessName.trim().slice(0, 200) : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  await sendWaitlistEmail(
    CONTACT_EMAIL,
    `[AI Blueprint] Early access signup — ${email}`,
    [
      `${email} asked for early access to AI Blueprint.`,
      businessName ? `Business: ${businessName}` : "",
      "",
      "Reply directly to follow up.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return NextResponse.json({ ok: true });
}
