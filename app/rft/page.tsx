import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "RFT by WhatBit",
  description: "Send WhatBit a request for tender, quote, or similar pack.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="RFT"
      title="Send us the pack."
      lede="If you have a request for tender, quote, or similar, send it through. We read it as a problem first."
      blocks={[
        {
          heading: "What to send",
          text: `Email the documents to ${CONTACT_EMAIL}. A short note on timeline, constraints, and what “good” looks like helps more than a long cover letter.`,
        },
        {
          heading: "What happens next",
          text: "We’ll tell you plainly whether we’re the right people to respond — and if we aren’t, we’ll say so early.",
        },
      ]}
      cta={{
        href: `${CONTACT_MAILTO}?subject=RFT`,
        label: "Email the pack",
      }}
    />
  );
}
