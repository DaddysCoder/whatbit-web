import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies — WhatBit",
  description: "A short placeholder on cookies. WhatBit has not published a cookies policy yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="COOKIES"
      title="A short note on cookies."
      lede="We haven’t published a cookies policy yet. This page is a placeholder until we do."
      blocks={[
        {
          text: "This site is a brochure. If we use cookies beyond what’s needed to run the pages, we’ll describe them here.",
        },
        {
          text: `Questions about cookies on this site go to ${CONTACT_EMAIL}.`,
        },
      ]}
    />
  );
}
