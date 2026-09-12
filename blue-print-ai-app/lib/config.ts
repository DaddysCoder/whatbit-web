/**
 * Server-only module: import only from Server Components, Server Actions,
 * or Route Handlers — never from client components.
 *
 * Canonical public URL of the AI Blueprint app.
 *
 * Used by operational emails (assessment links, receipts) so recipients get
 * absolute URLs. Reads AI_BLUEPRINT_APP_URL, strips any trailing slash, and
 * falls back to http://localhost:3000 for local development.
 */
export function getAppUrl(): string {
  const raw =
    process.env.AI_BLUEPRINT_APP_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}
