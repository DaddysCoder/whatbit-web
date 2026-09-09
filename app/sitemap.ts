import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { USEFUL_ARTICLES } from "@/lib/useful";

const PUBLIC_ROUTES = [
  "",
  "/digital-services",
  "/pace",
  "/trace",
  "/frame",
  "/vector",
  "/field",
  "/arc",
  "/ai-blueprint",
  "/voda",
  "/about",
  "/rft",
  "/useful",
  "/elsewhere",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal/ndis-disclaimer",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = PUBLIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const usefulArticles = USEFUL_ARTICLES.map((article) => ({
    url: `${SITE_URL}/useful/${article.slug}`,
  }));

  return [...staticPages, ...usefulArticles];
}
