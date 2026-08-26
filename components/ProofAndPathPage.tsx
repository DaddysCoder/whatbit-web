import { PROOF_AND_PATH_APP_URL } from "@/lib/products";
import { CONTACT_MAILTO } from "@/lib/site";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import orbit from "./OrbitPage.module.css";
import styles from "./ProofAndPathPage.module.css";

const ACCENT = "#0F9D74";

export function ProofAndPathPage() {
  return (
    <div className={orbit.page}>
      <SiteNav variant="inner" accent={ACCENT} ctaHref="/contact" />

      <div className={orbit.hero}>
        <div className={orbit.heroMark}>
          <BarMark
            size={76}
            radius={22}
            gradient="linear-gradient(135deg,#14B888,#0F9D74)"
            shadow="0 30px 60px rgba(15,157,116,0.25)"
            float
          />
        </div>
        <div className={orbit.live} style={{ color: ACCENT }}>
          LIVE PRODUCT
        </div>
        <h1 className={orbit.title}>
          A calmer way to sort out
          <br />a purchase problem.
        </h1>
        <p className={orbit.lede}>
          Proof &amp; Path helps you organise what happened, gather useful evidence, prepare a clear request and keep track of what comes next — you stay in control at every step.
        </p>
      </div>

      <div className={orbit.previewWrap}>
        <div className={orbit.preview}>
          <div className={orbit.stats}>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>CASE STATUS</div>
              <div className={orbit.statValue} style={{ fontSize: 28, color: ACCENT }}>
                In progress
              </div>
            </div>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>EVIDENCE</div>
              <div className={orbit.statValue} style={{ fontSize: 34 }}>
                4
              </div>
            </div>
            <div className={orbit.stat}>
              <div className={orbit.statLabel}>NEXT STEP</div>
              <div className={orbit.statValue} style={{ fontSize: 24 }}>
                Send draft
              </div>
            </div>
          </div>
          <div className={styles.rows}>
            <div className={styles.row}>
              <div className={styles.rowType}>Receipt</div>
              <div className={styles.rowNote}>Purchase date and amount confirmed</div>
              <span className={styles.chip}>Added</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowType}>Email thread</div>
              <div className={styles.rowNote}>Seller response logged</div>
              <span className={styles.chip}>Added</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowType}>Photo</div>
              <div className={styles.rowNote}>Product defect documented</div>
              <span className={`${styles.chip} ${styles.chipQuiet}`}>Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className={orbit.features}>
        <div className={orbit.feat}>
          <div>
            <div className={orbit.featEyebrow} style={{ color: ACCENT }}>
              THE CASE
            </div>
            <h2 className={orbit.featTitle}>Bring the process into one place.</h2>
            <p className={orbit.featCopy}>
              When something goes wrong, the hard part is knowing where to begin. Proof &amp; Path keeps receipts, emails, photos and notes together so you can see the full picture before you act.
            </p>
          </div>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#E8F5F0,#FFFFFF)" }}>
            <div className={styles.evidence}>
              <div className={styles.evidenceItem}>
                <span className={styles.evidenceDot} />
                Receipt uploaded
              </div>
              <div className={styles.evidenceItem}>
                <span className={styles.evidenceDot} />
                Email thread linked
              </div>
              <div className={styles.evidenceItem}>
                <span className={`${styles.evidenceDot} ${styles.evidenceDotSoft}`} />
                Draft ready to review
              </div>
            </div>
          </div>
        </div>

        <div className={`${orbit.feat} ${orbit.featReverse}`}>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#F2FBF7,#FFFFFF)" }}>
            <div className={styles.steps}>
              <div className={styles.step}>Understand what happened</div>
              <div className={styles.step}>Gather useful evidence</div>
              <div className={`${styles.step} ${styles.stepMuted}`}>You decide what to send</div>
            </div>
          </div>
          <div>
            <div className={orbit.featEyebrow} style={{ color: ACCENT }}>
              YOUR CONTROL
            </div>
            <h2 className={orbit.featTitle}>Nothing is sent without you.</h2>
            <p className={orbit.featCopy}>
              Check every fact. Edit every draft. Decide what happens next. Proof &amp; Path organises the work — it does not speak for you or act on your behalf.
            </p>
          </div>
        </div>

        <div className={orbit.feat}>
          <div>
            <div className={orbit.featEyebrow} style={{ color: ACCENT }}>
              BUILT FOR ACCESS
            </div>
            <h2 className={orbit.featTitle}>Designed for real people, not perfect users.</h2>
            <p className={orbit.featCopy}>
              Large text, keyboard access, screen-reader structure and plain-language guidance are part of the core journey — not an afterthought bolted on later.
            </p>
          </div>
          <div className={orbit.viz} style={{ background: "linear-gradient(160deg,#E8F5F0,#FFFFFF)" }}>
            <div className={orbit.rate} style={{ color: ACCENT, fontSize: 28 }}>
              You stay in control →
            </div>
          </div>
        </div>
      </div>

      <div className={orbit.ctaBlock}>
        <div className={orbit.ctaInner}>
          <h2 className={orbit.ctaTitle}>Ready to sort out what happened?</h2>
          <div className={styles.ctaRow}>
            <a
              href={PROOF_AND_PATH_APP_URL}
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Proof &amp; Path
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
