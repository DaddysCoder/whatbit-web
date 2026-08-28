"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdminLoginGate } from "./AdminLoginGate";
import styles from "./AdminAiBlueprint.module.css";
import type { AssessmentSubmissionV1 } from "@/lib/ai-blueprint/assessment/types";
import { controlName } from "@/lib/ai-blueprint/assessment/data/controls";
import type { AssessmentDraft, ConfirmedAttention, ReviewerDecisionEntry } from "@/lib/ai-blueprint/db";

type Record_ = {
  id: string;
  status: string;
  contactEmail: string;
  contactName: string;
  businessName: string;
  draft: AssessmentDraft;
  submission: AssessmentSubmissionV1 | null;
  reviewer: string;
  reviewerNotes: string;
  reviewerConfirmedAttention: ConfirmedAttention;
  reviewerDecisions: ReviewerDecisionEntry[];
  suggestedControls: Record<string, boolean>;
  qaChecked: Record<string, boolean>;
  outcome: string;
  purchasedAt: string;
  submittedAt: string;
  dueAt: string;
  deliveredAt: string;
};

const ATTENTION_LEVELS: { key: ConfirmedAttention; color: string; bg: string }[] = [
  { key: "Low", color: "#2c6e4f", bg: "#e9f4ee" },
  { key: "Moderate", color: "#8a6116", bg: "#fdf3e0" },
  { key: "Higher Attention", color: "#a4262c", bg: "#fbecec" },
];

const OUTCOMES = ["Ready for delivery", "Needs more info from client", "Escalate for a second review"];

const QA_ITEMS = [
  "Report reflects the answers given, not a generic template",
  "Every S1–S7 / U1–U8 flag has been confirmed, cleared or qualified",
  "Not sure was treated as uncertainty, not a confirmed failure",
  "Language avoids implying legal or compliance certification",
  "Delivery email drafted and attached",
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "#eaf3ff", color: "#1a5fb4" },
  Started: { bg: "#eaf3ff", color: "#1a5fb4" },
  Submitted: { bg: "#fdf3e0", color: "#8a6116" },
  Reviewing: { bg: "#fdf3e0", color: "#8a6116" },
  Ready: { bg: "#e9f4ee", color: "#2c6e4f" },
  Delivered: { bg: "#f2f2f2", color: "#6b6b6b" },
};

const ATTENTION_STYLE: Record<string, { bg: string; color: string }> = {
  low: { bg: "#e9f4ee", color: "#2c6e4f" },
  moderate: { bg: "#fdf3e0", color: "#8a6116" },
  higher_attention: { bg: "#fbecec", color: "#a4262c" },
};

function attentionLabel(level: string): string {
  if (level === "low") return "Low";
  if (level === "moderate") return "Moderate";
  if (level === "higher_attention") return "Higher Attention";
  return level;
}

function formatList(values: string[] | undefined): string {
  if (!values || values.length === 0) return "None";
  return values.map((v) => v.replace(/_/g, " ")).join(", ");
}

