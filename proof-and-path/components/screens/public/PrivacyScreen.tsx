import { INDEPENDENT_DISCLAIMER } from "@/lib/constants/value-props";
import styles from "./public-screens.module.css";

const PRIVACY_SECTIONS = [
  {
    title: "What's stored",
    description:
      "Only what you choose to add — case facts you confirm, evidence you upload, drafts and your timeline.",
  },
  {
    title: "Export anytime",
    description:
      "Download a case summary as a PDF whenever you like — before closing, escalating or deleting a case.",
  },
  {
    title: "Delete anytime",
    description:
      "Remove a document, a case, or your account. Deletion is immediate and cannot be undone from within the app.",
  },
  {
    title: "Support-person access",
    description:
      "If you invite someone to help, you control what they can see and do, and can revoke access at any time.",
  },
] as const;

export function PrivacyScreen() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Privacy &amp; trust</h1>
      <p className={styles.pageIntroWide}>
        Your case belongs to you. Here&apos;s what that means in practice.
      </p>
      <div className={styles.infoList}>
        {PRIVACY_SECTIONS.map((section, index) => (
          <div
            key={section.title}
            className={
              index < PRIVACY_SECTIONS.length - 1
                ? styles.infoSection
                : styles.infoSectionLast
            }
          >
            <div className={styles.infoTitle}>{section.title}</div>
            <div className={styles.infoBody}>{section.description}</div>
          </div>
        ))}
      </div>
      <p className={styles.disclaimer} style={{ marginTop: 24 }}>
        {INDEPENDENT_DISCLAIMER}
      </p>
    </div>
  );
}
