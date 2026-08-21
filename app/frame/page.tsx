import type { Metadata } from "next";
import { FramePage } from "@/components/FramePage";

export const metadata: Metadata = {
  title: "Frame by WhatBit",
  description:
    "A behaviour-support workspace — the structure around how you see a person, not a generic form.",
};

export default function Page() {
  return <FramePage />;
}
