"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FRAME_APP_URL } from "@/lib/products";
import { SiteFooter } from "./SiteFooter";
import styles from "./FramePage.module.css";

const OPEN_FRAME_PROPS = {
  href: FRAME_APP_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

const WORKFLOW_STEPS = [
  {
    num: "01",
    label: "DEFINE",
    title: "Start with something observable.",
    body: "Create a clear operational definition of the behaviour you are assessing.",
    short: "Operationally define the behaviour.",
  },
  {
    num: "02",
    label: "OBSERVE",
    title: "Record what actually happened.",
    body: "Log episodes with antecedents, consequences, setting events, severity and relevant risk information.",
    short: "Record ABC / episode data and context.",
  },
  {
    num: "03",
    label: "SCREEN",
    title: "Add structured screening.",
    body: "Complete Frame’s structured function screener yourself or gather another perspective from someone who knows the person.",
    short: "Use structured function screening.",
  },
  {
    num: "04",
    label: "COMPARE",
    title: "Bring different evidence together.",
    body: "When the practitioner chooses to recompute a hypothesis, Frame compares screener results with patterns in recorded episodes.",
    short: "Bring observation and screener evidence together.",
  },
  {
    num: "05",
    label: "REVIEW",
    title: "See agreement and uncertainty.",
    body: "Review agreement, mismatch, confidence, screener disagreement and unresolved flags without hiding the evidence underneath.",
    short: "See confidence, disagreement and risk flags.",
  },
  {
    num: "06",
    label: "DOCUMENT",
    title: "Turn the record into something usable.",
    body: "Generate practitioner documentation from the evidence already recorded in Frame.",
    short: "Turn the work into practitioner documentation.",
  },
] as const;

const EVIDENCE_ITEMS = [
  "Observed episode patterns",
  "Structured screener results",
  "Informant differences and confidence",
  "Unresolved flags kept visible",
];

const TRUST_LINES = [
  "Outputs are hypotheses, not determinations of behavioural function.",
  "Uncertainty remains visible when evidence is limited or contradictory.",
  "The evidence contributing to a hypothesis can be reviewed.",
  "Practitioner interpretation and sign-off remain required.",
  "Experimental or analogue functional analysis may still be required.",
];

const PRIVACY_POINTS = [
  { title: "Local browser storage", body: "Working records are stored in the browser you are using." },
  { title: "Works offline", body: "The installed Frame web app can continue to work without a constant internet connection." },
  { title: "Export & backup", body: "Practitioners can export and import a JSON backup." },
  { title: "Practitioner control", body: "Records remain under the practitioner’s control unless they choose to export or transfer them." },
];

const DOC_CARDS = [
  {
    image: "/products/frame/frame-clinical-report.webp",
    alt: "Frame clinical report generated from demo data",
    title: "Clinical report",
    body: "A detailed record including episodes, screeners, the current hypothesis and flags.",
  },
  {
    image: "/products/frame/frame-plan-appendix.webp",
    alt: "Frame behaviour support plan appendix generated from demo data",
    title: "Behaviour Support Plan Appendix",
    body: "A condensed summary of the current evidence, hypothesis and unresolved flags for inclusion alongside behaviour support documentation.",
  },
  {
    image: "/products/frame/frame-staff-summary.webp",
    alt: "Frame basic staff training summary generated from demo data",
    title: "Basic Staff Training Summary",
    body: "A simple overview of the behaviour, commonly recorded setting events, current hypothesis status and open flags.",
  },
];

function QrChip({ pattern }: { pattern: boolean[] }) {
  return (
    <div className={styles.qrChip} aria-hidden>
      {pattern.map((on, i) => (
        <span key={i} className={on ? styles.qrOn : styles.qrOff} />
      ))}
    </div>
  );
}

const INVITE_QR = [true, false, true, true, false, true, false, true, true, true, false, true, false, true, true, false];
const RESPONSE_QR = [true, true, false, true, true, false, true, false, false, true, true, true, true, false, true, false];

export function FramePage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          FRAME
        </Link>
        <nav className={styles.desktopNav} aria-label="Frame page">
          <a href="#workflow">How it works</a>
          <a href="#evidence">Evidence</a>
          <a href="#privacy">Privacy</a>
          <Link href="/#products">← All products</Link>
          <a {...OPEN_FRAME_PROPS} className={styles.headerCta}>
            Open Frame
          </a>
        </nav>
        <div className={styles.mobileHeaderActions}>
          <a {...OPEN_FRAME_PROPS} className={styles.headerCtaMobile}>
            Open Frame
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
              How it works
            </a>
            <a href="#evidence" onClick={() => setMenuOpen(false)}>
              Evidence
            </a>
            <a href="#privacy" onClick={() => setMenuOpen(false)}>
              Privacy
            </a>
            <Link href="/#products" onClick={() => setMenuOpen(false)}>
              ← All products
            </Link>
            <a {...OPEN_FRAME_PROPS} className={styles.headerCta} onClick={() => setMenuOpen(false)}>
              Open Frame
            </a>
          </div>
        ) : null}
      </header>

      <div id="top" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>FRAME · BY WHATBIT</div>
          <h1 className={styles.heroTitleDesktop}>
            Behaviour support evidence, from observation to hypothesis.
          </h1>
          <h1 className={styles.heroTitleMobile}>From observation to hypothesis.</h1>
          <p className={styles.heroBodyDesktop}>
            Define the behaviour. Record what happened. Bring structured screening and observed patterns
            together — then see where the evidence agrees, where it doesn&apos;t, and what needs a closer look.
          </p>
          <p className={styles.heroBodyMobile}>
            Record what happened. Compare the evidence. Keep uncertainty visible.
          </p>
          <p className={styles.heroReassurance}>Decision support for behaviour support practitioners.</p>
          <div className={styles.heroCtas}>
            <a {...OPEN_FRAME_PROPS} className={styles.btnPrimary}>
              Open Frame
            </a>
            <a href="#workflow" className={styles.btnSecondary}>
              See how it works
            </a>
            <a href="#workflow" className={styles.heroLinkMobile}>
              See how it works →
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroFloat}>
            <Image
              src="/products/frame/frame-workspace.webp"
              alt="Frame behaviour episode workspace using demo data"
              width={840}
              height={680}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      <section id="workflow" className={styles.workflow}>
        <div className={styles.sectionIntro}>
          <div className={styles.eyebrow}>FROM OBSERVATION TO EVIDENCE</div>
          <h2 className={styles.sectionTitle}>Build the picture before you write the conclusion.</h2>
        </div>
        <div className={styles.workflowDesktop}>
          <div className={styles.workflowLine} aria-hidden />
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.num} className={styles.workflowStepDesktop}>
              <div className={i === 0 ? styles.stepNumActive : styles.stepNum}>{step.num}</div>
              <div className={styles.stepLabel}>{step.label}</div>
              <p className={styles.stepShort}>{step.short}</p>
            </div>
          ))}
        </div>
        <div className={styles.workflowMobile}>
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.num} className={styles.workflowStepMobile}>
              <div className={i === 0 ? styles.stepNumActive : styles.stepNum}>{step.num}</div>
              <div>
                <div className={styles.stepLabel}>{step.label}</div>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="evidence" className={styles.evidence}>
        <div className={styles.evidenceGrid}>
          <div className={styles.evidenceCopy}>
            <div className={styles.eyebrow}>SHOW THE WORKING</div>
            <h2 className={styles.sectionTitle}>A hypothesis should come with its evidence.</h2>
            <p className={styles.lead}>
              Frame doesn&apos;t give you a behavioural-function verdict. It shows the information that
              contributed to the current hypothesis: structured screener results, observed episode patterns,
              how much data was available, whether different sources agreed and the confidence attached to the
              result.
            </p>
            <p className={styles.leadSecondary}>
              If the evidence is limited or contradictory, Frame keeps that uncertainty visible.
            </p>
            <ul className={styles.evidenceList}>
              {EVIDENCE_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.evidenceNote}>Practitioner interpretation required.</p>
          </div>
          <div className={styles.evidenceVisual}>
            <Image
              src="/products/frame/frame-evidence.webp"
              alt="Frame evidence comparison showing agreement and confidence"
              width={1000}
              height={800}
              className={styles.evidenceImage}
            />
          </div>
        </div>
      </section>

      <section id="informants" className={styles.informants}>
        <div className={styles.sectionIntro}>
          <div className={styles.eyebrow}>MORE THAN ONE PERSPECTIVE</div>
          <h2 className={styles.sectionTitle}>Gather another view without another account.</h2>
          <p className={styles.leadCentered}>
            Invite a support worker, parent, sibling, teacher or other informant to complete the structured
            screener from their own phone.
          </p>
        </div>
        <div className={styles.informantFlow}>
          <div className={styles.flowNode}>
            <div className={styles.avatarPractitioner}>P</div>
            <div className={styles.flowLabel}>Practitioner</div>
          </div>
          <span className={styles.flowArrow} aria-hidden>
            →
          </span>
          <div className={styles.flowNode}>
            <QrChip pattern={INVITE_QR} />
            <div className={styles.flowLabel}>Invite QR</div>
          </div>
          <span className={styles.flowArrow} aria-hidden>
            →
          </span>
          <div className={styles.flowNode}>
            <div className={styles.avatarInformant}>S</div>
            <div className={styles.flowLabel}>
              <span className={styles.informantLong}>Support worker / family</span>
              <span className={styles.informantShort}>Support worker</span>
            </div>
          </div>
          <span className={styles.flowArrow} aria-hidden>
            →
          </span>
          <div className={styles.flowNode}>
            <QrChip pattern={RESPONSE_QR} />
            <div className={styles.flowLabel}>Response QR</div>
          </div>
          <span className={styles.flowArrow} aria-hidden>
            →
          </span>
          <div className={styles.flowNode}>
            <div className={styles.avatarFrame}>F</div>
            <div className={styles.flowLabel}>Back to Frame</div>
          </div>
        </div>
        <div className={styles.informantFlowMobileRow2}>
          <div className={styles.flowNode}>
            <QrChip pattern={RESPONSE_QR} />
            <div className={styles.flowLabel}>Response QR</div>
          </div>
          <span className={styles.flowArrow} aria-hidden>
            →
          </span>
          <div className={styles.flowNode}>
            <div className={styles.avatarFrame}>F</div>
            <div className={styles.flowLabel}>Back to Frame</div>
          </div>
        </div>
        <p className={styles.informantSupport}>
          No Frame account or app installation is required for the informant.
        </p>
        <p className={styles.informantPrivacy}>
          The invite contains no participant name, behaviour name or clinical record.
        </p>
      </section>

      <section id="privacy" className={styles.privacy}>
        <div className={styles.privacyInner}>
          <div className={styles.eyebrowDark}>LOCAL-FIRST BY DESIGN</div>
          <h2 className={styles.privacyTitle}>Participant records stay in your browser by default.</h2>
          <p className={styles.privacyLead}>
            Frame is designed without a central participant database. The practitioner workspace stores its
            records locally in the browser, and the core product does not need to upload participant records to
            a central Frame server to work.
          </p>
          <div className={styles.privacyGrid}>
            {PRIVACY_POINTS.map((point) => (
              <div key={point.title} className={styles.privacyPoint}>
                <div className={styles.privacyPointTitle}>{point.title}</div>
                <p>{point.body}</p>
              </div>
            ))}
          </div>
          <p className={styles.privacyQual}>
            Browser storage can be cleared or lost, particularly when changing devices or browsers. Regular
            backups are recommended.
          </p>
        </div>
      </section>

      <section id="documentation" className={styles.documentation}>
        <div className={styles.sectionIntro}>
          <div className={styles.eyebrow}>FROM RECORD TO DOCUMENT</div>
          <h2 className={styles.sectionTitle}>Use the evidence you have already collected.</h2>
          <p className={styles.leadCentered}>
            Frame can generate practitioner documentation from participant, behaviour, episode, screener,
            hypothesis and flag information already recorded in the workspace.
          </p>
        </div>
        <div className={styles.docGrid}>
          {DOC_CARDS.map((card) => (
            <article key={card.title} className={styles.docCard}>
              <div className={styles.docImageWrap}>
                <Image src={card.image} alt={card.alt} width={640} height={360} className={styles.docImage} />
              </div>
              <h3 className={styles.docTitle}>{card.title}</h3>
              <p className={styles.docBody}>{card.body}</p>
            </article>
          ))}
        </div>
        <p className={styles.docQual}>
          The current staff-training summary does not generate matched support strategies.
        </p>
      </section>

      <section id="trust" className={styles.trust}>
        <div className={styles.trustInner}>
          <div className={styles.eyebrowTrust}>DECISION SUPPORT, NOT DIAGNOSIS</div>
          <h2 className={styles.trustTitle}>Frame supports practitioner reasoning. It does not replace it.</h2>
          <ul className={styles.trustList}>
            {TRUST_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cta" className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>Follow the evidence. Keep the uncertainty visible.</h2>
        <p className={styles.finalCtaLead}>
          Bring observations, structured screening and practitioner reasoning into one behaviour support
          workspace.
        </p>
        <div className={styles.finalCtaButtons}>
          <a {...OPEN_FRAME_PROPS} className={styles.btnPrimary}>
            Open Frame
          </a>
          <Link href="/#products" className={styles.btnSecondaryLight}>
            About WhatBit
          </Link>
        </div>
      </section>

      <SiteFooter variant="tiny" />
    </div>
  );
}
