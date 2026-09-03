"use client";

import { useState, type FormEvent } from "react";
import styles from "./NewsletterCard.module.css";

type NewsletterCardProps = {
  /** Full-width centered "strip" variant used at the end of Layout C. */
  strip?: boolean;
  /** Larger hero-card variant used on the hub page. */
  size?: "default" | "large";
  note?: string;
};

/**
 * The "One Less Thing" newsletter signup. No real ESP wiring — this is an
 * accepted stub per the design handoff, matching the prototype's
 * `preventDefault()`-only submit.
 */
export function NewsletterCard({ strip = false, size = "default", note }: NewsletterCardProps) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`${styles.card} ${strip ? styles.strip : ""}`}>
      <div className={styles.eyebrow}>NEWSLETTER</div>
      <div className={styles.title} style={size === "large" ? { fontSize: 26 } : undefined}>
        One Less Thing
      </div>
      <p className={styles.description}>Each edition removes one repeated annoyance.</p>
      {submitted ? (
        <p className={styles.confirmed}>You&rsquo;re on the list.</p>
      ) : (
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="email"
            required
            placeholder="you@company.com"
            className={styles.input}
            aria-label="Email address"
          />
          <button type="submit" className={styles.button}>
            Make this one less thing
          </button>
        </form>
      )}
      <p className={styles.note}>{note ?? "One weekly relief. Unsubscribe anytime."}</p>
    </div>
  );
}
