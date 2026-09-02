"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { LiftCard } from "./motion/LiftCard";
import { MagneticButton } from "./motion/MagneticButton";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { CONTACT_MAILTO } from "@/lib/site";
import styles from "./ElsewherePage.module.css";

const EVAL_OFFSETS: [number, number, number][] = [
  [-58, -52, -14],
  [2, -66, 8],
  [56, -50, -10],
  [-70, 0, 12],
  [0, 0, 0],
  [70, 4, -8],
  [-54, 54, 10],
  [0, 68, -6],
  [58, 56, 14],
];

const EVAL_COLORS = [
  "#3452FF",
  "#7B2FF7",
  "#6E8CFF",
  "#1FBFA3",
  "#B9C6FF",
  "#F2925C",
  "#8B5CF6",
  "#3452FF",
  "#7B2FF7",
];

const PIPELINE = [
  { n: "01", title: "DISCOVER", text: "Scope the problem, read what's already been tried." },
  { n: "02", title: "PATTERN MATCH", text: "Stand up an agent that actually attempts the task." },
  { n: "03", title: "BENCHMARK", text: "Score it against past runs and existing tools." },
  {
    n: "04",
    title: "EVALUATE",
    text: "Decide: promote it, rework it, or write down why not.",
    solid: true,
  },
];

