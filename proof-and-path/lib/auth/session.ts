import { createHash, randomBytes } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "@/db";
import { magicLinkTokens, users } from "@/db/schema";

const SESSION_COOKIE = "pp_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

function getSessionSecret() {
  return new TextEncoder().encode(
    process.env.SESSION_SECRET ?? "dev-proof-and-path-session-secret-change-me",
  );
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export type SessionUser = {
  id: string;
  email: string;
  largeText: boolean;
};

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    sub: user.id,
    email: user.email,
    largeText: user.largeText,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const id = payload.sub;
    const email = payload.email;
    if (typeof id !== "string" || typeof email !== "string") return null;

    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      largeText: user.largeText,
    };
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function findOrCreateUser(email: string) {
  const normalized = email.trim().toLowerCase();
  const db = getDb();
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalized))
    .limit(1);
  if (existing) return existing;

  const now = new Date().toISOString();
  const user = {
    id: nanoid(),
    email: normalized,
    largeText: false,
    createdAt: now,
  };
  await db.insert(users).values(user);
  return user;
}

export async function createMagicLink(email: string, baseUrl: string) {
  const user = await findOrCreateUser(email);
  const rawToken = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + MAGIC_LINK_TTL_MS);

  const db = getDb();
  await db.insert(magicLinkTokens).values({
    id: nanoid(),
    userId: user.id,
    tokenHash: hashToken(rawToken),
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
  });

  const verifyUrl = new URL("/auth/verify", baseUrl);
  verifyUrl.searchParams.set("token", rawToken);

  return { user, verifyUrl: verifyUrl.toString() };
}

export async function verifyMagicLink(rawToken: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(magicLinkTokens)
    .where(eq(magicLinkTokens.tokenHash, hashToken(rawToken)))
    .limit(1);

  if (!record || record.usedAt) return null;
  if (new Date(record.expiresAt) < new Date()) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, record.userId))
    .limit(1);
  if (!user) return null;

  await db
    .update(magicLinkTokens)
    .set({ usedAt: new Date().toISOString() })
    .where(eq(magicLinkTokens.id, record.id));

  return user;
}

export async function updateUserLargeText(userId: string, largeText: boolean) {
  const db = getDb();
  await db.update(users).set({ largeText }).where(eq(users.id, userId));
}
