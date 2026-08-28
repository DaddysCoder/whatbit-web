import type { Metadata } from "next";
import { AiBlueprintConfirmPage } from "@/components/AiBlueprintConfirmPage";

export const metadata: Metadata = {
  title: "You're in — AI Blueprint by WhatBit",
  description: "Your AI Blueprint purchase is confirmed. Here's what happens next.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <AiBlueprintConfirmPage
      icon="check"
      title="You're in."
      body="Payment received — you're one of five Founding Clients. Here's what happens next."
      steps={[
        { title: "We confirm your access", body: "Usually within a few hours during business days." },
        {
          title: "You'll get an email with your assessment link",
          body: "Sent to the address you paid with. Check spam if it doesn't turn up.",
        },
        { title: "Complete it at your own pace", body: "15–20 minutes. Save and resume any time before you submit." },
      ]}
      cta={{ href: "/ai-blueprint/assessment", label: "Start the assessment" }}
      footerNote={
        <>
          A confirmation email is on its way to you now. Questions?{" "}
          <a href="mailto:hello@primitiveai.com.au">hello@primitiveai.com.au</a>
        </>
      }
    />
  );
}
