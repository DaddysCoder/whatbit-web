const DEFAULT_FROM_EMAIL = "ai-blueprint@whatbit.dev";

/** Sends a plain-text email via Cloudflare Email Service, the same provider used by the WhatBit contact form. */
export async function sendAiBlueprintEmail(to: string, subject: string, text: string): Promise<void> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const emailApiToken = process.env.CLOUDFLARE_EMAIL_API_TOKEN;

  if (!accountId || !emailApiToken) {
    console.error("Cloudflare Email Service is not configured for AI Blueprint.");
    return;
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${emailApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: fromEmail, name: "AI Blueprint by WhatBit" },
        to,
        subject,
        text,
      }),
    },
  );

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    console.error(
      "Cloudflare Email Service rejected an AI Blueprint email.",
      response.status,
      (result as { errors?: Array<{ message?: string }> } | null)?.errors?.[0]?.message,
    );
  }
}
