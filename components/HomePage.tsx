"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { Reveal, StaggerGroup } from "./motion/Reveal";
import { ProductCard } from "./motion/ProductCard";
import { LiftCard } from "./motion/LiftCard";
import { MagneticButton } from "./motion/MagneticButton";
import { cardEntranceVariants } from "@/lib/motion";
import styles from "./HomePage.module.css";

export function HomePage() {
  const orbitRef = useRef<HTMLElement | null>(null);

  // Hero spotlight tracks the cursor via a motion value (direct DOM write),
  // never a React re-render on every mousemove.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.25);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${useTransform(mouseX, (v) => `${v * 100}%`)} ${useTransform(mouseY, (v) => `${v * 100}%`)}, rgba(123,47,247,0.10), transparent 60%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Orbit ring intensifies as the ecosystem section scrolls through view —
  // driven by Motion's scroll tracking, not a scroll-listener re-render.
  const { scrollYProgress: orbitScroll } = useScroll({
    target: orbitRef,
    offset: ["end end", "center center"],
  });
  const orbitCircleScale = useTransform(orbitScroll, [0, 1], [0.4, 1.3]);
  const orbitCircleOpacity = useTransform(orbitScroll, [0, 1], [0.04, 0.2]);
  const orbitCircleStroke = useMotionTemplate`rgba(255,255,255,${orbitCircleOpacity})`;
  const ring1Scale = useTransform(orbitScroll, [0, 1], [0.25, 1.4]);
  const ring1Opacity = useTransform(orbitScroll, [0, 1], [0, 1]);
  const ring2Scale = useTransform(orbitScroll, [0, 1], [0.15, 1.2]);
  const ring2Opacity = useTransform(orbitScroll, [0, 1], [0, 0.85]);

  return (
    <div className={styles.page}>
      <SiteNav variant="home" ctaHref="/contact" />

      <section className={styles.hero}>
        <motion.div className={styles.spotlight} style={{ background: spotlight }} />
        <Reveal>
          <div className={styles.eyebrow}>AN AUSTRALIAN PROBLEM-SOLVING COMPANY</div>
          <h1 className={styles.heroTitle}>
            We figure out what&apos;s
            <br />
            actually going on.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className={styles.heroSub}>
            Then we build the tool that fixes it. WhatBit is a small Australian company — and the family of tools we&apos;ve built along the way.
          </p>
        </Reveal>
        <Reveal delay={0.16} className={styles.heroLine}>
          Human where it matters. Clever where it counts.
        </Reveal>
        <div className={styles.scrollHint}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      <section
        className={styles.orbit}
        ref={(el) => {
          orbitRef.current = el;
        }}
      >
        <Reveal>
          <h2 className={styles.orbitTitle}>One approach. Seven tools.</h2>
          <p className={styles.orbitCopy}>
            Every product carries the same name suffix for a reason. Same method, same standard — a different problem each time. “By WhatBit” means we did the thinking so you don&apos;t have to.
          </p>
        </Reveal>
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
            <motion.div className={styles.ring} style={{ width: "100%", height: "100%", background: "radial-gradient(circle,rgba(123,47,247,0.16) 0%,rgba(123,47,247,0) 68%)", opacity: ring1Opacity, scale: ring1Scale }} />
            <motion.div className={styles.ring} style={{ width: "78%", height: "78%", background: "radial-gradient(circle,rgba(31,191,163,0.14) 0%,rgba(31,191,163,0) 68%)", opacity: ring2Opacity, scale: ring2Scale }} />
          </div>
          <svg className={styles.svg} viewBox="0 0 460 460">
            <motion.circle cx="230" cy="230" r="170" fill="none" stroke={orbitCircleStroke} strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", scale: orbitCircleScale }} />
          </svg>
        </div>
      </section>

      <section id="products" className={styles.products}>
        <Reveal className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>The tools</h2>
          <p className={styles.sectionSub}>Each one solves a specific problem. None of them exist just because we could build them.</p>
        </Reveal>
        <StaggerGroup className={styles.grid}>
            <ProductCard href="/pace" strong className={`${styles.card} ${styles.orbitCard}`} variants={cardEntranceVariants}>
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
            </ProductCard>

            <ProductCard href="/frame" strong className={`${styles.card} ${styles.frameCard}`} variants={cardEntranceVariants}>
              <div className={styles.cardTop}>
                <BarMark size={56} radius={16} gradient="linear-gradient(135deg,#F07655,#E8542E)" />
                <div className={`${styles.live} ${styles.frameLive}`}>LIVE · FREE</div>
              </div>
              <div>
                <div className={`${styles.cardName} ${styles.orbitName}`}>Frame <span className={`${styles.by} ${styles.orbitBy}`}>by WhatBit</span></div>
                <div className={styles.frameHeadline}>Behaviour support evidence, from observation to hypothesis.</div>
                <p className={styles.cardTag}>Record observations, gather structured screening, compare evidence and keep uncertainty visible.</p>
              </div>
              <div className={`${styles.explore} ${styles.frameExplore}`}>Explore Frame <span>→</span></div>
            </ProductCard>

            <LiftCard externalHref="https://axis.whatbit.tech" className={`${styles.card} ${styles.axil}`} variants={cardEntranceVariants}>
              <div className={styles.cardTop}>
                <BarMark size={44} gradient="linear-gradient(135deg,#F7A876,#F2925C)" />
                <div className={styles.live}>LIVE · FREE + PRO</div>
              </div>
              <div>
                <div className={styles.cardName}>Axis <span className={styles.by}>by WhatBit</span></div>
                <p className={styles.cardTag}>Voice-first task capture and daily planning. Speak what needs doing, review the tasks, then plan the day and week.</p>
              </div>
              <div className={styles.explore}>Open Axis <span>→</span></div>
            </LiftCard>

            <LiftCard href="/trace" className={`${styles.card} ${styles.trace}`} variants={cardEntranceVariants}>
              <BarMark size={44} gradient="linear-gradient(135deg,#3FD4B8,#1FBFA3)" />
              <div>
                <div className={styles.cardName}>Trace <span className={styles.by}>by WhatBit</span></div>
                <p className={styles.cardTag}>Free behaviour-support budget and pacing calculator. Pro unlocks downloadable reports and document exports.</p>
              </div>
              <div className={styles.live}>FREE · PRO</div>
            </LiftCard>

            <LiftCard href="/vector" className={`${styles.card} ${styles.vector}`} variants={cardEntranceVariants}>
              <BarMark size={44} gradient="linear-gradient(135deg,#B294F5,#8B5CF6)" />
              <div>
                <div className={styles.cardName}>Vector <span className={styles.by}>by WhatBit</span></div>
                <p className={styles.cardTag}>The forms you need, without the paperwork feeling like paperwork.</p>
              </div>
              <div className={styles.vectorLive}>LIVE</div>
            </LiftCard>

            <LiftCard href="/field" className={`${styles.card} ${styles.field}`} variants={cardEntranceVariants}>
              <div className={styles.cardTop}>
                <BarMark size={44} gradient="linear-gradient(135deg,#22B393,#0E8F71)" />
                <div className={styles.live}>LIVE · FREE</div>
              </div>
              <div>
                <div className={styles.cardName}>Field <span className={styles.by}>by WhatBit</span></div>
                <p className={styles.cardTag}>Evidence-based strategies, personalised in under a minute.</p>
              </div>
              <div className={styles.explore}>Explore Field <span>→</span></div>
            </LiftCard>

            <ProductCard href="/arc" strong className={`${styles.card} ${styles.arc}`} variants={cardEntranceVariants}>
              <BarMark size={44} gradient="linear-gradient(135deg,#7C4FD1,#5B21B6)" />
              <div><div className={styles.cardName}>Arc <span className={styles.by}>by WhatBit</span></div><p className={styles.cardTag}>The shape of getting there.</p></div>
              <div className={styles.dev}>IN DEVELOPMENT</div>
            </ProductCard>
        </StaggerGroup>
      </section>

      <section className={styles.aiBlueprintSpotlight}>
        <Reveal className={styles.aiBlueprintSpotlightInner}>
          <div className={styles.aiBlueprintSpotlightBadge}>COMING SOON · A DIFFERENT KIND OF PRODUCT</div>
          <h2 className={styles.aiBlueprintSpotlightTitle}>
            AI Blueprint <span className={styles.by}>by WhatBit</span>
          </h2>
          <p className={styles.aiBlueprintSpotlightSub}>
            Every business is quietly using AI already, and almost none of them could explain how if asked. AI
            Blueprint is a responsible AI readiness assessment and governance toolkit that a real person actually
            reviews — not another dashboard, not a subscription, its own thing entirely. Five Founding Client spots
            are opening soon.
          </p>
          <MagneticButton href="/ai-blueprint#early-access" className={styles.aiBlueprintSpotlightCta}>
            Get early access <span>→</span>
          </MagneticButton>
        </Reveal>
      </section>

      <section className={styles.pricing}>
        <Reveal className={styles.sectionHead}>
          <div className={styles.priceEyebrow}>PRICING</div>
          <h2 className={styles.sectionTitle}>However you want to pay for it.</h2>
          <p className={styles.sectionSub} style={{ maxWidth: 520 }}>Every product stands alone. Most of them also plug into each other — use one, or stack a few.</p>
        </Reveal>
        <StaggerGroup className={styles.priceGrid}>
          {[
            { title: "Free", body: "Full access to a single tool, no card required. Good for finding out if it fits how you work.", meta: "$0", metaColor: "#7B2FF7", className: "", glow: false },
            { title: "Subscription", body: "Ongoing access, billed monthly. Add tools as you go — each one talks to the others automatically.", meta: "PER PRODUCT / MONTH", metaColor: "#B794FF", className: styles.priceDark, glow: true },
            { title: "Own it", body: "One-time purchase per product. Yours outright, updates included.", meta: "ONE-TIME / PRODUCT", metaColor: "#E8542E", className: styles.priceOrange, glow: false },
          ].map((card) => (
            <LiftCard key={card.title} tilt={card.glow} variants={cardEntranceVariants} className={`${styles.priceCard} ${card.className}`}>
              {card.glow ? <span className="wb-illum" aria-hidden /> : null}
              <div className={styles.priceTitle}>{card.title}</div>
              <p className={styles.priceBody}>{card.body}</p>
              <div className={styles.priceMeta} style={{ color: card.metaColor }}>{card.meta}</div>
            </LiftCard>
          ))}
        </StaggerGroup>
        <div className={styles.priceNote}>Exact pricing per product coming soon.</div>
      </section>

      <section className={styles.aboutWrap}>
        <Reveal>
          <LiftCard href="/about" className={styles.aboutBand}>
            <div>
              <div className={styles.aboutEyebrow}>HOW WE GOT HERE</div>
              <div className={styles.aboutTitle}>It&apos;s a longer story than most software companies have.</div>
              <p className={styles.aboutCopy}>The engine behind every WhatBit product started somewhere unexpected. Here&apos;s the whole thing.</p>
            </div>
            <div className={styles.aboutCta}>Read the story <span>→</span></div>
          </LiftCard>
        </Reveal>
      </section>

      <section id="philosophy" className={styles.philosophy}>
        <Reveal className={styles.philLine}>We don&apos;t lead with the technology.</Reveal>
        <Reveal delay={0.1} className={`${styles.philLine} ${styles.philAccent}`}>We lead with the problem.</Reveal>
        <Reveal delay={0.2} className={`${styles.philLine} ${styles.philSub}`}>The technology should disappear into the work.</Reveal>
      </section>

      <section className={styles.trust}>
        <Reveal>
          <h2 className={styles.trustTitle}>There&apos;s very little black box about how we work.</h2>
          <p className={styles.trustCopy}>If we build something for you, you should be able to see how it works, why it works, and what it&apos;s built on. Trust is the whole product — not a line in the terms and conditions.</p>
        </Reveal>
      </section>

      <section id="cta" className={styles.ctaBlock}>
        <Reveal className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Got a problem worth solving?</h2>
          <MagneticButton href="/contact" className={styles.ctaBtn}>Get in touch</MagneticButton>
        </Reveal>
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
