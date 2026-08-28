"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminLoginGate } from "./AdminLoginGate";
import styles from "./AdminAiBlueprint.module.css";

type QueueRow = {
  id: string;
  businessName: string;
  contactEmail: string;
  status: string;
  purchasedAt: string;
  reviewer: string;
  dueAt: string;
};

const FILTERS = ["All", "Paid", "Started", "Submitted", "Reviewing", "Ready", "Delivered"];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "#eaf3ff", color: "#1a5fb4" },
  Started: { bg: "#eaf3ff", color: "#1a5fb4" },
  Submitted: { bg: "#fdf3e0", color: "#8a6116" },
  Reviewing: { bg: "#fdf3e0", color: "#8a6116" },
  Ready: { bg: "#e9f4ee", color: "#2c6e4f" },
  Delivered: { bg: "#f2f2f2", color: "#6b6b6b" },
};

function formatDate(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

export function AdminAiBlueprintQueuePage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [filter, setFilter] = useState("All");
  const [rows, setRows] = useState<QueueRow[] | null>(null);

  const loadRows = (status: string) => {
    fetch(`/api/admin/ai-blueprint${status !== "All" ? `?status=${encodeURIComponent(status)}` : ""}`)
      .then(async (res) => {
        if (res.status === 401) {
          setAuthed(false);
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as { rows: QueueRow[] };
        setAuthed(true);
        setRows(data.rows);
      })
      .catch(() => setRows([]));
  };

  useEffect(() => {
    loadRows(filter);
  }, [filter]);

  if (authed === false) {
    return <AdminLoginGate onSignedIn={() => loadRows(filter)} />;
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.topbarBrand}>WhatBit Admin</span>
          <span className={styles.topbarSep}>/</span>
          <span className={styles.topbarSection}>AI Blueprint</span>
        </div>
        <Link href="/ai-blueprint" className={styles.topbarLink}>
          View public page →
        </Link>
      </header>

      <div className={styles.body}>
        <div className={styles.headRow}>
          <div>
            <div className={styles.title}>Assessment queue</div>
            <div className={styles.count}>
              {rows === null ? "Loading…" : `${rows.length} assessment${rows.length === 1 ? "" : "s"}`}
            </div>
          </div>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`${styles.filterChip} ${filter === f ? styles.filterChipActive : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div>Business</div>
            <div>Contact</div>
            <div>Status</div>
            <div>Purchased</div>
            <div>Reviewer</div>
            <div>Due</div>
          </div>
          {(rows || []).map((row) => {
            const style = STATUS_STYLE[row.status] || STATUS_STYLE.Paid;
            return (
              <Link key={row.id} href={`/admin/ai-blueprint/${row.id}`} className={styles.tableRow}>
                <div className={styles.rowBusiness}>{row.businessName}</div>
                <div className={styles.rowMuted}>{row.contactEmail || "—"}</div>
                <div>
                  <span className={styles.statusTag} style={{ background: style.bg, color: style.color }}>
                    {row.status}
                  </span>
                </div>
                <div className={styles.rowMuted}>{formatDate(row.purchasedAt)}</div>
                <div className={styles.rowMuted}>{row.reviewer || "—"}</div>
                <div className={styles.rowMuted}>{formatDate(row.dueAt)}</div>
              </Link>
            );
          })}
          {rows !== null && rows.length === 0 ? <div className={styles.emptyRow}>No assessments in this view.</div> : null}
        </div>
      </div>
    </div>
  );
}
