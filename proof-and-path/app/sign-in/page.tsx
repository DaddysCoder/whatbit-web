import type { Metadata } from "next";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { SignInScreen } from "@/components/screens/public/SignInScreen";

export const metadata: Metadata = {
  title: "Sign in",
  description: "We'll email you a secure link — no password to remember.",
};

export default function SignInPage() {
  return (
    <PublicPageShell>
      <SignInScreen />
    </PublicPageShell>
  );
}
