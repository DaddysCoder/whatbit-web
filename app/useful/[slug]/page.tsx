import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/useful/ArticleLayout";
import { getUsefulArticle, USEFUL_ARTICLES } from "@/lib/useful";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return USEFUL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getUsefulArticle(slug);
  if (!article) return {};
  const url = `${SITE_URL}/useful/${article.slug}`;
  const title = `${article.title} — The Useful Bit`;
  return {
    title,
    description: article.dek,
    keywords: [article.outcome, article.format, "WhatBit", "The Useful Bit", ...article.title.split(" ")],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "WhatBit",
      title: article.title,
      description: article.dek,
      images: [{ url: article.heroImage, alt: article.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images: [article.heroImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getUsefulArticle(slug);
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    image: `${SITE_URL}${article.heroImage}`,
    url: `${SITE_URL}/useful/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "WhatBit",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleLayout article={article} />
    </>
  );
}
