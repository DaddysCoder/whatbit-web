"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  VECTOR_FORMS_URL,
  VECTOR_PRICING_URL,
  VECTOR_REFERRAL_URL,
  VECTOR_REGISTER_URL,
  VECTOR_TRIAGE_URL,
  VECTOR_TEMPLATES_URL,
  VECTOR_UNLOCK_LABEL,
} from "@/lib/vector-urls";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { LiftCard } from "./motion/LiftCard";
import { MagneticButton } from "./motion/MagneticButton";
import styles from "./VectorPage.module.css";

const FORMS = [
  {
    id: "referral",
    label: "01 · REFERRAL",
    title: "Start the record clearly.",
    copy: "Capture the essential information needed to begin the process without turning the referral into an enormous intake exercise.",
    linkLabel: "Open Referral",
    href: VECTOR_REFERRAL_URL,
  },
  {
    id: "triage",
    label: "02 · PRACTITIONER TRIAGE",
    title: "Work out what needs attention next.",
    copy: "A structured practitioner triage form that helps organise the information needed for the next step.",
    linkLabel: "Open Triage",
    href: VECTOR_TRIAGE_URL,
  },
  {
    id: "register",
    label: "03 · SOURCE & CONSULTATION REGISTER",
    title: "Keep the people and information behind the work together.",
    copy: "Record consultations, information sources and supporting material in one structured place.",
    linkLabel: "Open Register",
    href: VECTOR_REGISTER_URL,
  },
] as const;

const PAID_FEATURES = [
  {
    title: "Download DOCX",
    copy: "Export finished documents as Word files when the form is complete.",
  },
  {
    title: "Add organisation branding",
    copy: "Apply your organisation name, colours and saved details to exported documents.",
  },
  {
    title: "Support templates",
    copy: "Access three structured behaviour support plan templates inside Vector.",
  },
] as const;

const SUPPORT_TEMPLATES = [
  {
    title: "Behaviour Support Plan",
    copy: "A practical behaviour support plan template for goals, proactive strategies, responsive strategies and implementation planning.",
  },
  {
    title: "Interim Behaviour Support Plan",
    copy: "An interim plan for immediate support and safeguards while fuller assessment work continues. A completed FBA is not required to start.",
  },
  {
    title: "Comprehensive Behaviour Support Plan",
    copy: "A comprehensive plan informed by the practitioner’s behaviour support assessment and functional behaviour assessment, with strategies, monitoring and restrictive-practice planning where relevant.",
  },
] as const;

const FREE_FEATURES = [
  "Referral",
  "Practitioner Triage",
  "Source & Consultation Register",
];

const PAID_FEATURES_LIST = [
  "download finished documents",
  "Word / DOCX export",
  "Print / Save PDF",
  "organisation branding",
  "saved company details",
  "support template library",
];

const PAID_TIERS = [
  { name: "Monthly", price: "A$19 / month", note: "" },
  { name: "Annual", price: "A$180 / year", note: "2 months free" },
  { name: "One-off", price: "A$5 / document", note: "no subscription" },
] as const;

function VectorBadge() {
  return (
    <span className={styles.badge} aria-hidden>
      <span>🔒</span> Vector
    </span>
  );
}

