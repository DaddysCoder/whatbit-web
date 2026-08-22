import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — WhatBit",
  description:
    "No contact form gatekeeper, no chatbot pretending to be a person. Just an inbox, checked by actual humans.",
};

export default function Page() {
  return <ContactPage />;
}
