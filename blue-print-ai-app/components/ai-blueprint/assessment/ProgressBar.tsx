"use client";

import styles from "./assessment.module.css";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onSelectStep: (step: number) => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

export function ProgressBar({ currentStep, totalSteps, stepTitles, onSelectStep, isSaving, lastSaved }: ProgressBarProps) {
  if (currentStep >= totalSteps) return null;

  const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <header className={styles.progressHeader}>
      <div className={styles.progressInner}>
        <div className={styles.progressTopRow}>
          <div className={styles.brandRow}>
            <span className={styles.brandDot} />
            <span className={styles.brandName}>WHATBIT</span>
            <span style={{ color: "#d6d3d1" }}>/</span>
            <span className={styles.brandSub}>AI Blueprint Readiness</span>
          </div>

          <div className={`${styles.saveStatus} ${isSaving ? styles.saveStatusSaving : ""}`}>
            {isSaving ? "Saving draft..." : lastSaved ? `Draft saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : null}
          </div>
        </div>

        <div className={styles.stepPills}>
          {stepTitles.map((title, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <button
                type="button"
                key={title}
                onClick={() => isCompleted && onSelectStep(idx)}
                disabled={!isCompleted && !isCurrent}
                className={`${styles.stepPill} ${isCurrent ? styles.stepPillCurrent : isCompleted ? styles.stepPillDone : styles.stepPillTodo}`}
              >
                <span className={`${styles.stepDot} ${isCurrent ? styles.stepDotCurrent : isCompleted ? styles.stepDotDone : styles.stepDotTodo}`}>
                  {isCompleted ? "✓" : idx + 1}
                </span>
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.mobileProgress}>
          <div className={styles.mobileProgressRow}>
            <span>
              Step {currentStep + 1} of {totalSteps}: {stepTitles[currentStep]}
            </span>
            <span>{progressPercentage}%</span>
          </div>
          <div className={styles.mobileProgressTrack}>
            <div className={styles.mobileProgressFill} style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
}
