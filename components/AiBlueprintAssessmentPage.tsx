"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AssessmentWizard } from "./ai-blueprint/assessment/AssessmentWizard";
import { loadAssessment } from "./ai-blueprint/assessment/api";
import type { WizardInitialState } from "./ai-blueprint/assessment/useAssessmentWizard";
import styles from "./ai-blueprint/assessment/assessment.module.css";

type LoadState = "loading" | "ready" | "missing-token" | "not-found" | "already-submitted" | "error";

export function AiBlueprintAssessmentPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loadState, setLoadState] = useState<LoadState>(token ? "loading" : "missing-token");
  const [initial, setInitial] = useState<WizardInitialState | null>(null);

  useEffect(() => {
    if (!token) return;

    // Server state is authoritative on load — loadAssessment() only falls
    // back to the crash-resilience local cache when the fetch itself fails,
    // never merely because a cache happens to exist.
    loadAssessment(token).then((result) => {
      if (result.kind === "not_found") {
        setLoadState("not-found");
        return;
      }
      if (result.kind === "already_submitted") {
        setLoadState("already-submitted");
        return;
      }
      if (result.kind === "error") {
        setLoadState("error");
        return;
      }
      setInitial({
        assessmentId: result.assessmentId,
        startedAt: result.startedAt,
        updatedAt: result.updatedAt,
        draft: result.draft,
      });
      setLoadState("ready");
    });
  }, [token]);

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

  if (loadState === "loading" || !initial) {
    return <StatusScreen title="Loading your assessment…" body="One moment." />;
  }

  return <AssessmentWizard token={token} initial={initial} />;
}

function StatusScreen({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.statusPage}>
      <header className={styles.progressHeader} style={{ position: "static" }}>
        <div className={styles.progressInner}>
          <div className={styles.progressTopRow}>
            <Link href="/" className={styles.brandRow} style={{ textDecoration: "none" }}>
              <span style={{ color: "#0B0B0C", fontWeight: 800 }}>What</span>
              <span style={{ color: "#7B2FF7", fontWeight: 800 }}>Bit</span>
            </Link>
            <span className={styles.brandSub}>AI Blueprint Assessment</span>
          </div>
        </div>
      </header>
      <div className={styles.statusBody}>
        <h1 className={styles.heading1} style={{ fontSize: 24 }}>
          {title}
        </h1>
        <p className={styles.subcopy}>{body}</p>
        <p className={styles.subcopy}>
          Need help? <a href="mailto:hello@primitiveai.com.au">hello@primitiveai.com.au</a>
        </p>
      </div>
    </div>
  );
}
