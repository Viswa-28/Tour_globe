import type { MetadataRoute } from "next";
import { CATEGORIES, PLACES } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { RAJASTHAN_ITINERARIES, TOUR_RAJASTHAN } from "@/lib/rajasthan-itineraries";
import { CONTENT_UPDATED as D } from "@/lib/content-dates";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: D.home, changeFrequency: "monthly", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/product/${c.slug}`,
      lastModified: D.categories,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PLACES.map((p) => ({
      url: `${SITE_URL}/product/${p.categorySlug}/${p.slug}`,
      lastModified: D.places,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}${TOUR_RAJASTHAN.path}`,
      lastModified: D.tourRajasthan,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...RAJASTHAN_ITINERARIES.map((t) => ({
      url: `${SITE_URL}${TOUR_RAJASTHAN.path}/${t.slug}`,
      lastModified: D.tourRajasthan,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: D.privacy,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: D.terms,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
