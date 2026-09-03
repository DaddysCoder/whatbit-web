import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About WhatBit — Australian Research, Technology & Problem-Solving",
  description:
    "WhatBit is an Australian research, technology and problem-solving company. Meet the team and the thinking behind our products, client work and research.",
  openGraph: {
    title: "About WhatBit",
    description:
      "We find the bit that actually matters. How WhatBit works, what we build, and the people behind it.",
  },
};

export default function Page() {
  return <AboutPage />;
}
