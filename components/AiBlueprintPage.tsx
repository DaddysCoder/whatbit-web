"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AI_BLUEPRINT_CHECKOUT_URL, AI_BLUEPRINT_CTA_LABEL, AI_BLUEPRINT_PRICE_LABEL } from "@/lib/ai-blueprint";
import styles from "./AiBlueprintPage.module.css";

const PROOF_ITEMS = [
  "15–20 minutes to complete the assessment",
  "Human-reviewed report and toolkit back within 5 business days",
  "9 practical documents — policy, registers, checklists, staff guidance and more",
  "Built for Australian small businesses, not global enterprise box-ticking",
];

const REPORT_COVERS = [
  "What AI your business is actually using",
  "Where your material risks sit",
  "Who's responsible for AI use, and who should be",
  "When a human should be reviewing AI output — and when they shouldn't need to",
  "Privacy and data considerations specific to your setup",
  "What to watch for with third-party AI tools and vendors",
  "The practical controls worth putting in place next",
];

const TOOLKIT_DOCS = [
  "AI Policy",
  "AI Tool Register",
  "Risk Register",
  "Human Review Guidance",
  "Privacy & Data Checklist",
  "Vendor Assessment Template",
  "Incident & Testing Record",
  "Staff Guidance",
  "90-Day Improvement Plan",
];

const STEPS = [
  {
    title: "Complete the assessment",
    body: "15–20 minutes, online, at your own pace. Answer what you know — there's no wrong answer, and you don't need to be technical.",
  },
  {
    title: "We review it, properly",
    body: "A real person goes through your answers and builds your report and toolkit around your actual business — not an auto-generated template.",
  },
  {
    title: "Get your pack",
    body: "Delivered within 5 business days. Your readiness report, your toolkit, and a clear 90-day plan for what to do next.",
  },
] as const;

