"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AdminLoginGate } from "./AdminLoginGate";
import styles from "./AdminAiBlueprint.module.css";

type AssessmentForm = {
  businessName: string;
  industry: string;
  teamSize: string;
  tools: string[];
  otherTool: string;
  mainTask: string;
  mainData: string;
  reviewed: string;
  extraNotes: string;
  controls: string[];
};

type Record_ = {
  id: string;
  status: string;
  contactEmail: string;
  contactName: string;
  form: AssessmentForm;
  reviewer: string;
  reviewerNotes: string;
  attentionRating: string;
  suggestedControls: Record<string, boolean>;
  qaChecked: Record<string, boolean>;
  outcome: string;
  purchasedAt: string;
  submittedAt: string;
  dueAt: string;
  deliveredAt: string;
};

const RATINGS = [
  { key: "Low", color: "#2c6e4f", bg: "#e9f4ee" },
  { key: "Moderate", color: "#8a6116", bg: "#fdf3e0" },
  { key: "Higher Attention", color: "#a4262c", bg: "#fbecec" },
];

const OUTCOMES = ["Ready for delivery", "Needs more info from client", "Escalate for a second review"];

const SUGGESTED_CONTROLS = [
  "Draft a short AI use policy covering approved tools",
  "Add a client-data handling rule to internal onboarding",
  "Set a reminder to review AI output before sending to clients",
  "Nominate one staff member as the AI point of contact",
];

const QA_ITEMS = [
  "Report reflects the answers given, not a generic template",
  "Toolkit documents reference this business by name",
  "Language avoids implying legal or compliance certification",
  "Delivery email drafted and attached",
];

const SENSITIVE_TERMS = ["health", "medical", "client", "patient", "financial", "legal", "case notes", "injury", "treatment"];

function computeFlags(form: AssessmentForm) {
  const flags: { level: "LOW" | "MODERATE" | "HIGH"; text: string }[] = [];

  const dataText = `${form.mainData} ${form.extraNotes}`.toLowerCase();
  const looksSensitive = SENSITIVE_TERMS.some((term) => dataText.includes(term));
  if (looksSensitive && form.reviewed !== "Always") {
    flags.push({
      level: "MODERATE",
      text: "Client or sensitive data referenced in a general-purpose AI tool without consistent human review.",
    });
  }

  if (form.controls.length === 0) {
    flags.push({ level: "MODERATE", text: "No documented AI policy or controls reported yet." });
  }

  if (form.reviewed === "Always" || form.reviewed === "Sometimes") {
    flags.push({ level: "LOW", text: "Output review happens at least sometimes for the primary use case." });
  }

  if (form.reviewed === "No" && looksSensitive) {
    flags.push({ level: "HIGH", text: "Sensitive data flows through AI output that is never reviewed by a person." });
  }

  if (flags.length === 0) {
    flags.push({ level: "LOW", text: "No automated flags raised from the answers given." });
  }

  return flags;
}

const FLAG_STYLE: Record<string, { bg: string; color: string }> = {
  LOW: { bg: "#e9f4ee", color: "#2c6e4f" },
  MODERATE: { bg: "#fdf3e0", color: "#8a6116" },
  HIGH: { bg: "#fbecec", color: "#a4262c" },
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "#eaf3ff", color: "#1a5fb4" },
  Started: { bg: "#eaf3ff", color: "#1a5fb4" },
  Submitted: { bg: "#fdf3e0", color: "#8a6116" },
  Reviewing: { bg: "#fdf3e0", color: "#8a6116" },
  Ready: { bg: "#e9f4ee", color: "#2c6e4f" },
  Delivered: { bg: "#f2f2f2", color: "#6b6b6b" },
};

