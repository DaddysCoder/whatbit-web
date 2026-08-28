import Link from "next/link";
import type { DocBlock } from "@/components/DocPage";
import { VECTOR_ACCENT } from "@/lib/vector-legal";
import styles from "./VectorDocPage.module.css";

type VectorDocPageProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  blocks: DocBlock[];
};

export function VectorDocPage({ eyebrow, title, lede, blocks }: VectorDocPageProps) {
  return (
    <div className={styles.page} style={{ ["--doc-accent" as string]: VECTOR_ACCENT }}>
      <article className={styles.body}>
        <Link href="/vector" className={styles.back}>
          ← Back to Vector
        </Link>
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
        <nav className={styles.legalRow} aria-label="Vector legal">
          <Link href="/vector/privacy">Privacy</Link>
          <Link href="/vector/terms">Terms</Link>
        </nav>
      </article>
      <footer className={styles.footer}>
        <span>WhatBit · Australia</span>
      </footer>
    </div>
  );
}
