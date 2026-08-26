import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "@/db";
import {
  cases,
  drafts,
  evidenceItems,
  reminders,
  supportInvites,
  timelineEvents,
} from "@/db/schema";
import { EVIDENCE_TEMPLATES } from "@/lib/content/evidence-templates";
import type { SessionUser } from "@/lib/auth/session";

function nowIso() {
  return new Date().toISOString();
}

function buildCaseTitle(item?: string | null, retailer?: string | null) {
  if (item && retailer) {
    const shortItem = item.length > 30 ? `${item.slice(0, 27)}…` : item;
    return `${shortItem}, ${retailer}`;
  }
  return "New case";
}

export async function listCasesForUser(userId: string) {
  const db = getDb();
  return db
    .select()
    .from(cases)
    .where(eq(cases.userId, userId))
    .orderBy(desc(cases.updatedAt));
}

export async function getCaseForUser(caseId: string, userId: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(cases)
    .where(and(eq(cases.id, caseId), eq(cases.userId, userId)))
    .limit(1);
  return record ?? null;
}

export async function createCase(userId: string) {
  const db = getDb();
  const id = nanoid();
  const now = nowIso();

  await db.insert(cases).values({
    id,
    userId,
    title: "New case",
    status: "understanding",
    intakeStep: 1,
    progressStep: "understand",
    createdAt: now,
    updatedAt: now,
  });

  for (const template of EVIDENCE_TEMPLATES) {
    await db.insert(evidenceItems).values({
      id: nanoid(),
      caseId: id,
      templateId: template.id,
      level: template.level,
      status: "missing",
      createdAt: now,
      updatedAt: now,
    });
  }

  await db.insert(timelineEvents).values({
    id: nanoid(),
    caseId: id,
    title: "Case created",
    occurredAt: now,
    createdAt: now,
  });

  return id;
}

export async function seedDemoCase(userId: string) {
  const db = getDb();
  const [existing] = await db
    .select()
    .from(cases)
    .where(eq(cases.userId, userId))
    .limit(1);
  if (existing) return existing.id;

  const id = nanoid();
  const now = nowIso();

  await db.insert(cases).values({
    id,
    userId,
    title: "Wrong size — jeans, Kmart",
    status: "gathering_evidence",
    productServiceType: "product",
    item: "A pair of jeans",
    retailer: "Kmart",
    whenApprox: "3 weeks ago",
    method: "In store",
    location: "VIC",
    whatHappened:
      "Bought the wrong size and would like to exchange or return them. I can't find my receipt.",
    desiredOutcome: "Replacement",
    intakeStep: 4,
    progressStep: "gather",
    createdAt: now,
    updatedAt: now,
  });

  for (const template of EVIDENCE_TEMPLATES) {
    const confirmed = template.id === "photo" || template.id === "tag";
    await db.insert(evidenceItems).values({
      id: nanoid(),
      caseId: id,
      templateId: template.id,
      level: template.level,
      status: confirmed ? "confirmed" : "missing",
      createdAt: now,
      updatedAt: now,
    });
  }

  await db.insert(timelineEvents).values({
    id: nanoid(),
    caseId: id,
    title: "Contacted Kmart",
    occurredAt: "2026-08-24T00:00:00.000Z",
    createdAt: now,
  });

  await db.insert(reminders).values({
    id: nanoid(),
    caseId: id,
    userId,
    message: "Follow up with Kmart — due Friday 28 August",
    dueDate: "2026-08-28",
    createdAt: now,
  });

  await db.insert(drafts).values({
    id: nanoid(),
    caseId: id,
    tone: "Neutral",
    content:
      "Dear Kmart,\n\nI purchased a pair of jeans from your store on or around 5 August 2026. Unfortunately the size is incorrect and I no longer have the receipt.\n\nI would like to request a replacement in the correct size.\n\nCould you please let me know how to proceed?\n\nRegards,",
    confirmed: false,
    createdAt: now,
    updatedAt: now,
  });

  return id;
}

export type CaseUpdateInput = {
  productServiceType?: string;
  item?: string;
  retailer?: string;
  whenApprox?: string;
  method?: string;
  location?: string;
  whatHappened?: string;
  desiredOutcome?: string;
  intakeStep?: number;
  status?: string;
  progressStep?: string;
};

