import type { ReactNode } from "react";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  const classes = [styles.field, className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {hint ? <p className={styles.hint}>{hint}</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
