"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./BandList.module.css";

const TONES = ["#faf8ff", "#f5f2fc", "#f0ecfa"];

export function BandList({ items }: { items: readonly string[] }) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className={styles.list}>
      {items.map((text, i) => {
        const fromSide = i % 2 === 0 ? -28 : 28;
        return (
          <motion.div
            key={text}
            className={styles.band}
            style={{ background: TONES[i % TONES.length] }}
            initial={{ opacity: 0, x: fromSide }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: reduceMotion ? 0 : (i % 8) * 0.05,
            }}
            whileHover={reduceMotion ? undefined : { x: 6 }}
          >
            <span className={styles.bandN}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.bandText}>{text}</span>
            <span className={styles.bandCue} aria-hidden>
              →
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
