"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
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
import { SiteNav } from "./SiteNav";
import { Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { MagneticButton } from "./motion/MagneticButton";
import styles from "./DigitalServicesPage.module.css";

const REVEAL_KEYS = ["Hero", "What", "How", "Work", "Env", "Engage"] as const;
type RevealKey = (typeof REVEAL_KEYS)[number];

const HERO_DESKTOP = "/assets/ds/hero-desktop.png";
const HERO_MOBILE = "/assets/ds/hero-mobile.png";

function revealClass(on: boolean) {
  return on ? `${styles.reveal} ${styles.revealOn}` : styles.reveal;
}

export function DigitalServicesPage() {
  const [revealed, setRevealed] = useState<Partial<Record<RevealKey, boolean>>>({});
  const [tilt, setTilt] = useState<Record<number, string>>({});
  const [shadow, setShadow] = useState<Record<number, string>>({});
  const [heroReady, setHeroReady] = useState(false);
  const [workReady, setWorkReady] = useState<Record<string, boolean>>({});
  const nodes = useRef<Partial<Record<RevealKey, HTMLElement | null>>>({});
  const svcRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  const onSvcMove = (i: number) => (e: MouseEvent<HTMLDivElement>) => {
    if (reduced.current) return;
    const el = svcRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rotY = ((e.clientX - r.left) / r.width - 0.5) * 7;
    const rotX = (0.5 - (e.clientY - r.top) / r.height) * 7;
    setTilt((s) => ({
      ...s,
      [i]: `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px)`,
    }));
    setShadow((s) => ({ ...s, [i]: "0 22px 50px rgba(11,11,12,0.10)" }));
  };

  const onSvcLeave = (i: number) => () => {
    setTilt((s) => ({
      ...s,
      [i]: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)",
    }));
    setShadow((s) => ({ ...s, [i]: "0 0 0 rgba(0,0,0,0)" }));
  };

  return (
    <div className={styles.page}>
      <SiteNav variant="digital" ctaHref="/contact" ctaLabel="Start a project" />

      <section className={`${styles.hero} ${revealClass(!!revealed.Hero)}`} ref={setNode("Hero")}>
        <div className={styles.eyebrow}>DIGITAL SERVICES BY WHATBIT — A PRIMITIVE AI BRAND</div>
        <h1 className={styles.h1}>Digital services for information people actually need to use.</h1>
        <div className={styles.heroRow}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.lede}>
              We design and build websites, digital tools, accessible content and engagement systems
              for work that cannot afford to be confusing.
            </p>
            <p className={styles.body}>
              The starting point is not how a page should look. It is what people need to understand,
              do or respond to — and what the organisation needs to keep accurate, maintainable and
              accountable.
            </p>
            <p className={styles.bodyLast}>
              That means combining strategy, human-centred design, accessible information and working
              digital systems. The result might be a website, an interactive tool, a consultation
              pathway, a content system or a practical mix of them.
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
          <div className={styles.heroFrame}>
            <div className={styles.chrome} aria-hidden>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            {heroReady ? null : (
              <div className={styles.imgMissing}>Hero image pending</div>
            )}
            <picture style={heroReady ? undefined : ({ display: "none" } as CSSProperties)}>
              <source media="(max-width:640px)" srcSet={HERO_MOBILE} />
              <img
                ref={(el) => {
                  if (el?.complete && el.naturalWidth > 0) setHeroReady(true);
                }}
                src={HERO_DESKTOP}
                alt="Three overlapping WhatBit product interfaces showing weekly workload, behaviour-support budget planning and a functional assessment screener."
                className={styles.heroImg}
                onLoad={() => setHeroReady(true)}
                onError={() => setHeroReady(false)}
              />
            </picture>
          </div>
        </div>
      </section>

      <section className={styles.section}>
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
              <div
                ref={(el) => {
                  svcRefs.current[i] = el;
                }}
                className={styles.svcCard}
                style={{
                  transform: tilt[i] || "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)",
                  boxShadow: shadow[i] || "0 0 0 rgba(0,0,0,0)",
                }}
                onMouseMove={onSvcMove(i)}
                onMouseLeave={onSvcLeave(i)}
              >
                <h3 className={styles.h3}>{svc.title}</h3>
                <p className={styles.svcBody}>{svc.body}</p>
                <ul className={styles.list}>
                  {svc.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
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
        <StaggerGroup className={styles.steps}>
          {DS_STEPS.map((step) => (
            <StaggerItem key={step.n}>
              <div className={styles.step}>
                <div className={styles.stepN}>{step.n}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <div className={styles.stepArtefact}>{step.artefact}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
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

      <section id="work" className={styles.sectionFlush}>
        <h2 className={`${styles.h2} ${revealClass(!!revealed.Work)}`} ref={setNode("Work")}>
          Selected work
        </h2>
        <Reveal>
          <p className={styles.sectionLede}>
            Evidence matters. These examples are labelled for what they are so a working prototype is
            never presented as commissioned client work.
          </p>
        </Reveal>
        <StaggerGroup className={styles.workGrid}>
          {DS_WORK.map((item) => {
            const ready = !!workReady[item.image];
            return (
              <StaggerItem key={item.title}>
                <div className={styles.workCard}>
                  <div className={styles.workImgWrap}>
                    {ready ? null : <div className={styles.imgMissing}>Image pending</div>}
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      unoptimized
                      loading="eager"
                      className={styles.workImg}
                      style={ready ? undefined : { display: "none" }}
                      onLoad={() => setWorkReady((s) => ({ ...s, [item.image]: true }))}
                      onError={() => setWorkReady((s) => ({ ...s, [item.image]: false }))}
                    />
                  </div>
                  <div className={styles.workBody}>
                    <div
                      className={`${styles.badge} ${
                        item.badgeTone === "concept" ? styles.badgeConcept : styles.badgeNeutral
                      }`}
                    >
                      {item.badge}
                    </div>
                    <h3 className={styles.workTitle}>{item.title}</h3>
                    <p className={styles.workCopy}>{item.body}</p>
                    {item.footer === "products" ? (
                      <Link href="/#products" className={styles.workLink}>
                        Explore WhatBit products <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <div className={styles.workMeta}>Screenshot-led example. No public link.</div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <section className={styles.section}>
        <h2 className={`${styles.h2} ${revealClass(!!revealed.Env)}`} ref={setNode("Env")}>
          Built for real operating environments
        </h2>
        <Reveal>
          <p className={styles.sectionLede} style={{ marginBottom: 36 }}>
            A digital service has to work outside the ideal demo. We plan for the conditions in which
            people will actually use, review, update and be accountable for it.
          </p>
        </Reveal>
        <StaggerGroup className={styles.conditions}>
          {DS_CONDITIONS.map((condition) => (
            <StaggerItem key={condition}>
              <div className={styles.conditionRow}>
                <div className={styles.conditionDot} aria-hidden />
                <div className={styles.conditionText}>{condition}</div>
              </div>
            </StaggerItem>
          ))}
          <div className={styles.conditionFoot}>
            The solution should still make sense after the launch team has moved on. That is why
            maintainability, documentation and content ownership are design decisions, not
            end-of-project admin.
          </div>
        </StaggerGroup>
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
          <StaggerGroup className={styles.flowGrid}>
            {DS_FLOW.map((stage) => (
              <StaggerItem key={stage.n}>
                <div className={styles.flowCard}>
                  <div className={styles.flowHead}>
                    <div className={styles.flowN}>{stage.n}</div>
                    <div className={styles.flowRule} aria-hidden />
                  </div>
                  <h3 className={styles.flowTitle}>{stage.title}</h3>
                  <p className={styles.flowBody}>{stage.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
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
          <Reveal className={styles.splitList} direction="right">
            <ul className={styles.splitItems}>
              {DS_PUBLIC_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <Reveal className={styles.splitCopy}>
            <h2 className={styles.h2}>Support after launch</h2>
            <p className={styles.splitLede}>
              Launch is a handover point, not an exit. Support can be scoped to the product, platform
              and capability of the client team.
            </p>
            <p className={styles.splitMuted}>
              Support scope, responsibilities, channels and response times are agreed for each project
              rather than hidden behind a vague promise of always-on support.
            </p>
          </Reveal>
          <Reveal className={styles.splitList} direction="right">
            <ul className={styles.splitItems}>
              {DS_SUPPORT_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
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
