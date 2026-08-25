import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Proof & Path",
    template: "%s · Proof & Path",
  },
  description:
    "A calmer way to sort out a purchase problem. Organise what happened, gather evidence, prepare a clear request, and track what comes next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={sourceSans3.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