const FAQS = [
  {
    q: "Do I need to understand AI or governance to do this?",
    a: "No. The assessment is written in plain language. If you can describe what tools your team uses and roughly what for, you can complete it.",
  },
  {
    q: "Is this legal advice or a compliance certification?",
    a: "No. AI Blueprint is a practical readiness product — a clear picture of your AI use plus the documents to manage it sensibly. It doesn't provide legal advice, certification, or a guarantee of regulatory compliance.",
  },
  {
    q: "How long does the assessment take?",
    a: "15–20 minutes, completed online at your own pace.",
  },
  {
    q: "How long until I get my pack?",
    a: "Normally within 5 business days of completing the assessment.",
  },
  {
    q: "Is the report actually customised, or a template?",
    a: "It's built from your specific answers and reviewed by a person — not auto-generated from a generic form.",
  },
  {
    q: "What if we don't use much AI yet?",
    a: "That's fine — the assessment and report scale to what you're actually doing. Even a small AI footprint is worth mapping properly before it grows.",
  },
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${shown ? styles.revealShown : ""} ${className}`}>
      {children}
    </div>
  );
}

export function AiBlueprintPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <span style={{ color: "#0B0B0C" }}>What</span>
          <span style={{ color: "#7B2FF7" }}>Bit</span>
        </Link>
        <div className={styles.crumb}>
          <span>/</span>
          <span className={styles.crumbCurrent}>AI Blueprint</span>
        </div>
        <a href={AI_BLUEPRINT_CHECKOUT_URL} className={styles.navCta}>
          Become a Founding Client
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.badge}>FOUNDING CLIENT OFFER · 5 SPOTS</div>
        <h1 className={styles.headline}>
          If someone asked how your business uses AI, could you actually answer?
        </h1>
        <p className={styles.subcopy}>
          Most businesses can&apos;t — not properly. Staff are already using ChatGPT, Copilot, Gemini or AI features
          buried in the tools they use every day, and no one&apos;s mapped what&apos;s going in, what&apos;s coming
          out, or who&apos;s responsible if it goes wrong. AI Blueprint fixes that: a 15-minute assessment, a
          human-reviewed readiness report, and a practical toolkit — so when someone does ask, you&apos;ve got a
          real answer.
        </p>
        <div className={styles.heroCtas}>
          <a href={AI_BLUEPRINT_CHECKOUT_URL} className={styles.btnPrimary}>
            {AI_BLUEPRINT_CTA_LABEL}
          </a>
          <a href="#what-you-get" className={styles.textCta}>
            See what&apos;s in the pack →
          </a>
        </div>
        <div className={styles.proofStrip}>
          {PROOF_ITEMS.map((item) => (
            <div key={item} className={styles.proofItem}>
              <span className={styles.check}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <Reveal className={styles.problem}>
        <div className={styles.problemInner}>
          <h2 className={styles.sectionHeading}>AI didn&apos;t wait for a rollout plan.</h2>
          <div className={styles.problemBody}>
            <p>
              It&apos;s already in your business. Someone&apos;s pasting client details into ChatGPT to draft an
              email. Someone&apos;s using Copilot to summarise a contract. Canva&apos;s AI is generating content
              nobody signed off on. It&apos;s not reckless — it&apos;s just normal, and it happened faster than
              anyone could write a policy for it.
            </p>
            <p>
              The problem isn&apos;t that your team is using AI. It&apos;s that nobody&apos;s actually looked at it
              properly — what&apos;s being used, what data&apos;s involved, and what happens if something goes
              wrong. If a client, an insurer, or a bigger customer&apos;s procurement team ever asked you a direct
              question about it, most businesses would be improvising an answer on the spot.
            </p>
            <p className={styles.problemLand}>
              AI Blueprint isn&apos;t about locking AI down. It&apos;s about knowing what&apos;s going on, so
              you&apos;re in control of it instead of hoping for the best.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.offerSection} >
        <div id="what-you-get" className={styles.whatYouGet}>
          <div className={styles.whatIntro}>
            <h2 className={styles.sectionHeading}>One assessment. A full picture. A real toolkit.</h2>
            <p className={styles.whatCopy}>
              You answer a straightforward set of questions about how AI is actually being used in your business —
              what tools, for what purpose, what data goes in, and what checks already exist. Nothing technical,
              nothing that needs a consultant sitting next to you.
            </p>
            <p className={styles.whatCopy}>
              A human reviews your answers and puts together a customised AI Readiness Report, plus a practical
              governance toolkit built around your actual answers — not a generic template with your logo on it.
            </p>
          </div>

          <div className={styles.whatGrid}>
            <div className={styles.reportCard}>
              <div className={styles.eyebrow}>THE REPORT COVERS</div>
              <div className={styles.checklist}>
                {REPORT_COVERS.map((item) => (
                  <div key={item} className={styles.checkRow}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.toolkitCard}>
              <div className={styles.eyebrow}>THE TOOLKIT · 9 DOCUMENTS</div>
              <div className={styles.toolkitGrid}>
                {TOOLKIT_DOCS.map((doc, i) => (
                  <div key={doc} className={styles.toolkitTile}>
                    <span className={styles.toolkitNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.toolkitName}>{doc}</span>
                  </div>
                ))}
              </div>
              <p className={styles.toolkitNote}>
                Everything is ready to use — not a set of ideas you still have to turn into documents yourself.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.how}>
        <div className={styles.howInner}>
          <h2 className={styles.sectionHeadingLight}>Three steps. About 20 minutes of your time.</h2>
          <div className={styles.stepGrid}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div className={styles.stepTitle}>{step.title}</div>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.who}>
        <h2 className={styles.sectionHeading}>Built for businesses already in the thick of it.</h2>
        <p className={styles.whoBody}>
          If your team is using ChatGPT, Copilot, Gemini, Canva AI, or any of the AI features quietly built into the
          software you already run — this is for you. You don&apos;t need an IT department. You don&apos;t need to
          already understand &ldquo;AI governance.&rdquo; You just need to want a straight answer to a question
          you&apos;ve probably never been asked out loud: <em>what exactly are we doing with this stuff?</em>
        </p>
        <p className={styles.whoBody}>
          This is built for Australian small and medium businesses — not enterprise programs, not big-four audit
          language, not a certification scheme.
        </p>
      </Reveal>

      <Reveal className={styles.isnt}>
        <div className={styles.isntInner}>
          <h2 className={styles.sectionHeadingSmall}>Let&apos;s be straight about what this is.</h2>
          <p className={styles.isntBody}>
            AI Blueprint is not legal advice. It&apos;s not a certification. It&apos;s not an assurance that
            you&apos;re &ldquo;compliant&rdquo; with anything — and we won&apos;t pretend it is. What it is: a
            clear, honest, human-reviewed look at how your business is using AI right now, and a practical set of
            documents to help you manage it sensibly from here.
          </p>
          <div className={styles.rule} />
          <p className={styles.isntBody}>
            No scare tactics. No pretending a regulator is about to knock on your door. Just the kind of clarity
            most businesses currently don&apos;t have, and quietly wish they did.
          </p>
        </div>
      </Reveal>

      <Reveal className={styles.pricing}>
        <div id="offer" className={styles.pricingCard}>
          <div className={styles.pricingEyebrow}>FOUNDING CLIENT PRICING · 5 SPOTS ONLY</div>
          <div className={styles.spots} aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={styles.spot} />
            ))}
          </div>
          <div className={styles.price}>{AI_BLUEPRINT_PRICE_LABEL}</div>
          <div className={styles.priceCaption}>one-time · full assessment, report and toolkit</div>
          <p className={styles.pricingBody}>
            We&apos;re opening AI Blueprint to five Founding Clients at {AI_BLUEPRINT_PRICE_LABEL}. You&apos;ll get
            the full assessment, human-reviewed report, and complete toolkit — the same pack every future client
            receives, at the price we&apos;re using to shape the product with real businesses first.
          </p>
          <a href={AI_BLUEPRINT_CHECKOUT_URL} className={styles.btnPrimary}>
            {AI_BLUEPRINT_CTA_LABEL}
          </a>
          <div className={styles.finePrint}>Once the five spots are filled, this round closes.</div>
        </div>
      </Reveal>

      <section className={styles.faq}>
        <h2 className={styles.sectionHeading}>Questions people actually ask.</h2>
        <div className={styles.faqList}>
          {FAQS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} className={styles.faqRow}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`} aria-hidden>
                    +
                  </span>
                </button>
                <div className={`${styles.faqAnswer} ${open ? styles.faqAnswerOpen : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Reveal className={styles.finalCta}>
        <div className={styles.finalInner}>
          <h2 className={styles.finalHeading}>
            You already know the honest answer to &ldquo;do we have this sorted.&rdquo; Let&apos;s fix that.
          </h2>
          <p className={styles.finalBody}>
            Five Founding Client spots, {AI_BLUEPRINT_PRICE_LABEL}. A clear report, a real toolkit, and an actual
            answer the next time someone asks.
          </p>
          <a href={AI_BLUEPRINT_CHECKOUT_URL} className={styles.btnPrimary}>
            {AI_BLUEPRINT_CTA_LABEL}
          </a>
        </div>
        <div className={styles.footerRow}>
          <Link href="/" className={styles.footerLogo}>
            <span style={{ color: "#FFFFFF" }}>What</span>
            <span style={{ color: "#B794FF" }}>Bit</span>
          </Link>
          <div className={styles.footerLinks}>
            <span>AI Blueprint by WhatBit · Australia</span>
            <Link href="/ai-blueprint/privacy">Privacy Policy</Link>
            <Link href="/ai-blueprint/terms">Terms</Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
