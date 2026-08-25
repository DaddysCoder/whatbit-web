import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "caution"
  | "positive"
  | "neutral"
  | "primary"
  | "missing"
  | "ai"
  | "editable"
  | "level"
  | "active";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

function variantClass(variant: BadgeVariant): string {
  return styles[variant] ?? styles.caution;
}

export function Badge({
  variant = "caution",
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = [variantClass(variant), className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
