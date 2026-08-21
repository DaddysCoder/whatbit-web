import { notFound } from "next/navigation";
import { WaitlistPage } from "@/components/WaitlistPage";
import { WAITLIST_PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return WAITLIST_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = WAITLIST_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} by WhatBit`,
    description: product.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = WAITLIST_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();
  return <WaitlistPage product={product} />;
}
