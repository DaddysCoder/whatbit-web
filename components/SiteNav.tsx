"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import styles from "./SiteNav.module.css";

type SiteNavProps = {
  variant?: "home" | "inner" | "about" | "waitlist" | "digital";
  accent?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteNav({
  variant = "inner",
  accent = "#7B2FF7",
  ctaHref = "/contact",
  ctaLabel = "Get in touch",
}: SiteNavProps) {
  const [solid, setSolid] = useState(variant !== "home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "home") return;
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navStyle =
    variant === "home"
      ? {
          background: solid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
          backdropFilter: solid ? "blur(12px)" : "none",
          WebkitBackdropFilter: solid ? "blur(12px)" : "none",
          borderBottom: solid ? "1px solid #E5E5E5" : "1px solid transparent",
        }
      : undefined;

  if (variant === "about") {
    return (
      <header className={`${styles.nav} ${styles.solid}`}>
        <Wordmark />
        <nav className={styles.aboutLinks} aria-label="About">
          <Link href="/rft" className={styles.textLink}>
            RFT
          </Link>
          <Link href="/elsewhere" className={styles.textLink}>
            Elsewhere
          </Link>
          <Link href="/" className={styles.textLink}>
            ← Back home
          </Link>
        </nav>
      </header>
    );
  }

  if (variant === "waitlist") {
    return (
      <header className={`${styles.nav} ${styles.solid}`}>
        <Wordmark accent={accent} />
        <Link href="/#products" className={styles.textLink}>
          ← All products
        </Link>
      </header>
    );
  }

  const digitalCurrent = variant === "digital";
  const solidNav = variant === "inner" || variant === "digital";

  return (
    <header
      className={`${styles.nav} ${solidNav ? styles.solid : ""} ${solid && variant === "home" ? styles.homeSolid : ""}`}
      style={navStyle}
    >
      <Wordmark accent={accent} />
      <nav className={styles.desktop} aria-label="Primary">
        {digitalCurrent ? (
          <span className={styles.current} aria-current="page">
            Digital Services
          </span>
        ) : (
          <Link href="/digital-services" className={styles.textLink}>
            Digital Services
          </Link>
        )}
        <Link href="/#products" className={styles.textLink}>
          Products
        </Link>
        <Link href="/#philosophy" className={styles.textLink}>
          Philosophy
        </Link>
        {variant === "home" ? (
          <Link href="/about" className={styles.textLink}>
            About
          </Link>
        ) : null}
        <Link href="/rft" className={styles.textLink}>
          RFT
        </Link>
        <Link href="/elsewhere" className={styles.textLink}>
          Elsewhere
        </Link>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </Link>
      </nav>
      <button
        type="button"
        className={styles.burger}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      {open ? (
        <div className={styles.sheet} role="dialog" aria-label="Menu">
          {digitalCurrent ? (
            <span className={styles.current} aria-current="page">
              Digital Services
            </span>
          ) : (
            <Link href="/digital-services" onClick={() => setOpen(false)}>
              Digital Services
            </Link>
          )}
          <Link href="/#products" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/#philosophy" onClick={() => setOpen(false)}>
            Philosophy
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/rft" onClick={() => setOpen(false)}>
            RFT
          </Link>
          <Link href="/elsewhere" onClick={() => setOpen(false)}>
            Elsewhere
          </Link>
          <Link href={ctaHref} className={styles.cta} onClick={() => setOpen(false)}>
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
