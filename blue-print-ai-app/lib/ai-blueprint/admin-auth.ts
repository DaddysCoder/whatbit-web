import { kvDelete, kvGet, kvPut } from "./cloudflare";

export const ADMIN_SESSION_COOKIE = "aiblueprint_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function encoder() {
  return new TextEncoder();
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder().encode(message));
  return toHex(signature);
}

function sessionSecret() {
  const secret = process.env.AI_BLUEPRINT_ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("AI_BLUEPRINT_ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

function adminPassword() {
  const password = process.env.AI_BLUEPRINT_ADMIN_PASSWORD;
  if (!password) throw new Error("AI_BLUEPRINT_ADMIN_PASSWORD is not configured.");
  return password;
}

export function checkAdminPassword(candidate: string): boolean {
  return candidate.length > 0 && candidate === adminPassword();
}

/** Creates a random session id, stores it in KV, and returns a signed cookie value. */
export async function createAdminSession(reviewerLabel: string): Promise<string> {
  const sessionId = toHex(crypto.getRandomValues(new Uint8Array(24)).buffer);
  await kvPut(`session:${sessionId}`, JSON.stringify({ reviewer: reviewerLabel, createdAt: Date.now() }), SESSION_TTL_SECONDS);
  const signature = await hmacHex(sessionSecret(), sessionId);
  return `${sessionId}.${signature}`;
}

export async function destroyAdminSession(cookieValue: string): Promise<void> {
  const [sessionId] = cookieValue.split(".");
  if (sessionId) await kvDelete(`session:${sessionId}`);
}

/** Reads and verifies the admin session cookie straight off a Request's Cookie header. */
export async function requireAdmin(request: Request): Promise<{ reviewer: string } | null> {
  const cookieValue = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1);

  return verifyAdminSession(cookieValue);
}

/** Verifies a signed session cookie and confirms the session still exists in KV. */
export async function verifyAdminSession(cookieValue: string | undefined): Promise<{ reviewer: string } | null> {
  if (!cookieValue) return null;
  const [sessionId, signature] = cookieValue.split(".");
  if (!sessionId || !signature) return null;

  const expected = await hmacHex(sessionSecret(), sessionId);
  if (expected !== signature) return null;

  const stored = await kvGet(`session:${sessionId}`);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as { reviewer?: string };
    return { reviewer: parsed.reviewer || "Reviewer" };
  } catch {
    return null;
  }
}
