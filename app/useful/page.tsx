import type { Metadata } from "next";
import { UsefulHubPage } from "@/components/useful/UsefulHubPage";
import { SITE_URL } from "@/lib/site";

const TITLE = "The Useful Bit — WhatBit";
const DESCRIPTION =
  "Technology, translated into a better Tuesday. Plain-language, practical editorial from WhatBit — less tech, more sorted.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "WhatBit",
    "The Useful Bit",
    "small business technology",
    "practical AI advice",
    "business systems",
  ],
  alternates: { canonical: `${SITE_URL}/useful` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/useful`,
    siteName: "WhatBit",
    title: TITLE,
    description: "Technology, translated into a better Tuesday. Less tech. More sorted.",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Technology, translated into a better Tuesday. Less tech. More sorted.",
  },
};

export default function Page() {
  return <UsefulHubPage />;
}
