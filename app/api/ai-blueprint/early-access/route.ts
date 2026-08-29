import { NextResponse } from "next/server";
import { sendAiBlueprintEmail } from "@/lib/ai-blueprint/email";

const CONTACT_EMAIL = "hello@primitiveai.com.au";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  await sendAiBlueprintEmail(
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
