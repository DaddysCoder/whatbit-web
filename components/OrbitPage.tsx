import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./OrbitPage.module.css";

export function OrbitPage() {
  return (
    <div className={styles.page}>
      <SiteNav variant="inner" ctaHref="/#cta" />

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
        <div className={styles.live}>LIVE PRODUCT</div>
        <h1 className={styles.title}>
          Your week, and
          <br />
          what it&apos;s worth.
        </h1>
        <p className={styles.lede}>
          Orbit is a calendar and hours workspace for practitioners who bill by the hour — built for the way you actually plan a week, not a generic timesheet.
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
              <div className={styles.statValue} style={{ fontSize: 28 }}>
                $3,453
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>PACE</div>
              <div className={`${styles.statValue} ${styles.pace}`} style={{ fontSize: 24 }}>
                On track
              </div>
            </div>
          </div>
          <div className={styles.traj}>
            <div className={styles.trajRow}>
              <span style={{ letterSpacing: "0.1em" }}>OUTPUT TRAJECTORY</span>
              <span>35% to Super Stretch</span>
            </div>
            <div className={styles.track}>
              <div className={styles.fill} />
            </div>
          </div>
          <div className={styles.week}>
            <div className={styles.day}>
              <div className={styles.dayLabel}>MON 17</div>
              <div className={`${styles.event} ${styles.billable}`}>Client review</div>
            </div>
            <div className={styles.day}>
              <div className={styles.dayLabel}>TUE 18</div>
              <div className={`${styles.event} ${styles.personal}`}>Dentist</div>
            </div>
            <div className={styles.day}>
              <div className={styles.dayLabel}>WED 19</div>
              <div className={`${styles.event} ${styles.billable}`}>Session</div>
            </div>
            <div className={styles.day}>
              <div className={styles.dayLabel}>THU 20</div>
              <div className={`${styles.event} ${styles.dotted}`}>Community event</div>
            </div>
            <div className={`${styles.day} ${styles.today}`}>
              <div className={`${styles.dayLabel} ${styles.todayLabel}`}>FRI · TODAY</div>
              <div className={`${styles.event} ${styles.todayEvent}`}>Session – R. Alavi</div>
            </div>
            <div className={styles.day}>
              <div className={styles.dayLabel}>SAT 22</div>
              <div className={styles.empty}>+ Add work</div>
            </div>
            <div className={styles.day}>
              <div className={styles.dayLabel}>SUN 23</div>
              <div className={styles.empty}>+ Add work</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feat}>
          <div>
            <div className={styles.featEyebrow}>THE WEEK</div>
            <h2 className={styles.featTitle}>See the whole week at a glance.</h2>
            <p className={styles.featCopy}>
              Seven columns, one week. Billable work, personal time and everything low-priority are styled so you can tell them apart without reading a word — solid for billable, dashed for personal, dotted for everything else.
            </p>
          </div>
          <div className={styles.viz} style={{ background: "linear-gradient(160deg,#F7F2FF,#FFFFFF)" }}>
            <div className={styles.bars}>
              <div className={styles.bar} style={{ height: 80, background: "#7B2FF7" }} />
              <div className={styles.bar} style={{ height: 120, background: "#B794FF" }} />
              <div className={styles.bar} style={{ height: 60, background: "#E5D6FB" }} />
              <div className={styles.bar} style={{ height: 100, background: "#7B2FF7" }} />
              <div className={styles.bar} style={{ height: 70, background: "#B794FF" }} />
            </div>
          </div>
        </div>

        <div className={`${styles.feat} ${styles.featReverse}`}>
          <div
            className={`${styles.viz} ${styles.vizDelay1}`}
            style={{ background: "linear-gradient(160deg,#FFF8F2,#FFFFFF)" }}
          >
            <div className={styles.rate}>
              $354<span className={styles.rateUnit}>/hr</span>
            </div>
          </div>
          <div>
            <div className={styles.featEyebrow}>THE MATH</div>
            <h2 className={styles.featTitle}>Know what you&apos;ve earned before you invoice.</h2>
            <p className={styles.featCopy}>
              Logged hours convert straight to billed value at your rate. Watch your pace toward this month&apos;s target — Base, Mid, Stretch or Super Stretch — move as the week fills in.
            </p>
          </div>
        </div>

        <div className={styles.feat}>
          <div>
            <div className={styles.featEyebrow}>ONE CALENDAR</div>
            <h2 className={styles.featTitle}>Every calendar you use, in one place.</h2>
            <p className={styles.featCopy}>
              Splose, Google and Outlook feed straight into the same week. Turn any source off and its events disappear from view — nothing deleted, just out of the way.
            </p>
          </div>
          <div
            className={`${styles.viz} ${styles.sources} ${styles.vizDelay2}`}
            style={{ background: "linear-gradient(160deg,#F2FBF9,#FFFFFF)" }}
          >
            <div className={styles.source}>Splose</div>
            <div className={styles.source}>Google</div>
            <div className={`${styles.source} ${styles.sourceOff}`}>Outlook</div>
          </div>
        </div>
      </div>

      <div className={styles.ctaBlock}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to see your week differently?</h2>
          <a href="mailto:hello@whatbit.io" className={styles.ctaBtn}>
            Get in touch
          </a>
        </div>
        <SiteFooter variant="minimal" />
      </div>
    </div>
  );
}
