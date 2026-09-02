"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { forwardRef, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode, CSSProperties } from "react";
import { cardEntranceVariantsReduced, interactionSpring, motionTokens, surfaceSpring } from "@/lib/motion";
import { useHoverCapable, useReducedMotionSafe } from "./useMediaQuery";

const MotionLink = motion.create(Link);

export type LiftCardProps = {
  /** Internal route — renders a Next.js <Link>. */
  href?: string;
  /** External URL — renders a plain <a>. */
  externalHref?: string;
  /** Flagship/priority surfaces get a touch more lift + tilt. */
  strong?: boolean;
  /** Pointer-reactive tilt. Off by default for "ordinary" informational cards. */
  tilt?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onPointerMove?: (px: number, py: number) => void;
  onPointerIdle?: () => void;
  /**
   * Entrance variants, inherited from an ancestor <StaggerGroup>. Use this
   * instead of wrapping in <StaggerItem> when the card must stay a direct
   * child of a CSS Grid/Flex container (a wrapper div would break
   * `grid-column: span N` sizing).
   */
  variants?: Variants;
};

/**
 * The base "surface comes toward you" primitive: a restrained hover
 * lift/scale with spring return, and — when `tilt` is on — a heavily
 * constrained pointer-reactive rotateX/rotateY (~1.5deg) driven through
 * motion values so pointer tracking never triggers a React re-render.
 * Tilt only ever runs on devices with a genuine hover-capable fine
 * pointer; everything else (mobile) gets the plain lift/tap states.
 */
export const LiftCard = forwardRef<HTMLElement, LiftCardProps>(function LiftCard(
  { href, externalHref, strong = false, tilt = false, className, style, children, onPointerMove, onPointerIdle, variants },
  forwardedRef
) {
  const reduceMotion = useReducedMotionSafe();
  const hoverCapable = useHoverCapable();
  const localRef = useRef<HTMLElement | null>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, interactionSpring);
  const rotateY = useSpring(rawRotateY, interactionSpring);

  const canTilt = tilt && hoverCapable && !reduceMotion;

  const setRef = (el: HTMLElement | null) => {
    localRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) (forwardedRef as { current: HTMLElement | null }).current = el;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    if (canTilt) {
      const max = strong ? motionTokens.tiltMax : motionTokens.tiltMax * 0.7;
      rawRotateY.set((px - 0.5) * 2 * max);
      rawRotateX.set((0.5 - py) * 2 * max);
    }
    onPointerMove?.(px, py);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    onPointerIdle?.();
  };

  const lift = strong ? motionTokens.liftStrong : motionTokens.lift;
  const scale = strong ? motionTokens.cardScaleStrong : motionTokens.cardScale;

  const hoverAnimation = reduceMotion ? {} : { y: -lift, scale };
  const tapAnimation = reduceMotion ? {} : { scale: motionTokens.tapScale };

  const sharedProps = {
    ref: setRef,
    className,
    style: { ...style, rotateX: canTilt ? rotateX : 0, rotateY: canTilt ? rotateY : 0 },
    variants: variants ? (reduceMotion ? cardEntranceVariantsReduced : variants) : undefined,
    whileHover: hoverAnimation,
    whileTap: tapAnimation,
    transition: surfaceSpring,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    children,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  if (href) return <MotionLink href={href} {...sharedProps} />;
  if (externalHref) return <motion.a href={externalHref} {...sharedProps} />;
  return <motion.div {...sharedProps} />;
});