export function ElsewherePage() {
  const [email, setEmail] = useState("");
  const [hero, setHero] = useState({ mx: 0.5, my: 0.5, hover: false });
  const [evalApart, setEvalApart] = useState(false);

  const dx = hero.mx - 0.5;
  const dy = hero.my - 0.5;
  const hoverScale = hero.hover ? 1.12 : 1;
  const mailto = `${CONTACT_MAILTO}?subject=${encodeURIComponent(
    "Notify me about the Elsewhere Department"
  )}&body=${encodeURIComponent(email ? `Please notify ${email} when the Elsewhere Department is ready.` : "")}`;

  return (
    <div className={styles.page}>
      <SiteNav variant="inner" accent="#3452FF" ctaHref="/contact" />

      <section
        className={styles.hero}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHero({
            mx: (e.clientX - r.left) / r.width,
            my: (e.clientY - r.top) / r.height,
            hover: true,
          });
        }}
        onMouseLeave={() => setHero({ mx: 0.5, my: 0.5, hover: false })}
      >
        <div
          className={styles.cursorGlow}
          style={{
            background: `radial-gradient(420px circle at ${hero.mx * 100}% ${hero.my * 100}%, rgba(143,163,255,${hero.hover ? 0.22 : 0}), transparent 60%)`,
          }}
        />
        <svg className={styles.grain} aria-hidden>
          <filter id="edGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#edGrain)" />
        </svg>
        <div className={styles.gridMask} />
        <div
          className={styles.fieldTrack}
          style={{
            transform: `translate(${dx * 46}px, ${dy * 46}px) scale(${hero.hover ? 1.15 : 1})`,
          }}
        >
          <div className={styles.field} />
        </div>
        <div className={styles.stars} aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div
          className={styles.orbWrap}
          style={{ transform: `translate(${dx * 22}px, ${dy * 22}px) scale(${hoverScale})` }}
        >
          <div className={styles.ringSlow} />
          <div className={styles.scan} />
          <div className={styles.ringDash} />
          <div className={styles.ringInner} />
          <div className={styles.orb} />
        </div>
        <Reveal>
          <div className={styles.status}>SPECIMEN STATUS · IN DEVELOPMENT</div>
          <h1 className={styles.title}>The Elsewhere Department</h1>
          <p className={styles.lede}>
            Where WhatBit builds, benchmarks and evaluates agentic AI — before any of it gets near a real product.
          </p>
          <p className={styles.aside}>It works while everyone&apos;s asleep, and still hasn&apos;t figured out how to make coffee.</p>
        </Reveal>
      </section>

      <div className={styles.features}>
        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>EXPERIMENTS</div>
            <h2 className={styles.featTitle}>Every idea starts as an agent, not a slide deck.</h2>
            <p className={styles.featCopy}>
              If it&apos;s worth doing, it&apos;s worth trying. The Elsewhere Department runs agentic experiments against
              real tasks first — before anything is pitched, scoped or named.
            </p>
          </Reveal>
          <div className={styles.viz}>
            <span className={styles.cornerTl} />
            <span className={styles.cornerBr} />
            <div className={styles.bars}>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <div className={`${styles.feat} ${styles.featReverse}`}>
          <Reveal>
            <div className={styles.featEyebrow}>BENCHMARKING</div>
            <h2 className={styles.featTitle}>Measured against what already exists.</h2>
            <p className={styles.featCopy}>
              A result only counts once it&apos;s compared — to the tool it might replace, to the last version of itself,
              to a human doing the same task. Impressive and useful aren&apos;t the same thing, and only one of them gets
              to ship.
            </p>
          </Reveal>
          <div className={styles.viz}>
            <span className={styles.cornerTl} />
            <span className={styles.cornerBr} />
            <div className={styles.bench}>
              <div className={styles.benchRow}>
                <span>Run A</span>
                <span className={styles.benchHi}>92%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fillA} />
              </div>
              <div className={`${styles.benchRow} ${styles.benchGap}`}>
                <span>Run B</span>
                <span className={styles.benchLo}>61%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fillB} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>EVALUATION</div>
            <h2 className={styles.featTitle}>What doesn&apos;t work gets written down, not deleted.</h2>
            <p className={styles.featCopy}>
              Every experiment produces a record: what we tried, what the data said, what we&apos;d do differently. That
              record is what turns an experiment into the next one, instead of a repeat.
            </p>
          </Reveal>
          <div
            className={styles.viz}
            onMouseEnter={() => setEvalApart(true)}
            onMouseLeave={() => setEvalApart(false)}
          >
            <span className={styles.cornerTl} />
            <span className={styles.cornerBr} />
            <div className={styles.tiles}>
              {EVAL_COLORS.map((color, i) => {
                const [ox, oy, rot] = EVAL_OFFSETS[i];
                return (
                  <div
                    key={i}
                    className={styles.tile}
                    style={{
                      background: color,
                      transform: evalApart
                        ? `translate(${ox}px, ${oy}px) rotate(${rot}deg)`
                        : "translate(0,0) rotate(0deg)",
                      transition: `transform 0.55s cubic-bezier(.22,1,.36,1) ${i * 0.03}s`,
                    }}
                  />
                );
              })}
            </div>
            <div className={styles.evalLog} style={{ opacity: evalApart ? 1 : 0 }}>
              ✓ Tried
              <br />✓ Measured
              <br />✓ Logged
            </div>
          </div>
        </div>
      </div>

      <section className={styles.pipeline}>
        <Reveal>
          <div className={styles.pipeHead}>
            <div className={styles.featEyebrow}>HOW AN IDEA MOVES THROUGH</div>
            <h2 className={styles.pipeTitle}>Research, then build, then prove it.</h2>
          </div>
        </Reveal>
        <StaggerGroup className={styles.pipeGrid}>
          {PIPELINE.map((step) => (
            <StaggerItem key={step.n}>
              <div className={`${styles.pipeCard} ${step.solid ? styles.pipeSolid : ""}`}>
                <div className={styles.pipeLabel}>
                  {step.n} · {step.title}
                </div>
                <p>{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal>
          <p className={styles.pipeNote}>
            The same Contract → Trace → Expand discipline as{" "}
            <Link href="/rft">RFT</Link>, applied to how the department itself works.
          </p>
        </Reveal>
      </section>

      <div className={styles.teaserWrap}>
        <Reveal>
          <LiftCard href="/voda" className={styles.teaser}>
            <div>
              <div className={styles.teaserEyebrow}>THE ENGINE BEHIND IT</div>
              <div className={styles.teaserTitle}>Most of this runs on VODA.</div>
              <p>Our intelligence engine maps how a business actually works, then predicts what happens next.</p>
            </div>
            <span className={styles.teaserCta}>
              Meet VODA <span>→</span>
            </span>
          </LiftCard>
        </Reveal>
      </div>

      <div className={styles.notify}>
        <Reveal>
          <h2 className={styles.notifyTitle}>Still in the lab.</h2>
          <p className={styles.notifyCopy}>Leave your email and we&apos;ll let you know when there&apos;s something worth trying.</p>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- mailto: link, not an internal route
              window.location.href = mailto;
            }}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <MagneticButton externalHref={mailto} className={styles.notifyBtn}>
              Notify me
            </MagneticButton>
          </form>
        </Reveal>
      </div>

      <div className={styles.footer}>
        <SiteFooter variant="minimal" accent="#8FA3FF" />
      </div>
    </div>
  );
}
