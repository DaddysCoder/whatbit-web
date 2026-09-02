"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";
import { interactionSpring } from "@/lib/motion";
import { useReducedMotionSafe } from "./useMediaQuery";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.a;
const MotionButton = motion.button;

type MagneticButtonProps = {
  href?: string;
  externalHref?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Primary CTA tactile feedback: a small lift + scale on hover, a compress
 * on tap. Focus rings are left to the browser/CSS so keyboard users keep
 * a visible focus state.
 */
export function MagneticButton({ href, externalHref, onClick, type = "button", className, style, children }: MagneticButtonProps) {
  const reduceMotion = useReducedMotionSafe();

  const sharedProps = {
    className,
    style,
    whileHover: reduceMotion ? {} : { y: -2, scale: 1.01 },
    whileTap: reduceMotion ? {} : { scale: 0.98 },
    transition: interactionSpring,
  };

  if (href) {
    return (
      <MotionLink href={href} {...sharedProps}>
        {children}
      </MotionLink>
    );
  }

  if (externalHref) {
    return (
      <MotionAnchor href={externalHref} {...sharedProps}>
        {children}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton type={type} onClick={onClick} {...sharedProps}>
      {children}
    </MotionButton>
  );
}
