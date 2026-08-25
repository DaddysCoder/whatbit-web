"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { LogoMark } from "./LogoMark";
import styles from "./AppHeader.module.css";

export type AppHeaderMode = "public" | "authenticated";

export interface AppHeaderProps {
  mode?: AppHeaderMode;
  showBack?: boolean;
  onBack?: () => void;
}

export function AppHeader({
  mode = "public",
  showBack = false,
  onBack,
}: AppHeaderProps) {
  const router = useRouter();
  const { isDesktop } = useResponsive();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  const isPublic = mode === "public";
  const showDesktopNav = isDesktop && !isPublic;
  const showDashboardLink = !isPublic && !isDesktop;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Proof & Path home">
        <LogoMark />
        <span className={styles.wordmark}>Proof & Path</span>
      </Link>

      <div className={styles.actions}>
        {showBack ? (
          <button type="button" className={styles.backButton} onClick={handleBack}>
            ← Back
          </button>
        ) : null}

        {isPublic ? (
          <Link href="/sign-in" className={styles.signInLink}>
            Sign in
          </Link>
        ) : null}

        {showDesktopNav ? (
          <>
            <Link href="/dashboard" className={styles.navLink}>
              Cases
            </Link>
            <Link href="/dashboard#reminders" className={styles.navLink}>
              Reminders
            </Link>
            <Link href="/support" className={styles.navLink}>
              Support
            </Link>
          </>
        ) : null}

        {showDashboardLink ? (
          <Link href="/dashboard" className={styles.dashboardLink}>
            Dashboard
          </Link>
        ) : null}
      </div>
    </header>
  );
}
