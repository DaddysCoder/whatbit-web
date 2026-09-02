"use client";

import { useEffect, useState } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { LiftCard } from "./motion/LiftCard";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { CONTACT_MAILTO } from "@/lib/site";
import styles from "./RftPage.module.css";

const ATTRS = [
  { key: "value", label: "Value", step: "Identify", color: "#7B2FF7", desc: "The stated answer itself." },
  {
    key: "morphology",
    label: "Morphology",
    step: "Establish shape",
    color: "#0E8F71",
    desc: "The shape of the evidence behind it — depth, redundancy, bottlenecks, source diversity.",
  },
  { key: "ancestry", label: "Ancestry", step: "Research", color: "#E8542E", desc: "Where it came from." },
  {
    key: "uncertainty",
    label: "Uncertainty",
    step: "Question",
    color: "#7B2FF7",
    desc: "What’s disputed or estimated.",
  },
  { key: "scope", label: "Scope", step: "Resolve", color: "#0E8F71", desc: "Whose frame it’s valid in." },
] as const;

const LEVELS = [
  { key: 0, label: "n+3", title: "Ecosystem incentives", desc: "What the wider market or environment rewards, independent of this task." },
  { key: 1, label: "n+2", title: "Organisational strategy", desc: "The goals of the organisation running the task." },
  { key: 2, label: "n+1", title: "Immediate stakeholder goals", desc: "What the person or system requesting the task actually needs." },
  { key: 3, label: "n (task)", title: "The task itself", desc: "The operational boundary RFT is reasoning inside." },
  { key: 4, label: "n−1", title: "Direct causal inputs", desc: "The inputs and decisions that fed directly into this task." },
  { key: 5, label: "n−2", title: "Underlying mechanisms", desc: "The mechanisms that produced those inputs." },
  { key: 6, label: "n−3", title: "Root substrate", desc: "The causal primitives at the bottom of the window." },
] as const;

