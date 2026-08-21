import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Terms — WhatBit",
  description: "A short placeholder on terms. WhatBit has not published full terms yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="TERMS"
      title="A short note, not terms and conditions."
      lede="We haven’t published full terms yet. This page is a placeholder until we do."
      blocks={[
        {
          text: "This site describes WhatBit and its products. Pages marked in development are exactly that — not an offer of a finished product.",
        },
        {
          text: "For anything you’d normally find in terms and conditions, write to hello@whatbit.io.",
        },
      ]}
    />
  );
}
