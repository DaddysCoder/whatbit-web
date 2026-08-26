"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ABOUT_CARDS, ABOUT_DOT_COLORS, type AboutBodyLine, type AboutCard } from "@/lib/about-cards";
import { Wordmark } from "./Wordmark";
import { SiteNav } from "./SiteNav";
import styles from "./AboutPage.module.css";

const CARD_COUNT = ABOUT_CARDS.length;

type Phase = "pre" | "in" | "settled";

function cardVisual(i: number, phase: Phase, accentRgb: string, reduced: boolean) {
  if (reduced) {
    return {
      transform: "none",
      opacity: 1,
      transition: "none",
      shadow: i % 2 === 0 ? "0 20px 50px rgba(0,0,0,0.09)" : "0 16px 40px rgba(0,0,0,0.14)",
      anim: "none",
    };
  }

  const dir = i % 3;
  let transform = "none";
  if (phase === "pre") {
    if (dir === 0) transform = "translateY(56px) scale(0.94)";
    else if (dir === 1) transform = "translateX(-64px) rotate(-2deg) scale(0.94)";
    else transform = "translateX(64px) rotate(2deg) scale(0.94)";
  }

  const baseShadow = i % 2 === 0 ? "0 20px 50px rgba(0,0,0,0.09)" : "0 16px 40px rgba(0,0,0,0.14)";
  const shadow =
    phase === "in" ? `${baseShadow}, 0 0 46px rgba(${accentRgb},0.55)` : baseShadow;

  return {
    transform,
    opacity: phase === "pre" ? 0 : 1,
    transition:
      "transform 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease, box-shadow 0.9s ease",
    shadow,
    anim:
      phase === "settled"
        ? `cardwobble ${(5 + (i % 4) * 0.6).toFixed(1)}s ease-in-out infinite ${(i * 0.15).toFixed(2)}s`
        : "none",
  };
}

function StoryBody({ lines, accent }: { lines: AboutBodyLine[]; accent: string }) {
  return (
    <div className={styles.body}>
      {lines.map((p, idx) => {
        if (p.variant === "lead" || p.variant === "leadStrong" || p.variant === "section") {
          return (
            <p
              key={idx}
              className={
                p.variant === "section"
                  ? styles.sectionHead
                  : p.variant === "leadStrong"
                    ? styles.leadStrong
                    : styles.lead
              }
            >
              {p.text}
            </p>
          );
        }
        if (p.variant === "italic") {
          return (
            <p key={idx} className={styles.italic} style={{ color: accent }}>
              {p.text}
            </p>
          );
        }
        if (p.variant === "italicQuote") {
          return (
            <p key={idx}>
              Or somebody says:{" "}
              <span className={styles.italic} style={{ color: accent }}>
                “{p.text}”
              </span>
            </p>
          );
        }
        if (p.boldPrefix) {
          return (
            <p key={idx}>
              <span className={styles.bold}>{p.boldPrefix}</span>
              {p.text}
            </p>
          );
        }
        return <p key={idx}>{p.text}</p>;
      })}
    </div>
  );
}

