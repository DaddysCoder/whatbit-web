"use client";

import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { LiftCard } from "@/components/motion/LiftCard";
import {
  FEATURED_ARTICLE,
  GRID_ARTICLES,
  OUTCOMES,
  OUTCOME_COLORS,
  type Outcome,
} from "@/lib/useful";
import { NewsletterCard } from "./NewsletterCard";
import { OutcomeTagRow } from "./OutcomeTag";
import styles from "./UsefulHubPage.module.css";

export function UsefulHubPage() {
  const [activeFilter, setActiveFilter] = useState<Outcome | null>(null);

  const filtered = useMemo(
    () => (activeFilter ? GRID_ARTICLES.filter((a) => a.outcome === activeFilter) : GRID_ARTICLES),
    [activeFilter]
  );

  const gridHeading = activeFilter
    ? `FILED UNDER · ${activeFilter.toUpperCase()}`
    : "MORE FROM THE USEFUL BIT";

  return (
    <div className={styles.page}>
      <SiteNav variant="useful" />

      <section className={styles.hero}>
        <Reveal direction="left">
          <div className={styles.eyebrow}>THE USEFUL BIT</div>
          <h1 className={styles.h1}>Technology, translated into a better Tuesday.</h1>
          <p className={styles.subhead}>Less tech. More sorted.</p>
          <div className={styles.chipRow}>
            <button
              type="button"
              className={styles.chip}
              style={
                activeFilter === null
                  ? { background: "#0b0b0c", color: "#ffffff" }
                  : undefined
              }
              onClick={() => setActiveFilter(null)}
            >
              All
            </button>
            {OUTCOMES.map((outcome) => {
              const active = activeFilter === outcome;
              const colors = OUTCOME_COLORS[outcome];
              return (
                <button
                  key={outcome}
                  type="button"
                  className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                  style={active ? { background: colors.bg, color: colors.fg } : undefined}
                  onClick={() => setActiveFilter((prev) => (prev === outcome ? null : outcome))}
                >
                  {outcome}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <div className={`${styles.newsletterHero}`}>
            <NewsletterCard size="large" />
          </div>
        </Reveal>
      </section>

      <Reveal direction="up" delay={0.15} className={styles.featuredSection}>
        <div className={styles.sectionLabel}>FEATURED</div>
        <LiftCard href={`/useful/${FEATURED_ARTICLE.slug}`} className={styles.featuredCard} strong>
          <div className={styles.featuredVisual}>
            <img src={FEATURED_ARTICLE.heroImage} alt={FEATURED_ARTICLE.heroAlt} />
          </div>
          <div className={styles.featuredText}>
            <div className={styles.featuredFormat}>{FEATURED_ARTICLE.format}</div>
            <h2 className={styles.featuredTitle}>{FEATURED_ARTICLE.title}</h2>
            <p className={styles.featuredDek}>{FEATURED_ARTICLE.dek}</p>
            <span className={styles.readLink}>Read the breakdown →</span>
          </div>
        </LiftCard>
      </Reveal>

      <section className={styles.gridSection}>
        <div className={styles.sectionLabel}>{gridHeading}</div>
        {filtered.length > 0 ? (
          <StaggerGroup key={activeFilter ?? "all"} className={styles.cardsGrid} fast>
            {filtered.map((article) => (
              <StaggerItem key={article.slug}>
                <LiftCard href={`/useful/${article.slug}`} className={styles.gridCard}>
                  <div className={styles.gridCardThumb}>
                    <img src={article.heroImage} alt={article.heroAlt} />
                  </div>
                  <div className={styles.gridCardBody}>
                    <OutcomeTagRow outcome={article.outcome} format={article.format} />
                    <div className={styles.gridCardTitle}>{article.title}</div>
                    <p className={styles.gridCardDek}>{article.dek}</p>
                    <span className={styles.readLink}>Read →</span>
                  </div>
                </LiftCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className={styles.empty}>Nothing filed under this one yet — try another filter.</p>
        )}
      </section>

      <div className={styles.footerWrap}>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
