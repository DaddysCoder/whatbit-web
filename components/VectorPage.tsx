"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  VECTOR_UNLOCK_LABEL,
  fetchVectorBillingStatus,
  openVectorBillingPortal,
  startVectorCheckout,
} from "@/lib/vector-billing";
import styles from "./VectorPage.module.css";

const FORMS = [
  {
    id: "referral",
    label: "01 · REFERRAL",
    title: "Start the record clearly.",
    copy: "Capture the essential information needed to begin the process without turning the referral into an enormous intake exercise.",
    linkLabel: "Open Referral",
  },
  {
    id: "triage",
    label: "02 · PRACTITIONER TRIAGE",
    title: "Work out what needs attention next.",
    copy: "A structured practitioner triage form that helps organise the information needed for the next step.",
    linkLabel: "Open Triage",
  },
  {
    id: "register",
    label: "03 · SOURCE & CONSULTATION REGISTER",
    title: "Keep the people and information behind the work together.",
    copy: "Record consultations, information sources and supporting material in one structured place.",
    linkLabel: "Open Register",
  },
] as const;

const PAID_FEATURES = [
  {
    title: "Download DOCX",
    copy: "Export finished documents as Word files when the form is complete.",
  },
  {
    title: "Add organisation branding",
    copy: "Apply your logo and organisation details to exported documents.",
  },
  {
    title: "Support templates",
    copy: "Access the reference template library for common referral and triage scenarios.",
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

function VectorBadge() {
  return (
    <span className={styles.badge} aria-hidden>
      <span>🔒</span> Vector
    </span>
  );
}

export function VectorPage() {
  const searchParams = useSearchParams();
  const billingSuccess = searchParams.get("billing") === "success";
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [canManage, setCanManage] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchVectorBillingStatus().then((status) => {
      setIsPaid(status.isPaid || billingSuccess);
      setCanManage(status.canManage);
    });
  }, [billingSuccess]);

  const isVectorPaid = isPaid || billingSuccess;

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

  const handleUpgrade = async () => {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      await startVectorCheckout();
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed.");
      setCheckoutLoading(false);
    }
  };

  const handlePortal = async () => {
    setCheckoutError(null);
    try {
      await openVectorBillingPortal();
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Unable to open billing portal.");
    }
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
          {canManage || isVectorPaid ? (
            <button type="button" className={styles.billingLink} onClick={() => void handlePortal()}>
              Manage subscription
            </button>
          ) : (
            <Link href="#pricing" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
          )}
          <Link href="#forms" className={styles.navCta} onClick={() => setMenuOpen(false)}>
            Open Vector
          </Link>
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

      {billingSuccess ? (
        <div className={styles.successBanner} role="status">
          Vector unlocked. Downloads, branding and templates are now available.
        </div>
      ) : null}

      <div id="top" />

      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>VECTOR · BY WHATBIT</div>
          <h1 className={styles.headline}>
            The forms you need. Without the paperwork feeling like paperwork.
          </h1>
          <p className={styles.subcopy}>
            Referral, practitioner triage and consultation records — structured, usable and ready when you need them.
          </p>
          <div className={styles.ctaRow}>
            <Link href="#forms" className={styles.btnPrimary}>
              Start with a form
            </Link>
            <Link href="#pricing" className={styles.btnOutline}>
              See what&apos;s included
            </Link>
          </div>
          <p className={styles.reassurance}>No account required to get started.</p>
        </div>

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
        <div className={styles.sectionIntro}>
          <div className={styles.eyebrow}>THREE TOOLS</div>
          <h2 className={styles.sectionTitle}>Each one works on its own.</h2>
        </div>

        <div className={styles.toolGrid}>
          {FORMS.map((form, index) => (
            <div key={form.id} id={form.id} className={styles.toolCol}>
              <div className={styles.toolLabel}>
                <span className={`${styles.dot} ${index === 1 ? styles.dotDelay1 : ""} ${index === 2 ? styles.dotDelay2 : ""}`} />
                {form.label}
              </div>
              <h3 className={styles.toolTitle}>{form.title}</h3>
              <p className={styles.toolCopy}>{form.copy}</p>
              <Link href={`#${form.id}`} className={styles.toolLink}>
                {form.linkLabel} →
              </Link>
            </div>
          ))}
        </div>

        {!isVectorPaid ? (
          <div className={styles.paidFeatures}>
            <div className={styles.paidIntro}>
              <div className={styles.eyebrow}>VECTOR PAID</div>
              <h3 className={styles.sectionTitle}>Paid features stay visible — unlock when you need them.</h3>
            </div>
            <div className={styles.paidGrid}>
              {PAID_FEATURES.map((feature) => (
                <button
                  key={feature.title}
                  type="button"
                  className={styles.paidItemButton}
                  onClick={() => void handleUpgrade()}
                  disabled={checkoutLoading}
                >
                  <div className={styles.paidItemTop}>
                    <span className={styles.paidItemTitle}>{feature.title}</span>
                    <VectorBadge />
                  </div>
                  <p className={styles.paidItemCopy}>{feature.copy}</p>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button type="button" className={styles.btnUpgrade} onClick={() => void handleUpgrade()} disabled={checkoutLoading}>
                {checkoutLoading ? "Redirecting…" : VECTOR_UNLOCK_LABEL}
              </button>
              {checkoutError ? <p className={styles.checkoutError}>{checkoutError}</p> : null}
            </div>
          </div>
        ) : null}

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="#forms" className={styles.btnFree}>
            Use Vector free
          </Link>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.pricingInner}>
          <div className={styles.pricingIntro}>
            <h2 className={styles.sectionTitle}>Use Vector for free. Pay when you need the finished version.</h2>
          </div>

          <div className={styles.priceGrid}>
            <div>
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
              <Link href="#forms" className={styles.btnFree}>
                Use Vector free
              </Link>
            </div>

            <div className={styles.paidCard}>
              <div className={styles.tierName}>Vector</div>
              <div className={styles.tierPrice}>A$9 / month</div>
              <p className={styles.toolCopy} style={{ marginBottom: 16 }}>
                Everything in Free, plus:
              </p>
              <div className={styles.featureList}>
                {PAID_FEATURES_LIST.map((item) => (
                  <div key={item} className={styles.featureItem}>
                    {item}
                  </div>
                ))}
              </div>
              {isVectorPaid ? (
                <button type="button" className={styles.btnUpgrade} onClick={() => void handlePortal()}>
                  Manage subscription
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.btnUpgrade}
                  onClick={() => void handleUpgrade()}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Redirecting…" : "Upgrade to Vector"}
                </button>
              )}
              {checkoutError ? <p className={styles.checkoutError}>{checkoutError}</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className={styles.templates}>
        <h2 className={styles.templatesTitle}>Support templates, included with Vector.</h2>
        <p className={styles.templatesCopy}>
          A small library of reference templates for common referral and triage scenarios, ready to adapt when you upgrade.
        </p>
        {!isVectorPaid ? (
          <button type="button" className={styles.templatesAction} onClick={() => void handleUpgrade()} disabled={checkoutLoading}>
            Access templates <VectorBadge />
          </button>
        ) : null}
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