export function AdminAiBlueprintReviewPage({ id }: { id: string }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [record, setRecord] = useState<Record_ | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saved, setSaved] = useState(false);
  const [delivering, setDelivering] = useState(false);
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
    (patch: Partial<Pick<Record_, "reviewerNotes" | "attentionRating" | "suggestedControls" | "qaChecked" | "outcome">>) => {
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
              attentionRating: next.attentionRating,
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

  const flags = useMemo(() => (record ? computeFlags(record.form) : []), [record]);

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

  const { form } = record;
  const statusStyle = STATUS_STYLE[record.status] || STATUS_STYLE.Paid;
  const delivered = record.status === "Delivered";

  return (
    <div className={styles.page}>
      <TopBar
        title={form.businessName || "(no business name yet)"}
        statusTag={{ label: record.status, ...statusStyle }}
      />

      <div className={styles.workspaceBody}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <div className={styles.cardLabel}>Business context</div>
            <div className={styles.answerGrid}>
              <div>
                <div className={styles.answerKey}>Business</div>
                <div className={styles.answerValue}>{form.businessName || "—"}</div>
              </div>
              <div>
                <div className={styles.answerKey}>Team size</div>
                <div className={styles.answerValue}>{form.teamSize || "—"}</div>
              </div>
              <div className={styles.answerFull}>
                <div className={styles.answerKey}>What the business does</div>
                <div className={styles.answerValue}>{form.industry || "—"}</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Tools in use</div>
            <div className={styles.tagRow}>
              {form.tools.length === 0 && !form.otherTool ? (
                <span className={styles.answerKey}>None reported</span>
              ) : (
                <>
                  {form.tools.map((tool) => (
                    <span key={tool} className={styles.tag}>
                      {tool}
                    </span>
                  ))}
                  {form.otherTool ? <span className={styles.tag}>{form.otherTool}</span> : null}
                </>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Material use case</div>
            <div className={styles.useCaseList}>
              <div>
                <div className={styles.answerKey}>Task</div>
                <div className={styles.answerValue}>{form.mainTask || "—"}</div>
              </div>
              <div>
                <div className={styles.answerKey}>Data involved</div>
                <div className={styles.answerValue}>{form.mainData || "—"}</div>
              </div>
              <div>
                <div className={styles.answerKey}>Human review before use?</div>
                <div className={styles.answerValue}>{form.reviewed || "—"}</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Additional notes from client</div>
            <div className={styles.notesBody}>{form.extraNotes || "None provided."}</div>
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
            <div className={styles.cardLabel}>Automated flags</div>
            <div className={styles.useCaseList}>
              {flags.map((flag, i) => {
                const style = FLAG_STYLE[flag.level];
                return (
                  <div key={i} className={styles.flagRow}>
                    <span className={styles.flagTag} style={{ background: style.bg, color: style.color }}>
                      {flag.level}
                    </span>
                    <span className={styles.flagText}>{flag.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Draft attention rating</div>
            <div className={styles.radioList}>
              {RATINGS.map((r) => {
                const on = record.attentionRating === r.key;
                return (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => patchAndSave({ attentionRating: r.key })}
                    className={styles.radioRow}
                    style={{ borderColor: on ? r.color : "#ebebeb", background: on ? r.bg : "#fff" }}
                  >
                    <span
                      className={`${styles.radioDot} ${on ? styles.radioDotOn : ""}`}
                      style={{ borderColor: r.color, background: on ? r.color : "#fff" }}
                    />
                    <span className={styles.radioLabel}>{r.key}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>Suggested controls</div>
            <div className={styles.checkList}>
              {SUGGESTED_CONTROLS.map((label) => {
                const on = !!record.suggestedControls[label];
                return (
                  <button
                    type="button"
                    key={label}
                    className={styles.checkRow}
                    onClick={() =>
                      patchAndSave({ suggestedControls: { ...record.suggestedControls, [label]: !on } })
                    }
                  >
                    <span className={`${styles.checkbox} ${on ? styles.checkboxOn : ""}`}>{on ? "✓" : ""}</span>
                    <span className={styles.checkLabel}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLabel}>QA checklist</div>
            <div className={styles.checkList}>
              {QA_ITEMS.map((label) => {
                const on = !!record.qaChecked[label];
                return (
                  <button
                    type="button"
                    key={label}
                    className={styles.checkRow}
                    onClick={() => patchAndSave({ qaChecked: { ...record.qaChecked, [label]: !on } })}
                  >
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
                    <span
                      className={`${styles.radioDot} ${on ? styles.radioDotOn : ""}`}
                      style={{ borderColor: "#171717", background: on ? "#171717" : "#fff" }}
                    />
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
    </div>
  );
}

function TopBar({
  title,
  statusTag,
}: {
  title: string;
  statusTag: { label: string; bg: string; color: string } | null;
}) {
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
