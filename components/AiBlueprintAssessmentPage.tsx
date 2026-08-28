"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AiBlueprintAssessmentPage.module.css";

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

const EMPTY_FORM: AssessmentForm = {
  businessName: "",
  industry: "",
  teamSize: "",
  tools: [],
  otherTool: "",
  mainTask: "",
  mainData: "",
  reviewed: "",
  extraNotes: "",
  controls: [],
};

const TOOLS = ["ChatGPT", "Microsoft Copilot", "Google Gemini", "Canva AI", "An AI feature built into another tool we use"];
const CONTROLS = [
  "A written policy on AI use",
  "A list of which tools are approved",
  "A person who checks AI output before it goes out",
  "A way to log something going wrong",
];
const TEAM_SIZES = ["1-5", "6-20", "21-50", "50+"];
const REVIEW_OPTIONS = ["Always", "Sometimes", "No"];
const STEP_TOTAL = 5;

function storageKey(token: string) {
  return `aiblueprint_assessment_v1_${token}`;
}

type LoadState = "loading" | "ready" | "missing-token" | "not-found" | "already-submitted" | "error";

export function AiBlueprintAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loadState, setLoadState] = useState<LoadState>(token ? "loading" : "missing-token");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AssessmentForm>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!token) return;

    let cached: { step: number; form: AssessmentForm } | null = null;
    try {
      const raw = localStorage.getItem(storageKey(token));
      cached = raw ? JSON.parse(raw) : null;
    } catch {
      cached = null;
    }

    fetch(`/api/ai-blueprint/assessment/${token}`)
      .then(async (res) => {
        if (res.status === 404) {
          setLoadState("not-found");
          return;
        }
        if (!res.ok) {
          setLoadState("error");
          return;
        }
        const data = (await res.json()) as { status: string; step: number; form: AssessmentForm };
        if (["Submitted", "Reviewing", "Ready", "Delivered"].includes(data.status)) {
          setLoadState("already-submitted");
          return;
        }
        if (cached) {
          setForm(cached.form);
          setStep(cached.step);
        } else {
          setForm(data.form);
          setStep(data.step || 0);
        }
        hasLoaded.current = true;
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [token]);

  const persistLocal = useCallback(
    (nextForm: AssessmentForm, nextStep: number) => {
      if (!token) return;
      try {
        localStorage.setItem(storageKey(token), JSON.stringify({ form: nextForm, step: nextStep }));
      } catch {
        // Local storage unavailable — server autosave still covers save/resume.
      }
    },
    [token],
  );

  const autosave = useCallback(
    (nextForm: AssessmentForm, nextStep: number) => {
      if (!token || !hasLoaded.current) return;
      persistLocal(nextForm, nextStep);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        fetch(`/api/ai-blueprint/assessment/${token}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ form: nextForm, step: nextStep }),
        })
          .then((res) => {
            if (res.ok) setSaved(true);
          })
          .catch(() => {});
      }, 500);
    },
    [token, persistLocal],
  );

  const updateForm = useCallback(
    (patch: Partial<AssessmentForm>) => {
      setForm((prev) => {
        const next = { ...prev, ...patch };
        autosave(next, step);
        return next;
      });
    },
    [autosave, step],
  );

  const goToStep = useCallback(
    (nextStep: number) => {
      const clamped = Math.max(0, Math.min(STEP_TOTAL - 1, nextStep));
      setStep(clamped);
      autosave(form, clamped);
    },
    [autosave, form],
  );

  const toggleInList = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const summaryTools = useMemo(() => {
    const parts = [...form.tools];
    const base = parts.length ? parts.join(", ") : "None selected";
    return form.otherTool ? `${base}, ${form.otherTool}` : base;
  }, [form.tools, form.otherTool]);

  const handleSubmit = useCallback(async () => {
    if (!token) return;
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/ai-blueprint/assessment/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, step, submit: true }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setSubmitError(data?.error || "Something went wrong submitting your assessment. Please try again.");
        setSubmitting(false);
        return;
      }
      try {
        localStorage.removeItem(storageKey(token));
      } catch {
        // ignore
      }
      router.push("/ai-blueprint/submitted");
    } catch {
      setSubmitError("Something went wrong submitting your assessment. Please try again.");
      setSubmitting(false);
    }
  }, [token, form, step, router]);

  if (loadState === "missing-token") {
    return (
      <StatusScreen
        title="We need your assessment link."
        body="This page needs a personal access link — the one we emailed you after your AI Blueprint purchase. Check your inbox for “Your AI Blueprint assessment is ready”."
      />
    );
  }

  if (loadState === "not-found") {
    return (
      <StatusScreen
        title="We couldn't find that assessment."
        body="This link may have expired or been mistyped. If you believe this is a mistake, get in touch and we'll sort it out."
      />
    );
  }

  if (loadState === "already-submitted") {
    return (
      <StatusScreen
        title="This assessment has already been submitted."
        body="A WhatBit reviewer is already working on your report and toolkit. You'll get an email once it's ready."
      />
    );
  }

  if (loadState === "error") {
    return (
      <StatusScreen
        title="Something went wrong."
        body="We couldn't load your assessment just now. Please refresh the page, or get in touch if this keeps happening."
      />
    );
  }

  if (loadState === "loading") {
    return <StatusScreen title="Loading your assessment…" body="One moment." />;
  }

  const progressPct = Math.round(((step + 1) / STEP_TOTAL) * 100);

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span style={{ color: "#0B0B0C" }}>What</span>
          <span style={{ color: "#7B2FF7" }}>Bit</span>
        </Link>
        <div className={styles.navTitle}>AI Blueprint Assessment</div>
        <div className={styles.saveLabel}>{saved ? "Saved" : ""}</div>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      <div className={styles.body}>
        <div className={styles.stepLabel}>
          STEP {step + 1} OF {STEP_TOTAL}
        </div>

        {step === 0 ? (
          <>
            <h1 className={styles.heading}>A bit about your business.</h1>
            <p className={styles.subcopy}>Just the basics — this gives your reviewer context for everything that follows.</p>
            <div className={styles.fieldGroup}>
              <Field label="Business name">
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => updateForm({ businessName: e.target.value })}
                  placeholder="Your business"
                  className={styles.input}
                />
              </Field>
              <Field label="What does the business do?">
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => updateForm({ industry: e.target.value })}
                  placeholder="e.g. allied health clinic, accounting firm, retail"
                  className={styles.input}
                />
              </Field>
              <Field label="Team size">
                <div className={styles.chipRow}>
                  {TEAM_SIZES.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => updateForm({ teamSize: size })}
                      className={`${styles.chip} ${form.teamSize === size ? styles.chipSelected : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <h1 className={styles.heading}>Which AI tools are already in use?</h1>
            <p className={styles.subcopy}>Select everything your team touches, even informally. There&apos;s no wrong answer.</p>
            <div className={styles.toolList}>
              {TOOLS.map((tool) => {
                const on = form.tools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => updateForm({ tools: toggleInList(form.tools, tool) })}
                    className={`${styles.toolRow} ${on ? styles.toolRowSelected : ""}`}
                  >
                    <span className={`${styles.checkbox} ${on ? styles.checkboxOn : ""}`}>{on ? "✓" : ""}</span>
                    <span className={styles.toolLabel}>{tool}</span>
                  </button>
                );
              })}
              <input
                type="text"
                value={form.otherTool}
                onChange={(e) => updateForm({ otherTool: e.target.value })}
                placeholder="Other tools (comma separated)"
                className={styles.input}
                style={{ marginTop: 6 }}
              />
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <h1 className={styles.headingTight}>Your main use case.</h1>
            <span className={styles.badgeRequired}>REQUIRED</span>
            <p className={styles.subcopy}>
              Pick the single most material way AI touches your work — the one that matters most if it went wrong.
            </p>
            <div className={styles.fieldGroup}>
              <Field label="What's the task?">
                <input
                  type="text"
                  value={form.mainTask}
                  onChange={(e) => updateForm({ mainTask: e.target.value })}
                  placeholder="e.g. drafting client emails, summarising case notes"
                  className={styles.input}
                />
              </Field>
              <Field label="What data goes into it?">
                <input
                  type="text"
                  value={form.mainData}
                  onChange={(e) => updateForm({ mainData: e.target.value })}
                  placeholder="e.g. client names, case details, financial figures"
                  className={styles.input}
                />
              </Field>
              <Field label="Does a person check the output before it's used?">
                <div className={styles.chipRow}>
                  {REVIEW_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => updateForm({ reviewed: opt })}
                      className={`${styles.chip} ${form.reviewed === opt ? styles.chipSelected : ""}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <h1 className={styles.headingTight}>Anything else worth flagging?</h1>
            <span className={styles.badgeOptional}>OPTIONAL</span>
            <p className={styles.subcopy}>
              If AI shows up anywhere else in the business, a quick note here helps — but it&apos;s fine to skip this.
            </p>
            <textarea
              rows={6}
              value={form.extraNotes}
              onChange={(e) => updateForm({ extraNotes: e.target.value })}
              placeholder="e.g. Canva AI for social posts, a chatbot on the website, a vendor tool with AI features built in..."
              className={styles.textarea}
            />
            <div className={styles.controlsGroup}>
              <label className={styles.fieldLabel}>Which of these already exist? (tick any that apply)</label>
              {CONTROLS.map((control) => {
                const on = form.controls.includes(control);
                return (
                  <button
                    type="button"
                    key={control}
                    onClick={() => updateForm({ controls: toggleInList(form.controls, control) })}
                    className={`${styles.controlRow} ${on ? styles.controlRowSelected : ""}`}
                  >
                    <span className={`${styles.checkboxSmall} ${on ? styles.checkboxOn : ""}`}>{on ? "✓" : ""}</span>
                    <span>{control}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <h1 className={styles.heading}>Review before you submit.</h1>
            <p className={styles.subcopy}>
              Once submitted, a WhatBit reviewer takes it from here — usually within 5 business days.
            </p>
            <div className={styles.summaryCard}>
              <div>
                <span className={styles.summaryLabel}>Business</span>
                <div className={styles.summaryValue}>{form.businessName || "—"}</div>
              </div>
              <div>
                <span className={styles.summaryLabel}>Tools in use</span>
                <div className={styles.summaryValue}>{summaryTools}</div>
              </div>
              <div>
                <span className={styles.summaryLabel}>Main use case</span>
                <div className={styles.summaryValue}>{form.mainTask || "—"}</div>
              </div>
            </div>
            {submitError ? <p className={styles.errorText}>{submitError}</p> : null}
          </>
        ) : null}

        <div className={styles.footerRow}>
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className={styles.backButton}
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            ← Back
          </button>
          {step === STEP_TOTAL - 1 ? (
            <button type="button" onClick={handleSubmit} disabled={submitting} className={styles.primaryButton}>
              {submitting ? "Submitting…" : "Submit assessment"}
            </button>
          ) : (
            <button type="button" onClick={() => goToStep(step + 1)} className={styles.continueButton}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function StatusScreen({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.statusPage}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span style={{ color: "#0B0B0C" }}>What</span>
          <span style={{ color: "#7B2FF7" }}>Bit</span>
        </Link>
        <div className={styles.navTitle}>AI Blueprint Assessment</div>
        <div />
      </header>
      <div className={styles.statusBody}>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.subcopy}>{body}</p>
        <p className={styles.subcopy}>
          Need help? <a href="mailto:hello@primitiveai.com.au">hello@primitiveai.com.au</a>
        </p>
      </div>
    </div>
  );
}
