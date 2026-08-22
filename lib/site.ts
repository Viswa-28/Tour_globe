/**
 * Verified facts only — lifted from claude.md § Verified facts.
 * Anything not in that list is marked TODO(client) and must not ship.
 * Never add a founding year, award, client name, statistic or route/country
 * count here without written client confirmation.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tourglobe.in";

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
  phones: ["+91 95000 78189", "+91 93334 93333"],
  email: "info@tourglobe.in",
  website: "https://www.tourglobe.in",
  // WhatsApp click-to-chat uses the first phone number, digits only.
  whatsappNumber: "919500078189",
} as const;

export const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
  "Hello Tourglobe — I'd like help planning a trip.",
)}`;

/**
 * Names are verified (export + claude.md). URLs are inferred from the two
 * names that are domains; Zerospacekreativ has none.
 * TODO(client): confirm all three URLs.
 */
export const CO_BRANDS = [
  { name: "Tourindias.com", url: "https://www.tourindias.com" },
  { name: "Pathfinders.in", url: "https://www.pathfinders.in" },
  { name: "Zerospacekreativ", url: "" },
] as const;
