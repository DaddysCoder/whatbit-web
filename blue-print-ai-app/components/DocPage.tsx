import Link from "next/link";
import styles from "./DocPage.module.css";

export type DocBlock = {
  heading?: string;
  text: string;
};

type DocPageProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  blocks: DocBlock[];
  accent?: string;
  cta?: { href: string; label: string };
};

const CONTACT_EMAIL = "hello@primitiveai.com.au";

export function DocPage({
  eyebrow,
  title,
  lede,
  blocks,
  accent = "#7B2FF7",
  cta,
}: DocPageProps) {
  return (
    <div className={styles.page} style={{ ["--doc-accent" as string]: accent }}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span style={{ color: "#0B0B0C" }}>What</span>
          <span style={{ color: accent }}>Bit</span>
        </Link>
        <span className={styles.crumb}>AI Blueprint</span>
      </header>
      <article className={styles.body}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h1 className={styles.title}>{title}</h1>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
        <div className={styles.blocks}>
          {blocks.map((block, i) => (
            <div key={i} className={styles.block}>
              {block.heading ? <h2 className={styles.heading}>{block.heading}</h2> : null}
              <p>{block.text}</p>
            </div>
          ))}
        </div>
        {cta ? (
          <p className={styles.cta}>
            <a href={cta.href}>{cta.label}</a>
          </p>
        ) : null}
        <p className={styles.mail}>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <Link href="/" className={styles.back}>
          ← Back home
        </Link>
      </article>
      <footer className={styles.footer}>
        <span>AI Blueprint by WhatBit · Australia</span>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
