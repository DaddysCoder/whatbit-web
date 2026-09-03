import type { Metadata } from "next";
import { DigitalServicesPage } from "@/components/DigitalServicesPage";

export const metadata: Metadata = {
  title: "Digital Services — WhatBit",
  description:
    "Digital services for information people actually need to use. Websites, digital tools, accessible content and engagement systems from WhatBit.",
  openGraph: {
    title: "Digital Services — WhatBit",
    description:
      "Websites, digital products, accessible content and engagement systems designed around what people actually need to use.",
  },
};

export default function Page() {
  return <DigitalServicesPage />;
}