function CubeFaces({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function RftPage() {
  const [attrKey, setAttrKey] = useState<(typeof ATTRS)[number]["key"]>("value");
  const [levelKey, setLevelKey] = useState(3);
  const [dim, setDim] = useState(1);

  useEffect(() => {
    const tick = setInterval(() => {
      setDim((d) => (d >= 27 ? 1 : d + 1));
    }, 260);
    return () => clearInterval(tick);
  }, []);

  const attr = ATTRS.find((a) => a.key === attrKey) ?? ATTRS[0];
  const level = LEVELS.find((l) => l.key === levelKey) ?? LEVELS[3];
  const t = dim / 27;
  const tessT = dim >= 9 ? Math.min(1, (dim - 9) / 6) : 0;
  const showLine = dim < 3;
  const showCube = dim >= 3;
  const paperMailto = `${CONTACT_MAILTO}?subject=${encodeURIComponent("Send me the RFT paper")}`;

  return (
    <div className={styles.page}>
      <SiteNav variant="inner" ctaHref="/contact" />

      <section className={styles.hero}>
        <div className={styles.field} style={{ opacity: 1 }}>
          <div
            className={styles.axis}
            style={{
              width: showLine ? 50 + dim * 35 : 0,
              opacity: showLine ? 1 : 0,
            }}
          />
          <div className={styles.xA} style={{ opacity: tessT * 0.8 }} />
          <div className={styles.xB} style={{ opacity: tessT * 0.8 }} />
          <div className={styles.cubeWrap} style={{ opacity: showCube ? 1 : 0 }}>
            <CubeFaces className={styles.cube} />
          </div>
          <div className={styles.innerWrap} style={{ opacity: tessT }}>
            <CubeFaces className={styles.innerCube} />
          </div>
        </div>
        <div className={styles.progress}>
          <div style={{ width: `${Math.round(t * 100)}%` }} />
        </div>
        <Reveal>
          <div className={styles.status}>RESEARCH</div>
          <h1 className={styles.title}>Recursive Field Theory</h1>
          <p className={styles.lede}>
            A conclusion built on five independent sources and one built on a single shaky chain can end up looking
            identical once compressed. RFT is our framework for compressing information without losing the trail that
            got you there.
          </p>
        </Reveal>
      </section>

      <div className={styles.body}>
        <section>
          <Reveal>
            <div className={styles.eyebrow}>THE PROBLEM</div>
            <h2 className={styles.h2}>Compression usually destroys the thing that made a conclusion trustworthy.</h2>
            <p className={styles.copy}>
              Most systems compress signals into lossy summaries: they discard ancestry, flatten material contradictions
              into a single stated truth, and drop the observer&apos;s context — who concluded what, and under what
              assumptions. Two summaries can read identically even when one rests on solid ground and the other
              doesn&apos;t.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>THE APPROACH</div>
            <h2 className={styles.h2}>Contract. Trace. Expand.</h2>
          </Reveal>
          <StaggerGroup className={styles.approach}>
            <StaggerItem>
              <div className={`${styles.approachCard} ${styles.contract}`}>
                <h3>Contract</h3>
                <p>Minimise a problem down to its smallest useful primitives, target conditions and constraints.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className={`${styles.approachCard} ${styles.trace}`}>
                <h3>Trace</h3>
                <p>
                  Follow the relationships that actually fired through the system, preserving domain crossings, uncertainty
                  and provenance along the way.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className={`${styles.approachCard} ${styles.expand}`}>
                <h3>Expand</h3>
                <p>Promote structures that hold up into higher-level primitives — reusable tools or agent skills for next time.</p>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>THE UNIT OF MEMORY</div>
            <h2 className={styles.h2}>Two nodes with the same headline aren&apos;t the same node.</h2>
            <p className={styles.copy}>
              Every node in an RFT structure carries five things, not just a value: the value itself, its morphology (the
              shape of the evidence behind it — depth, redundancy, bottlenecks, source diversity), its ancestry (where it
              came from), its uncertainty (what&apos;s disputed or estimated), and its scope (whose frame it&apos;s valid
              in). A confident-looking answer built on a fragile support graph gets flagged for review even when its
              stated confidence is high.
            </p>
            <div className={styles.attrs}>
              <div className={styles.pills}>
                {ATTRS.map((a) => {
                  const on = a.key === attrKey;
                  return (
                    <button
                      key={a.key}
                      type="button"
                      className={styles.pill}
                      style={
                        on
                          ? { color: "#fff", background: a.color, borderColor: a.color }
                          : { color: a.color, background: "#F7F5FC", borderColor: `${a.color}33` }
                      }
                      onClick={() => setAttrKey(a.key)}
                    >
                      {a.step}
                    </button>
                  );
                })}
              </div>
              <div
                className={styles.attrOrb}
                style={{ borderColor: attr.color, boxShadow: `0 0 24px ${attr.color}55` }}
              >
                <span style={{ color: attr.color }}>{attr.label}</span>
              </div>
            </div>
            <p className={styles.attrDesc}>{attr.desc}</p>
          </Reveal>
        </section>

        <section className={styles.window}>
          <Reveal>
            <div className={styles.eyebrow}>THE RECURSIVE WINDOW</div>
            <h2 className={styles.h3}>Deep enough to explain, high enough to stay relevant.</h2>
            <p className={styles.windowCopy}>
              Rather than analysing every scale at once, RFT deliberately looks three levels down for root cause and
              three levels up for constraint — a fixed n−3 to n+3 window across causal substrate, the task&apos;s own
              operational boundary, and the systems above it.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.levelBox}>
              <div className={styles.levelList}>
                {LEVELS.map((lv) => (
                  <button
                    key={lv.key}
                    type="button"
                    className={lv.key === levelKey ? styles.levelOn : styles.levelOff}
                    onClick={() => setLevelKey(lv.key)}
                  >
                    {lv.label}
                  </button>
                ))}
              </div>
              <div className={styles.levelDetail}>
                <div className={styles.levelTitle}>{level.title}</div>
                <p>{level.desc}</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>APPLIED TO AI AGENTS</div>
            <h2 className={styles.h2}>The same discipline governs a swarm of agents.</h2>
            <p className={styles.copy}>
              Unstructured groups of AI agents degrade fast — contaminated context, loop failures, memory that quietly
              goes wrong. RFT&apos;s runtime gives every task a defined role, an owner and a verifiable evidence path. A
              Sender packages the minimum context a task needs; a Receiver runs its own checks before accepting work.
              Three separate decisions — whether to <em>send</em> it, whether to <em>accept</em> the result, and whether
              to <em>save</em> it into permanent memory — are never collapsed into one. An answer can be shown on screen
              and still be rejected from ever being saved.
            </p>
          </Reveal>
        </section>

        <section className={styles.fieldNote}>
          <Reveal>
            <div className={styles.eyebrow}>IN THE FIELD</div>
            <h2 className={styles.h3}>WA-OFIS: tracking where money moves through an economy.</h2>
            <p className={styles.windowCopy}>
              The clearest live test of RFT so far is the WA Opportunity Flow Intelligence platform — a statewide tool that
              tracks where money enters, accumulates and leaves the Western Australian economy, and surfaces hyper-local
              gaps between supply and demand. It follows capital through four stages — announced, committed, flowing,
              capturable — and keeps observed fact strictly separate from forecast, so a large &quot;announced&quot;
              number is never mistaken for money that&apos;s actually moving.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <div className={styles.eyebrow}>READ MORE</div>
            <h2 className={styles.h2}>The full theory, written up.</h2>
            <LiftCard externalHref={paperMailto} className={styles.paper}>
              <div className={styles.paperTitle}>Recursive Field Theory, the working paper</div>
              <div className={styles.paperMeta}>RESEARCH PAPER</div>
              <span className={styles.paperIcon} aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  <circle cx="15.5" cy="16.5" r="2.8" />
                  <path d="M17.6 18.6L20 21" />
                </svg>
              </span>
            </LiftCard>
          </Reveal>
        </section>
      </div>

      <div className={styles.teaserWrap}>
        <Reveal>
          <LiftCard href="/voda" className={styles.teaser}>
            <div>
              <div className={styles.teaserEyebrow}>THE THEORY, IN PRODUCTION</div>
              <div className={styles.teaserTitle}>RFT is the theory. VODA is the engine that runs on it.</div>
              <p>See how the same ideas power WhatBit&apos;s predictive intelligence engine.</p>
            </div>
            <span className={styles.teaserCta}>
              Meet VODA <span>→</span>
            </span>
          </LiftCard>
        </Reveal>
      </div>

      <div className={styles.footer}>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
