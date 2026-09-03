import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT_MAILTO } from "@/lib/site";
import type { UsefulArticle } from "@/lib/useful";
import { BorrowThisCard } from "./BorrowThisCard";
import { NewsletterCard } from "./NewsletterCard";
import { OutcomeTagRow } from "./OutcomeTag";
import styles from "./ArticleLayout.module.css";

type ArticleLayoutProps = {
  article: UsefulArticle;
};

function ArticleHeader() {
  return (
    <header className={styles.articleHeader}>
      <Link href="/" className={styles.logo}>
        WHATBIT
      </Link>
      <nav className={styles.headerNav}>
        <Link href="/useful" className={styles.backLink}>
          ← The Useful Bit
        </Link>
        <a href={CONTACT_MAILTO} className={styles.cta}>
          Get in touch
        </a>
      </nav>
    </header>
  );
}

function ArticleBody({ article }: { article: UsefulArticle }) {
  return (
    <article className={styles.body}>
      {article.body.map((block, i) =>
        block.type === "heading" ? <h2 key={i}>{block.text}</h2> : <p key={i}>{block.text}</p>
      )}
    </article>
  );
}

function TitleBlock({ article, center = false }: { article: UsefulArticle; center?: boolean }) {
  return (
    <>
      <div className={styles.tagRow}>
        <OutcomeTagRow outcome={article.outcome} format={article.format} center={center} />
      </div>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.dek}>{article.dek}</p>
      <div className={styles.meta}>THE USEFUL BIT · {article.readTime}</div>
    </>
  );
}

function ArticleFooter() {
  return (
    <div className={styles.footerWrap}>
      <SiteFooter variant="minimal" />
    </div>
  );
}

export function ArticleLayout({ article }: ArticleLayoutProps) {
  if (article.layout === "A") return <LayoutA article={article} />;
  if (article.layout === "B") return <LayoutB article={article} />;
  return <LayoutC article={article} />;
}

/** Layout A — full-bleed hero, two-column body with a sticky sidebar. */
function LayoutA({ article }: { article: UsefulArticle }) {
  return (
    <div className={styles.page}>
      <ArticleHeader />
      <div className={styles.aHeroWrap}>
        <img src={article.heroImage} alt={article.heroAlt} />
      </div>
      <Reveal direction="up" className={styles.aTitleBlock}>
        <TitleBlock article={article} />
      </Reveal>
      <div className={styles.aBodyGrid}>
        <ArticleBody article={article} />
        <aside className={styles.aAside}>
          <BorrowThisCard title={article.borrowThis.title} description={article.borrowThis.description} />
          <NewsletterCard />
        </aside>
      </div>
      <ArticleFooter />
    </div>
  );
}

/** Layout B — split header (image left, title right), single body column, cards side by side. */
function LayoutB({ article }: { article: UsefulArticle }) {
  return (
    <div className={styles.page}>
      <ArticleHeader />
      <div className={styles.bSplitHero}>
        <div className={styles.bHeroImgWrap}>
          <img src={article.heroImage} alt={article.heroAlt} />
        </div>
        <Reveal direction="right" className={styles.bHeaderCol}>
          <TitleBlock article={article} />
        </Reveal>
      </div>
      <div className={styles.bBodyWrap}>
        <ArticleBody article={article} />
      </div>
      <div className={styles.bCardsRow}>
        <BorrowThisCard title={article.borrowThis.title} description={article.borrowThis.description} />
        <NewsletterCard />
      </div>
      <ArticleFooter />
    </div>
  );
}

/** Layout C — inset hero, centered title + body, inline Borrow This band, centered newsletter strip. */
function LayoutC({ article }: { article: UsefulArticle }) {
  return (
    <div className={styles.page}>
      <ArticleHeader />
      <div className={styles.cHeroOuter}>
        <div className={styles.cHeroInset}>
          <img src={article.heroImage} alt={article.heroAlt} />
        </div>
      </div>
      <Reveal direction="up" className={styles.cTitleBlock}>
        <TitleBlock article={article} center />
      </Reveal>
      <div className={styles.cBodyWrap}>
        <ArticleBody article={article} />
        <BorrowThisCard
          title={article.borrowThis.title}
          description={article.borrowThis.description}
          band
        />
      </div>
      <div className={styles.cNewsletterStrip}>
        <NewsletterCard strip />
      </div>
      <ArticleFooter />
    </div>
  );
}
