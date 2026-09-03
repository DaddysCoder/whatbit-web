import { OUTCOME_COLORS, type Outcome } from "@/lib/useful";
import styles from "./OutcomeTag.module.css";

type OutcomeTagRowProps = {
  outcome: Outcome;
  format: string;
  center?: boolean;
};

/** The outcome-tag pill + uppercase format label, shared across hub cards and article headers. */
export function OutcomeTagRow({ outcome, format, center = false }: OutcomeTagRowProps) {
  const colors = OUTCOME_COLORS[outcome];
  return (
    <div className={styles.row} style={center ? { justifyContent: "center" } : undefined}>
      <span className={styles.tag} style={{ background: colors.bg, color: colors.fg }}>
        {outcome}
      </span>
      <span className={styles.format}>{format}</span>
    </div>
  );
}
