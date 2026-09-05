"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FIELD_APP_URL, FIELD_COMMERCIAL_LIVE, FIELD_FREE_URL, FIELD_PRO_TRIAL_URL } from "@/lib/products";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./motion/Reveal";
import styles from "./FieldPage.module.css";

const OPEN_FIELD_PROPS = {
  href: FIELD_APP_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

const WORKFLOW_STEPS = [
  {
    num: "01",
    label: "BROWSE",
    body: "Pick from an evidence-based strategy library, organised by category — not a generator, a reference.",
  },
  {
    num: "02",
    label: "NOTE CAPACITY",
    body: "Say what's realistic for this participant and setting.",
  },
  {
    num: "03",
    label: "MATCH",
    body: "Field matches the participant's profile against pre-authored delivery wording for this strategy, deterministically — never the mechanism itself.",
  },
  {
    num: "04",
    label: "REVIEW",
    body: "Always editable before you save. A draft to review, never the final word.",
  },
  {
    num: "05",
    label: "EXPORT",
    body: "Plan-ready text, one click to reformat for the session log.",
  },
] as const;

const EVIDENCE_ITEMS = [
  "Mechanism, locked and shown",
  "Citation, always attached",
  "Superseded evidence never shown alone",
  "Practitioner review required before saving",
];

const FIELD_FREE_FEATURES = [
  "Full strategy library",
  "Mechanism + citation, every entry",
  "Manual personalisation",
  "Plan-ready export",
  "Local browser storage",
  "Offline-capable",
] as const;

const FIELD_PRO_FEATURES = [
  "Automated personalisation matching",
  "Unlimited participants",
  "Full participant profile",
  "Session-log reformat",
] as const;

/**
 * Fires once per element the first time it scrolls into view, matching the
 * IntersectionObserver reveal used in the Field product mockup.
 */
function useReveal<T extends HTMLElement>(count: number) {
  const nodes = useRef<(T | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = nodes.current.indexOf(entry.target as T);
          if (index === -1) return;
          setRevealed((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    nodes.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const ref = (index: number) => (node: T | null) => {
    nodes.current[index] = node;
  };

  const className = (index: number) => `${styles.reveal} ${revealed[index] ? styles.revealed : ""}`;

  return { ref, className };
}

function FieldPricingCta({ label, href, variant }: { label: string; href: string; variant: "free" | "pro" }) {
  if (!FIELD_COMMERCIAL_LIVE) {
    return (
      <span className={styles.pricingBtnDisabled} aria-disabled="true">
        Coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      className={variant === "pro" ? styles.pricingBtn : styles.pricingBtnFree}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

export function FieldPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reveal = useReveal<HTMLDivElement>(4);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="#top" className={styles.logo}>
          FIELD
        </Link>
        <nav className={styles.desktopNav} aria-label="Field page">
          <a href="#workflow">Workflow</a>
          <a href="#evidence">Evidence</a>
          <a href="#pricing">Pricing</a>
          <Link href="/#products">← All products</Link>
          <a {...OPEN_FIELD_PROPS} className={styles.headerCta}>
            Open Field
          </a>
        </nav>
        <div className={styles.mobileHeaderActions}>
          <a {...OPEN_FIELD_PROPS} className={styles.headerCtaMobile}>
            Open Field
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen ? (
          <div className={styles.mobileSheet} role="dialog" aria-label="Menu">
            <a href="#workflow" onClick={() => setMenuOpen(false)}>
              Workflow
            </a>
            <a href="#evidence" onClick={() => setMenuOpen(false)}>
              Evidence
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>
            <Link href="/#products" onClick={() => setMenuOpen(false)}>
              ← All products
            </Link>
            <a {...OPEN_FIELD_PROPS} className={styles.headerCta} onClick={() => setMenuOpen(false)}>
              Open Field
            </a>
          </div>
        ) : null}
      </header>

      <div id="top" />

      <section className={styles.hero}>
        <Reveal className={styles.heroCopy}>
          <div className={styles.eyebrow}>FIELD · BY WHATBIT</div>
          <h1 className={styles.heroTitleDesktop}>Evidence-based strategies, personalised in under a minute.</h1>
          <h1 className={styles.heroTitleMobile}>Evidence-based strategies, personalised fast.</h1>
          <p className={styles.heroBodyDesktop}>
            Pick a strategy from an authored, citable library. Field holds the mechanism fixed and personalises
            only the delivery — for this participant, with the citation attached.
          </p>
          <p className={styles.heroBodyMobile}>
            Field holds the mechanism fixed and personalises only the delivery, citation attached.
          </p>
          <div className={styles.heroCtas}>
            <a {...OPEN_FIELD_PROPS} className={styles.btnPrimary}>
              Open Field
            </a>
            <a href="#workflow" className={styles.btnSecondary}>
              See how it works
            </a>
            <a href="#workflow" className={styles.heroLinkMobile}>
              See how it works →
            </a>
          </div>
        </Reveal>
        <Reveal direction="right" delay={0.1} className={styles.heroVisual}>
          <div className={styles.heroFloat}>
            <div className={`${styles.heroFrame} ${styles.gradientBorder}`}>
              <div className={styles.gradientBorderInner}>
                <div className={styles.heroPanel}>
                  <div className={styles.heroScreens}>
                    <div className={styles.heroPhone}>
                      <div className={styles.heroPhoneBar}>
                        <span className={styles.heroPhoneTime}>9:41</span>
                        <span className={styles.heroPhoneNotch} />
                      </div>
                      <div className={styles.heroPhoneScreen}>
                        <div className={styles.heroPhoneLabel}>02 · DETAIL</div>
                        <div className={styles.heroPhoneTags}>
                          <span className={styles.tagStrong}>Strong evidence</span>
                          <span className={styles.tagAttention}>Attention</span>
                        </div>
                        <div className={styles.heroPhoneTitle}>Non-contingent reinforcement (NCR)</div>
                        <div className={styles.evidenceCardLabel}>MECHANISM</div>
                        <p className={styles.heroPhoneBody}>
                          Delivers the reinforcer on a schedule, unrelated to behaviour, reducing its value
                          through satiation.
                        </p>
                        <div className={styles.heroPhoneCitationBox}>
                          <div className={styles.evidenceCardLabel}>CITATION</div>
                          <div className={styles.heroPhoneCitation}>
                            Tucker et al. (1998). Behavior Modification, 22(4), 529–547.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.heroPhone}>
                      <div className={styles.heroPhoneBar}>
                        <span className={styles.heroPhoneTime}>9:41</span>
                        <span className={styles.heroPhoneNotch} />
                      </div>
                      <div className={styles.heroPhoneScreen}>
                        <div className={styles.heroPhoneLabel}>03 · PERSONALISE</div>
                        <div className={styles.heroPhoneTitle}>A draft to review, never final.</div>
                        <div className={styles.heroPhoneStepLabel}>STEP 1 · CAPACITY NOTE</div>
                        <div className={styles.heroPhoneInput}>
                          Support worker present most shifts; can deliver reinforcement on a timer but not
                          track duration data.
                        </div>
                        <div className={styles.heroPhoneStepLabel}>STEP 2 · MATCH VARIANT</div>
                        <div className={styles.heroPhoneGenerateBtn}>
                          Match variant
                        </div>
                        <div className={styles.heroPhoneReviewLabel}>Review — always editable</div>
                        <p className={styles.heroPhoneBody}>
                          Deliver a preferred sensory item on a 10-minute fixed schedule, independent of
                          behaviour. Increase the interval by 2 minutes weekly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="workflow" className={styles.workflow}>
        <Reveal className={styles.sectionIntro}>
          <div className={styles.eyebrow}>FROM STRATEGY TO SESSION</div>
          <h2 className={styles.sectionTitle}>The mechanism never moves. Only the delivery does.</h2>
        </Reveal>
        <div className={styles.workflowDesktop}>
          <div className={styles.workflowLine} aria-hidden />
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.num} className={styles.workflowStepDesktop}>
              <div className={i === 0 ? styles.stepNumActive : styles.stepNum}>{step.num}</div>
              <div className={styles.stepLabel}>{step.label}</div>
              <p className={styles.stepShort}>{step.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.workflowMobile}>
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.num} className={styles.workflowStepMobile}>
              <div className={i === 0 ? styles.stepNumActive : styles.stepNum}>{step.num}</div>
              <div>
                <div className={styles.stepLabel}>{step.label}</div>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="evidence" className={styles.evidence}>
        <div className={styles.evidenceGrid}>
          <div ref={reveal.ref(0)} className={reveal.className(0)}>
            <div className={styles.eyebrow}>SHOW THE WORKING</div>
            <h2 className={styles.sectionTitle}>Every draft comes with its evidence attached.</h2>
            <p className={styles.lead}>
              Field never invents a technique. The strategy library is authored and reviewed ahead of time, and
              matching is deterministic and local — no model call, no generated text. Personalisation only ever
              picks between pre-authored wording for this participant&apos;s interests and communication style.
            </p>
            <p className={styles.leadSecondary}>
              The mechanism and citation stay pinned alongside every draft. Nothing is a black box.
            </p>
            <ul className={styles.evidenceList}>
              {EVIDENCE_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.evidenceNote}>Practitioner interpretation required.</p>
          </div>
          <div ref={reveal.ref(1)} className={`${reveal.className(1)} ${styles.evidenceCardWrap}`}>
            <div className={styles.gradientBorder}>
              <div className={`${styles.gradientBorderInner} ${styles.evidenceCard}`}>
                <div className={styles.evidenceTags}>
                  <span className={styles.tagStrong}>Strong evidence</span>
                  <span className={styles.tagAttention}>Attention</span>
                </div>
                <div className={styles.evidenceCardTitle}>Non-contingent reinforcement (NCR)</div>
                <div className={styles.evidenceCardLabel}>MECHANISM</div>
                <div className={styles.evidenceCardMechanism}>
                  Delivers the reinforcer on a fixed schedule, independent of behaviour, reducing its value
                  through satiation.
                </div>
                <div className={styles.evidenceCardCitationWrap}>
                  <div className={styles.evidenceCardLabel}>CITATION</div>
                  <div className={styles.evidenceCardCitation}>
                    Tucker, Sigafoos &amp; Bushell (1998). Behavior Modification, 22(4), 529–547.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pair-frame" className={styles.pairFrame}>
        <Reveal className={styles.sectionIntro}>
          <div className={styles.eyebrow}>BUILT TO PAIR WITH FRAME</div>
          <h2 className={styles.sectionTitle}>Designed alongside Frame.</h2>
          <p className={styles.lead}>
            Frame builds the evidence picture. Field turns it into a personalised strategy. A direct profile
            handoff between the two is planned but not yet live — today, Field works standalone from its own
            participant profile.
          </p>
        </Reveal>
        <div ref={reveal.ref(2)} className={`${reveal.className(2)} ${styles.pairRow}`}>
          <div className={styles.pairChip}>
            <div className={styles.pairSwatch} style={{ background: "#e8542e" }} />
            <div className={styles.pairChipName}>FRAME</div>
          </div>
          <span className={styles.pairArrow} aria-hidden>
            →
          </span>
          <div className={`${styles.pairChip} ${styles.pairChipField}`}>
            <div className={styles.pairSwatch} style={{ background: "#0e8f71" }} />
            <div className={styles.pairChipName}>FIELD</div>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <Reveal className={styles.sectionIntro}>
          <div className={styles.eyebrow}>PRICING</div>
          <h2 className={styles.sectionTitle}>Browse for free. Pay for the drafting.</h2>
        </Reveal>
        <div ref={reveal.ref(3)} className={`${reveal.className(3)} ${styles.pricingGrid}`}>
          <article className={styles.pricingCard}>
            <div className={styles.pricingTier}>Field Free</div>
            <div className={styles.pricingPrice}>A$0</div>
            <p className={styles.pricingTagline}>
              Full strategy library, mechanism and citation on every entry, for up to 2 participants.
            </p>
            <ul className={styles.pricingFeatures}>
              {FIELD_FREE_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <FieldPricingCta label="Use Field free" href={FIELD_FREE_URL} variant="free" />
          </article>
          <div className={styles.gradientBorder}>
            <div className={`${styles.gradientBorderInner} ${styles.pricingCardPro}`}>
              <div className={styles.pricingTier}>Field Pro</div>
              <div className={styles.pricingPriceCompact}>
                A$29/month <span>· A$290/year</span>
              </div>
              <p className={styles.pricingTrial}>14 days of Field Pro · No card required</p>
              <p className={styles.pricingPlus}>Everything in Free, plus:</p>
              <ul className={styles.pricingFeatures}>
                {FIELD_PRO_FEATURES.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <FieldPricingCta label="Start free trial" href={FIELD_PRO_TRIAL_URL} variant="pro" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.disclaimer}>
        <Reveal>
          <p className={styles.disclaimerText}>
            Field is a personalisation aid, not a substitute for clinical judgement. Strategy selection and
            personalisation remain practitioner acts. Check current evidence, participant consent and
            organisational policy before relying on any output.
          </p>
          <a {...OPEN_FIELD_PROPS} className={styles.btnPrimary}>
            Open Field
          </a>
        </Reveal>
      </section>

      <SiteFooter variant="tiny" />
    </div>
  );
}
