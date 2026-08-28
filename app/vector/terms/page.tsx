import type { Metadata } from "next";
import { VectorDocPage } from "@/components/VectorDocPage";
import { VECTOR_TERMS_BLOCKS, VECTOR_TERMS_METADATA } from "@/lib/vector-legal-content";

export const metadata: Metadata = {
  title: VECTOR_TERMS_METADATA.title,
  description: VECTOR_TERMS_METADATA.description,
};

export default function Page() {
  return (
    <VectorDocPage
      eyebrow={VECTOR_TERMS_METADATA.eyebrow}
      title={VECTOR_TERMS_METADATA.titleText}
      lede={VECTOR_TERMS_METADATA.lede}
      blocks={VECTOR_TERMS_BLOCKS}
    />
  );
}
