import type { Metadata } from "next";
import { VodaPage } from "@/components/VodaPage";
import { VODA_PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: "VODA by WhatBit",
  description: VODA_PRODUCT.description,
};

export default function Page() {
  return <VodaPage />;
}
