import type { ReactNode } from "react";
import styles from "./StepIndicator.module.css";

export interface StepIndicatorProps {
  phase: string;
  currentStep: number;
  totalSteps: number;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function StepIndicator({
  phase,
  currentStep,
  totalSteps,
  title,
  subtitle,
  className,
}: StepIndicatorProps) {
  const rootClass = [styles.header, className ?? ""].filter(Boolean).join(" ");

  return (
    <header className={rootClass}>
      <p className={styles.indicator}>
        <span className={styles.label}>
          {phase} — Step {currentStep} of {totalSteps}
        </span>
      </p>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
