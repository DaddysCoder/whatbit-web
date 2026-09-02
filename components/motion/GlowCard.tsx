"use client";

import { motion, useMotionTemplate, useMotionValue, type MotionValue } from "motion/react";
import { useState } from "react";
import { LiftCard, type LiftCardProps } from "./LiftCard";
import { useReducedMotionSafe } from "./useMediaQuery";

type GlowCardProps = Omit<LiftCardProps, "onPointerMove" | "onPointerIdle">;

/**
 * A restrained "light catching the edge of glass" surface: a Gemini-style
 * spectral ring that is invisible at rest and fades in on interaction,
 * plus a pointer-following highlight along the same edge. Never a
 * permanent rainbow border — colour only appears through interaction.
 * Built on LiftCard for the lift/tilt physics.
 */
export function GlowCard({ children, ...rest }: GlowCardProps) {
  const reduceMotion = useReducedMotionSafe();
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const mxPercent = useMotionTemplate`${mx}%`;
  const myPercent = useMotionTemplate`${my}%`;

  if (reduceMotion) {
    return <LiftCard {...rest}>{children}</LiftCard>;
  }

  return (
    <LiftCard
      {...rest}
      tilt={rest.tilt ?? true}
      onPointerMove={(px, py) => {
        mx.set(px * 100);
        my.set(py * 100);
        if (!hovered) setHovered(true);
      }}
      onPointerIdle={() => setHovered(false)}
    >
      <motion.span
        aria-hidden
        className="wb-illum"
        style={cssVarStyle(mxPercent, myPercent, { animationPlayState: hovered ? "running" : "paused" })}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.span
        aria-hidden
        className="wb-illum-light"
        style={cssVarStyle(mxPercent, myPercent)}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      {children}
    </LiftCard>
  );
}

function cssVarStyle(mx: MotionValue<string>, my: MotionValue<string>, extra?: Record<string, string>) {
  return {
    "--mx": mx,
    "--my": my,
    ...extra,
  } as unknown as import("react").CSSProperties;
}
