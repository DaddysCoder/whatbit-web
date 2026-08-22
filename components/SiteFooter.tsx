import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { PRODUCT_LINKS } from "@/lib/products";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  variant?: "full" | "minimal" | "tiny";
  accent?: string;
};

export function SiteFooter({ variant = "full", accent = "#B794FF" }: SiteFooterProps) {
  if (variant === "tiny") {
    return (
      <div className={styles.tiny}>
        <div>WhatBit · Australia</div>
        <div className={styles.legalRow}>
          <Link href="/privacy" className={styles.legalLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Terms
          </Link>
          <Link href="/cookies" className={styles.legalLink}>
            Cookies
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={styles.minimalWrap}>
        <Wordmark accent={accent} ink="#FFFFFF" size={17} />
        <div className={styles.legalRow}>
          <div className={styles.legal}>WhatBit · Australia</div>
          <Link href="/privacy" className={styles.legalLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Terms
          </Link>
          <Link href="/cookies" className={styles.legalLink}>
            Cookies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.full}>
      <Wordmark accent={accent} ink="#FFFFFF" size={17} />
      <div className={styles.cols}>
        <div className={styles.col}>
          <div className={styles.head}>PRODUCTS</div>
          {PRODUCT_LINKS.map((p) => (
            <Link key={p.href} href={p.href} className={styles.link}>
              {p.label}
            </Link>
          ))}
        </div>
        <div className={styles.col}>
          <div className={styles.head}>COMPANY</div>
          <Link href="/#philosophy" className={styles.link}>
            Philosophy
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/elsewhere" className={styles.link}>
            Elsewhere
          </Link>
          <Link href="/rft" className={styles.link}>
            RFT
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </div>
        <div className={styles.col}>
          <div className={styles.head}>LEGAL</div>
          <Link href="/privacy" className={styles.link}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
          <Link href="/cookies" className={styles.link}>
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
}
