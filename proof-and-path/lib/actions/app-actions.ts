"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createMagicLink,
  createSession,
  clearSession,
  getSession,
  requireSession,
  updateUserLargeText,
  verifyMagicLink,
} from "@/lib/auth/session";
import {
  addTimelineEvent,
  assertCaseAccess,
  createCase,
  createSupportInvite,
  deleteCase,
  getCaseForUser,
  getDraftForCase,
  getEvidenceForCase,
  getRemindersForUser,
  getSupportInviteForCase,
  getTimelineForCase,
  listCasesForUser,
  revokeSupportInvite,
  saveDraft,
  seedDemoCase,
  updateCase,
  updateEvidenceStatus,
  updateSupportPermissions,
} from "@/lib/services/cases";
import { generateDraftContent, getDraftMetadata } from "@/lib/services/drafts";
import { buildCaseExportPdf } from "@/lib/services/export";
import {
  extractPurchaseDateFromFile,
  isUnreadableFilename,
  saveUpload,
} from "@/lib/storage/files";
import { getDb } from "@/db";
import { evidenceFiles } from "@/db/schema";
import { nanoid } from "nanoid";

async function baseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function sendMagicLinkAction(email: string) {
  const { verifyUrl } = await createMagicLink(email, await baseUrl());
  return { verifyUrl };
}

export async function verifyMagicLinkAction(token: string) {
  const user = await verifyMagicLink(token);
  if (!user) {
    redirect("/sign-in?error=invalid");
  }
  await createSession({
    id: user.id,
    email: user.email,
    largeText: user.largeText,
  });
  await seedDemoCase(user.id);
  redirect("/dashboard");
}

export async function signOutAction() {
  await clearSession();
  redirect("/");
}

export async function getDashboardDataAction() {
  const session = await requireSession();
  await seedDemoCase(session.id);
  const [caseList, reminderList] = await Promise.all([
    listCasesForUser(session.id),
    getRemindersForUser(session.id),
  ]);
  return { cases: caseList, reminders: reminderList, user: session };
}

export async function createCaseAction() {
  const session = await requireSession();
  const id = await createCase(session.id);
  redirect(`/cases/${id}?step=1`);
}

export async function updateCaseAction(
  caseId: string,
  input: Parameters<typeof updateCase>[2],
) {
  const session = await requireSession();
  await updateCase(caseId, session.id, input);
}

export async function finishIntakeAction(caseId: string) {
  const session = await requireSession();
  await updateCase(caseId, session.id, {
    status: "gathering_evidence",
    progressStep: "gather",
    intakeStep: 4,
  });
  redirect(`/cases/${caseId}`);
}

export async function getCaseBundleAction(caseId: string) {
  const session = await requireSession();
  const caseRecord = await assertCaseAccess(caseId, session);
  const [evidence, timeline, draft, supportInvite] = await Promise.all([
    getEvidenceForCase(caseId),
    getTimelineForCase(caseId),
    getDraftForCase(caseId),
    getSupportInviteForCase(caseId),
  ]);
  return { case: caseRecord, evidence, timeline, draft, supportInvite };
}

export async function addTimelineEventAction(caseId: string, title: string) {
  const session = await requireSession();
  await assertCaseAccess(caseId, session);
  await addTimelineEvent(caseId, title);
}

export async function uploadEvidenceAction(caseId: string, formData: FormData) {
  const session = await requireSession();
  await assertCaseAccess(caseId, session);
  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file provided");
  }

  if (isUnreadableFilename(file.name)) {
    return { ok: false as const, error: "unreadable" };
  }

  const saved = await saveUpload(caseId, file);
  const purchaseDate = extractPurchaseDateFromFile(file.name);
  const db = getDb();
  const now = new Date().toISOString();

  await db.insert(evidenceFiles).values({
    id: saved.id,
    caseId,
    originalName: saved.originalName,
    mimeType: saved.mimeType,
    sizeBytes: saved.sizeBytes,
    storagePath: saved.storagePath,
    createdAt: now,
  });

  await updateEvidenceStatus(caseId, "altproof", "pending", {
    possiblePurchaseDate: purchaseDate,
  });

  return { ok: true as const, purchaseDate };
}

export async function confirmExtractionAction(
  caseId: string,
  templateId: string,
) {
  const session = await requireSession();
  await assertCaseAccess(caseId, session);
  await updateEvidenceStatus(caseId, templateId, "confirmed");
}

export async function generateDraftAction(caseId: string, tone: string) {
  const session = await requireSession();
  const caseRecord = await assertCaseAccess(caseId, session);
  const evidence = await getEvidenceForCase(caseId);
  const content = generateDraftContent(caseRecord, tone);
  await saveDraft(caseId, tone, content, false);
  return { content, metadata: getDraftMetadata(caseRecord, evidence) };
}

export async function saveDraftAction(
  caseId: string,
  tone: string,
  content: string,
  confirmed: boolean,
) {
  const session = await requireSession();
  await assertCaseAccess(caseId, session);
  await saveDraft(caseId, tone, content, confirmed);
  if (confirmed) {
    await updateCase(caseId, session.id, {
      status: "preparing",
      progressStep: "prepare",
    });
  }
}

export async function inviteSupportAction(
  caseId: string,
  email: string,
  permissions: Record<string, boolean>,
) {
  const session = await requireSession();
  await assertCaseAccess(caseId, session);
  await createSupportInvite(caseId, session.id, email, permissions);
}

export async function updateSupportPermissionsAction(
  inviteId: string,
  permissions: Record<string, boolean>,
) {
  await requireSession();
  await updateSupportPermissions(inviteId, permissions);
}

export async function revokeSupportAction(inviteId: string) {
  await requireSession();
  await revokeSupportInvite(inviteId);
}

export async function deleteCaseAction(caseId: string) {
  const session = await requireSession();
  await deleteCase(caseId, session.id);
  redirect("/dashboard");
}

export async function exportCasePdfAction(caseId: string) {
  const session = await requireSession();
  const caseRecord = await assertCaseAccess(caseId, session);
  const [evidence, timeline, draft] = await Promise.all([
    getEvidenceForCase(caseId),
    getTimelineForCase(caseId),
    getDraftForCase(caseId),
  ]);
  return buildCaseExportPdf({ case: caseRecord, evidence, timeline, draft });
}

export async function setLargeTextPreferenceAction(enabled: boolean) {
  const session = await requireSession();
  await updateUserLargeText(session.id, enabled);
  await createSession({ ...session, largeText: enabled });
}

export async function getSessionAction() {
  return getSession();
}

export async function getCaseForEditAction(caseId: string) {
  const session = await requireSession();
  return getCaseForUser(caseId, session.id);
}
