import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Per-page Open Graph block.
 *
 * Next.js replaces — does not merge — the root layout's `openGraph` when a
 * page sets its own, so a page that only passed `{ title, description }`
 * silently lost og:url, og:site_name and og:type. Every page that sets
 * openGraph goes through this so none of those go missing again.
 *
 * The share image is app/opengraph-image.png. Next's file convention only
 * attaches it to pages that don't set their own openGraph, so it is listed
 * explicitly here too (verified in the build output 2026-10-06).
 */
export function pageOpenGraph(
  path: string,
  title: string,
  description: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: "Tourglobe",
    url: `${SITE_URL}${path}`,
    title,
    description,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  };
}
