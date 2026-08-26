import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";

const UPLOAD_ROOT = path.join(process.cwd(), ".data", "uploads");

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export function ensureUploadDir(caseId: string) {
  const dir = path.join(UPLOAD_ROOT, caseId);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

export function validateUpload(file: File) {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { ok: false as const, error: "Unsupported file type. Use PDF, JPEG, or PNG." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false as const, error: "File is too large. Maximum size is 10 MB." };
  }
  return { ok: true as const };
}

export async function saveUpload(caseId: string, file: File) {
  const validation = validateUpload(file);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const dir = ensureUploadDir(caseId);
  const fileId = nanoid();
  const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".jpg");
  const storageName = `${fileId}${ext}`;
  const storagePath = path.join(dir, storageName);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(storagePath, buffer);

  return {
    id: fileId,
    originalName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    storagePath,
  };
}

/** Mock OCR — extracts a plausible purchase date from filename or returns default */
export function extractPurchaseDateFromFile(filename: string): string {
  const isoMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const auMatch = filename.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/);
  if (auMatch) {
    const [, d, m, yRaw] = auMatch;
    const y = yRaw.length === 2 ? `20${yRaw}` : yRaw;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return "12 June 2026";
}

export function isUnreadableFilename(filename: string) {
  return filename.toLowerCase().includes("unreadable");
}
