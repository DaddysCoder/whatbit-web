import type { Metadata } from "next";
import { AiBlueprintPage } from "@/components/AiBlueprintPage";

export const metadata: Metadata = {
  title: "AI Blueprint by WhatBit — know how your business actually uses AI",
  description:
    "A 15-minute assessment, a human-reviewed AI readiness report, and a 9-document toolkit. Founding Client offer: A$495, 5 spots only.",
};

export default function Page() {
  return <AiBlueprintPage />;
}
