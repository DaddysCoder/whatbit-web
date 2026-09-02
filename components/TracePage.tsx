import { TRACE_APP_URL } from "@/lib/products";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { Reveal } from "./motion/Reveal";
import { MagneticButton } from "./motion/MagneticButton";
import styles from "./OrbitPage.module.css";

const TRACE_PRO_URL = `${TRACE_APP_URL}/pro`;
const TRACE_PRIVACY_URL = `${TRACE_APP_URL}/privacy`;
const TRACE_TERMS_URL = `${TRACE_APP_URL}/terms`;

export function TracePage() {
  return (
    <div className={styles.page}>
      <SiteNav variant="inner" ctaHref={TRACE_APP_URL} ctaLabel="Open Trace" />

      <div className={styles.hero}>
        <Reveal>
          <div className={styles.heroMark}>
            <BarMark
              size={76}
              radius={22}
              gradient="linear-gradient(135deg,#3FD4B8,#1FBFA3)"
              shadow="0 30px 60px rgba(31,191,163,0.25)"
              float
            />
          </div>
          <div className={styles.live}>FREE CORE · TRACE PRO A$9/MO</div>
          <h1 className={styles.title}>
            Know whether the plan
            <br />
            can actually last.
          </h1>
          <p className={styles.lede}>
            Trace is a behaviour-support budget and pacing workspace for practitioners. Model fixed work, service cadence, travel, support-item allocations and funding periods before the plan runs out on paper — or in real life.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <MagneticButton
              externalHref={TRACE_APP_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 24px",
                borderRadius: 999,
                background: "#0E8F71",
                color: "white",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Open Trace — free ↗
            </MagneticButton>
            <a
              href={TRACE_PRO_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 24px",
                borderRadius: 999,
                border: "1px solid rgba(14,143,113,.28)",
                color: "#0A6B55",
                fontWeight: 800,
                textDecoration: "none",
                background: "white",
              }}
            >
              Trace Pro · A$9/month
            </a>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, opacity: 0.72 }}>
            No account or card is needed for the calculator. Pro is only for downloadable reports and premium document exports.
          </p>
        </Reveal>
      </div>

      <div className={styles.previewWrap}>
        <Reveal className={styles.preview}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statLabel}>ALLOCATION</div>
              <div className={styles.statValue} style={{ fontSize: 30 }}>70<span className={styles.unit}>h</span></div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>AFFORDABLE CONTACTS</div>
              <div className={styles.statValue} style={{ fontSize: 30 }}>18</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>PLAN STATUS</div>
              <div className={`${styles.statValue} ${styles.pace}`} style={{ fontSize: 22 }}>Model it first</div>
            </div>
          </div>
          <div className={styles.traj}>
            <div className={styles.trajRow}>
              <span style={{ letterSpacing: "0.1em" }}>BUDGET TRAJECTORY</span>
              <span>Fixed work → implementation → run-out</span>
            </div>
            <div className={styles.track}><div className={styles.fill} style={{ width: "68%", background: "#1FBFA3" }} /></div>
          </div>
        </Reveal>
      </div>

      <div className={styles.features}>
        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>THE REAL COST</div>
            <h2 className={styles.featTitle}>Start with the work that has to happen.</h2>
            <p className={styles.featCopy}>
              Trace separates fixed commitments, recurring work and implementation contacts so a plan is not treated like one big interchangeable bucket of hours.
            </p>
          </Reveal>
          <div className={styles.viz} style={{ background: "linear-gradient(160deg,#F2FBF9,#FFFFFF)" }}>
            <div className={styles.bars}>
              {[118, 92, 68, 44].map((height, index) => <div key={height} className={styles.bar} style={{ height, background: index % 2 ? "#3FD4B8" : "#0E8F71" }} />)}
            </div>
          </div>
        </div>

        <div className={`${styles.feat} ${styles.featReverse}`}>
          <div className={`${styles.viz} ${styles.vizDelay1}`} style={{ background: "linear-gradient(160deg,#F7FFFC,#FFFFFF)" }}>
            <div className={styles.rate}>A$9<span className={styles.rateUnit}>/mo Pro</span></div>
          </div>
          <Reveal>
            <div className={styles.featEyebrow}>FREE FIRST</div>
            <h2 className={styles.featTitle}>The useful part stays free.</h2>
            <p className={styles.featCopy}>
              Use the full planning calculator, compare scenarios and save local templates without paying. Upgrade only when you want Trace to turn the work into downloadable professional outputs.
            </p>
          </Reveal>
        </div>

        <div className={styles.feat}>
          <Reveal>
            <div className={styles.featEyebrow}>TRACE PRO</div>
            <h2 className={styles.featTitle}>Do the thinking once. Take the output with you.</h2>
            <p className={styles.featCopy}>
              Pro unlocks downloadable budget and pacing reports and the premium document/export layer as Trace grows. Billing is handled by Stripe and can be managed or cancelled through Stripe&apos;s customer portal.
            </p>
          </Reveal>
          <div className={`${styles.viz} ${styles.sources} ${styles.vizDelay2}`} style={{ background: "linear-gradient(160deg,#F2FBF9,#FFFFFF)" }}>
            <div className={styles.source}>Budget report</div>
            <div className={styles.source}>Document exports</div>
            <div className={`${styles.source} ${styles.sourceOff}`}>More formats next</div>
          </div>
        </div>
      </div>

      <section id="install" style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 96px" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
            <div className={styles.featEyebrow}>USE TRACE YOUR WAY</div>
            <h2 className={styles.featTitle}>Browser first, installable when you want it.</h2>
            <p className={styles.featCopy}>
              Trace is a web app hosted on Cloudflare. Open it in your browser, or add it to your device from the browser so it launches like an app without an app-store download.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {[
            ["Windows / Mac", "Open Trace in Chrome or Edge, then use the install icon or browser menu and choose Install app / Install page as app."],
            ["iPhone / iPad", "Open Trace in Safari, tap Share, then Add to Home Screen."],
            ["Android", "Open Trace in Chrome, open the browser menu, then choose Install app or Add to Home screen."],
          ].map(([title, body], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <div style={{ border: "1px solid rgba(20,20,20,.1)", borderRadius: 20, padding: 24, background: "white" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 20 }}>{title}</h3>
                <p style={{ margin: 0, lineHeight: 1.65, opacity: 0.76 }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          <a href={TRACE_APP_URL} style={{ fontWeight: 800, color: "#0E8F71" }}>Open Trace ↗</a>
          <a href={TRACE_PRIVACY_URL} style={{ fontWeight: 700, color: "inherit" }}>Trace Privacy ↗</a>
          <a href={TRACE_TERMS_URL} style={{ fontWeight: 700, color: "inherit" }}>Trace Terms ↗</a>
        </div>
      </section>

      <div className={styles.ctaBlock}>
        <Reveal className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Plan for free. Pay only when the output needs to leave Trace.</h2>
          <MagneticButton externalHref={TRACE_APP_URL} className={styles.ctaBtn}>Open Trace</MagneticButton>
          <p style={{ color: "rgba(255,255,255,.7)", maxWidth: 680, margin: "18px auto 0", lineHeight: 1.6 }}>
            Trace is a planning aid, not an NDIS funding decision, clinical instruction or guarantee of claimability. Check current pricing, plan balances, service agreements and organisational policy before relying on outputs.
          </p>
        </Reveal>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
