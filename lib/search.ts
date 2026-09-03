import { CATEGORIES, PLACES } from "./data";

export type SearchResult = {
  type: "place" | "category";
  title: string;
  subtitle: string;
  href: string;
};

type IndexEntry = SearchResult & { haystack: string };

function buildIndex(): IndexEntry[] {
  const categoryEntries: IndexEntry[] = CATEGORIES.map((c) => ({
    type: "category",
    title: c.name,
    subtitle: "Category",
    href: `/product/${c.slug}`,
    haystack: c.name.toLowerCase(),
  }));

  const placeEntries: IndexEntry[] = PLACES.map((p) => {
    const category = CATEGORIES.find((c) => c.slug === p.categorySlug);
    const title = p.country ? `${p.name}, ${p.country}` : p.name;
    const haystack = [p.name, p.country, category?.name, ...p.itinerary]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return {
      type: "place",
      title,
      subtitle: category?.name ?? "",
      href: `/product/${p.categorySlug}/${p.slug}`,
      haystack,
    };
  });

  return [...categoryEntries, ...placeEntries];
}

// Built once at module load — ~120 entries, negligible cost, no client fetch.
const INDEX = buildIndex();

/**
 * Case-insensitive substring match across place name, country, category and
 * itinerary stops. Titles the query matches at the start rank above matches
 * found only in a subtitle/itinerary term.
 */
export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const matches = INDEX.filter((entry) => entry.haystack.includes(q));

  matches.sort((a, b) => {
    const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
    const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
    return aStarts - bStarts;
  });

  return matches.slice(0, limit).map(
    ({ type, title, subtitle, href }): SearchResult => ({ type, title, subtitle, href }),
  );
}
