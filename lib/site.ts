/**
 * Verified facts only — lifted from claude.md § Verified facts.
 * Anything not in that list is marked TODO(client) and must not ship.
 * Never add a founding year, award, client name, statistic or route/country
 * count here without written client confirmation.
 */

const DEFAULT_SITE_URL = "https://www.tourglobe.in";

/**
 * Canonical origin, used by metadataBase, canonicals, JSON-LD and the sitemap.
 *
 * This must NEVER be an invalid URL: `metadataBase: new URL(SITE_URL)` in the
 * root layout runs while Next collects page data, so a bad value fails the
 * whole build with `TypeError: Invalid URL`. A `??` fallback is not enough —
 * it only catches null/undefined, and an env var that exists but is blank
 * yields `""`, which is exactly what broke the Vercel deploy.
 *
 * So: blank or whitespace falls back, a bare host gains https://, and
 * anything still unparseable falls back rather than throwing.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export const COMPANY = {
  name: "Tourglobe",
  legalDescription:
    "Travel counselling and consultancy firm in Madurai, Tamil Nadu, operating worldwide — inbound, outbound and domestic.",
  // Confirmed: the tagline is set in the logo artwork and in the export's
  // footer. It is drawn in the logo, so don't repeat it as text beside one.
  tagline: "Buenas Memorias",
  address: {
    street: "7/826, GVN Complex, Theni Main Road, Opp. SVN College",
    locality: "Nagamalaipudukottai, Madurai",
    region: "Tamil Nadu",
    postalCode: "625 019",
    country: "IN",
  },
  geo: { lat: 9.9252, lng: 78.1198 },
  // Updated 2026-09-03 at the client's request — replaces the previous
  // ["+91 95000 78189", "+91 93334 93333"].
  phones: ["+91 93420 78189", "+91 95000 78189"],
  email: "info@tourglobe.in",
  website: "https://www.tourglobe.in",
  // WhatsApp click-to-chat number, digits only — client asked (2026-09-04)
  // for this to be the second phone number, not the first.
  whatsappNumber: "919500078189",
} as const;

export const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
  "Hello Tourglobe — I'd like help planning a trip.",
)}`;

/**
 * Tourindias.com URL inferred from its name. Vayoaura.com URL confirmed by
 * the client directly: https://vayoaura.com/
 * "Tour Rajasthan" (renamed from "Rajasthan Specialist" 2026-09-04) is a
 * specialization credential, not a linked site — TODO(client): confirm
 * whether it should link anywhere.
 *
 * `contact` is per-brand contact info for the footer's brand-contacts
 * section (added 2026-09-03). `null` where the client hasn't supplied it
 * yet — Footer.tsx skips rendering a contact row for those rather than
 * showing a placeholder.
 */
export const CO_BRANDS = [
  {
    name: "Tourindias.com",
    url: "https://www.tourindias.com",
    // TODO(client): contact name/phone not yet supplied.
    contact: null,
  },
  {
    name: "Vayoaura.com",
    url: "https://vayoaura.com/",
    contact: { name: "Manoj", phone: "+66 96-087-7457" },
  },
  {
    name: "Tour Rajasthan",
    url: "",
    // TODO(client): contact name/phone not yet supplied.
    contact: null,
  },
] as const;
