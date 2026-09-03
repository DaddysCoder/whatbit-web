import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/useful/ArticleLayout";
import { getUsefulArticle, USEFUL_ARTICLES } from "@/lib/useful";

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
  return {
    title: `${article.title} — The Useful Bit`,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getUsefulArticle(slug);
  if (!article) {
    notFound();
  }
  return <ArticleLayout article={article} />;
}
