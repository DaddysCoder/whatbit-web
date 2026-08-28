import type { Metadata } from "next";
import { Suspense } from "react";
import { VectorPage } from "@/components/VectorPage";

export const metadata: Metadata = {
  title: "Vector by WhatBit — professional forms without the paperwork",
  description:
    "Referral, practitioner triage and consultation records — structured, usable and ready when you need them. Free to use online; Vector unlocks exports, branding and templates.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VectorPage />
    </Suspense>
  );
}
