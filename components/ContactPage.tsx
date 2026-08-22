"use client";

import { useRef, useState } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";
import styles from "./ContactPage.module.css";

const REASONS = [
  {
    href: `${CONTACT_MAILTO}?subject=${encodeURIComponent("A problem worth solving")}`,
    emoji: "🧩",
    title: "I have a problem",
    copy: "Something is more complicated than it should be. Tell us about it — we like this part.",
    cta: "Email us about it →",
    className: "problem",
  },
  {
    href: `${CONTACT_MAILTO}?subject=${encodeURIComponent("An idea for WhatBit")}`,
    emoji: "💡",
    title: "I have an idea",
    copy: "A product, a partnership, a “what if” you can’t stop thinking about. Send it over.",
    cta: "Pitch us →",
    className: "idea",
  },
  {
    href: `${CONTACT_MAILTO}?subject=${encodeURIComponent("Hello!")}`,
    emoji: "👋",
    title: "Just say hi",
    copy: "No agenda required. We enjoy hearing from people who like the same weird problems we do.",
    cta: "Say hello →",
    className: "hi",
  },
] as const;

export function ContactPage() {
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      /* still show confirmation */
    }
    setCopyStatus("Copied! Now go paste it somewhere useful.");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyStatus(""), 2400);
  };

  return (
    <div className={styles.page}>
      <SiteNav variant="inner" ctaHref="/contact" />

      <section className={styles.hero}>
        <div className={styles.blobWrap} aria-hidden>
          <div className={styles.blob} />
          <div className={styles.eyeL} />
          <div className={styles.eyeR} />
          <div className={styles.smile} />
        </div>
        <div className={styles.eyebrow}>CONTACT</div>
        <h1 className={styles.title}>Say the bit that’s on your mind.</h1>
        <p className={styles.lede}>
          No contact form gatekeeper, no chatbot pretending to be a person. Just an inbox, checked by actual humans.
        </p>
      </section>

      <section className={styles.reasons}>
        <div className={styles.reasonsHead}>
          <div className={styles.pick}>PICK YOUR BIT</div>
          <h2 className={styles.reasonsTitle}>What brings you here?</h2>
        </div>
        <div className={styles.grid}>
          {REASONS.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className={`${styles.card} ${
                r.className === "problem"
                  ? styles.problem
                  : r.className === "idea"
                    ? styles.idea
                    : styles.hi
              }`}
            >
              <div className={styles.emoji}>{r.emoji}</div>
              <div className={styles.cardTitle}>{r.title}</div>
              <p>{r.copy}</p>
              <div className={styles.cardCta}>{r.cta}</div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.skip}>
        <div className={styles.skipEyebrow}>OR SKIP THE MENU</div>
        <button type="button" className={styles.emailBtn} onClick={copyEmail}>
          {CONTACT_EMAIL}
        </button>
        <div className={styles.copyStatus}>{copyStatus}</div>
        <p className={styles.skipNote}>
          We usually reply within one Earth day. The Elsewhere Department works faster, but it isn&apos;t allowed to
          answer your emails yet.
        </p>
      </section>

      <div className={styles.footer}>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
