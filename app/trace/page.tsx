import type { Metadata } from "next";
import { TracePage } from "@/components/TracePage";

export const metadata: Metadata = {
  title: "Trace by WhatBit — behaviour-support budget & pacing",
  description:
    "Free behaviour-support budget and pacing calculator with optional Trace Pro downloadable reports and document exports.",
};

export default function Page() {
  return <TracePage />;
}
