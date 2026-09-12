import type { Metadata } from "next";
import { AdminAiBlueprintQueuePage } from "@/components/AdminAiBlueprintQueuePage";

export const metadata: Metadata = {
  title: "AI Blueprint queue — WhatBit Admin",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminAiBlueprintQueuePage />;
}
