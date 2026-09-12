import type { Metadata } from "next";
import { AdminAiBlueprintReviewPage } from "@/components/AdminAiBlueprintReviewPage";

export const metadata: Metadata = {
  title: "Review assessment — WhatBit Admin",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminAiBlueprintReviewPage id={id} />;
}
