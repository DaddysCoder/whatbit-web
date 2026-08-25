import type { Metadata } from "next";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { AccessibilityScreen } from "@/components/screens/public/AccessibilityScreen";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Proof & Path is designed from the start for keyboard use, screen readers, large text and reduced motion.",
};

export default function AccessibilityPage() {
  return (
    <PublicPageShell>
      <AccessibilityScreen />
    </PublicPageShell>
  );
}
