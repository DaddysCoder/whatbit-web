import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — WhatBit",
  description: "A short placeholder on privacy. WhatBit has not published a full policy yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="PRIVACY"
      title="A short note, not a policy."
      lede="We haven’t published a full privacy policy yet. This page is a placeholder until we do."
      blocks={[
        {
          text: "If you write to us, we use your contact details to reply. We don’t sell personal information.",
        },
        {
          text: `When a full policy exists, it will live here. Until then, questions about how WhatBit handles information go to ${CONTACT_EMAIL}.`,
        },
      ]}
    />
  );
}
