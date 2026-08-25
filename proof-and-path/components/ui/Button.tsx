import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "primaryActive"
  | "secondary"
  | "ghost"
  | "text"
  | "textDestructive"
  | "destructive"
  | "destructiveOutline"
  | "dashed"
  | "chip"
  | "chipSelected"
  | "option"
  | "optionSelected";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  compact?: boolean;
  small?: boolean;
  children: ReactNode;
}

function variantClass(variant: ButtonVariant): string {
  return styles[variant] ?? styles.primary;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  compact = false,
  small = false,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    variantClass(variant),
    fullWidth ? styles.fullWidth : "",
    compact ? styles.compact : "",
    small ? styles.small : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
