import { HOW_STEPS } from "@/lib/constants/how-steps";
import styles from "@/components/screens/public/public-screens.module.css";

type HowItWorksStepsProps = {
  variant?: "home" | "page";
};

export function HowItWorksSteps({ variant = "home" }: HowItWorksStepsProps) {
  const isHome = variant === "home";

  return (
    <>
      {HOW_STEPS.map((step) => (
        <div
          key={step.n}
          className={isHome ? styles.stepListHome : styles.stepListPage}
        >
          <div
            className={isHome ? styles.stepNumberHome : styles.stepNumberPage}
          >
            {step.n}
          </div>
          <div>
            <div
              className={isHome ? styles.stepTitleHome : styles.stepTitlePage}
            >
              {step.title}
            </div>
            <div className={styles.stepDesc}>{step.desc}</div>
          </div>
        </div>
      ))}
    </>
  );
}
