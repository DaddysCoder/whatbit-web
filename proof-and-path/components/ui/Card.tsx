import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardVariant =
  | "default"
  | "warm"
  | "caution"
  | "error"
  | "guidance"
  | "decision";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  compact?: boolean;
  children: ReactNode;
}

function variantClass(variant: CardVariant): string {
  switch (variant) {
    case "warm":
      return styles.warm;
    case "caution":
      return styles.caution;
    case "error":
      return styles.error;
    case "guidance":
      return styles.guidance;
    case "decision":
      return styles.decision;
    default:
      return styles.card;
  }
}

export function Card({
  variant = "default",
  compact = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = [
    variantClass(variant),
    compact ? styles.compact : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
