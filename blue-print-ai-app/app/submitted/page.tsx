import type { Metadata } from "next";
import { AiBlueprintConfirmPage } from "@/components/AiBlueprintConfirmPage";

export const metadata: Metadata = {
  title: "Assessment received — AI Blueprint by WhatBit",
  description: "We've got your AI Blueprint assessment. A person now reviews it.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <AiBlueprintConfirmPage
      icon="envelope"
      title="Got it. We've got your assessment."
      body="A real person now reviews your answers and builds your readiness report and toolkit around them. There's no instant result — this is deliberately not automated."
      infoLabel="WHAT HAPPENS NEXT"
      infoBody={
        <>
          A WhatBit reviewer goes through your answers and puts together your AI Readiness Report and toolkit.
          Usually within <strong>5 business days</strong> of today. You&apos;ll get an email the moment your pack
          is ready — nothing more to do on your end until then.
        </>
      }
      footerNote={
        <>
          Need to add anything? <a href="mailto:hello@primitiveai.com.au">hello@primitiveai.com.au</a>
        </>
      }
    />
  );
}
