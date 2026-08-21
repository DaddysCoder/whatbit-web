import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Terms — WhatBit",
  description: "How to reach WhatBit about terms. Full terms are not published yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="TERMS"
      title="We haven’t published full terms yet."
      blocks={[
        {
          text: "The design files linked here, but they didn’t include the terms copy. For anything you’d normally find in terms and conditions, write to hello@whatbit.io.",
        },
      ]}
    />
  );
}