export async function updateCase(
  caseId: string,
  userId: string,
  input: CaseUpdateInput,
) {
  const existing = await getCaseForUser(caseId, userId);
  if (!existing) throw new Error("NOT_FOUND");

  const title = buildCaseTitle(
    input.item ?? existing.item,
    input.retailer ?? existing.retailer,
  );

  const db = getDb();
  await db
    .update(cases)
    .set({
      ...input,
      title,
      updatedAt: nowIso(),
    })
    .where(and(eq(cases.id, caseId), eq(cases.userId, userId)));
}

export async function deleteCase(caseId: string, userId: string) {
  const existing = await getCaseForUser(caseId, userId);
  if (!existing) throw new Error("NOT_FOUND");
  const db = getDb();
  await db.delete(cases).where(eq(cases.id, caseId));
}

export async function getEvidenceForCase(caseId: string) {
  const db = getDb();
  return db.select().from(evidenceItems).where(eq(evidenceItems.caseId, caseId));
}

export async function updateEvidenceStatus(
  caseId: string,
  templateId: string,
  status: string,
  extractedFields?: Record<string, string>,
) {
  const db = getDb();
  await db
    .update(evidenceItems)
    .set({
      status,
      extractedFields: extractedFields ? JSON.stringify(extractedFields) : null,
      updatedAt: nowIso(),
    })
    .where(
      and(
        eq(evidenceItems.caseId, caseId),
        eq(evidenceItems.templateId, templateId),
      ),
    );
}

export async function getTimelineForCase(caseId: string) {
  const db = getDb();
  return db
    .select()
    .from(timelineEvents)
    .where(eq(timelineEvents.caseId, caseId))
    .orderBy(desc(timelineEvents.occurredAt));
}

export async function addTimelineEvent(caseId: string, title: string) {
  const db = getDb();
  const now = nowIso();
  await db.insert(timelineEvents).values({
    id: nanoid(),
    caseId,
    title,
    occurredAt: now,
    createdAt: now,
  });
}

export async function getDraftForCase(caseId: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(drafts)
    .where(eq(drafts.caseId, caseId))
    .limit(1);
  return record ?? null;
}

export async function saveDraft(
  caseId: string,
  tone: string,
  content: string,
  confirmed = false,
) {
  const db = getDb();
  const existing = await getDraftForCase(caseId);
  const now = nowIso();

  if (existing) {
    await db
      .update(drafts)
      .set({ tone, content, confirmed, updatedAt: now })
      .where(eq(drafts.id, existing.id));
    return existing.id;
  }

  const id = nanoid();
  await db.insert(drafts).values({
    id,
    caseId,
    tone,
    content,
    confirmed,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function getRemindersForUser(userId: string) {
  const db = getDb();
  return db.select().from(reminders).where(eq(reminders.userId, userId));
}

export async function getSupportInviteForCase(caseId: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(supportInvites)
    .where(
      and(
        eq(supportInvites.caseId, caseId),
        eq(supportInvites.status, "active"),
      ),
    )
    .limit(1);
  return record ?? null;
}

export async function createSupportInvite(
  caseId: string,
  ownerUserId: string,
  email: string,
  permissions: Record<string, boolean>,
) {
  const db = getDb();
  const now = nowIso();
  const id = nanoid();
  await db.insert(supportInvites).values({
    id,
    caseId,
    ownerUserId,
    email,
    permissions: JSON.stringify(permissions),
    status: "active",
    invitedAt: now,
    activatedAt: now,
  });
  return id;
}

export async function updateSupportPermissions(
  inviteId: string,
  permissions: Record<string, boolean>,
) {
  const db = getDb();
  await db
    .update(supportInvites)
    .set({ permissions: JSON.stringify(permissions) })
    .where(eq(supportInvites.id, inviteId));
}

export async function revokeSupportInvite(inviteId: string) {
  const db = getDb();
  await db
    .update(supportInvites)
    .set({ status: "revoked", revokedAt: nowIso() })
    .where(eq(supportInvites.id, inviteId));
}

export async function assertCaseAccess(caseId: string, user: SessionUser) {
  const record = await getCaseForUser(caseId, user.id);
  if (!record) throw new Error("NOT_FOUND");
  return record;
}
