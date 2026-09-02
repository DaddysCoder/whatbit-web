import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/ai-blueprint/assessment", "/ai-blueprint/submitted", "/ai-blueprint/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
