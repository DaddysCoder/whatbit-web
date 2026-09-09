import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — WhatBit",
  description:
    "Contact WhatBit about digital services, products, partnerships, pilots or something else. Your message goes to an inbox checked by actual humans.",
};

export default function Page() {
  return <ContactPage />;
}
