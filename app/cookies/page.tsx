import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";

export const metadata: Metadata = {
  title: "Cookies — WhatBit",
  description: "How to reach WhatBit about cookies. A cookies policy is not published yet.",
};

export default function Page() {
  return (
    <DocPage
      eyebrow="COOKIES"
      title="We haven’t published a cookies policy yet."
      blocks={[
        {
          text: "There was no cookies page in the design pack. If you have a question about cookies on this site, write to hello@whatbit.io.",
        },
      ]}
    />
  );
}
