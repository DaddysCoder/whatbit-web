import Link from "next/link";
import styles from "./Wordmark.module.css";

type WordmarkProps = {
  href?: string;
  accent?: string;
  ink?: string;
  size?: number;
};

export function Wordmark({
  href = "/",
  accent = "#7B2FF7",
  ink = "#0B0B0C",
  size = 19,
}: WordmarkProps) {
  return (
    <Link
      href={href}
      className={styles.mark}
      style={{ fontSize: size }}
    >
      <span style={{ color: ink }}>What</span>
      <span style={{ color: accent }}>Bit</span>
    </Link>
  );
}
