"use client";

import { Fragment, useState } from "react";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { Reveal } from "./motion/Reveal";
import { MagneticButton } from "./motion/MagneticButton";
import { VODA_PRODUCT } from "@/lib/products";
import { CONTACT_MAILTO } from "@/lib/site";
import styles from "./VodaPage.module.css";

const NODE_COLORS = ["#0B0B0C", "#B9C6FF", "#3452FF", "#B9C6FF", "#0B0B0C"];

const FORECASTS = [
  { pct: 72, label: "bottleneck in 9 days" },
  { pct: 41, label: "delivery risk this sprint" },
  { pct: 88, label: "capacity opening next week" },
];

const PLAN_STEPS = ["Reassign step 3", "Move deadline −2d", "Alert owner"];

export function VodaPage() {
  const [email, setEmail] = useState("");
  const [activeNode, setActiveNode] = useState(2);
  const [forecastIdx, setForecastIdx] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);

  const forecast = FORECASTS[forecastIdx];
  const mailto = `${CONTACT_MAILTO}?subject=${encodeURIComponent(
    "Notify me about VODA"
  )}&body=${encodeURIComponent(email ? `Please notify ${email} when VODA is ready.` : "")}`;

  return (
    <div className={styles.page}>
      <SiteNav variant="inner" accent={VODA_PRODUCT.accent} ctaHref="/contact" />

      <div className={styles.heroWrap}>
        <svg
          className={styles.heroBolts}
          viewBox="0 0 1000 480"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id="voda-boltglow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polyline
            className={styles.bolt}
            points="90,0 78,110 100,180 82,320"
            fill="none"
            stroke="#3452FF"
            strokeWidth="1.6"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "6s", animationDelay: "0.2s" }}
          />
          <polyline
            className={styles.bolt}
            points="230,0 255,95 225,170 250,340"
            fill="none"
            stroke="#5B8CFF"
            strokeWidth="1.4"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "7s", animationDelay: "1.6s" }}
          />
          <polyline
            className={styles.bolt}
            points="430,0 405,120 435,210 410,380"
            fill="none"
            stroke="#3452FF"
            strokeWidth="1.8"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "5.5s", animationDelay: "0.8s" }}
          />
          <polyline
            className={styles.bolt}
            points="620,0 645,105 615,200 640,360"
            fill="none"
            stroke="#5B8CFF"
            strokeWidth="1.4"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "6.5s", animationDelay: "2.4s" }}
          />
          <polyline
            className={styles.bolt}
            points="800,0 775,115 805,210 780,340"
            fill="none"
            stroke="#3452FF"
            strokeWidth="1.6"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "7.5s", animationDelay: "1.1s" }}
          />
          <polyline
            className={styles.bolt}
            points="920,0 940,125 915,230 935,400"
            fill="none"
            stroke="#5B8CFF"
            strokeWidth="1.4"
            filter="url(#voda-boltglow)"
            style={{ animationDuration: "6.2s", animationDelay: "3s" }}
          />
        </svg>
        <Reveal className={styles.hero}>
          <div className={styles.heroMark}>
            <BarMark
              size={76}
              radius={22}
              gradient={VODA_PRODUCT.gradient}
              shadow={`0 30px 60px ${VODA_PRODUCT.glow}`}
              float
            />
          </div>
          <div className={styles.status}>IN DEVELOPMENT</div>
          <h1 className={styles.title}>
            See the business as a graph.
            <br />
            Then see what happens next.
          </h1>
          <p className={styles.lede}>{VODA_PRODUCT.description}</p>
        </Reveal>
      </div>

      <div className={styles.features}>
        <svg
          className={styles.featBolts}
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          <polyline
            points="40,0 90,140 30,300 100,480 20,640 80,820"
            fill="none"
            stroke="#3452FF"
            strokeWidth="1"
            opacity="0.14"
          />
          <polyline
            points="960,60 900,220 970,380 910,560 960,740 900,900"
            fill="none"
            stroke="#5B8CFF"
            strokeWidth="1"
            opacity="0.14"
          />
          <polyline
            points="500,20 540,200 480,340"
            fill="none"
            stroke="#3452FF"
            strokeWidth="0.8"
            opacity="0.1"
          />
        </svg>

        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>THE MAP</div>
            <h2 className={styles.featTitle}>Every task, decision and handoff, as a graph.</h2>
            <p className={styles.featCopy}>
              VODA represents a business as a directed acyclic graph — nodes for tasks and
              decisions, edges for what depends on what. It&apos;s the same structure underneath
              very different businesses, which is why one engine can serve all of them.
            </p>
          </Reveal>
          <div className={styles.viz}>
            <div className={styles.nodes}>
              {NODE_COLORS.map((color, i) => {
                const active = i === activeNode;
                return (
                  <Fragment key={i}>
                    {i > 0 ? <div className={styles.nodeLine} /> : null}
                    <button
                      type="button"
                      className={`${styles.node} ${i % 2 === 0 ? styles.nodeDrop : ""} ${active ? styles.nodeActive : ""}`}
                      style={{ background: active ? "#3452FF" : color }}
                      aria-label={`Graph node ${i + 1}`}
                      aria-pressed={active}
                      onClick={() => setActiveNode(i)}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`${styles.feat} ${styles.featReverse}`}>
          <button
            type="button"
            className={`${styles.viz} ${styles.vizButton}`}
            onClick={() => setForecastIdx((i) => (i + 1) % FORECASTS.length)}
            aria-label="Cycle forecast"
          >
            <div className={styles.forecast}>
              {forecast.pct}% likely
              <span>{forecast.label}</span>
            </div>
          </button>
          <Reveal>
            <div className={styles.featEyebrow}>THE FORECAST</div>
            <h2 className={styles.featTitle}>See the bottleneck before it costs you anything.</h2>
            <p className={styles.featCopy}>
              Predictive models run against the graph continuously, not once a quarter. When a
              pattern in the data starts to resemble a past slowdown or a past win, VODA flags it
              while there&apos;s still time to act.
            </p>
          </Reveal>
        </div>

        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>THE PLAN</div>
            <h2 className={styles.featTitle}>Not just a warning — a plan, start to finish.</h2>
            <p className={styles.featCopy}>
              A prediction on its own is just anxiety with numbers. VODA turns each forecast into
              a sequenced plan of action, so the output is something a team can actually run — not
              another dashboard to interpret.
            </p>
          </Reveal>
          <div className={styles.viz}>
            <div className={styles.plan}>
              {PLAN_STEPS.map((text, i) => {
                const done = doneSteps.includes(i);
                return (
                  <button
                    key={text}
                    type="button"
                    className={`${styles.planStep} ${done ? styles.planDone : ""}`}
                    onClick={() =>
                      setDoneSteps((steps) =>
                        done ? steps.filter((d) => d !== i) : [...steps, i]
                      )
                    }
                  >
                    {i + 1}. {text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaBlock}>
        <Reveal className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Want to know when VODA is ready?</h2>
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
            <MagneticButton externalHref={mailto} className={styles.notify}>
              Notify me
            </MagneticButton>
          </form>
        </Reveal>
        <SiteFooter variant="minimal" accent="#8FA3FF" />
      </div>
    </div>
  );
}
