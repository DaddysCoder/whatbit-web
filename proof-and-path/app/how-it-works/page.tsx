import type { Metadata } from "next";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { HowItWorksScreen } from "@/components/screens/public/HowItWorksScreen";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Six steps, one at a time. Understand, gather, prepare, act, track, and escalate if needed.",
};

export default function HowItWorksPage() {
  return (
    <PublicPageShell>
      <HowItWorksScreen />
    </PublicPageShell>
  );
}
