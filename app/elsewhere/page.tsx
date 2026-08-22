import type { Metadata } from "next";
import { ElsewherePage } from "@/components/ElsewherePage";

export const metadata: Metadata = {
  title: "The Elsewhere Department — WhatBit",
  description:
    "Where WhatBit builds, benchmarks and evaluates agentic AI — before any of it gets near a real product.",
};

export default function Page() {
  return <ElsewherePage />;
}
