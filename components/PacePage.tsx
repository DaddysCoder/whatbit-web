import Link from "next/link";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./OrbitPage.module.css";

const PACE_APP_URL = "https://orbit.whatbit.tech";
const PACE_PRIVACY_URL = `${PACE_APP_URL}/privacy`;
const PACE_TERMS_URL = `${PACE_APP_URL}/terms`;

export function PacePage() {
  return (
    <div className={styles.page}>
      <SiteNav variant="inner" ctaHref={PACE_APP_URL} />

      <div className={styles.hero}>
        <div className={styles.heroMark}>
          <BarMark
            size={76}
            radius={22}
            gradient="linear-gradient(135deg,#9B6EF3,#7B2FF7)"
            shadow="0 30px 60px rgba(123,47,247,0.25)"
            float
          />
        </div>
        <div className={styles.live}>FREE · LIVE PRODUCT</div>
        <h1 className={styles.title}>
          Your week, and
          <br />
          what it&apos;s worth.
        </h1>
        <p className={styles.lede}>
          Pace is a free calendar and hours workspace for practitioners who bill by the hour — built for the way you actually plan a week, not a generic timesheet.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          <a
            href={PACE_APP_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
              padding: "0 24px",
              borderRadius: 999,
              background: "#7B2FF7",
              color: "white",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Open Pace — free ↗
          </a>
          <a
            href="#install"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
              padding: "0 24px",
              borderRadius: 999,
              border: "1px solid rgba(123,47,247,.28)",
              color: "#5B21B6",
              fontWeight: 800,
              textDecoration: "none",
              background: "white",
            }}
          >
            Install Pace
          </a>
        </div>
        <p style={{ marginTop: 16, fontSize: 14, opacity: 0.72 }}>
          No subscription. No card required. Your working data stays primarily on your device.
        </p>
      </div>

      <div className={styles.previewWrap}>
        <div className={styles.preview}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statLabel}>LOGGED THIS WEEK</div>
              <div className={styles.statValue} style={{ fontSize: 34 }}>
                9.75<span className={styles.unit}>h</span>
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>BILLED VALUE</div>
              <div className={styles.statValue} style={{ fontSize: 28 }}>$3,453</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>PACE</div>
              <div className={`${styles.statValue} ${styles.pace}`} style={{ fontSize: 24 }}>On track</div>
            </div>
          </div>
          <div className={styles.traj}>
            <div className={styles.trajRow}>
              <span style={{ letterSpacing: "0.1em" }}>OUTPUT TRAJECTORY</span>
              <span>35% to Super Stretch</span>
            </div>
            <div className={styles.track}><div className={styles.fill} /></div>
          </div>
          <div className={styles.week}>
            {["MON 17", "TUE 18", "WED 19", "THU 20", "FRI · TODAY", "SAT 22", "SUN 23"].map((label, index) => (
              <div key={label} className={`${styles.day} ${index === 4 ? styles.today : ""}`}>
                <div className={`${styles.dayLabel} ${index === 4 ? styles.todayLabel : ""}`}>{label}</div>
                {index < 5 ? (
                  <div className={`${styles.event} ${index === 1 ? styles.personal : index === 3 ? styles.dotted : index === 4 ? styles.todayEvent : styles.billable}`}>
                    {index === 0 ? "Client review" : index === 1 ? "Dentist" : index === 2 ? "Session" : index === 3 ? "Community event" : "Session"}
                  </div>
                ) : <div className={styles.empty}>+ Add work</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feat}>
          <div>
            <div className={styles.featEyebrow}>THE WEEK</div>
            <h2 className={styles.featTitle}>See the whole week without turning it into admin.</h2>
            <p className={styles.featCopy}>
              Billable work, personal time and other calendar events sit together without all counting toward your work totals. Log work manually or connect supported calendars.
            </p>
          </div>
          <div className={styles.viz} style={{ background: "linear-gradient(160deg,#F7F2FF,#FFFFFF)" }}>
            <div className={styles.bars}>
              {[80, 120, 60, 100, 70].map((height, index) => <div key={height + index} className={styles.bar} style={{ height, background: index % 2 ? "#B794FF" : "#7B2FF7" }} />)}
            </div>
          </div>
        </div>

        <div className={`${styles.feat} ${styles.featReverse}`}>
          <div className={`${styles.viz} ${styles.vizDelay1}`} style={{ background: "linear-gradient(160deg,#FFF8F2,#FFFFFF)" }}>
            <div className={styles.rate}>$354<span className={styles.rateUnit}>/hr</span></div>
          </div>
          <div>
            <div className={styles.featEyebrow}>THE MATH</div>
            <h2 className={styles.featTitle}>Know what the week is worth before you invoice.</h2>
            <p className={styles.featCopy}>
              Pace converts logged billable hours into value at your configured rates and shows how you are tracking toward your target tiers.
            </p>
          </div>
        </div>

        <div className={styles.feat}>
          <div>
            <div className={styles.featEyebrow}>YOUR CALENDARS</div>
            <h2 className={styles.featTitle}>Bring the calendars you already use.</h2>
            <p className={styles.featCopy}>
              Connect supported Google and Microsoft calendars or use calendar feeds. Work, Personal and Other sources remain separately classified so private time does not become billable work.
            </p>
          </div>
          <div className={`${styles.viz} ${styles.sources} ${styles.vizDelay2}`} style={{ background: "linear-gradient(160deg,#F2FBF9,#FFFFFF)" }}>
            <div className={styles.source}>Google</div>
            <div className={styles.source}>Outlook</div>
            <div className={`${styles.source} ${styles.sourceOff}`}>Other feed</div>
          </div>
        </div>
      </div>

      <section id="install" style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px 96px" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 36px" }}>
          <div className={styles.featEyebrow}>INSTALL PACE</div>
          <h2 className={styles.featTitle}>Use it in the browser, or put it on your home screen.</h2>
          <p className={styles.featCopy}>
            Pace is a web app. There is no app-store download and no installer file to manage — open it once, then install it from your browser.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {[
            ["Windows / Mac", "Open Pace in Chrome or Edge. Use the install icon in the address bar, or open the browser menu and choose Install app / Install page as app."],
            ["iPhone / iPad", "Open Pace in Safari. Tap Share, then Add to Home Screen. Pace will open from its own icon like an app."],
            ["Android", "Open Pace in Chrome. Open the browser menu and choose Install app or Add to Home screen."],
          ].map(([title, body]) => (
            <div key={title} style={{ border: "1px solid rgba(20,20,20,.1)", borderRadius: 20, padding: 24, background: "white" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 20 }}>{title}</h3>
              <p style={{ margin: 0, lineHeight: 1.65, opacity: 0.76 }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          <a href={PACE_APP_URL} style={{ fontWeight: 800, color: "#7B2FF7" }}>Open Pace ↗</a>
          <a href={PACE_PRIVACY_URL} style={{ fontWeight: 700, color: "inherit" }}>Pace Privacy ↗</a>
          <a href={PACE_TERMS_URL} style={{ fontWeight: 700, color: "inherit" }}>Pace Terms ↗</a>
        </div>
      </section>

      <div className={styles.ctaBlock}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Pace is free. Use it if it makes the week easier.</h2>
          <a href={PACE_APP_URL} className={styles.ctaBtn}>Open Pace</a>
          <p style={{ color: "rgba(255,255,255,.7)", maxWidth: 620, margin: "18px auto 0", lineHeight: 1.6 }}>
            Pace is a productivity tool, not financial, legal, accounting, medical or NDIS compliance advice. Check current rates and rules before relying on calculated values for claims or billing.
          </p>
        </div>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
