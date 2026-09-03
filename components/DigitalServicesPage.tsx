"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DS_A11Y_ITEMS,
  DS_CONDITIONS,
  DS_FLOW,
  DS_PUBLIC_ITEMS,
  DS_SERVICES,
  DS_STEPS,
  DS_SUPPORT_ITEMS,
  DS_WORK,
} from "@/lib/digital-services";
import { swatchAt } from "@/lib/ds-palette";
import { SiteNav } from "./SiteNav";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { MagneticButton } from "./motion/MagneticButton";
import { ServiceFlipCard } from "./ServiceFlipCard";
import { HeroVisual } from "./ds/HeroVisual";
import { HowWeWork } from "./ds/HowWeWork";
import { WorkShowcase } from "./ds/WorkShowcase";
import { OperatingEnvironments } from "./ds/OperatingEnvironments";
import { EngagementLoop } from "./ds/EngagementLoop";
import { BandList } from "./ds/BandList";
import { SupportLifecycle } from "./ds/SupportLifecycle";
import styles from "./DigitalServicesPage.module.css";

const REVEAL_KEYS = ["Hero", "What", "How", "Work", "Engage"] as const;
type RevealKey = (typeof REVEAL_KEYS)[number];

function revealClass(on: boolean) {
  return on ? `${styles.reveal} ${styles.revealOn}` : styles.reveal;
}

