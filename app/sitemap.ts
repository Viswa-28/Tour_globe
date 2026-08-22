import type { MetadataRoute } from "next";
import { CATEGORIES, PLACES } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/product/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PLACES.map((p) => ({
      url: `${SITE_URL}/product/${p.categorySlug}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
