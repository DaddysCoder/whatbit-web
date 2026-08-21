import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { PRODUCT_LINKS } from "@/lib/products";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  variant?: "full" | "minimal" | "tiny";
};

export function SiteFooter({ variant = "full" }: SiteFooterProps) {
  if (variant === "tiny") {
    return (
      <div className={styles.tiny}>WhatBit · Australia</div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={styles.minimalWrap}>
        <Wordmark accent="#B794FF" ink="#FFFFFF" size={17} />
        <div className={styles.legal}>WhatBit · Australia</div>
      </div>
    );
  }

  return (
    <div className={styles.full}>
      <Wordmark accent="#B794FF" ink="#FFFFFF" size={17} />
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
          <Link href="/#cta" className={styles.link}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
