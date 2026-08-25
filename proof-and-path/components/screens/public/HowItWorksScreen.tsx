import Link from "next/link";
import { HowItWorksSteps } from "@/components/shared/HowItWorksSteps";
import buttonStyles from "@/components/ui/Button.module.css";
import styles from "./public-screens.module.css";

export function HowItWorksScreen() {
  return (
    <div>
      <h1 className={styles.pageTitle}>How it works</h1>
      <p className={styles.pageIntro}>
        Six steps, one at a time. You can leave and come back at any point.
      </p>
      <HowItWorksSteps variant="page" />
      <Link
        href="/sign-in"
        className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.fullWidth}`}
        style={{ marginTop: 28 }}
      >
        Start a case
      </Link>
    </div>
  );
}
