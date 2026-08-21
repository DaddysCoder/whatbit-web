"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ABOUT_CARDS, ABOUT_DOT_COLORS } from "@/lib/about-cards";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./AboutPage.module.css";

const CARD_COUNT = ABOUT_CARDS.length;

function cardStyle(i: number, scrollIndex: number, reduced: boolean) {
  if (reduced) {
    const active = i === Math.round(scrollIndex);
    return { transform: "none", opacity: active ? 1 : 0 };
  }
  const rel = i - scrollIndex;
  let ty: number;
  let scale: number;
  let opacity: number;
  if (rel >= 0) {
    const t = Math.min(rel, 1);
    ty = t * 90;
    scale = 1 - t * 0.08;
    opacity = 1 - t;
  } else {
    const d = Math.min(-rel, 4);
    ty = -d * 16;
    scale = 1 - d * 0.035;
    opacity = Math.max(0, 1 - d * 0.4);
  }
  return {
    transform: `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`,
    opacity,
  };
}

export function AboutPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionHeight, setSectionHeight] = useState(5000);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  const computeHeight = useCallback(() => {
    return (CARD_COUNT - 1) * window.innerHeight * 0.9 + window.innerHeight;
  }, []);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const travel = sectionHeight - window.innerHeight;
    if (travel <= 0) return;
    let progress = -rect.top / travel;
    progress = Math.max(0, Math.min(1, progress));
    const idx = progress * (CARD_COUNT - 1);
    setScrollIndex(idx);
    setActiveIndex(Math.round(idx));
  }, [sectionHeight]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(CARD_COUNT - 1, i));
      const el = sectionRef.current;
      if (!el) {
        setActiveIndex(clamped);
        setScrollIndex(clamped);
        return;
      }
      const rect = el.getBoundingClientRect();
      const travel = sectionHeight - window.innerHeight;
      const docTop = window.scrollY + rect.top;
      const target = docTop + travel * (clamped / (CARD_COUNT - 1));
      window.scrollTo({ top: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
    },
    [reduced, sectionHeight]
  );

  useEffect(() => {
    const resize = () => setSectionHeight(computeHeight());
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    handleScroll();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [activeIndex, computeHeight, goTo, handleScroll]);

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

      <div className={styles.story} ref={sectionRef} style={{ height: sectionHeight }}>
        <div className={styles.sticky}>
          <div className={styles.storyHead}>
            <div className={styles.storyEyebrow}>THE STORY, IN PIECES</div>
            <div className={styles.storyTitle}>Keep scrolling.</div>
            <div className={styles.storyCount}>{label}</div>
          </div>
          <div className={styles.stage}>
            {ABOUT_CARDS.map((card, i) => {
              const s = cardStyle(i, scrollIndex, reduced);
              const width = card.kind === "quote" ? "min(560px,88vw)" : "min(640px,88vw)";
              return (
                <div
                  key={i}
                  className={styles.card}
                  onClick={() => goTo(i)}
                  style={{
                    width,
                    zIndex: 10 + i * 10,
                    transform: `translate(-50%, -50%) ${s.transform === "none" ? "" : s.transform}`,
                    opacity: s.opacity,
                    transition: reduced ? "opacity 0.3s ease" : "none",
                  }}
                >
                  {card.kind === "quote" ? (
                    <div className={styles.quoteCard}>
                      <div className={styles.quoteLines}>
                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{card.lines[0]}</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>{card.lines[1]}</span>
                        <span style={{ color: "rgba(255,255,255,0.25)" }}>{card.lines[2]}</span>
                      </div>
                      <div className={styles.imgWrap}>
                        <Image src={card.image} alt="" fill sizes="560px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className={styles.quoteText} style={{ color: card.quoteColor }}>
                        {card.quote}
                      </div>
                    </div>
                  ) : (
                    <div className={`wb-card-body ${styles.storyCard}`}>
                      <div className={styles.num} style={{ color: card.accent }}>
                        {card.number}
                      </div>
                      <div className={styles.cardEyebrow} style={{ color: card.accent }}>
                        {card.eyebrow}
                      </div>
                      {card.heading ? <div className={styles.cardHeading}>{card.heading}</div> : null}
                      <div className={styles.body} style={{ gap: card.eyebrow === "OUR VALUES" ? 22 : 16 }}>
                        {card.body.map((p, idx) => {
                          if (p.variant === "lead") {
                            return (
                              <p key={idx} className={styles.lead}>
                                {p.text}
                              </p>
                            );
                          }
                          if (p.variant === "italic") {
                            return (
                              <p key={idx} className={styles.italic} style={{ color: card.accent }}>
                                {p.text}
                              </p>
                            );
                          }
                          if (p.variant === "italicAccent") {
                            return (
                              <p key={idx}>
                                <span style={{ fontStyle: "italic", color: card.accent }}>{p.text}</span>
                              </p>
                            );
                          }
                          return <p key={idx}>{p.text}</p>;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
