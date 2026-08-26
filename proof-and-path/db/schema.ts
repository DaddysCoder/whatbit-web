import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  largeText: integer("large_text", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
});

export const magicLinkTokens = sqliteTable("magic_link_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: text("expires_at").notNull(),
  usedAt: text("used_at"),
  createdAt: text("created_at").notNull(),
});

export const cases = sqliteTable("cases", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  status: text("status").notNull().default("understanding"),
  productServiceType: text("product_service_type"),
  item: text("item"),
  retailer: text("retailer"),
  whenApprox: text("when_approx"),
  method: text("method"),
  location: text("location"),
  whatHappened: text("what_happened"),
  desiredOutcome: text("desired_outcome"),
  intakeStep: integer("intake_step").notNull().default(1),
  progressStep: text("progress_step").notNull().default("understand"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const evidenceItems = sqliteTable("evidence_items", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  templateId: text("template_id").notNull(),
  level: text("level").notNull(),
  status: text("status").notNull().default("missing"),
  extractedFields: text("extracted_fields"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const evidenceFiles = sqliteTable("evidence_files", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  evidenceItemId: text("evidence_item_id").references(() => evidenceItems.id, {
    onDelete: "set null",
  }),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  storagePath: text("storage_path").notNull(),
  createdAt: text("created_at").notNull(),
});

export const timelineEvents = sqliteTable("timeline_events", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  occurredAt: text("occurred_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const drafts = sqliteTable("drafts", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  tone: text("tone").notNull().default("Neutral"),
  content: text("content").notNull(),
  confirmed: integer("confirmed", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const reminders = sqliteTable("reminders", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  dueDate: text("due_date").notNull(),
  createdAt: text("created_at").notNull(),
});

export const supportInvites = sqliteTable("support_invites", {
  id: text("id").primaryKey(),
  caseId: text("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  ownerUserId: text("owner_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  permissions: text("permissions").notNull(),
  status: text("status").notNull().default("pending"),
  invitedAt: text("invited_at").notNull(),
  activatedAt: text("activated_at"),
  revokedAt: text("revoked_at"),
  lastViewedAt: text("last_viewed_at"),
});

export type User = typeof users.$inferSelect;
export type Case = typeof cases.$inferSelect;
export type EvidenceItem = typeof evidenceItems.$inferSelect;
export type EvidenceFile = typeof evidenceFiles.$inferSelect;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type Draft = typeof drafts.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;
export type SupportInvite = typeof supportInvites.$inferSelect;
