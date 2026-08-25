import type { Metadata } from "next";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PrivacyScreen } from "@/components/screens/public/PrivacyScreen";

export const metadata: Metadata = {
  title: "Privacy & trust",
  description:
    "Your case belongs to you. See what is stored, export it, and delete it from your account.",
};

export default function PrivacyPage() {
  return (
    <PublicPageShell>
      <PrivacyScreen />
    </PublicPageShell>
  );
}
