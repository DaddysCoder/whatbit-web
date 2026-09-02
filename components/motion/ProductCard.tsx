"use client";

import type { ReactNode, CSSProperties } from "react";
import type { Variants } from "motion/react";
import { GlowCard } from "./GlowCard";

type ProductCardProps = {
  href: string;
  /** Flagship products (Pace, Frame, Arc) get a touch more lift + tilt. */
  strong?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  variants?: Variants;
};

/**
 * Ecosystem card: GlowCard preconfigured for the product grid — lift,
 * restrained pointer tilt and an illuminated edge that appears on
 * interaction. Use LiftCard directly for the plainer, non-flagship tiles.
 */
export function ProductCard({ href, strong = false, className, style, children, variants }: ProductCardProps) {
  return (
    <GlowCard href={href} strong={strong} className={className} style={style} variants={variants}>
      {children}
    </GlowCard>
  );
}
