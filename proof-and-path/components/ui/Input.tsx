import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError = false, className, ...props }: InputProps) {
  const classes = [
    hasError ? styles.inputError : styles.input,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} {...props} />;
}
