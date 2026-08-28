/** Vector app (forms, billing, exports) — hosted at vector.whatbit.dev */
export const VECTOR_APP_URL = "https://vector.whatbit.dev";

/**
 * Public launch routes. Keep these as real paths (not hash fragments) so
 * direct navigation and browser refresh work in the Vector SPA.
 */
export const VECTOR_FORMS_URL = `${VECTOR_APP_URL}/referral`;
export const VECTOR_PRICING_URL = VECTOR_APP_URL;
export const VECTOR_TEMPLATES_URL = VECTOR_APP_URL;

export const VECTOR_REFERRAL_URL = `${VECTOR_APP_URL}/referral`;
export const VECTOR_TRIAGE_URL = `${VECTOR_APP_URL}/practitioner-triage`;
export const VECTOR_REGISTER_URL = `${VECTOR_APP_URL}/source-consultation-register`;

export const VECTOR_UNLOCK_LABEL = "Unlock with Vector — A$9/month";
