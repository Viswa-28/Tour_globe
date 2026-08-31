/**
 * Local content layer, shaped 1:1 with the Sanity schemas in /sanity/schemas.
 * When the Sanity project is connected, replace these exports with GROQ
 * fetches at build time — component props stay identical.
 *
 * FACT STATUS
 * - CATEGORIES, SERVICES, COMMITMENTS: verbatim from the client's design
 *   export (`Tourglobe Hero.dc.html`). Do not reword.
 * - PLACES: verbatim from the client's product catalogue (2026-08-22).
 *   Destination, country, itinerary stops and duration are exactly as
 *   supplied. No descriptions have been written for them — the client has
 *   not supplied any, and claude.md forbids inventing them.
 * - Client spellings preserved deliberately: "Archeology", "Angkor Watt",
 *   "Katmandu", "Gold coast", "Siesta beach". Flagged, not corrected.
 * - `descriptor` / `intro` on each category are OUR copy, written only
 *   because the category pages need an intro line. TODO(client).
 */

export type Category = {
  name: string;
  slug: string;
  descriptor: string; // TODO(client)
  intro: string; // TODO(client) — 25–35 words
  order: number;
};

export type Place = {
  /** Destination as the client wrote it, e.g. "Kyoto", "Botswana & Zimbabwe". */
  name: string;
  slug: string;
  /** Omitted where the destination is itself the country (Malta, Seychelles). */
  country?: string;
  /** The stops the client listed for this programme. May be empty. */
  itinerary: string[];
  nights: number;
  days: number;
  categorySlug: string;
};
// Card artwork lives in lib/place-images.ts, keyed by
// `${categorySlug}/${slug}`, so every frame and its alt text can be audited
// in one file.

/**
 * Provenance for every destination photograph currently in the repo.
 * claude.md makes recording this a legal requirement, and requires real
 * photography before launch.
 *
 * Supplied by the client 2026-08-22 as five sets — cultural, beaches, hill
 * stations, wildlife and pilgrimage — 45 frames in total. Every README
 * states: 1024x683, AI-generated, upscaled 2x from ~500px source tiles, soft
 * above ~600px display width, place names describe what each frame
 * *resembles* rather than a verified location, and "replace with licensed or
 * client-owned photography before launch".
 */
export const DESTINATION_IMAGE_PROVENANCE = {
  imageSource: "AI-generated placeholder set supplied by the client",
  imageLicence:
    "TODO(client) — placeholder only. Replace with licensed or client-owned photography before launch.",
  maxDisplayWidth: 600,
} as const;

export type Service = {
  name: string;
  order: number;
};

