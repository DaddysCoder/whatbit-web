import type { Metadata } from "next";
import { FramePage } from "@/components/FramePage";

export const metadata: Metadata = {
  title: "Frame by WhatBit — Behaviour Support Evidence & Assessment",
  description:
    "Frame helps behaviour support practitioners record ABC episodes, gather structured screening, compare evidence, review uncertainty and generate practitioner documentation.",
  openGraph: {
    title: "Frame — Behaviour support evidence, from observation to hypothesis.",
    description:
      "Record observations, gather perspectives and compare the evidence without turning a hypothesis into a verdict.",
  },
};

export default function Page() {
  return <FramePage />;
}
