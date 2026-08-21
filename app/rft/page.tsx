import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "RFT by WhatBit",
  description: "Send WhatBit a request for tender, quote, or similar pack.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="RFT"
      title="Send us the pack."
      lede="If you have a request for tender, quote, or similar, we read it as a problem first."
      blocks={[
        {
          text: "There isn’t a longer RFT brief on this site yet — the design files only linked here. Email the documents to hello@whatbit.io. We’ll tell you plainly whether we’re the right people to respond.",
        },
      ]}
    />
  );
}
