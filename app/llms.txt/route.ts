import { CATEGORIES, PLACES, formatDuration } from "@/lib/data";
import { RAJASTHAN_ITINERARIES, TOUR_RAJASTHAN } from "@/lib/rajasthan-itineraries";
import { COMPANY, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-Markdown summary of the site for AI assistants and
 * AI search (llmstxt.org convention), added 2026-10-08 for GEO.
 *
 * Built from the same data as the pages, so it cannot drift from them.
 * Company facts are ONLY the Verified Facts in claude.md (via lib/site.ts):
 * no founding year, no "over two decades" (scope unconfirmed), no counts.
 */
export function GET() {
  const a = COMPANY.address;
  const lines = [
    `# ${COMPANY.name}`,
    "",
    `> ${COMPANY.name} is a travel counselling and consultancy firm in Madurai, Tamil Nadu, India, planning inbound, outbound and domestic journeys worldwide. Counsellors start from why someone is travelling, then build the trip around it.`,
    "",
    "## Contact",
    "",
    `- Address: ${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, India`,
    `- Phone: ${COMPANY.phones.join(", ")}`,
    `- WhatsApp: +${COMPANY.whatsappNumber}`,
    `- Email: ${COMPANY.email}`,
    `- Enquiries: ${SITE_URL}/#enquire — no payment is needed to get a plan; a counsellor replies within one working day.`,
    "",
    "## Services",
    "",
    "- Tours: outbound, incoming and domestic",
    "- MICE (meetings, incentives, conferences and events)",
    "- Events",
    "- Vehicle rentals",
    "- Destination weddings",
    "- Concept holidays",
    "",
    "## Travel themes",
    "",
    ...CATEGORIES.map((c) => `- [${c.name}](${SITE_URL}/product/${c.slug})`),
    "",
    `## ${TOUR_RAJASTHAN.name} itineraries`,
    "",
    `Tourglobe's Rajasthan specialization. Enquiries go through Tourglobe.`,
    "",
    ...RAJASTHAN_ITINERARIES.map(
      (t) =>
        `- [${t.name}](${SITE_URL}${TOUR_RAJASTHAN.path}/${t.slug}): ${formatDuration(t.nights, t.days)} — ${t.route.join(", ")}`,
    ),
    "",
    "## Destination programmes",
    "",
    ...CATEGORIES.flatMap((c) => {
      const places = PLACES.filter((p) => p.categorySlug === c.slug);
      if (!places.length) return [];
      return [
        `### ${c.name}`,
        "",
        ...places.map(
          (p) =>
            `- [${p.country ? `${p.name}, ${p.country}` : p.name}](${SITE_URL}/product/${p.categorySlug}/${p.slug}): ${formatDuration(p.nights, p.days)}`,
        ),
        "",
      ];
    }),
    "## Optional",
    "",
    `- [Privacy Policy](${SITE_URL}/privacy)`,
    `- [Terms of Use](${SITE_URL}/terms)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