function CardInner({ card }: { card: AboutCard }) {
  if (card.kind === "quote") {
    return (
      <div
        className={styles.quoteCard}
        style={{
          borderRadius: card.radius,
          border: card.border ?? "none",
        }}
      >
        <div className={styles.quoteLines}>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{card.lines[0]}</span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>{card.lines[1]}</span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>{card.lines[2]}</span>
        </div>
        <div className={styles.imgSlot} aria-hidden="true" />
        <div className={styles.quoteText} style={{ color: card.quoteColor }}>
          {card.quote}
        </div>
      </div>
    );
  }

  if (card.kind === "values") {
    return (
      <div
        className={styles.storyCard}
        style={{
          borderRadius: card.radius,
          border: card.border ?? "none",
        }}
      >
        <div className={styles.num} style={{ color: card.accent, opacity: 0.16 }}>
          {card.number}
        </div>
        <div className={styles.cardEyebrow} style={{ color: card.accent }}>
          {card.eyebrow}
        </div>
        <div className={styles.values}>
          {card.items.map((item) => (
            <div key={item.title} className={styles.valueItem}>
              <div className={styles.valueTitle}>{item.title}</div>
              <p>
                {item.body}
                {item.italicSuffix ? (
                  <>
                    {" "}
                    <span className={styles.italic} style={{ color: card.accent }}>
                      {item.italicSuffix}
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.storyCard}
      style={{
        borderRadius: card.radius,
        border: card.border ?? "none",
      }}
    >
      <div className={styles.num} style={{ color: card.accent, opacity: 0.14 }}>
        {card.number}
      </div>
      <div className={styles.cardEyebrow} style={{ color: card.accent }}>
        {card.eyebrow}
      </div>
      {card.heading ? <div className={styles.cardHeading}>{card.heading}</div> : null}
      <StoryBody lines={card.body} accent={card.accent} />
    </div>
  );
}

export function AboutPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase[]>(() => Array(CARD_COUNT).fill("pre"));
  const [reduced, setReduced] = useState(false);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(CARD_COUNT - 1, i));
    const el = cardRefs.current[clamped];
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - 100;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMq = () => setReduced(mq.matches);
    syncMq();
    mq.addEventListener("change", syncMq);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = cardRefs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cardRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1 || !entry.isIntersecting) return;

          if (mq.matches) {
            setPhase((prev) => {
              if (prev[idx] === "settled") return prev;
              const next = prev.slice();
              next[idx] = "settled";
              return next;
            });
            return;
          }

          setPhase((prev) => {
            if (prev[idx] !== "pre") return prev;
            const next = prev.slice();
            next[idx] = "in";
            return next;
          });

          window.setTimeout(() => {
            setPhase((prev) => {
              if (prev[idx] !== "in") return prev;
              const next = prev.slice();
              next[idx] = "settled";
              return next;
            });
          }, 600);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (!el) return;
      navObserver.observe(el);
      revealObserver.observe(el);
    });

    return () => {
      mq.removeEventListener("change", syncMq);
      navObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const label = `${String(activeIndex + 1).padStart(2, "0")} / ${String(CARD_COUNT).padStart(2, "0")}`;

  return (
    <div className={styles.page}>
      <SiteNav variant="about" />

      <section className={styles.hero}>
        <div className={styles.field}>
          <div className={styles.tilt}>
            <div
              className={styles.ring}
              style={{
                inset: 0,
                borderWidth: 1,
                borderColor: "rgba(183,148,255,0.12)",
                borderRadius: "50%",
                color: "rgb(183,148,255)",
                animation: "fieldspin 60s linear infinite, ringglow 18s linear infinite",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 17,
                borderWidth: 1,
                borderColor: "rgba(31,191,163,0.2)",
                borderRadius: "30% 70% 60% 40% / 40% 50% 60% 50%",
                color: "rgb(31,191,163)",
                animation:
                  "fieldspinrev 42s linear infinite, fieldmorph 11s ease-in-out infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 0s, 2s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 40,
                borderWidth: 1,
                borderColor: "rgba(123,47,247,0.24)",
                borderRadius: 24,
                color: "rgb(123,47,247)",
                animation: "fieldspin 32s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 4s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 64,
                borderWidth: 1,
                borderColor: "rgba(183,148,255,0.3)",
                borderRadius: "50%",
                color: "rgb(183,148,255)",
                animation: "fieldspinrev 26s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 6s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 85,
                borderWidth: 1.5,
                borderColor: "rgba(242,146,92,0.32)",
                borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%",
                color: "rgb(242,146,92)",
                animation:
                  "fieldspin 21s linear infinite, fieldmorph 8s ease-in-out infinite reverse, ringglow 18s linear infinite",
                animationDelay: "0s, 0s, 8s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 108,
                borderWidth: 1,
                borderColor: "rgba(31,191,163,0.34)",
                borderRadius: 20,
                color: "rgb(31,191,163)",
                animation: "fieldspinrev 17s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 10s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 129,
                borderWidth: 1.5,
                borderColor: "rgba(123,47,247,0.4)",
                borderRadius: "50%",
                color: "rgb(123,47,247)",
                animation: "fieldspin 13s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 12s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 150,
                borderWidth: 1,
                borderColor: "rgba(242,146,92,0.4)",
                borderRadius: 16,
                color: "rgb(242,146,92)",
                animation: "fieldspinrev 9.5s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 14s",
              }}
            />
            <div
              className={styles.ring}
              style={{
                inset: 170,
                borderWidth: 1,
                borderColor: "rgba(183,148,255,0.5)",
                borderRadius: "50%",
                color: "rgb(183,148,255)",
                animation: "fieldspin 6.5s linear infinite, ringglow 18s linear infinite",
                animationDelay: "0s, 16s",
              }}
            />
            <div style={{ position: "absolute", inset: 0, animation: "fieldspin 20s linear infinite" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 10,
                  width: 8,
                  height: 8,
                  marginLeft: -4,
                  borderRadius: "50%",
                  background: "#1FBFA3",
                  boxShadow: "0 0 12px #1FBFA3",
                }}
              />
            </div>
            <div style={{ position: "absolute", inset: 0, animation: "fieldspinrev 27s linear infinite" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 50,
                  width: 7,
                  height: 7,
                  marginLeft: -3.5,
                  borderRadius: "50%",
                  background: "#F2925C",
                  boxShadow: "0 0 10px #F2925C",
                }}
              />
            </div>
            <div style={{ position: "absolute", inset: 0, animation: "fieldspin 33s linear infinite" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 106,
                  width: 6,
                  height: 6,
                  marginLeft: -3,
                  borderRadius: "50%",
                  background: "#E4D9FB",
                  boxShadow: "0 0 8px #E4D9FB",
                }}
              />
            </div>
          </div>
          <div className={styles.coreWrap}>
            <div className={styles.core} />
          </div>
        </div>
        <div className={styles.eyebrow}>ABOUT WHATBIT</div>
        <h1 className={styles.title}>We find the bit that actually matters.</h1>
        <p className={styles.lede}>WHATBIT is an Australian research, technology and problem-solving company.</p>
        <div className={styles.line}>Human where it matters. Clever where it counts.</div>
        <div className={styles.scrollHint}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      <div className={styles.story}>
        <div className={styles.storyHead}>
          <div className={styles.storyEyebrow}>THE STORY, IN PIECES</div>
          <div className={styles.storyTitle}>Keep scrolling.</div>
          <div className={styles.storyCount}>{label}</div>
        </div>

        <div className={styles.dots}>
          {ABOUT_DOT_COLORS.map((color, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              className={styles.dot}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIndex ? 26 : 8,
                background: color,
                opacity: i === activeIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        <div className={styles.stack}>
          {ABOUT_CARDS.map((card, i) => {
            const v = cardVisual(i, phase[i], card.accentRgb, reduced);
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={styles.card}
                style={{
                  width: card.width,
                  transform: v.transform,
                  opacity: v.opacity,
                  transition: v.transition,
                }}
              >
                <div style={{ boxShadow: v.shadow, animation: v.anim, borderRadius: card.radius }}>
                  <CardInner card={card} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.close}>
        <div className={styles.closeBrand}>WHATBIT</div>
        <div className={styles.closeTitle}>Find the bit that matters.</div>
        <div className={`${styles.closeTitle} ${styles.closeMuted}`}>Then build from there.</div>
        <Link href="/" className={styles.back}>
          ← Back home
        </Link>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <Wordmark accent="#B794FF" ink="#FFFFFF" size={17} />
          <div className={styles.footerMark}>WhatBit · Australia</div>
        </div>
      </div>
    </div>
  );
}
