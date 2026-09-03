import type { Metadata } from "next";
import { UsefulHubPage } from "@/components/useful/UsefulHubPage";

export const metadata: Metadata = {
  title: "The Useful Bit — WhatBit",
  description:
    "Technology, translated into a better Tuesday. Plain-language, practical editorial from WhatBit — less tech, more sorted.",
  openGraph: {
    title: "The Useful Bit — WhatBit",
    description: "Technology, translated into a better Tuesday. Less tech. More sorted.",
  },
};

export default function Page() {
  return <UsefulHubPage />;
}
