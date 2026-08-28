/**
 * AI Blueprint checkout link (Stripe Payment Link). Set
 * NEXT_PUBLIC_AI_BLUEPRINT_CHECKOUT_URL in the deployment environment once a
 * real Stripe Payment Link exists; until then CTAs fall back to the offer
 * section so the page still works end-to-end.
 */
export const AI_BLUEPRINT_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_AI_BLUEPRINT_CHECKOUT_URL || "#offer";

export const AI_BLUEPRINT_PRICE_LABEL = "A$495";
export const AI_BLUEPRINT_CTA_LABEL = `Become a Founding Client — ${AI_BLUEPRINT_PRICE_LABEL}`;
