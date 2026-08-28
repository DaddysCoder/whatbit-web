"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./HomePage.module.css";

const defaultTilt = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)";

function revealStyle(on: boolean, delay: number, pop = false) {
  if (pop) {
    return {
      opacity: on ? 1 : 0,
      transform: on ? "scale(1) translateY(0)" : "scale(0.82) translateY(36px)",
      transition: `opacity 0.6s cubic-bezier(.34,1.56,.64,1) ${delay}s, transform 0.6s cubic-bezier(.34,1.56,.64,1) ${delay}s`,
    } as const;
  }
  return {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
  } as const;
}

export function HomePage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({ hero: true });
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.25 });
  const [orbitProgress, setOrbitProgress] = useState(0);
  const [priceTilt, setPriceTilt] = useState<Record<number, string>>({});
  const nodes = useRef<Record<string, HTMLElement | null>>({});
  const priceNodes = useRef<(HTMLDivElement | null)[]>([]);
  const orbitEl = useRef<HTMLElement | null>(null);

  const setNode = useCallback((id: string) => (el: HTMLElement | null) => {
    nodes.current[id] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = (e.target as HTMLElement).dataset.revealId;
          if (!id) return;
          setRevealed((s) => ({ ...s, [id]: true }));
          observer.unobserve(e.target);
        });
      },
      { threshold: 0.15 }
    );

    Object.entries(nodes.current).forEach(([id, el]) => {
      if (!el) return;
      el.dataset.revealId = id;
      observer.observe(el);
    });

    const onScroll = () => {
      const el = orbitEl.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.5);
      setOrbitProgress(Math.max(0, Math.min(1, raw)));
    };

    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const onPriceMove = (i: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const el = priceNodes.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 16;
    const rotX = (0.5 - py) * 16;
    setPriceTilt((s) => ({
      ...s,
      [i]: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08) translateY(-10px)`,
    }));
  };

  const onPriceLeave = (i: number) => () => {
    setPriceTilt((s) => ({ ...s, [i]: defaultTilt }));
  };

  const r = (id: string) => !!revealed[id];
  const spotlight = `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(123,47,247,0.10), transparent 60%)`;
  const orbitCircleScale = 0.4 + orbitProgress * 0.9;
  const orbitCircleStroke = `rgba(255,255,255,${(0.04 + orbitProgress * 0.16).toFixed(3)})`;

  return (
    <div className={styles.page}>
      <SiteNav variant="home" ctaHref="/contact" />

      <section className={styles.hero}>
        <div className={styles.spotlight} style={{ background: spotlight }} />
        <div ref={setNode("hero")} style={revealStyle(r("hero"), 0)}>
          <div className={styles.eyebrow}>AN AUSTRALIAN PROBLEM-SOLVING COMPANY</div>
          <h1 className={styles.heroTitle}>
            We figure out what&apos;s
            <br />
            actually going on.
          </h1>
        </div>
        <p className={styles.heroSub} style={revealStyle(r("hero"), 0.12)}>
          Then we build the tool that fixes it. WhatBit is a small Australian company — and the family of tools we&apos;ve built along the way.
        </p>
        <div className={styles.heroLine} style={revealStyle(r("hero"), 0.12)}>
          Human where it matters. Clever where it counts.
        </div>
        <div className={styles.scrollHint}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      <section
        className={styles.orbit}
        ref={(el) => {
          orbitEl.current = el;
          nodes.current.orbit = el;
          if (el) el.dataset.revealId = "orbit";
        }}
        style={revealStyle(r("orbit"), 0)}
      >
        <h2 className={styles.orbitTitle}>One approach. Eight tools.</h2>
        <p className={styles.orbitCopy}>
          Every product carries the same name suffix for a reason. Same method, same standard — a different problem each time. “By WhatBit” means we did the thinking so you don&apos;t have to.
        </p>
        <div className={styles.orbitStage}>
          <div className={styles.core} />
          {[
            { dur: 34, rot: 0, size: 22, top: -11, color: "#1FBFA3", shadow: "rgba(31,191,163,0.5)" },
            { dur: 40, rot: 60, size: 18, top: -9, color: "#F2925C", shadow: "rgba(242,146,92,0.5)" },
            { dur: 46, rot: 120, size: 16, top: -8, color: "#E4D9FB", shadow: "rgba(228,217,251,0.4)" },
            { dur: 38, rot: 180, size: 20, top: -10, color: "#E8542E", shadow: "rgba(232,84,46,0.5)" },
            { dur: 44, rot: 240, size: 18, top: -9, color: "#0E8F71", shadow: "rgba(14,143,113,0.5)" },
            { dur: 30, rot: 300, size: 14, top: -7, color: "#C9B8F5", shadow: "rgba(201,184,245,0.4)" },
          ].map((d) => (
            <div key={d.rot} className={styles.spin} style={{ animation: `orbitspin ${d.dur}s linear infinite` }}>
              <div className={styles.spinInner} style={{ transform: `rotate(${d.rot}deg)` }}>
                <div className={styles.dot} style={{ top: d.top, width: d.size, height: d.size, background: d.color, boxShadow: `0 4px 16px ${d.shadow}` }} />
              </div>
            </div>
          ))}
          <div className={styles.rings}>
            <div className={styles.ring} style={{ width: "100%", height: "100%", background: "radial-gradient(circle,rgba(123,47,247,0.16) 0%,rgba(123,47,247,0) 68%)", opacity: orbitProgress, transform: `scale(${(0.25 + orbitProgress * 1.15).toFixed(3)})` }} />
            <div className={styles.ring} style={{ width: "78%", height: "78%", background: "radial-gradient(circle,rgba(31,191,163,0.14) 0%,rgba(31,191,163,0) 68%)", opacity: orbitProgress * 0.85, transform: `scale(${(0.15 + orbitProgress * 1.05).toFixed(3)})` }} />
          </div>
          <svg className={styles.svg} viewBox="0 0 460 460">
            <circle cx="230" cy="230" r="170" fill="none" stroke={orbitCircleStroke} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", transform: `scale(${orbitCircleScale})`, transition: "transform 0.9s cubic-bezier(.22,1,.36,1), stroke 0.9s ease" }} />
          </svg>
        </div>
      </section>

      <section id="products" className={styles.products}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>The tools</h2>
          <p className={styles.sectionSub}>Each one solves a specific problem. None of them exist just because we could build them.</p>
        </div>
        <div className={styles.grid} ref={setNode("products")}>
          <Link href="/pace" className={`${styles.card} ${styles.orbitCard}`} style={revealStyle(r("products"), 0, true)}>
            <div className={styles.cardTop}>
              <BarMark size={56} radius={16} gradient="linear-gradient(135deg,#9B6EF3,#7B2FF7)" />
              <div className={styles.live}>FREE · LIVE</div>
            </div>
            <div>
              <div className={`${styles.cardName} ${styles.orbitName}`}>Pace <span className={`${styles.by} ${styles.orbitBy}`}>by WhatBit</span></div>
              <div className={styles.orbitHeadline}>Your week, your hours, what they&apos;re worth.</div>
              <p className={styles.cardTag}>A free calendar and hours workspace for practitioners who bill by the hour — logged time, billed value, and pace toward target, all in one place.</p>
            </div>
            <div className={styles.explore}>Open Pace <span>→</span></div>
          </Link>

          <Link href="/frame" className={`${styles.card} ${styles.frameCard}`} style={revealStyle(r("products"), 0.05, true)}>
            <div className={styles.cardTop}>
              <BarMark size={56} radius={16} gradient="linear-gradient(135deg,#F07655,#E8542E)" />
              <div className={`${styles.live} ${styles.frameLive}`}>LIVE</div>
            </div>
            <div>
              <div className={`${styles.cardName} ${styles.orbitName}`}>Frame <span className={`${styles.by} ${styles.orbitBy}`}>by WhatBit</span></div>
              <div className={styles.frameHeadline}>Behaviour support evidence, from observation to hypothesis.</div>
              <p className={styles.cardTag}>Record observations, gather structured screening, compare evidence and keep uncertainty visible.</p>
            </div>
            <div className={`${styles.explore} ${styles.frameExplore}`}>Explore Frame <span>→</span></div>
          </Link>

          <Link href="/voda" className={`${styles.card} ${styles.voda}`} style={revealStyle(r("products"), 0.08, true)}>
            <BarMark size={44} gradient="linear-gradient(135deg,#6E8CFF,#3452FF)" />
            <div><div className={styles.cardName}>VODA <span className={styles.by}>by WhatBit</span></div><p className={styles.cardTag}>See the business as a graph. Then see what happens next.</p></div>
            <div className={styles.dev}>IN DEVELOPMENT</div>
          </Link>

          <a href="https://axis.whatbit.tech" className={`${styles.card} ${styles.axil}`} style={revealStyle(r("products"), 0.1, true)}>
            <div className={styles.cardTop}>
              <BarMark size={44} gradient="linear-gradient(135deg,#F7A876,#F2925C)" />
              <div className={styles.live}>LIVE · FREE + PRO</div>
            </div>
            <div>
              <div className={styles.cardName}>Axis <span className={styles.by}>by WhatBit</span></div>
              <p className={styles.cardTag}>Voice-first task capture and daily planning. Speak what needs doing, review the tasks, then plan the day and week.</p>
            </div>
            <div className={styles.explore}>Open Axis <span>→</span></div>
          </a>

          <Link href="/trace" className={`${styles.card} ${styles.trace}`} style={revealStyle(r("products"), 0.1, true)}>
            <BarMark size={44} gradient="linear-gradient(135deg,#3FD4B8,#1FBFA3)" />
            <div>
              <div className={styles.cardName}>Trace <span className={styles.by}>by WhatBit</span></div>
              <p className={styles.cardTag}>Free behaviour-support budget and pacing calculator. Pro unlocks downloadable reports and document exports.</p>
            </div>
            <div className={styles.live}>FREE · PRO</div>
          </Link>

          <Link href="/vector" className={`${styles.card} ${styles.vector}`} style={revealStyle(r("products"), 0.15, true)}>
            <BarMark size={44} gradient="linear-gradient(135deg,#B294F5,#8B5CF6)" />
            <div>
              <div className={styles.cardName}>Vector <span className={styles.by}>by WhatBit</span></div>
              <p className={styles.cardTag}>The forms you need, without the paperwork feeling like paperwork.</p>
            </div>
            <div className={styles.vectorLive}>LIVE</div>
          </Link>

          <Link href="/field" className={`${styles.card} ${styles.field}`} style={revealStyle(r("products"), 0.2, true)}>
            <BarMark size={44} gradient="linear-gradient(135deg,#22B393,#0E8F71)" />
            <div><div className={styles.cardName}>Field <span className={styles.by}>by WhatBit</span></div><p className={styles.cardTag}>Everywhere your data lives, together.</p></div>
            <div className={styles.dev}>IN DEVELOPMENT</div>
          </Link>

          <Link href="/arc" className={`${styles.card} ${styles.arc}`} style={revealStyle(r("products"), 0.25, true)}>
            <BarMark size={44} gradient="linear-gradient(135deg,#7C4FD1,#5B21B6)" />
            <div><div className={styles.cardName}>Arc <span className={styles.by}>by WhatBit</span></div><p className={styles.cardTag}>The shape of getting there.</p></div>
            <div className={styles.dev}>IN DEVELOPMENT</div>
          </Link>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className={styles.sectionHead}>
          <div className={styles.priceEyebrow}>PRICING</div>
          <h2 className={styles.sectionTitle}>However you want to pay for it.</h2>
          <p className={styles.sectionSub} style={{ maxWidth: 520 }}>Every product stands alone. Most of them also plug into each other — use one, or stack a few.</p>
        </div>
        <div className={styles.priceGrid} ref={setNode("price")}>
          {[
            { title: "Free", body: "Full access to a single tool, no card required. Good for finding out if it fits how you work.", meta: "$0", metaColor: "#7B2FF7", className: "" },
            { title: "Subscription", body: "Ongoing access, billed monthly. Add tools as you go — each one talks to the others automatically.", meta: "PER PRODUCT / MONTH", metaColor: "#B794FF", className: styles.priceDark },
            { title: "Own it", body: "One-time purchase per product. Yours outright, updates included.", meta: "ONE-TIME / PRODUCT", metaColor: "#E8542E", className: styles.priceOrange },
          ].map((card, i) => (
            <div key={card.title} style={revealStyle(r("price"), [0, 0.08, 0.16][i], true)}>
              <div ref={(el) => { priceNodes.current[i] = el; }} className={`${styles.priceCard} ${card.className}`} style={{ transform: priceTilt[i] || defaultTilt }} onMouseMove={onPriceMove(i)} onMouseLeave={onPriceLeave(i)}>
                <div className={styles.priceTitle}>{card.title}</div>
                <p className={styles.priceBody}>{card.body}</p>
                <div className={styles.priceMeta} style={{ color: card.metaColor }}>{card.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.priceNote}>Exact pricing per product coming soon.</div>
      </section>

      <section className={styles.aboutWrap} ref={setNode("about")}>
        <Link href="/about" className={styles.aboutBand} style={revealStyle(r("about"), 0)}>
          <div>
            <div className={styles.aboutEyebrow}>HOW WE GOT HERE</div>
            <div className={styles.aboutTitle}>It&apos;s a longer story than most software companies have.</div>
            <p className={styles.aboutCopy}>The engine behind every WhatBit product started somewhere unexpected. Here&apos;s the whole thing.</p>
          </div>
          <div className={styles.aboutCta}>Read the story <span>→</span></div>
        </Link>
      </section>

      <section id="philosophy" className={styles.philosophy} ref={setNode("philosophy")}>
        <div className={styles.philLine} style={revealStyle(r("philosophy"), 0)}>We don&apos;t lead with the technology.</div>
        <div className={`${styles.philLine} ${styles.philAccent}`} style={revealStyle(r("philosophy"), 0.15)}>We lead with the problem.</div>
        <div className={`${styles.philLine} ${styles.philSub}`} style={revealStyle(r("philosophy"), 0.3)}>The technology should disappear into the work.</div>
      </section>

      <section className={styles.trust} ref={setNode("trust")} style={revealStyle(r("trust"), 0)}>
        <h2 className={styles.trustTitle}>There&apos;s very little black box about how we work.</h2>
        <p className={styles.trustCopy}>If we build something for you, you should be able to see how it works, why it works, and what it&apos;s built on. Trust is the whole product — not a line in the terms and conditions.</p>
      </section>

      <section id="cta" className={styles.ctaBlock} ref={setNode("cta")}>
        <div className={styles.ctaInner} style={revealStyle(r("cta"), 0)}>
          <h2 className={styles.ctaTitle}>Got a problem worth solving?</h2>
          <Link href="/contact" className={styles.ctaBtn}>Get in touch</Link>
        </div>
        <SiteFooter />
        <div className={styles.legal}>
          WhatBit · Australia
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </section>
    </div>
  );
}