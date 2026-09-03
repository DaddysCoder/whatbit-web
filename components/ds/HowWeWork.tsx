"use client";

import { motion } from "motion/react";
import { swatchAt } from "@/lib/ds-palette";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./HowWeWork.module.css";

type Step = { n: string; title: string; body: string; artefact: string };

const SPAN_CLASS = [styles.spanA, styles.spanB, styles.spanC, styles.spanD, styles.spanE, styles.spanF];

export function HowWeWork({ steps }: { steps: readonly Step[] }) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className={styles.grid}>
      {steps.map((step, i) => {
        const swatch = swatchAt(i);
        return (
          <motion.div
            key={step.n}
            className={`${styles.tile} ${SPAN_CLASS[i % SPAN_CLASS.length]}`}
            style={{ background: swatch.bg, color: swatch.text }}
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: [0.16, 1, 0.3, 1],
              delay: reduceMotion ? 0 : (i % 6) * 0.09,
            }}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <div className={styles.tileTop}>
              <span className={styles.tileN}>{step.n}</span>
              <span className={styles.tileArtefact} style={{ color: swatch.text }}>
                {step.artefact}
              </span>
            </div>
            <h3 className={styles.tileTitle}>{step.title}</h3>
            <p className={styles.tileBody} style={{ color: swatch.textMuted }}>
              {step.body}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
