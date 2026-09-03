"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import styles from "./HeroVisual.module.css";

type Plane = {
  className: string;
  depth: number; // parallax strength
  float: { x: number[]; y: number[]; rotate?: number[]; duration: number };
};

const PLANES: Plane[] = [
  { className: styles.planeBase, depth: 6, float: { x: [0, 6, 0], y: [0, -8, 0], duration: 14 } },
  { className: styles.planeWhite, depth: 14, float: { x: [0, -7, 0], y: [0, 9, 0], duration: 11 } },
  {
    className: styles.planeLilac,
    depth: 22,
    float: { x: [0, 8, 0], y: [0, 6, 0], rotate: [-6, -3, -6], duration: 16 },
  },
  { className: styles.planePurple, depth: 30, float: { x: [0, -5, 0], y: [0, -10, 0], duration: 9 } },
  {
    className: styles.planeInk,
    depth: 18,
    float: { x: [0, 5, 0], y: [0, 7, 0], rotate: [4, 7, 4], duration: 13 },
  },
  { className: styles.planeLine, depth: 10, float: { x: [0, -4, 0], y: [0, 5, 0], duration: 18 } },
];

/**
 * Brand-native kinetic composition for the hero — a handful of overlapping
 * planes that drift independently and nudge toward the pointer, standing
 * in for "turning complicated things into something organised" without
 * illustrating any literal software.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotionSafe();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const el = stageRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, px, py]);

  return (
    <div className={styles.stage} ref={stageRef} aria-hidden>
      {PLANES.map((plane, i) => (
        <HeroPlane key={i} plane={plane} sx={sx} sy={sy} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}

function HeroPlane({
  plane,
  sx,
  sy,
  reduceMotion,
}: {
  plane: Plane;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  const px = useTransform(sx, (v) => v * plane.depth);
  const py = useTransform(sy, (v) => v * plane.depth);

  // Two layers so the slow independent float (keyframe `animate`) and the
  // pointer-parallax offset (a spring MotionValue) can both drive
  // transforms without fighting over the same x/y — Motion can't compose
  // an animated value and an externally-driven one on a single element.
  return (
    <motion.div className={`${styles.plane} ${plane.className}`} style={reduceMotion ? undefined : { x: px, y: py }}>
      <motion.div
        className={styles.planeFloat}
        animate={
          reduceMotion
            ? undefined
            : {
                x: plane.float.x,
                y: plane.float.y,
                rotate: plane.float.rotate,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: plane.float.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }
        }
      />
    </motion.div>
  );
}
