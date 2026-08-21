import { FRAME_APP_URL } from "@/lib/products";
import { CONTACT_MAILTO } from "@/lib/site";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import orbit from "./OrbitPage.module.css";
import styles from "./FramePage.module.css";

export function FramePage() {
  return (
    <div className={orbit.page}>
      <SiteNav variant="inner" accent="#E8542E" ctaHref="/#cta" />

      <div className={orbit.hero}>
        <div className={orbit.heroMark}>
          <BarMark
            size={76}
            radius={22}
            gradient="linear-gradient(135deg,#F07655,#E8542E)"
            shadow="0 30px 60px rgba(232,84,46,0.25)"
            float
          />
        </div>
        <div className={orbit.live} style={{ color: "#E8542E" }}>
          LIVE PRODUCT
        </div>
        <h1 className={orbit.title}>
          The shape you
          <br />
          build inside.
        </h1>
        <p className={orbit.lede}>
          Frame is a behaviour-support workspace — the structure around how you see a person, not a generic form. Observations, patterns, and the next useful step, held together.
        </p>
      </div>

      <div className={orbit.previewWrap}>
        <div className={orbit.preview}>
          <div className={orbit.stats}>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>IN VIEW</div>
              <div className={orbit.statValue} style={{ fontSize: 34 }}>
                12
              </div>
            </div>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>OPEN NOTES</div>
              <div className={orbit.statValue} style={{ fontSize: 28 }}>
                4
              </div>
            </div>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>NEXT REVIEW</div>
              <div className={orbit.statValue} style={{ fontSize: 24, color: "#E8542E" }}>
                Thu
              </div>
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.row}>
              <div className={styles.rowName}>R. Alavi</div>
              <div className={styles.rowNote}>Morning routine holding</div>
              <span className={styles.chip}>Next step</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowName}>M. Chen</div>
              <div className={styles.rowNote}>Transition after lunch</div>
              <span className={`${styles.chip} ${styles.chipQuiet}`}>Watching</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowName}>J. Okonkwo</div>
              <div className={styles.rowNote}>Community outing — Fri</div>
              <span className={styles.chip}>Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className={orbit.features}>
        <div className={orbit.feat}>
          <div>
            <div className={orbit.featEyebrow} style={{ color: "#E8542E" }}>
              THE PERSON
            </div>
            <h2 className={orbit.featTitle}>See one person, not a pile of notes.</h2>
            <p className={orbit.featCopy}>
              Frame keeps the picture of someone in one place — who they are, what you&apos;ve noticed, and what you&apos;re trying next. The paperwork follows the person, not the other way around.
            </p>
          </div>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#FFF4F0,#FFFFFF)" }}>
            <div className={styles.people}>
              <div className={styles.person} />
              <div className={`${styles.person} ${styles.personMid}`} />
              <div className={`${styles.person} ${styles.personSoft}`} />
            </div>
          </div>
        </div>

        <div className={`${orbit.feat} ${orbit.featReverse}`}>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#FFF8F2,#FFFFFF)" }}>
            <div className={styles.steps}>
              <div className={styles.step}>What happened</div>
              <div className={styles.step}>What it might mean</div>
              <div className={`${styles.step} ${styles.stepMuted}`}>What we try next</div>
            </div>
          </div>
          <div>
            <div className={orbit.featEyebrow} style={{ color: "#E8542E" }}>
              THE RECORD
            </div>
            <h2 className={orbit.featTitle}>Show the working, not just the conclusion.</h2>
            <p className={orbit.featCopy}>
              Observations sit next to the thinking they produced. You can see how a pattern formed — and where the uncertainty still is — instead of a summary that hides the path.
            </p>
          </div>
        </div>

        <div className={orbit.feat}>
          <div>
            <div className={orbit.featEyebrow} style={{ color: "#E8542E" }}>
              THE NEXT STEP
            </div>
            <h2 className={orbit.featTitle}>Leave with something useful to do.</h2>
            <p className={orbit.featCopy}>
              Frame is built to close a session with a next step, not a longer document. The shape you build inside is there so the work outside gets clearer.
            </p>
          </div>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#FFF4F0,#FFFFFF)" }}>
            <div className={orbit.rate} style={{ color: "#E8542E", fontSize: 28 }}>
              Try this →
            </div>
          </div>
        </div>
      </div>

      <div className={orbit.ctaBlock}>
        <div className={orbit.ctaInner}>
          <h2 className={orbit.ctaTitle}>Ready to see the person more clearly?</h2>
          <div className={styles.ctaRow}>
            <a
              href={FRAME_APP_URL}
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Frame
            </a>
            <a href={CONTACT_MAILTO} className={styles.ctaSecondary}>
              Get in touch
            </a>
          </div>
        </div>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
