"use client";

import { motion } from "motion/react";
import { swatchAt } from "@/lib/ds-palette";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./SupportLifecycle.module.css";

export function SupportLifecycle({ items }: { items: readonly string[] }) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className={styles.lifecycle}>
      <div className={styles.rail} aria-hidden />

      <motion.div
        className={styles.launch}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        LAUNCH
      </motion.div>

      <div className={styles.stages}>
        {items.map((text, i) => {
          const swatch = swatchAt(i);
          return (
            <motion.div
              key={text}
              className={styles.stage}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: reduceMotion ? 0 : (i % 8) * 0.06,
              }}
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <span className={styles.stageDot} style={{ background: swatch.bg }} />
              <span className={styles.stageText}>{text}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
