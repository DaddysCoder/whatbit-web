import Link from "next/link";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
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
      <SiteNav variant="inner" accent={accent} />
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
          <a href="mailto:hello@whatbit.io">hello@whatbit.io</a>
        </p>
        <Link href="/" className={styles.back}>
          ← Back home
        </Link>
      </article>
      <div className={styles.footer}>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
