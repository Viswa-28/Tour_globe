/**
 * When each part of the site's CONTENT last meaningfully changed — feeds
 * <lastmod> in sitemap.xml.
 *
 * Deliberately hand-maintained, not the build time: a lastmod that changes
 * on every deploy is a lie Google learns to ignore. Bump the relevant date
 * when that section's copy, itineraries or structure actually changes.
 */
export const CONTENT_UPDATED = {
  home: "2026-10-08",
  categories: "2026-10-08",
  // Unique destination descriptions added (lib/place-descriptions.ts).
  places: "2026-10-06",
  // Photos, airport-only wording, Tourglobe contact (client feedback).
  tourRajasthan: "2026-10-08",
  privacy: "2026-10-08",
  terms: "2026-10-06",
} as const;
