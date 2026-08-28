import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { AI_BLUEPRINT_ACCENT } from "@/lib/ai-blueprint-legal";
import { AI_BLUEPRINT_TERMS_BLOCKS, AI_BLUEPRINT_TERMS_METADATA } from "@/lib/ai-blueprint-legal-content";

export const metadata: Metadata = {
  title: AI_BLUEPRINT_TERMS_METADATA.title,
  description: AI_BLUEPRINT_TERMS_METADATA.description,
};

export default function Page() {
  return (
    <DocPage
      eyebrow={AI_BLUEPRINT_TERMS_METADATA.eyebrow}
      title={AI_BLUEPRINT_TERMS_METADATA.titleText}
      lede={AI_BLUEPRINT_TERMS_METADATA.lede}
      blocks={AI_BLUEPRINT_TERMS_BLOCKS}
      accent={AI_BLUEPRINT_ACCENT}
    />
  );
}
