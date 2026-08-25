import Link from "next/link";
import styles from "@/components/screens/public/public-screens.module.css";

export function PublicFooterLinks() {
  return (
    <nav
      className={styles.footerLinks}
      aria-label="Proof & Path information"
    >
      <Link href="/how-it-works" className={styles.footerLink}>
        How it works
      </Link>
      <Link href="/accessibility" className={styles.footerLink}>
        Accessibility
      </Link>
      <Link href="/privacy" className={styles.footerLink}>
        Privacy &amp; trust
      </Link>
    </nav>
  );
}