export function AdminAiBlueprintReviewPage({ id }: { id: string }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [record, setRecord] = useState<Record_ | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saved, setSaved] = useState(false);
  const [delivering, setDelivering] = useState(false);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(() => {
    fetch(`/api/admin/ai-blueprint/${id}`)
      .then(async (res) => {
        if (res.status === 401) {
          setAuthed(false);
          return;
        }
        if (res.status === 404) {
          setLoadError("This assessment doesn't exist.");
          setAuthed(true);
          return;
        }
        if (!res.ok) {
          setLoadError("Something went wrong loading this assessment.");
          setAuthed(true);
          return;
        }
        const data = (await res.json()) as Record_;
        setRecord(data);
        setAuthed(true);
      })
      .catch(() => setLoadError("Something went wrong loading this assessment."));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const patchAndSave = useCallback(
    (patch: Partial<Pick<Record_, "reviewerNotes" | "reviewerConfirmedAttention" | "suggestedControls" | "qaChecked" | "outcome">> & {
      adjustmentReason?: string;
    }) => {
      setRecord((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          fetch(`/api/admin/ai-blueprint/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reviewerNotes: next.reviewerNotes,
              reviewerConfirmedAttention: next.reviewerConfirmedAttention,
              adjustmentReason: patch.adjustmentReason,
              suggestedControls: next.suggestedControls,
              qaChecked: next.qaChecked,
              outcome: next.outcome,
            }),
          })
            .then((res) => res.ok && setSaved(true))
            .catch(() => {});
        }, 500);
        return next;
      });
    },
    [id],
  );

  const handleDeliver = async () => {
    setDelivering(true);
    try {
      const res = await fetch(`/api/admin/ai-blueprint/${id}/deliver`, { method: "POST" });
      if (res.ok) load();
    } finally {
      setDelivering(false);
    }
  };

  if (authed === false) {
    return <AdminLoginGate onSignedIn={load} />;
  }

  if (loadError) {
    return (
      <div className={styles.page}>
        <TopBar title={loadError} statusTag={null} />
      </div>
    );
  }

  if (!record) {
    return (
      <div className={styles.page}>
        <TopBar title="Loading…" statusTag={null} />
      </div>
    );
  }

  const { submission, draft } = record;
  const statusStyle = STATUS_STYLE[record.status] || STATUS_STYLE.Paid;
  const delivered = record.status === "Delivered";
  const controlsToSuggest = submission?.computed.suggested_controls || [];
  const draftOverall = submission?.computed.draft_overall_attention;

  return (
    <div className={styles.page}>
      <TopBar title={record.businessName || "(no business name yet)"} statusTag={{ label: record.status, ...statusStyle }} />

      {!submission ? (
        <div className={styles.body}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Assessment not submitted yet</div>
            <div className={styles.answerGrid}>
              <div>
                <div className={styles.answerKey}>Organisation name so far</div>
                <div className={styles.answerValue}>{(draft.organisationAnswers.Q01_name as string) || "—"}</div>
              </div>
              <div>
                <div className={styles.answerKey}>Contact</div>
                <div className={styles.answerValue}>
                  {record.contactName || "—"} ({record.contactEmail || "—"})
                </div>
              </div>
              <div>
                <div className={styles.answerKey}>Current step</div>
                <div className={styles.answerValue}>{draft.step + 1} of 9</div>
              </div>
              <div>
                <div className={styles.answerKey}>Use cases so far</div>
                <div className={styles.answerValue}>{draft.useCases.length}</div>
              </div>
            </div>
            <p className={styles.notice} style={{ marginTop: 16 }}>
              There&rsquo;s nothing to review yet — the customer hasn&rsquo;t submitted this assessment. Reviewer tools appear
              once they do.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.workspaceBody}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <div className={styles.cardLabel}>Organisation & respondent</div>
              <div className={styles.answerGrid}>
                <div>
                  <div className={styles.answerKey}>Organisation</div>
                  <div className={styles.answerValue}>{submission.organisation.legal_or_trading_name || "—"}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>State / territory</div>
                  <div className={styles.answerValue}>{submission.organisation.state_or_territory || "—"}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>Size</div>
                  <div className={styles.answerValue}>{submission.organisation.size_band || "—"}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>Respondent</div>
                  <div className={styles.answerValue}>
                    {submission.respondent.name || "—"} ({submission.respondent.role || "role n/a"}) — visibility:{" "}
                    {submission.respondent.organisation_wide_visibility}
                  </div>
                </div>
                <div className={styles.answerFull}>
                  <div className={styles.answerKey}>Description</div>
                  <div className={styles.answerValue}>{submission.organisation.description || "—"}</div>
                </div>
                <div className={styles.answerFull}>
                  <div className={styles.answerKey}>Sectors</div>
                  <div className={styles.answerValue}>{formatList(submission.organisation.sectors)}</div>
                </div>
                <div className={styles.answerFull}>
                  <div className={styles.answerKey}>Possible obligations</div>
                  <div className={styles.answerValue}>{formatList(submission.organisation.possible_obligations)}</div>
                </div>
              </div>
              {submission.respondent.organisation_wide_visibility !== "yes" && (
                <p className={styles.notice} style={{ marginTop: 12 }}>
                  Respondent could not fully confirm organisation-wide practices — qualify organisation-level findings as
                  based on limited respondent visibility (spec §5, rule 11).
                </p>
              )}
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>AI tool inventory ({submission.tools.length})</div>
              <div className={styles.tagRow}>
                {submission.tools.length === 0 ? (
                  <span className={styles.answerKey}>None reported</span>
                ) : (
                  submission.tools.map((t) => (
                    <span key={t.tool_id} className={styles.tag} title={t.purpose}>
                      {t.name} · {t.status} · {t.account_type}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Material use cases ({submission.use_cases.length})</div>
              <div className={styles.useCaseList}>
                {submission.use_cases.map((uc, idx) => {
                  const c = uc.computed;
                  return (
                    <div key={uc.use_case_id} className={styles.useCaseCard}>
                      <div className={styles.useCaseHead}>
                        <strong>
                          #{idx + 1} {uc.name}
                        </strong>
                        {c && (
                          <span
                            className={styles.tag}
                            style={{ background: ATTENTION_STYLE[c.draft_attention].bg, color: ATTENTION_STYLE[c.draft_attention].color }}
                          >
                            Draft: {attentionLabel(c.draft_attention)}
                          </span>
                        )}
                      </div>
                      <div className={styles.answerKey}>{uc.business_purpose}</div>
                      <div className={styles.tagRow}>
                        <span className={styles.tag}>Team: {uc.team}</span>
                        <span className={styles.tag}>Status: {uc.status}</span>
                        <span className={styles.tag}>Recipients: {uc.users_or_recipients}</span>
                        {uc.accountable_person && <span className={styles.tag}>Owner: {uc.accountable_person}</span>}
                      </div>
                      {c && (
                        <>
                          <div className={styles.miniLabel}>Exposure {c.exposure_points} ({c.exposure_band}) · Control gaps {c.control_gap_points} ({c.gap_band})</div>
                          <div className={styles.tagRow}>
                            {c.screening_flags.map((f) => (
                              <span key={f} className={styles.tag}>
                                {f}
                              </span>
                            ))}
                            {c.urgent_flags.map((f) => (
                              <span key={f} className={styles.tagUrgent}>
                                {f}
                              </span>
                            ))}
                            {c.screening_flags.length === 0 && c.urgent_flags.length === 0 && (
                              <span className={styles.answerKey}>No S/U flags</span>
                            )}
                          </div>
                          {c.recommended_control_ids.length > 0 && (
                            <div className={styles.answerKey}>
                              Suggested: {c.recommended_control_ids.map((id) => `${id} ${controlName(id)}`).join("; ")}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Organisation-wide governance</div>
              <div className={styles.answerGrid}>
                <div>
                  <div className={styles.answerKey}>Senior accountability (Q20)</div>
                  <div className={styles.answerValue}>{String(submission.organisation_answers.Q20 ?? "—")}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>Human review timing (Q22)</div>
                  <div className={styles.answerValue}>{String(submission.organisation_answers.Q22 ?? "—")}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>Staff AI rules (Q25)</div>
                  <div className={styles.answerValue}>{String(submission.organisation_answers.Q25 ?? "—")}</div>
                </div>
                <div>
                  <div className={styles.answerKey}>Incident history (Q33)</div>
                  <div className={styles.answerValue}>{String(submission.organisation_answers.Q33 ?? "—")}</div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Reviewer notes</div>
              <textarea
                rows={5}
                value={record.reviewerNotes}
                onChange={(e) => patchAndSave({ reviewerNotes: e.target.value })}
                placeholder="Working notes for this report — not shown to the client."
                className={styles.textarea}
              />
              {saved ? <div className={styles.saveLabel}>Saved</div> : null}
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.card}>
              <div className={styles.cardLabel}>Automated draft (not shown to client)</div>
              <div className={styles.useCaseList}>
                {draftOverall && (
                  <div className={styles.flagRow}>
                    <span className={styles.flagTag} style={{ background: ATTENTION_STYLE[draftOverall].bg, color: ATTENTION_STYLE[draftOverall].color }}>
                      {attentionLabel(draftOverall)}
                    </span>
                    <span className={styles.flagText}>Draft overall attention (highest of all use cases, never averaged)</span>
                  </div>
                )}
                {submission.computed.contradiction_flags.map((f) => (
                  <div key={f} className={styles.flagRow}>
                    <span className={styles.flagTag} style={{ background: "#fdf3e0", color: "#8a6116" }}>
                      CONTRADICTION
                    </span>
                    <span className={styles.flagText}>{f.replace(/_/g, " ")}</span>
                  </div>
                ))}
                {submission.computed.completeness_flags.map((f) => (
                  <div key={f} className={styles.flagRow}>
                    <span className={styles.flagTag} style={{ background: "#eaf3ff", color: "#1a5fb4" }}>
                      NOTE
                    </span>
                    <span className={styles.flagText}>{f.replace(/_/g, " ")}</span>
                  </div>
                ))}
                {submission.computed.contradiction_flags.length === 0 && submission.computed.completeness_flags.length === 0 && (
                  <span className={styles.answerKey}>No completeness/contradiction flags.</span>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Confirmed attention (shown to client once delivered)</div>
              <div className={styles.radioList}>
                {ATTENTION_LEVELS.map((r) => {
                  const on = record.reviewerConfirmedAttention === r.key;
                  return (
                    <button
                      type="button"
                      key={r.key}
                      onClick={() => patchAndSave({ reviewerConfirmedAttention: r.key, adjustmentReason })}
                      className={styles.radioRow}
                      style={{ borderColor: on ? r.color : "#ebebeb", background: on ? r.bg : "#fff" }}
                    >
                      <span className={`${styles.radioDot} ${on ? styles.radioDotOn : ""}`} style={{ borderColor: r.color, background: on ? r.color : "#fff" }} />
                      <span className={styles.radioLabel}>{r.key}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.miniLabel}>Adjustment reason (required if this differs from the draft)</div>
              <textarea
                rows={2}
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="Why the confirmed level differs from the automated draft, if it does."
                className={styles.textarea}
              />
              {record.reviewerDecisions.length > 0 && (
                <>
                  <div className={styles.miniLabel}>Decision history</div>
                  <div className={styles.useCaseList}>
                    {record.reviewerDecisions.map((d, i) => (
                      <div key={i} className={styles.notice}>
                        {new Date(d.atIso).toLocaleString()} — {d.reviewerName || "reviewer"}: {d.previousAttention || "(none)"} →{" "}
                        {d.confirmedAttention}
                        {d.adjustmentReason ? ` — ${d.adjustmentReason}` : ""}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Suggested controls</div>
              <div className={styles.checkList}>
                {controlsToSuggest.map((controlId) => {
                  const on = !!record.suggestedControls[controlId];
                  return (
                    <button
                      type="button"
                      key={controlId}
                      className={styles.checkRow}
                      onClick={() => patchAndSave({ suggestedControls: { ...record.suggestedControls, [controlId]: !on } })}
                    >
                      <span className={`${styles.checkbox} ${on ? styles.checkboxOn : ""}`}>{on ? "✓" : ""}</span>
                      <span className={styles.checkLabel}>
                        {controlId} — {controlName(controlId)}
                      </span>
                    </button>
                  );
                })}
                {controlsToSuggest.length === 0 && <span className={styles.answerKey}>No controls suggested from the answers given.</span>}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>QA checklist</div>
              <div className={styles.checkList}>
                {QA_ITEMS.map((label) => {
                  const on = !!record.qaChecked[label];
                  return (
                    <button type="button" key={label} className={styles.checkRow} onClick={() => patchAndSave({ qaChecked: { ...record.qaChecked, [label]: !on } })}>
                      <span className={`${styles.checkbox} ${on ? styles.checkboxOn : ""}`}>{on ? "✓" : ""}</span>
                      <span className={styles.checkLabel}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardLabel}>Final outcome</div>
              <div className={styles.radioList}>
                {OUTCOMES.map((label) => {
                  const on = record.outcome === label;
                  return (
                    <button
                      type="button"
                      key={label}
                      onClick={() => patchAndSave({ outcome: label })}
                      className={styles.radioRow}
                      style={{ borderColor: on ? "#171717" : "#ebebeb", background: on ? "#f2f2f2" : "#fff" }}
                    >
                      <span className={`${styles.radioDot} ${on ? styles.radioDotOn : ""}`} style={{ borderColor: "#171717", background: on ? "#171717" : "#fff" }} />
                      <span className={styles.radioLabel}>{label}</span>
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={handleDeliver} disabled={delivering || delivered} className={styles.deliverButton}>
                {delivered ? "Delivered" : delivering ? "Marking as delivered…" : "Mark as delivered"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TopBar({ title, statusTag }: { title: string; statusTag: { label: string; bg: string; color: string } | null }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <Link href="/admin/ai-blueprint" className={styles.topbarLink}>
          ← Queue
        </Link>
        <span className={styles.topbarSep}>/</span>
        <span className={styles.topbarBrand}>{title}</span>
      </div>
      {statusTag ? (
        <span className={styles.statusTag} style={{ background: statusTag.bg, color: statusTag.color }}>
          {statusTag.label.toUpperCase()}
        </span>
      ) : null}
    </header>
  );
}