export function VectorPage() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  const onTiltMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -10, ry: px * 14 });
  }, []);

  const onTiltLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const cardTransform = (baseRotate: number, tx: number, ty: number) => {
    const rx = tilt.rx * 0.6;
    const ry = tilt.ry * 0.6;
    return `translate(-50%,-50%) translate(${tx}px,${ty}px) rotate(${baseRotate}deg) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  return (
    <div className={`${styles.page} ${menuOpen ? styles.sheetOpen : ""}`}>
      <header className={styles.nav}>
        <Link href="#top" className={styles.logo}>
          VECTOR
        </Link>
        <nav className={styles.navLinks} aria-label="Vector">
          <Link href="#forms" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Forms
          </Link>
          <Link href="#pricing" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="#templates" className={styles.navLink} onClick={() => setMenuOpen(false)}>
            Templates
          </Link>
          <a href={VECTOR_FORMS_URL} className={styles.navCta} onClick={() => setMenuOpen(false)}>
            Open Vector
          </a>
        </nav>
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
      </header>

      <div id="top" />

      <section className={styles.hero}>
        <Reveal>
          <div className={styles.eyebrow}>VECTOR · BY WHATBIT</div>
          <h1 className={styles.headline}>
            The forms you need. Without the paperwork feeling like paperwork.
          </h1>
          <p className={styles.subcopy}>
            Referral, practitioner triage and consultation records — structured, usable and ready when you need them.
          </p>
          <div className={styles.ctaRow}>
            <MagneticButton externalHref={VECTOR_FORMS_URL} className={styles.btnPrimary}>
              Start with a form
            </MagneticButton>
            <Link href="#pricing" className={styles.btnOutline}>
              See what&apos;s included
            </Link>
          </div>
          <p className={styles.reassurance}>No account required to get started.</p>
        </Reveal>

        <div className={styles.stack} onMouseMove={onTiltMove} onMouseLeave={onTiltLeave}>
          <div className={`${styles.card} ${styles.card1}`} style={{ transform: cardTransform(-8, -60, 20) }}>
            <div className={styles.cardAccent} />
            <div className={styles.cardLines}>
              <div className={`${styles.line} ${styles.lineAccent}`} style={{ width: "60%" }} />
              <div className={styles.line} style={{ width: "90%" }} />
              <div className={styles.line} style={{ width: "75%" }} />
              <div className={styles.line} style={{ width: "40%" }} />
            </div>
          </div>
          <div className={`${styles.card} ${styles.card2}`} style={{ transform: cardTransform(4, 10, -10) }}>
            <div className={styles.cardAccent} />
            <div className={styles.cardLines}>
              <div className={`${styles.line} ${styles.lineAccent} ${styles.lineAccentDelay1}`} style={{ width: "50%" }} />
              <div className={styles.line} style={{ width: "80%" }} />
              <div className={styles.line} style={{ width: "65%" }} />
            </div>
          </div>
          <div className={`${styles.card} ${styles.card3}`} style={{ transform: cardTransform(-2, 70, 30) }}>
            <div className={styles.cardAccent} />
            <div className={styles.cardLines}>
              <div className={`${styles.line} ${styles.lineAccent} ${styles.lineAccentDelay2}`} style={{ width: "70%" }} />
              <div className={styles.line} style={{ width: "85%" }} />
              <div className={styles.line} style={{ width: "55%" }} />
              <div className={styles.line} style={{ width: "45%" }} />
            </div>
          </div>
        </div>
      </section>

      <section id="forms" className={styles.forms}>
        <Reveal className={styles.sectionIntro}>
          <div className={styles.eyebrow}>THREE TOOLS</div>
          <h2 className={styles.sectionTitle}>Each one works on its own.</h2>
        </Reveal>

        <StaggerGroup className={styles.toolGrid}>
          {FORMS.map((form, index) => (
            <StaggerItem key={form.id} className={styles.toolCol}>
              <div id={form.id} className={styles.toolLabel}>
                <span className={`${styles.dot} ${index === 1 ? styles.dotDelay1 : ""} ${index === 2 ? styles.dotDelay2 : ""}`} />
                {form.label}
              </div>
              <h3 className={styles.toolTitle}>{form.title}</h3>
              <p className={styles.toolCopy}>{form.copy}</p>
              <a href={form.href} className={styles.toolLink}>
                {form.linkLabel} →
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className={styles.paidFeatures}>
          <Reveal className={styles.paidIntro}>
            <div className={styles.eyebrow}>VECTOR PAID</div>
            <h3 className={styles.sectionTitle}>Paid features stay visible — unlock when you need them.</h3>
          </Reveal>
          <StaggerGroup className={styles.paidGrid}>
            {PAID_FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <LiftCard externalHref={VECTOR_PRICING_URL} className={styles.paidItemButton}>
                  <div className={styles.paidItemTop}>
                    <span className={styles.paidItemTitle}>{feature.title}</span>
                    <VectorBadge />
                  </div>
                  <p className={styles.paidItemCopy}>{feature.copy}</p>
                </LiftCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href={VECTOR_PRICING_URL} className={styles.btnUpgrade}>
              {VECTOR_UNLOCK_LABEL}
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href={VECTOR_FORMS_URL} className={styles.btnFree}>
            Use Vector free
          </a>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingInner}>
          <Reveal className={styles.pricingIntro}>
            <h2 className={styles.sectionTitle}>Use Vector for free. Pay when you need the finished version.</h2>
          </Reveal>

          <StaggerGroup className={styles.priceGrid}>
            <StaggerItem>
              <div className={styles.tierName}>Free</div>
              <div className={styles.tierPrice}>$0</div>
              <p className={styles.toolCopy} style={{ marginBottom: 16 }}>
                Use all three Vector forms online.
              </p>
              <div className={styles.featureList}>
                {FREE_FEATURES.map((item) => (
                  <div key={item} className={styles.featureItem}>
                    {item}
                  </div>
                ))}
              </div>
              <a href={VECTOR_FORMS_URL} className={styles.btnFree}>
                Use Vector free
              </a>
            </StaggerItem>

            <StaggerItem className={styles.paidCard}>
              <div className={styles.tierName}>Vector</div>
              <div className={styles.tierOptions}>
                {PAID_TIERS.map((tier) => (
                  <div key={tier.name} className={styles.tierOption}>
                    <span className={styles.tierOptionName}>{tier.name}</span>
                    <span className={styles.tierOptionPrice}>{tier.price}</span>
                    {tier.note ? <span className={styles.tierOptionNote}>{tier.note}</span> : null}
                  </div>
                ))}
              </div>
              <p className={styles.toolCopy} style={{ marginBottom: 16, marginTop: 16 }}>
                Everything in Free, plus:
              </p>
              <div className={styles.featureList}>
                {PAID_FEATURES_LIST.map((item) => (
                  <div key={item} className={styles.featureItem}>
                    {item}
                  </div>
                ))}
              </div>
              <a href={VECTOR_PRICING_URL} className={styles.btnUpgrade}>
                Upgrade to Vector
              </a>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section id="templates" className={styles.templates}>
        <Reveal>
          <h2 className={styles.templatesTitle}>Support templates, included with Vector.</h2>
          <p className={styles.templatesCopy}>
            Paid Vector includes three structured behaviour support plan templates. Use them independently or carry local form details forward where available.
          </p>
        </Reveal>
        <StaggerGroup className={styles.templateGrid}>
          {SUPPORT_TEMPLATES.map((template) => (
            <StaggerItem key={template.title} className={styles.templateCard}>
              <h3 className={styles.templateTitle}>{template.title}</h3>
              <p className={styles.templateCopy}>{template.copy}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <a href={VECTOR_TEMPLATES_URL} className={styles.templatesAction}>
          Access templates on Vector <VectorBadge />
        </a>
      </section>

      <footer className={styles.footer}>
        <span>WhatBit · Australia</span>
        <nav className={styles.footerLinks} aria-label="Vector legal">
          <Link href="/vector/privacy">Privacy</Link>
          <Link href="/vector/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
