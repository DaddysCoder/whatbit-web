import type { Metadata } from "next";
import { ArcPage } from "@/components/ArcPage";

export const metadata: Metadata = {
  title: "Arc by WhatBit — Clinical Practice Management",
  description:
    "Arc is being built as a secure clinical CRM and practice management platform for allied health, behaviour support and disability service organisations — connecting client information, clinical documentation, assessments, evidence, scheduling and compliance in one workspace.",
  openGraph: {
    title: "Arc — Clinical practice management, built around the work itself.",
    description:
      "In development: one connected workspace for client information, clinical documentation, assessments, evidence and multidisciplinary practice operations.",
  },
};

export default function Page() {
  return <ArcPage />;
}
