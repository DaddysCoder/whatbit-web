"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { swatchAt } from "@/lib/ds-palette";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./EngagementLoop.module.css";

type Stage = { n: string; title: string; body: string };

export function EngagementLoop({ stages }: { stages: readonly Stage[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const fillSize = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const arcOpacity = useTransform(scrollYProgress, [0.78, 1], [0, 1]);
  const arcLength = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.track}>
        <div className={styles.rail} />
        <motion.div
          className={styles.railFill}
          style={
            reduceMotion
              ? ({ "--fill": "100%" } as CSSProperties)
              : ({ "--fill": fillSize } as unknown as CSSProperties)
          }
        />

        <div className={styles.nodes}>
          {stages.map((stage, i) => (
            <LoopStage
              key={stage.n}
              stage={stage}
              index={i}
              total={stages.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <svg
          className={styles.arc}
          viewBox="0 0 1000 140"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M 900 20 C 1000 90, 100 90, 60 24"
            fill="none"
            stroke="#7b2ff7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 10"
            style={reduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: arcOpacity, pathLength: arcLength }}
          />
          <motion.polygon
            points="60,24 74,18 74,32"
            fill="#7b2ff7"
            style={reduceMotion ? { opacity: 1 } : { opacity: arcOpacity }}
          />
        </svg>
      </div>
      <p className={styles.loopCue}>Report back leads straight into the next Invite.</p>
    </div>
  );
}

function LoopStage({
  stage,
  index,
  total,
  progress,
  reduceMotion,
}: {
  stage: Stage;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const swatch = swatchAt(index);
  const threshold = index / (total - 1 || 1);
  const from = Math.max(0, threshold - 0.16);

  const scale = useTransform(progress, [from, threshold], [0.92, 1]);
  const y = useTransform(progress, [from, threshold], [10, 0]);
  const bg = useTransform(progress, [from, threshold], ["#f3f0fb", swatch.bg]);
  const color = useTransform(progress, [from, threshold], ["#5b21b6", swatch.text]);

  return (
    <motion.div
      className={styles.node}
      style={
        reduceMotion
          ? { background: swatch.bg, color: swatch.text }
          : { scale, y, background: bg, color }
      }
      whileHover={reduceMotion ? undefined : { scale: 1.05, y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <span className={styles.nodeN}>{stage.n}</span>
      <h3 className={styles.nodeTitle}>{stage.title}</h3>
      <p className={styles.nodeBody}>{stage.body}</p>
    </motion.div>
  );
}
