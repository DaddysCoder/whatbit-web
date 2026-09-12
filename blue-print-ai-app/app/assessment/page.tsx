import type { Metadata } from "next";
import { Suspense } from "react";
import { AiBlueprintAssessmentPage } from "@/components/AiBlueprintAssessmentPage";

export const metadata: Metadata = {
  title: "Assessment — AI Blueprint by WhatBit",
  description: "Complete your AI Blueprint assessment — 15–20 minutes, save and resume any time.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AiBlueprintAssessmentPage />
    </Suspense>
  );
}
