import type { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WhatBit — We figure out what's actually going on",
  description:
    "WhatBit is a small Australian problem-solving company — and the family of tools we've built along the way.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
