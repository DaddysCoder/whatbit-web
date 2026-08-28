import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { createAssessment } from "@/lib/ai-blueprint/db";
import { sendAiBlueprintEmail } from "@/lib/ai-blueprint/email";
import { requireCloudflareConfigured } from "@/lib/ai-blueprint/http";
import { verifyStripeSignature, type StripeCheckoutSessionCompleted } from "@/lib/ai-blueprint/stripe";

function randomToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  const configError = requireCloudflareConfigured();
  if (configError) return configError;

  const secret = process.env.AI_BLUEPRINT_STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("AI_BLUEPRINT_STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  const verified = await verifyStripeSignature(payload, signature, secret);

  if (!verified) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: StripeCheckoutSessionCompleted;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const email = session.customer_details?.email || session.customer_email;
  const name = session.customer_details?.name || "";

  if (!email) {
    console.error("AI Blueprint checkout session completed without a customer email.", session.id);
    return NextResponse.json({ received: true });
  }

  const id = crypto.randomUUID();
  const token = randomToken();

  await createAssessment({ id, token, contactEmail: email, contactName: name, stripeSessionId: session.id });

  const assessmentUrl = `${SITE_URL}/ai-blueprint/assessment?token=${token}`;
  await sendAiBlueprintEmail(
    email,
    "Your AI Blueprint assessment is ready",
    [
      `Thanks for becoming an AI Blueprint Founding Client${name ? `, ${name}` : ""}.`,
      "",
      "You can start your assessment here (save & resume any time before you submit):",
      assessmentUrl,
      "",
      "It takes about 15–20 minutes. Once you submit, a WhatBit reviewer will build your report and toolkit, usually within 5 business days.",
      "",
      "Questions? Reply to this email.",
    ].join("\n"),
  );

  return NextResponse.json({ received: true });
}
