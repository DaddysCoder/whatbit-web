"use client";

import { motion } from "motion/react";
import { DS_FULL_SPECTRUM } from "@/lib/ds-palette";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./OperatingEnvironments.module.css";

export function OperatingEnvironments({
  conditions,
  intro,
  foot,
}: {
  conditions: readonly string[];
  intro: string;
  foot: string;
}) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className={styles.layout}>
      <div className={styles.sticky}>
        <h2 className={styles.heading}>Built for real operating environments</h2>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.foot}>{foot}</p>
      </div>

      <div className={styles.stream}>
        {conditions.map((text, i) => {
          const swatch = DS_FULL_SPECTRUM[i % DS_FULL_SPECTRUM.length];
          return (
            <motion.div
              key={text}
              className={styles.panel}
              style={{ background: swatch.bg, color: swatch.text }}
              initial={{ opacity: 0.35, x: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.panelN}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.panelText}>{text}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
