"use client";

import { Button, SectionCard } from "@/components/ui";
import { useLargeTextContext } from "@/components/providers";
import styles from "./public-screens.module.css";

const ACCESSIBILITY_SECTIONS = [
  {
    title: "Keyboard and screen readers",
    description:
      "Every action can be reached and completed without a mouse or touch, with a visible focus state and a sensible reading order.",
  },
  {
    title: "Plain language",
    description:
      "No legal terminology is required to use the product. Guided questions are short, with help available on demand.",
  },
  {
    title: "Reduced motion",
    description:
      "Transitions are brief and never required to understand what happened.",
  },
  {
    title: "Support person",
    description:
      "Anyone who prefers help from a family member or support person can invite one, with permissions they control.",
  },
] as const;

export function AccessibilityScreen() {
  const { largeText, toggleLargeText } = useLargeTextContext();

  return (
    <div>
      <h1 className={styles.pageTitle}>Accessibility</h1>
      <p className={styles.pageIntroWide}>
        Proof &amp; Path is designed from the start for keyboard use, screen
        readers, large text and reduced motion — not retrofitted afterwards.
      </p>

      <SectionCard className={styles.largeTextCard}>
        <div className={styles.largeTextTitle}>Large text</div>
        <p className={styles.largeTextBody}>
          Increase the size of text, spacing and controls throughout the app.
          Nothing is hidden in this mode.
        </p>
        <Button
          type="button"
          variant={largeText ? "primaryActive" : "primary"}
          onClick={toggleLargeText}
        >
          {largeText ? "Large text on" : "Turn on large text"}
        </Button>
      </SectionCard>

      <div className={styles.infoList}>
        {ACCESSIBILITY_SECTIONS.map((section, index) => (
          <div
            key={section.title}
            className={
              index < ACCESSIBILITY_SECTIONS.length - 1
                ? styles.infoSection
                : styles.infoSectionLast
            }
          >
            <div className={styles.infoTitle}>{section.title}</div>
            <div className={styles.infoBody}>{section.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