export function DigitalServicesPage() {
  const [revealed, setRevealed] = useState<Partial<Record<RevealKey, boolean>>>({});
  const nodes = useRef<Partial<Record<RevealKey, HTMLElement | null>>>({});
  const reduced = useRef(false);

  const setNode = useCallback(
    (key: RevealKey) => (el: HTMLElement | null) => {
      nodes.current[key] = el;
    },
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onMq = () => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", onMq);

    if (mq.matches) {
      return () => mq.removeEventListener("change", onMq);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const key = (e.target as HTMLElement).dataset.reveal as RevealKey | undefined;
          if (!key) return;
          setRevealed((s) => ({ ...s, [key]: true }));
          observer.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    REVEAL_KEYS.forEach((key) => {
      const el = nodes.current[key];
      if (!el) return;
      el.dataset.reveal = key;
      observer.observe(el);
    });

    return () => {
      mq.removeEventListener("change", onMq);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      <SiteNav variant="digital" ctaHref="/contact" ctaLabel="Start a project" />

      <section className={`${styles.hero} ${revealClass(!!revealed.Hero)}`} ref={setNode("Hero")}>
        <a href="#work" className={styles.heroPill}>
          <span className={styles.heroPillDot} />
          New: recent work added <span aria-hidden>→</span>
        </a>
        <div className={styles.eyebrow}>DIGITAL SERVICES BY WHATBIT — A PRIMITIVE AI BRAND</div>
        <h1 className={styles.h1}>Make the complicated usable.</h1>
        <div className={styles.heroRow}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.lede}>
              We turn complex information, services and processes into digital experiences people can
              understand, navigate and act on.
            </p>
            <p className={styles.body}>
              That could be a website, an interactive tool, an accessible resource, a consultation
              pathway or a better way to organise and deliver information behind the scenes.
            </p>
            <p className={styles.body}>
              We start with what people actually need to know, decide, complete or respond to — and
              what the organisation needs to keep accurate, accessible and manageable over time.
            </p>
            <p className={styles.bodyLast}>
              Then we bring together content, UX, accessibility and technology to make it work.
            </p>
            <p className={styles.lede} style={{ marginBottom: 32 }}>
              Clear enough to use. Robust enough to run.
            </p>
            <div className={styles.ctaRow}>
              <MagneticButton href="/contact" className={styles.btnPrimary}>
                Talk to us about a project
              </MagneticButton>
              <a href="#work" className={styles.btnGhost}>
                See our work
              </a>
            </div>
          </Reveal>
          <div className={styles.heroObject}>
            <HeroVisual />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.svcSection}`}>
        <h2 className={`${styles.h2} ${revealClass(!!revealed.What)}`} ref={setNode("What")}>
          What we do
        </h2>
        <Reveal>
          <p className={styles.sectionLede}>
            From a focused website to a complete participation pathway, we shape the work around the
            information, people and operating environment — then build only what the project needs.
          </p>
        </Reveal>
        <StaggerGroup className={styles.svcGrid}>
          {DS_SERVICES.map((svc, i) => (
            <StaggerItem key={svc.title}>
              <ServiceFlipCard service={svc} swatch={swatchAt(i)} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal>
          <div className={styles.note}>
            <div className={styles.noteLabel}>A NOTE ON LANGUAGE SERVICES</div>
            <p className={styles.noteBody}>
              Our direct capability is accessible-format and plain-language production. Where a project
              requires professional language translation or interpreting, that work is scoped with
              appropriately qualified external providers rather than represented as an in-house service.
            </p>
          </div>
        </Reveal>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.h2} ${revealClass(!!revealed.How)}`} ref={setNode("How")}>
          How we work
        </h2>
        <Reveal>
          <p className={styles.sectionLede} style={{ marginBottom: 40 }}>
            A clear delivery process makes complex work easier to govern. Each stage produces something
            that can be reviewed, tested and approved before the project moves on.
          </p>
        </Reveal>
        <HowWeWork steps={DS_STEPS} />
      </section>

      <section className={styles.a11y}>
        <Reveal className={styles.a11yInner}>
          <h2 className={styles.h2}>Accessibility is part of the product</h2>
          <div className={styles.a11yRow}>
            <div className={styles.a11yCol}>
              <p className={styles.a11yBody}>
                Accessibility is not a badge added just before launch. It affects the content model,
                interaction design, technical implementation, testing and the way future updates are
                made.
              </p>
              <p className={styles.a11yMuted}>
                At the beginning of a project, we agree what accessibility needs to be achieved and how
                it will be tested. The work is then designed and tested against those agreed
                accessibility requirements.
              </p>
              <div className={styles.a11yFoot}>
                Accessibility requirements vary by project, platform and content. We document the
                agreed standard and the testing undertaken; we do not use a universal compliance claim
                as a substitute for evidence.
              </div>
            </div>
            <div className={styles.a11yColWide}>
              <ul className={styles.a11yList}>
                {DS_A11Y_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="work" className={styles.workSection}>
        <div className={styles.inner}>
          <h2 className={`${styles.h2} ${revealClass(!!revealed.Work)}`} ref={setNode("Work")}>
            Selected work
          </h2>
          <Reveal>
            <p className={styles.sectionLede}>
              A selection of client work, independent projects and experimental builds showing how we
              approach different kinds of digital problems — from full product delivery to accessibility,
              community information and public-facing experiences.
            </p>
          </Reveal>
        </div>
        <WorkShowcase items={DS_WORK} />
      </section>

      <section className={styles.section}>
        <OperatingEnvironments
          conditions={DS_CONDITIONS}
          intro="A digital service has to work outside the ideal demo. We plan for the conditions in which people will actually use, review, update and be accountable for it."
          foot="The solution should still make sense after the launch team has moved on. That is why maintainability, documentation and content ownership are design decisions, not end-of-project admin."
        />
      </section>

      <section className={styles.engage}>
        <div className={styles.engageInner}>
          <h2 className={`${styles.h2} ${revealClass(!!revealed.Engage)}`} ref={setNode("Engage")}>
            Engagement tools that close the loop
          </h2>
          <Reveal>
            <p className={styles.sectionLede} style={{ marginBottom: 40 }}>
              Collecting responses is not the same as engagement. A useful participation system helps
              people understand why they are being asked, contribute in a way that works for them, and
              see what happened after the decision.
            </p>
          </Reveal>
          <EngagementLoop stages={DS_FLOW} />
          <Reveal>
            <p className={styles.engageExtra}>
              Where useful and appropriate, the system can also support stakeholder segmentation,
              multiple response formats, transparent summaries and follow-up communication.
            </p>
            <div className={styles.engageNote}>
              <p>
                Good engagement design makes its boundaries visible: who is being asked, why their input
                is needed, how it will be used and what cannot be promised. Where cultural knowledge or
                authority is required, we work within the role and relationships agreed for the project;
                we do not claim to speak for communities.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.sectionFlush}>
        <div className={styles.split}>
          <Reveal className={styles.splitCopy}>
            <h2 className={styles.h2}>Working with public-sector and community organisations</h2>
            <p className={styles.splitLede}>
              Public and community-facing work has to be understandable to the user and defensible to
              the organisation. That means designing for review, approval and accountability as well as
              the front-end experience.
            </p>
            <p className={styles.splitStrong}>
              We do not add process for its own sake. We make the necessary governance visible enough
              that the work can move with fewer surprises.
            </p>
          </Reveal>
          <div className={styles.splitList}>
            <BandList items={DS_PUBLIC_ITEMS} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Reveal className={styles.splitCopy}>
          <h2 className={styles.h2}>Support after launch</h2>
          <p className={styles.splitLede}>
            Launch is a handover point, not an exit. Support can be scoped to the product, platform and
            capability of the client team.
          </p>
          <p className={styles.splitMuted}>
            Support scope, responsibilities, channels and response times are agreed for each project
            rather than hidden behind a vague promise of always-on support.
          </p>
        </Reveal>
        <div className={styles.lifecycleWrap}>
          <SupportLifecycle items={DS_SUPPORT_ITEMS} />
        </div>
      </section>

      <section className={styles.ctaBand}>
        <Reveal>
          <h2 className={styles.ctaTitle}>
            Have something complicated that people need to understand, use or respond to?
          </h2>
          <p className={styles.ctaLede}>
            Tell us what needs to work. We’ll help work out what should be built.
          </p>
          <MagneticButton href="/contact" className={styles.btnLight}>
            Start a project
          </MagneticButton>
        </Reveal>
      </section>

      <div className={styles.brandLine}>
        WhatBit is a public-facing brand of Primitive AI · Australia
      </div>
    </div>
  );
}