/** "05 Nights / 06 Days" — the format claude.md specifies. */
export function formatDuration(nights: number, days: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(nights)} Nights / ${pad(days)} Days`;
}

/**
 * 11 themes. Based on the export's "Aspiration & focus" grid, with three
 * client changes since:
 *
 * - "Pilgrimage Tourism" → "Pilgrimage & Divine", matching the product
 *   catalogue heading (2026-08-24).
 * - "Wellness" and "Yoga" merged into "Wellness & Yoga" (2026-08-24).
 * - "Wild life" added — not in the approved export grid, but the catalogue
 *   lists nine wildlife programmes that need somewhere to live.
 *
 * Still 11 themes plus "& Much more", so the homepage grid stays a clean
 * 3 x 4 with no orphan cell.
 *
 * TODO(client): the catalogue writes "Beaches & Waterfront" where the export
 * says "Beaches & water front". The export wording stands until confirmed.
 */
export const CATEGORIES: Category[] = [
  {
    name: "Cultural Tourism",
    slug: "cultural-tourism",
    descriptor: "Living traditions, arts and everyday life",
    intro:
      "Journeys built around how people actually live — temple towns, craft villages, music seasons and food streets — planned with the depth a guidebook skims past.",
    order: 1,
  },
  {
    // Renamed from the export's "Pilgrimage Tourism" to match the client's
    // product catalogue heading (confirmed 2026-08-24).
    name: "Pilgrimage & Divine",
    slug: "pilgrimage-divine",
    descriptor: "Sacred routes and places of devotion",
    intro:
      "Pilgrimages planned with care for ritual, timing and rest — whether a family darshan circuit or a longer route walked over several days.",
    order: 2,
  },
  {
    name: "Culinary Hotspots",
    slug: "culinary-hotspots",
    descriptor: "Regions understood through what they eat",
    intro:
      "Markets, home kitchens, harvests and old restaurants — itineraries for travellers who plan their days around meals rather than the other way round.",
    order: 3,
  },
  {
    name: "Beaches & water front",
    slug: "beaches-water-front",
    descriptor: "Coasts, islands and the water beside them",
    intro:
      "Coastal and island time planned around what matters there — the right shore for the season, and the right stretch of it for you.",
    order: 4,
  },
  {
    name: "Hill stations",
    slug: "hill-stations",
    descriptor: "High ground, cool air and long views",
    intro:
      "Hill towns and mountain roads, paced for altitude and weather, with stays chosen for the view you actually wake up to.",
    order: 5,
  },
  {
    name: "Architectural significance",
    slug: "architectural-significance",
    descriptor: "Buildings worth crossing a country for",
    intro:
      "Palaces, forts, places of worship and modern landmarks — sequenced so each building explains something about the one before it.",
    order: 6,
  },
  {
    name: "Rock cut caves & Temples",
    slug: "rock-cut-caves-and-temples",
    descriptor: "Sanctuaries carved out of living stone",
    intro:
      "Cave sanctuaries and monolithic temples cut directly from rock — visited with the light and the timings that make the carving readable.",
    order: 7,
  },
  {
    // "Wellness" and "Yoga" were separate themes in the export; merged at the
    // client's request (2026-08-24).
    name: "Wellness & Yoga",
    slug: "wellness-yoga",
    descriptor: "Rest, practice and time to recover",
    intro:
      "Retreats, treatment stays and practice-led travel — schools, teachers and programmes checked before you commit, at a pace that leaves room for the rest of the country.",
    order: 8,
  },
  {
    // TODO(client): proposed rename to "Astronomy & Sacred Sciences" is NOT
    // yet approved — the export's name stands until it is.
    name: "Astrology & Natural Science",
    slug: "astrology-natural-science",
    descriptor: "Observatories, dark skies and old ways of reading them",
    intro:
      "Historic observatories, dark-sky country and traditions of reading the heavens — for travellers curious about how cultures made sense of the sky.",
    order: 9,
  },
  {
    // Client spelling. claude.md flags "Archeology" → "Archaeology".
    name: "History & Archeology",
    slug: "history-archeology",
    descriptor: "Ruins, excavations and ancient cities",
    intro:
      "For travellers drawn to what the ground remembers — excavated cities, rock-cut monuments and museum collections — sequenced so each site builds on the last.",
    order: 10,
  },
  {
    name: "Wild life",
    slug: "wild-life",
    descriptor: "Parks, reserves and the animals that live in them",
    intro:
      "Safaris and reserve stays timed to the season and the sightings, with drives planned across zones and days rather than left to one lucky morning.",
    order: 11,
  },
];

/** The 8 services from the export's "What we handle" grid, in order. */
export const SERVICES: Service[] = [
  { name: "Tours — Outbound", order: 1 },
  { name: "Tours — Incoming", order: 2 },
  { name: "Tours — Domestic", order: 3 },
  { name: "MICE", order: 4 },
  { name: "Events", order: 5 },
  { name: "Vehicle Rentals", order: 6 },
  { name: "Destination Weddings", order: 7 },
  { name: "Concept Holidays", order: 8 },
];

/** The 7 commitments from the export's "Paramount importance" list. */
export const COMMITMENTS: string[] = [
  "Quality products",
  "Top notch services",
  "Best facilities",
  "Ceaseless customer service at all times",
  "Standout branding",
  "Memories to our passengers & guests",
  "All smiles to our financiers, board & partners",
];

/**
 * The client's product catalogue — 45 programmes across 5 themes
 * (2026-08-22), plus culinary, wellness & yoga, history, and rock-cut
 * programmes supplied 2026-08-31.
 * "Research-based, tailor-made tourist's interests, designed by different
 * connoisseurs."
 */
export const PLACES: Place[] = [
  // ——— Cultural Tourism ———
  {
    name: "Kyoto",
    slug: "kyoto",
    country: "Japan",
    itinerary: ["Osaka", "Nara", "Kyoto"],
    nights: 5,
    days: 6,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Rome",
    slug: "rome",
    country: "Italy",
    itinerary: ["Rome", "Vatican"],
    nights: 4,
    days: 5,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Budapest",
    slug: "budapest",
    country: "Hungary",
    itinerary: [],
    nights: 4,
    days: 5,
    categorySlug: "cultural-tourism",
  },
  {
    name: "New York",
    slug: "new-york",
    country: "USA",
    itinerary: ["New York", "Niagara"],
    nights: 5,
    days: 6,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Beijing",
    slug: "beijing",
    country: "China",
    itinerary: ["Beijing", "Shanghai"],
    nights: 5,
    days: 6,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Hanoi",
    slug: "hanoi",
    country: "Vietnam",
    itinerary: ["Hanoi", "Overnight Cruise"],
    nights: 4,
    days: 5,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Varanasi",
    slug: "varanasi",
    country: "India",
    itinerary: ["Kasi", "Prayagraj"],
    nights: 4,
    days: 5,
    categorySlug: "cultural-tourism",
  },
  {
    // The export renders this card as Marrakesh / Morocco; the catalogue
    // heading is just "Morocco". Following the export.
    name: "Marrakesh",
    slug: "marrakesh",
    country: "Morocco",
    itinerary: ["Marrakesh", "Agadir"],
    nights: 4,
    days: 5,
    categorySlug: "cultural-tourism",
  },
  {
    name: "Cairo",
    slug: "cairo",
    country: "Egypt",
    itinerary: [],
    nights: 3,
    days: 4,
    categorySlug: "cultural-tourism",
  },

  // ——— Beaches & water front ———
  {
    name: "Malta",
    slug: "malta",
    itinerary: [],
    nights: 4,
    days: 5,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Elafonisi",
    slug: "elafonisi",
    country: "Greece",
    itinerary: ["Crete", "Elafonisi"],
    nights: 4,
    days: 5,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Bodrum",
    slug: "bodrum",
    country: "Turkey",
    itinerary: [],
    nights: 3,
    days: 4,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Seychelles",
    slug: "seychelles",
    itinerary: [],
    nights: 3,
    days: 4,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Maldives",
    slug: "maldives",
    itinerary: [],
    nights: 4,
    days: 5,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Florida & Miami",
    slug: "florida-and-miami",
    country: "USA",
    itinerary: ["Siesta beach", "Miami"],
    nights: 5,
    days: 6,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Thailand",
    slug: "thailand",
    itinerary: ["Phuket", "Krabi"],
    nights: 4,
    days: 5,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Bondi & Gold coast",
    slug: "bondi-and-gold-coast",
    country: "Australia",
    itinerary: ["Brisbane", "Sydney"],
    nights: 5,
    days: 6,
    categorySlug: "beaches-water-front",
  },
  {
    name: "Havelock",
    slug: "havelock",
    country: "Andaman & Nicobar",
    itinerary: [],
    nights: 4,
    days: 5,
    categorySlug: "beaches-water-front",
  },

  // ——— Hill stations ———
  {
    name: "Interlaken",
    slug: "interlaken",
    country: "Switzerland",
    itinerary: ["Lucerne", "Interlaken"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Fairbanks",
    slug: "fairbanks",
    country: "USA",
    itinerary: [],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Innsbruck",
    slug: "innsbruck",
    country: "Austria",
    itinerary: ["Innsbruck", "Vienna"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Pokhara",
    slug: "pokhara",
    country: "Nepal",
    itinerary: ["Katmandu", "Pokhara"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Darjeeling",
    slug: "darjeeling",
    country: "India",
    itinerary: ["Sikkim", "Gangtok"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Manali",
    slug: "manali",
    country: "India",
    itinerary: ["Shimla", "Kullu", "Manali"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Leh",
    slug: "leh",
    country: "India",
    itinerary: ["Leh", "Ladakh"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },
  {
    name: "Karuizawa",
    slug: "karuizawa",
    country: "Japan",
    itinerary: ["Hakone", "Karuizawa", "Tokyo"],
    nights: 5,
    days: 6,
    categorySlug: "hill-stations",
  },
  {
    // TODO(client): country not given in the catalogue.
    name: "Nuwara Eliya",
    slug: "nuwara-eliya",
    itinerary: ["Kandy", "Nuwara Eliya"],
    nights: 4,
    days: 5,
    categorySlug: "hill-stations",
  },

  // ——— Wild life ———
  {
    name: "Kenya",
    slug: "kenya",
    itinerary: ["Lake Nakuru", "Masai Mara", "Nairobi"],
    nights: 4,
    days: 5,
    categorySlug: "wild-life",
  },
  {
    name: "Serengeti",
    slug: "serengeti",
    country: "Tanzania",
    itinerary: ["Ngorongoro", "Arusha", "Serengeti"],
    nights: 5,
    days: 6,
    categorySlug: "wild-life",
  },
  {
    name: "Erindi",
    slug: "erindi",
    country: "Namibia",
    itinerary: ["Windhoek", "Erindi"],
    nights: 4,
    days: 5,
    categorySlug: "wild-life",
  },
  {
    name: "Kruger",
    slug: "kruger",
    country: "South Africa",
    itinerary: ["Johannesburg", "Kruger"],
    nights: 4,
    days: 5,
    categorySlug: "wild-life",
  },
  {
    name: "Botswana & Zimbabwe",
    slug: "botswana-and-zimbabwe",
    itinerary: [
      "Victoria Falls",
      "Chobe NP",
      "Okavango Delta",
      "Moremi GR",
      "Maun",
    ],
    nights: 6,
    days: 7,
    categorySlug: "wild-life",
  },
  {
    name: "Ranthambore",
    slug: "ranthambore",
    country: "India",
    itinerary: ["Jaipur", "Ranthambore National Park"],
    nights: 3,
    days: 4,
    categorySlug: "wild-life",
  },
  {
    name: "Kaziranga",
    slug: "kaziranga",
    country: "India",
    itinerary: ["Shillong", "Kaziranga"],
    nights: 4,
    days: 5,
    categorySlug: "wild-life",
  },
  {
    name: "Corbett",
    slug: "corbett",
    country: "India",
    itinerary: ["Nainital", "Ranikhet", "Corbett"],
    nights: 5,
    days: 6,
    categorySlug: "wild-life",
  },
  {
    name: "Masinagudi",
    slug: "masinagudi",
    country: "India",
    itinerary: ["Bandipur", "Mysore", "Masinagudi", "Ooty"],
    nights: 5,
    days: 6,
    categorySlug: "wild-life",
  },

  // ——— Pilgrimage Tourism (catalogue: "Pilgrimage & Divine") ———
  {
    name: "Gaya",
    slug: "gaya",
    country: "India",
    itinerary: ["Gaya", "Rajgir", "Nalanda"],
    nights: 3,
    days: 4,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Puri",
    slug: "puri",
    country: "India",
    itinerary: ["Bhubaneswar", "Puri"],
    nights: 3,
    days: 4,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Lhasa",
    slug: "lhasa",
    country: "Tibet",
    itinerary: ["Everest Base camp", "Manasarovar", "Lhasa"],
    nights: 4,
    days: 5,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Hampi",
    slug: "hampi",
    country: "India",
    itinerary: ["Mangalore", "Udupi", "Badami caves", "Hampi"],
    nights: 6,
    days: 7,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Madurai",
    slug: "madurai",
    country: "India",
    itinerary: ["Rameswaram", "Kanyakumari", "Madurai"],
    nights: 5,
    days: 6,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Assisi",
    slug: "assisi",
    country: "Italy",
    itinerary: ["Rome", "Assisi"],
    nights: 5,
    days: 6,
    categorySlug: "pilgrimage-divine",
  },
  {
    // Client spelling "Angkor Watt" (conventionally "Angkor Wat").
    name: "Angkor Watt",
    slug: "angkor-watt",
    country: "Cambodia",
    itinerary: ["Siem Reap", "Angkor Thom", "Ta Prohm", "Angkor watt"],
    nights: 4,
    days: 5,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Mt. Nebo",
    slug: "mt-nebo",
    country: "Jordan",
    itinerary: ["Aqaba", "Wadi Rum", "Petra", "Nebo"],
    nights: 4,
    days: 5,
    categorySlug: "pilgrimage-divine",
  },
  {
    name: "Camino de Santiago",
    slug: "camino-de-santiago",
    country: "Spain",
    itinerary: ["Madrid", "Santiago"],
    nights: 5,
    days: 6,
    categorySlug: "pilgrimage-divine",
  },

  // ——— Culinary Hotspots (2026-08-31) ———
  {
    name: "Tokyo",
    slug: "tokyo",
    country: "Japan",
    itinerary: ["Tokyo", "Tsukiji", "Mount Fuji"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Paris",
    slug: "paris",
    country: "France",
    itinerary: ["Paris", "Versailles", "French cuisine"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Rome & Tuscany",
    slug: "rome-and-tuscany",
    country: "Italy",
    itinerary: ["Rome", "Florence", "Tuscany"],
    nights: 5,
    days: 6,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Bangkok",
    slug: "bangkok",
    country: "Thailand",
    itinerary: ["Bangkok", "Ayutthaya", "Thai cuisine"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Istanbul",
    slug: "istanbul",
    country: "Turkey",
    itinerary: ["Istanbul", "Bosphorus", "Turkish cuisine"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "Spain",
    itinerary: ["Barcelona", "Catalonia", "Mediterranean cuisine"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Marrakech",
    slug: "marrakech",
    country: "Morocco",
    itinerary: ["Marrakech", "souks", "Moroccan cuisine"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Hanoi",
    slug: "hanoi",
    country: "Vietnam",
    itinerary: ["Hanoi", "street food", "Halong Bay"],
    nights: 4,
    days: 5,
    categorySlug: "culinary-hotspots",
  },
  {
    name: "Kerala",
    slug: "kerala",
    country: "India",
    itinerary: ["Kochi", "Alleppey", "traditional Kerala cuisine"],
    nights: 5,
    days: 6,
    categorySlug: "culinary-hotspots",
  },

  // ——— Wellness & Yoga (2026-08-31) ———
  {
    name: "Rishikesh",
    slug: "rishikesh",
    country: "India",
    itinerary: ["Yoga", "Ganga", "Himalayan retreat"],
    nights: 4,
    days: 5,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Bali",
    slug: "bali",
    country: "Indonesia",
    itinerary: ["Ubud", "wellness retreats", "meditation"],
    nights: 5,
    days: 6,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Kerala",
    slug: "kerala",
    country: "India",
    itinerary: ["Ayurveda", "backwaters", "holistic wellness"],
    nights: 5,
    days: 6,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Ubud",
    slug: "ubud",
    country: "Indonesia",
    itinerary: ["Yoga", "meditation", "jungle retreats"],
    nights: 4,
    days: 5,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Chiang Mai",
    slug: "chiang-mai",
    country: "Thailand",
    itinerary: ["Meditation", "temples", "wellness retreats"],
    nights: 4,
    days: 5,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Bhutan",
    slug: "bhutan",
    itinerary: ["Thimphu", "Paro", "Himalayan mindfulness"],
    nights: 5,
    days: 6,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    itinerary: ["Kandy", "Ayurveda", "coastal wellness"],
    nights: 5,
    days: 6,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Pokhara",
    slug: "pokhara",
    country: "Nepal",
    itinerary: ["Yoga", "meditation", "Himalayan landscapes"],
    nights: 4,
    days: 5,
    categorySlug: "wellness-yoga",
  },
  {
    name: "Sedona",
    slug: "sedona",
    country: "USA",
    itinerary: ["Red rocks", "meditation", "wellness retreats"],
    nights: 4,
    days: 5,
    categorySlug: "wellness-yoga",
  },

  // ——— History & Archeology (2026-08-31) ———
  {
    name: "Petra",
    slug: "petra",
    country: "Jordan",
    itinerary: ["Petra", "Wadi Rum", "Jerash"],
    nights: 4,
    days: 5,
    categorySlug: "history-archeology",
  },
  {
    name: "Rome",
    slug: "rome",
    country: "Italy",
    itinerary: ["Colosseum", "Roman Forum", "Pompeii"],
    nights: 4,
    days: 5,
    categorySlug: "history-archeology",
  },
  {
    name: "Egypt",
    slug: "egypt",
    itinerary: ["Cairo", "Giza", "Luxor", "Valley of the Kings"],
    nights: 5,
    days: 6,
    categorySlug: "history-archeology",
  },
  {
    name: "Athens & Delphi",
    slug: "athens-and-delphi",
    country: "Greece",
    itinerary: ["Acropolis", "Delphi", "Ancient Athens"],
    nights: 4,
    days: 5,
    categorySlug: "history-archeology",
  },
  {
    name: "Istanbul & Cappadocia",
    slug: "istanbul-and-cappadocia",
    country: "Turkey",
    itinerary: ["Hagia Sophia", "Ephesus", "Cappadocia"],
    nights: 5,
    days: 6,
    categorySlug: "history-archeology",
  },
  {
    name: "Angkor",
    slug: "angkor",
    country: "Cambodia",
    itinerary: ["Angkor Wat", "Angkor Thom", "Ta Prohm"],
    nights: 4,
    days: 5,
    categorySlug: "history-archeology",
  },
  {
    name: "Machu Picchu",
    slug: "machu-picchu",
    country: "Peru",
    itinerary: ["Cusco", "Sacred Valley", "Machu Picchu"],
    nights: 5,
    days: 6,
    categorySlug: "history-archeology",
  },
  {
    name: "Hampi",
    slug: "hampi",
    country: "India",
    itinerary: ["Vijayanagara ruins", "temples", "ancient monuments"],
    nights: 4,
    days: 5,
    categorySlug: "history-archeology",
  },
  {
    name: "Mohenjo-daro & Taxila",
    slug: "mohenjo-daro-and-taxila",
    country: "Pakistan",
    itinerary: ["Indus Valley", "Gandharan archaeological heritage"],
    nights: 5,
    days: 6,
    categorySlug: "history-archeology",
  },

  // ——— Rock cut caves & Temples (2026-08-31) ———
  {
    name: "Ajanta & Ellora",
    slug: "ajanta-and-ellora",
    country: "India",
    itinerary: ["Aurangabad", "Ajanta", "Ellora Caves"],
    nights: 4,
    days: 5,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Elephanta Caves",
    slug: "elephanta-caves",
    country: "India",
    itinerary: ["Mumbai", "Elephanta"],
    nights: 3,
    days: 4,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Mahabalipuram",
    slug: "mahabalipuram",
    country: "India",
    itinerary: ["Chennai", "Mahabalipuram"],
    nights: 3,
    days: 4,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Badami",
    slug: "badami",
    country: "India",
    itinerary: ["Badami", "Aihole", "Pattadakal"],
    nights: 4,
    days: 5,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Dambulla",
    slug: "dambulla",
    country: "Sri Lanka",
    itinerary: ["Dambulla", "Sigiriya", "Kandy"],
    nights: 4,
    days: 5,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Petra",
    slug: "petra",
    country: "Jordan",
    itinerary: ["Petra", "Little Petra", "Wadi Rum"],
    nights: 4,
    days: 5,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Abu Simbel & Luxor",
    slug: "abu-simbel-and-luxor",
    country: "Egypt",
    itinerary: ["Abu Simbel", "Luxor", "Valley of the Kings"],
    nights: 5,
    days: 6,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Longmen Grottoes",
    slug: "longmen-grottoes",
    country: "China",
    itinerary: ["Luoyang", "Longmen", "Shaolin"],
    nights: 5,
    days: 6,
    categorySlug: "rock-cut-caves-and-temples",
  },
  {
    name: "Cappadocia",
    slug: "cappadocia",
    country: "Turkey",
    itinerary: ["Göreme", "underground cities", "cave churches"],
    nights: 4,
    days: 5,
    categorySlug: "rock-cut-caves-and-temples",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getPlacesForCategory(slug: string): Place[] {
  return PLACES.filter((p) => p.categorySlug === slug);
}

export function getPlace(categorySlug: string, placeSlug: string) {
  return PLACES.find(
    (p) => p.categorySlug === categorySlug && p.slug === placeSlug,
  );
}
