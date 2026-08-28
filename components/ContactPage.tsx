"use client";

import { useRef, useState, type FormEvent } from "react";
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
    copy: "A product, a partnership, a ‘what if’ you can’t stop thinking about. Send it over.",
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
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
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

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setFormStatus("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          reason: data.get("reason"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setFormStatus(result.error || "That didn’t send. Please try again or email us directly.");
        return;
      }

      form.reset();
      setFormStatus("Sent. A real human will see it.");
    } catch {
      setFormStatus("That didn’t send. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
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
          No chatbot pretending to be a person. Send us the useful bit and an actual human will read it.
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

      <section className={styles.formSection} id="contact-form">
        <div className={styles.formIntro}>
          <div className={styles.pick}>OR USE THE FORM</div>
          <h2 className={styles.reasonsTitle}>Put it in our inbox.</h2>
          <p>
            Name, email, reason, message. That’s it. Please don’t put passwords, API keys or sensitive client information in here.
          </p>
        </div>

        <form className={styles.form} onSubmit={submitContact}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" maxLength={120} required />
            </label>
            <label className={styles.field}>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" maxLength={254} required />
            </label>
          </div>

          <label className={styles.field}>
            <span>What’s this about?</span>
            <select name="reason" defaultValue="A problem worth solving">
              <option>A problem worth solving</option>
              <option>An idea for WhatBit</option>
              <option>Product support</option>
              <option>Work with WhatBit</option>
              <option>Privacy or accessibility</option>
              <option>Something else</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Message</span>
            <textarea name="message" rows={7} maxLength={5000} required />
          </label>

          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <div className={styles.formActions}>
            <button className={styles.submitBtn} type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send it →"}
            </button>
            <p className={styles.privacyNote}>
              By sending this form, you’re giving us the information above so we can respond. See our <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>
          <div className={styles.formStatus} aria-live="polite">{formStatus}</div>
        </form>
      </section>

      <section className={styles.skip}>
        <div className={styles.skipEyebrow}>PREFER EMAIL?</div>
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
