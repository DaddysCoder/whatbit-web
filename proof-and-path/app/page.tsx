import type { Metadata } from "next";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { HomeScreen } from "@/components/screens/public/HomeScreen";

export const metadata: Metadata = {
  title: "A calmer way to sort out a purchase problem",
  description:
    "Proof & Path helps you organise what happened, gather useful evidence, prepare a clear request and keep track of what comes next.",
};

export default function HomePage() {
  return (
    <PublicPageShell>
      <HomeScreen />
    </PublicPageShell>
  );
}
