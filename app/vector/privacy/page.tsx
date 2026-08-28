import type { Metadata } from "next";
import { VectorDocPage } from "@/components/VectorDocPage";
import { VECTOR_PRIVACY_BLOCKS, VECTOR_PRIVACY_METADATA } from "@/lib/vector-legal-content";

export const metadata: Metadata = {
  title: VECTOR_PRIVACY_METADATA.title,
  description: VECTOR_PRIVACY_METADATA.description,
};

export default function Page() {
  return (
    <VectorDocPage
      eyebrow={VECTOR_PRIVACY_METADATA.eyebrow}
      title={VECTOR_PRIVACY_METADATA.titleText}
      lede={VECTOR_PRIVACY_METADATA.lede}
      blocks={VECTOR_PRIVACY_BLOCKS}
    />
  );
}
