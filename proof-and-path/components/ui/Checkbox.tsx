import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({
  label,
  disabled,
  className,
  id,
  ...props
}: CheckboxProps) {
  const labelClass = disabled ? styles.labelDisabled : styles.label;

  return (
    <label htmlFor={id} className={[labelClass, className ?? ""].filter(Boolean).join(" ")}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        className={styles.input}
        {...props}
      />
      {label}
    </label>
  );
}
