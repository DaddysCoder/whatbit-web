import type { Metadata } from "next";
import { ProofAndPathPage } from "@/components/ProofAndPathPage";

export const metadata: Metadata = {
  title: "Proof & Path by WhatBit",
  description:
    "Organise what happened, gather useful evidence, prepare a clear request and keep track of what comes next.",
};

export default function Page() {
  return <ProofAndPathPage />;
}
