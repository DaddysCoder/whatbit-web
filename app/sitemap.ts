import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  "/",
  "/about",
  "/contact",
  "/digital-services",
  "/ai-blueprint",
  "/ai-blueprint/privacy",
  "/ai-blueprint/terms",
  "/arc",
  "/elsewhere",
  "/field",
  "/frame",
  "/orbit",
  "/pace",
  "/rft",
  "/trace",
  "/vector",
  "/vector/privacy",
  "/vector/terms",
  "/voda",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
