import { NextResponse } from "next/server";

const CONTACT_EMAIL = "hello@primitiveai.com.au";
const DEFAULT_FROM_EMAIL = "website@whatbit.dev";
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_REASON = 120;
const MAX_MESSAGE = 5000;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept obvious bot submissions without sending them.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, MAX_NAME);
  const email = text(body.email, MAX_EMAIL);
  const reason = text(body.reason, MAX_REASON) || "General enquiry";
  const message = text(body.message, MAX_MESSAGE);

  if (!name || !validEmail(email) || !message) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email address and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Resend is not configured for the WhatBit contact form.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const subject = `[WhatBit] ${reason}`;
  const plainText = [
    "New WhatBit website enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Reason: ${reason}`,
    "",
    message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `WhatBit Website <${fromEmail}>`,
      to: CONTACT_EMAIL,
      reply_to: email,
      subject,
      text: plainText,
    }),
  });

  const result = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    console.error(
      "Resend rejected a WhatBit contact-form message.",
      response.status,
      result?.message || "Unknown error",
    );
    return NextResponse.json(
      { error: "We couldn't send that message just now. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
