"use client";

import type { ReactNode } from "react";
import { useResponsive } from "@/lib/hooks/useResponsive";
import styles from "./ContentColumn.module.css";

export interface ContentColumnProps {
  children: ReactNode;
  className?: string;
}

export function ContentColumn({ children, className }: ContentColumnProps) {
  const { isDesktop } = useResponsive();

  const columnClass = [
    styles.column,
    isDesktop ? styles.desktop : styles.mobile,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.shell}>
      <div className={columnClass}>{children}</div>
    </div>
  );
}
