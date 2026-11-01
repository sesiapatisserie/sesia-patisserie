import type { MetadataRoute } from "next";
import { categories } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/creations", priority: 0.9, changeFrequency: "monthly" as const },
    ...categories.map((category) => ({ path: category.href, priority: 0.9, changeFrequency: "monthly" as const })),
    { path: "/commander", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/a-propos", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
