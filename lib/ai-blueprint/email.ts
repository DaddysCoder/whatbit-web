const DEFAULT_FROM_EMAIL = "website@whatbit.dev";

/** Sends a plain-text email via Resend, the same provider used by the WhatBit contact form. */
export async function sendAiBlueprintEmail(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Resend is not configured for AI Blueprint.");
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
      "Resend rejected an AI Blueprint email.",
      response.status,
      (result as { message?: string } | null)?.message,
    );
  }
}
