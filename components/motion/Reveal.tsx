"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens, revealTransition, revealViewport } from "@/lib/motion";
import { useReducedMotionSafe } from "./useMediaQuery";

type Direction = "up" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
};

/**
 * Scroll/mount entrance for a single element. Fades and settles in from a
 * small offset — never a bounce. Triggers once per mount.
 */
export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotionSafe();
  const { x, y } = offset[direction];

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={revealViewport}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: direction === "none" ? 1 : 0.985 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (fast: boolean) => ({
    transition: { staggerChildren: fast ? motionTokens.staggerFast : motionTokens.stagger },
  }),
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition },
};

const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  fast?: boolean;
};

/**
 * Wraps a group of related entrance elements (e.g. a card grid) so they
 * animate in together with a short stagger, instead of independently or
 * all at once. Children should be <StaggerItem> or opt in via
 * variants={itemVariants(reduceMotion)}.
 */
export function StaggerGroup({ children, className, fast = false }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      custom={fast}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotionSafe();
  return (
    <motion.div className={className} variants={reduceMotion ? staggerItemReduced : staggerItem}>
      {children}
    </motion.div>
  );
}
