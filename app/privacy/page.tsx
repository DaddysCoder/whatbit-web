import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Privacy — WhatBit",
  description: "How to reach WhatBit about privacy. A full policy is not published yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="PRIVACY"
      title="We haven’t published a full privacy policy yet."
      blocks={[
        {
          text: "The design files linked here, but they didn’t include the policy copy. If you have a question about how WhatBit handles information, write to hello@whatbit.io.",
        },
      ]}
    />
  );
}
