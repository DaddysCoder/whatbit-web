import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  draft?: boolean;
}

export function Textarea({
  hasError = false,
  draft = false,
  className,
  ...props
}: TextareaProps) {
  const classes = [
    hasError ? styles.textareaError : draft ? styles.draft : styles.textarea,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <textarea className={classes} {...props} />;
}
