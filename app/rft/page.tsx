import type { Metadata } from "next";
import { RftPage } from "@/components/RftPage";

export const metadata: Metadata = {
  title: "RFT — Recursive Field Theory — WhatBit",
  description:
    "A framework for compressing information without losing the trail that got you there.",
};

export default function Page() {
  return <RftPage />;
}
