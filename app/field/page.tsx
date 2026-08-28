import type { Metadata } from "next";
import { FieldPage } from "@/components/FieldPage";

export const metadata: Metadata = {
  title: "Field by WhatBit — Personalised, Evidence-Based Strategies",
  description:
    "Field helps behaviour support practitioners personalise evidence-based strategies for a participant in minutes, with the mechanism and citation always shown alongside the draft.",
  openGraph: {
    title: "Field — Evidence-based strategies, personalised in under a minute.",
    description:
      "Pick a strategy from an authored, citable library. Field holds the mechanism fixed and personalises only the delivery.",
  },
};

export default function Page() {
  return <FieldPage />;
}
