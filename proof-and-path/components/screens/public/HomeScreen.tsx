import Link from "next/link";
import { HowItWorksSteps } from "@/components/shared/HowItWorksSteps";
import { PublicFooterLinks } from "@/components/shared/PublicFooterLinks";
import {
  INDEPENDENT_DISCLAIMER,
  VALUE_PROPS,
} from "@/lib/constants/value-props";
import buttonStyles from "@/components/ui/Button.module.css";
import styles from "./public-screens.module.css";

export function HomeScreen() {
  return (
    <div>
      <div className={styles.heroSection}>
        <h1 className={styles.pageTitleLarge}>
          A calmer way to sort out a purchase problem.
        </h1>
        <p className={styles.lede}>
          Proof &amp; Path helps you organise what happened, gather useful
          evidence, prepare a clear request and keep track of what comes next.
        </p>
        <p className={styles.ledeStrong}>You stay in control at every step.</p>
        <div className={styles.ctaStack}>
          <Link
            href="/sign-in"
            className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.fullWidth}`}
          >
            Start a case
          </Link>
          <Link
            href="/how-it-works"
            className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.fullWidth}`}
          >
            See how it works
          </Link>
        </div>
        <p className={styles.disclaimer}>{INDEPENDENT_DISCLAIMER}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.problemText}>
          When something goes wrong with a product or service, the hard part is
          often knowing where to begin. Your receipt is in one place, the emails
          are somewhere else, and every website seems to tell you something
          different. Proof &amp; Path brings the process into one place.
        </p>
      </div>

      <div id="how" className={styles.section}>
        <h2 className={styles.sectionHeading}>How it works</h2>
        <HowItWorksSteps variant="home" />
      </div>

      {VALUE_PROPS.map((prop, index) => (
        <div
          key={prop.title}
          className={
            index === 0
              ? styles.section
              : index === VALUE_PROPS.length - 1
                ? styles.sectionLast
                : styles.sectionCompact
          }
        >
          <h3 className={styles.valueTitle}>{prop.title}</h3>
          <p className={styles.valueBody}>{prop.description}</p>
        </div>
      ))}

      <PublicFooterLinks />
    </div>
  );
}
