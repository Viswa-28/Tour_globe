import type { Place } from "./data";

/**
 * Card artwork for every programme, in one place so the client can audit it.
 *
 * ALL 45 FRAMES ARE AI-GENERATED PLACEHOLDERS and must be replaced with
 * licensed or client-owned photography before launch. Each set's README
 * states that "place names describe what each frame resembles, not a
 * verified location", so alt text here follows one rule:
 *
 *   `exact: true`   the frame depicts a landmark that is genuinely on this
 *                   programme's route, so the alt text may name it.
 *   `exact: false`  the frame is generic, or resembles somewhere other than
 *                   this programme. The alt text describes the scene and
 *                   names NO place, so nothing false is asserted.
 *
 * Approximate frames are also served under a place-neutral filename, because
 * the URL appears in the page source and would otherwise assert the very
 * place the alt text avoids naming. Their generated names are preserved in
 * `images/` and recorded in each `note` below.
 *
 * Swapping in real photography means changing `src`/`alt` here only.
 */

export type PlaceImage = {
  src: string;
  alt: string;
  /** False where the frame does not verifiably depict this destination. */
  exact: boolean;
  /** Why an approximate frame was chosen, or what to replace it with. */
  note?: string;
};

const D = "/images/destinations";

export const PLACE_IMAGES: Record<string, PlaceImage> = {
  // ——————————————————————— Cultural Tourism ———————————————————————
  "cultural-tourism/rome": {
    src: `${D}/colosseum-rome-italy.jpg`,
    alt: "The Colosseum in Rome, Italy",
    exact: true,
  },
  "cultural-tourism/budapest": {
    src: `${D}/parliament-budapest-hungary.jpg`,
    alt: "The Hungarian Parliament Building on the Danube, Budapest",
    exact: true,
  },
  "cultural-tourism/new-york": {
    src: `${D}/statue-of-liberty-new-york-usa.jpg`,
    alt: "The Statue of Liberty, New York",
    exact: true,
  },
  "cultural-tourism/beijing": {
    src: `${D}/great-wall-of-china.jpg`,
    alt: "The Great Wall of China running along a forested ridge",
    exact: true,
  },
  "cultural-tourism/hanoi": {
    src: `${D}/ha-long-bay-vietnam.jpg`,
    alt: "Limestone karsts rising out of Ha Long Bay, Vietnam",
    exact: true,
    note: "Ha Long Bay is the overnight cruise on this route.",
  },
  "cultural-tourism/varanasi": {
    src: `${D}/varanasi-ghats-india.jpg`,
    alt: "Steps and riverfront buildings along the ghats at Varanasi, India",
    exact: true,
  },
  "cultural-tourism/marrakesh": {
    src: `${D}/koutoubia-marrakech-morocco.jpg`,
    alt: "The Koutoubia Mosque minaret in Marrakesh, Morocco",
    exact: true,
  },
  "cultural-tourism/cairo": {
    src: `${D}/pyramids-sphinx-giza-egypt.jpg`,
    alt: "The Great Sphinx with the pyramids of Giza behind it, Egypt",
    exact: true,
  },
  "cultural-tourism/kyoto": {
    src: `${D}/pagoda-below-a-volcano-japan.jpg`,
    alt: "A pagoda on a hillside with a snow-capped volcano beyond, Japan",
    exact: false,
    note: "Frame resembles Chureito Pagoda and Mount Fuji — ~350km from Kyoto and not on this Osaka/Nara/Kyoto route. Regenerate as a Kyoto or Nara subject.",
  },

  // ——————————————————————— Pilgrimage & Divine ———————————————————————
  // README sensitivity note: these are active places of worship, not
  // scenery. A synthetic image of a sacred site reads worse than a synthetic
  // landscape. Bodh Gaya, Puri, Lhasa and Assisi are called out by name as
  // needing licensed photography and client confirmation before launch.
  "pilgrimage-divine/gaya": {
    src: `${D}/mahabodhi-temple-bodh-gaya-india.jpg`,
    alt: "The Mahabodhi temple at Bodh Gaya, India",
    exact: true,
    note: "Sacred site — README requires licensed photography and client confirmation before launch.",
  },
  "pilgrimage-divine/puri": {
    src: `${D}/jagannath-temple-puri-india.jpg`,
    alt: "The Jagannath temple at Puri, India",
    exact: true,
    note: "Sacred site — README requires licensed photography and client confirmation before launch.",
  },
  "pilgrimage-divine/lhasa": {
    src: `${D}/potala-palace-lhasa-tibet.jpg`,
    alt: "The Potala Palace above Lhasa, Tibet",
    exact: true,
    note: "Sacred site — README requires licensed photography and client confirmation before launch.",
  },
  "pilgrimage-divine/hampi": {
    src: `${D}/vittala-temple-hampi-india.jpg`,
    alt: "The Vittala temple complex at Hampi, India",
    exact: true,
  },
  "pilgrimage-divine/assisi": {
    src: `${D}/basilica-of-saint-francis-assisi-italy.jpg`,
    alt: "The Basilica of Saint Francis at Assisi, Italy",
    exact: true,
    note: "Sacred site — README requires licensed photography and client confirmation before launch.",
  },
  "pilgrimage-divine/angkor-watt": {
    src: `${D}/angkor-wat-siem-reap-cambodia.jpg`,
    alt: "Angkor Wat reflected in its moat at sunrise, Cambodia",
    exact: true,
  },
  "pilgrimage-divine/mt-nebo": {
    src: `${D}/al-khazneh-petra-jordan.jpg`,
    alt: "Al-Khazneh, the rock-cut Treasury at Petra, Jordan",
    exact: true,
    note: "Petra is on this Aqaba/Wadi Rum/Petra/Nebo route.",
  },
  "pilgrimage-divine/camino-de-santiago": {
    src: `${D}/camino-de-santiago-spain.jpg`,
    alt: "A waymarked pilgrim path through open country on the Camino de Santiago, Spain",
    exact: true,
  },
  "pilgrimage-divine/madurai": {
    src: `${D}/dravidian-temple-tank-tamil-nadu.jpg`,
    alt: "A Dravidian temple gopuram rising above its water tank",
    exact: false,
    note: "README: deliberately generic — resembles a Tamil temple with a tank but matches no identifiable one. Replace with a Meenakshi Amman frame.",
  },

  // ——————————————————————— Beaches & water front ———————————————————————
  "beaches-water-front/malta": {
    src: `${D}/valletta-harbour-malta.jpg`,
    alt: "The fortified stone harbour at Valletta, Malta",
    exact: true,
  },
  "beaches-water-front/bodrum": {
    src: `${D}/bodrum-marina-turkey.jpg`,
    alt: "Yachts moored in the marina at Bodrum, Turkey",
    exact: true,
  },
  "beaches-water-front/seychelles": {
    src: `${D}/anse-source-dargent-la-digue-seychelles.jpg`,
    alt: "Granite boulders on the shore at Anse Source d'Argent, La Digue, Seychelles",
    exact: true,
  },
  "beaches-water-front/maldives": {
    src: `${D}/overwater-villas-maldives.jpg`,
    alt: "Overwater villas on a turquoise lagoon, Maldives",
    exact: true,
  },
  "beaches-water-front/thailand": {
    src: `${D}/maya-bay-phi-phi-thailand.jpg`,
    alt: "Longtail boats moored below limestone cliffs at Maya Bay, Thailand",
    exact: true,
  },
  "beaches-water-front/bondi-and-gold-coast": {
    src: `${D}/gold-coast-surfers-paradise-australia.jpg`,
    alt: "Surf breaking along the beach at Surfers Paradise on the Gold Coast, Australia",
    exact: true,
  },
  "beaches-water-front/elafonisi": {
    src: `${D}/pink-sand-beach-shallow-water.jpg`,
    alt: "Pink-tinged sand meeting clear shallow water",
    exact: false,
    note: "Frame resembles Bermuda. Chosen because Elafonisi is itself a pink-sand beach; alt names no place.",
  },
  "beaches-water-front/florida-and-miami": {
    src: `${D}/city-beach-with-high-rises.jpg`,
    alt: "A wide city beach backed by high-rise buildings",
    exact: false,
    note: "Frame resembles Copacabana, Rio. Stands in for a Miami city-beach view; alt names no place.",
  },
  "beaches-water-front/havelock": {
    src: `${D}/secluded-cove-white-sand-beach.jpg`,
    alt: "A secluded white-sand cove fringed by forest",
    exact: false,
    note: "README: deliberately unnamed, matches no specific beach.",
  },

  // ——————————————————————— Hill stations ———————————————————————
  "hill-stations/innsbruck": {
    src: `${D}/innsbruck-old-town-austria.jpg`,
    alt: "The coloured facades of Innsbruck's old town below the Alps, Austria",
    exact: true,
  },
  "hill-stations/pokhara": {
    src: `${D}/phewa-lake-pokhara-nepal.jpg`,
    alt: "Wooden boats on Phewa Lake below the Annapurna range, Nepal",
    exact: true,
  },
  "hill-stations/leh": {
    src: `${D}/thiksey-monastery-ladakh-india.jpg`,
    alt: "Thiksey monastery rising in tiers above the Indus valley, Ladakh",
    exact: true,
  },
  "hill-stations/karuizawa": {
    src: `${D}/autumn-teahouse-japan.jpg`,
    alt: "A wooden teahouse among autumn maples, Japan",
    exact: false,
    note: "README: generic, not a real named teahouse. Country is right, building is not identifiable.",
  },
  "hill-stations/interlaken": {
    src: `${D}/alpine-lake-below-snowcapped-peaks.jpg`,
    alt: "An alpine lake below snow-capped peaks",
    exact: false,
    note: "Frame resembles Zell am See, Austria. Interlaken sits between two lakes, so the scene fits; alt names no place.",
  },
  "hill-stations/fairbanks": {
    src: `${D}/cabin-beneath-the-northern-lights.jpg`,
    alt: "A cabin beneath the northern lights",
    exact: false,
    note: "Frame resembles Lapland. Fairbanks is an aurora destination, so the subject fits; alt names no place.",
  },
  "hill-stations/darjeeling": {
    src: `${D}/narrow-gauge-mountain-railway.jpg`,
    alt: "A narrow-gauge mountain railway climbing through hill country",
    exact: false,
    note: "Frame resembles the Nilgiri railway at Ooty. Darjeeling has its own hill railway; alt names no place.",
  },
  "hill-stations/manali": {
    src: `${D}/snowbound-alpine-village.jpg`,
    alt: "A snowbound mountain village under heavy cloud",
    exact: false,
    note: "README: deliberately unnamed, matches no specific place.",
  },
  "hill-stations/nuwara-eliya": {
    src: `${D}/tea-terraces-in-morning-mist.jpg`,
    alt: "Tea terraces stepping down a hillside under morning mist",
    exact: false,
    note: "Frame resembles Munnar. Nuwara Eliya is also tea country; alt names no place.",
  },

  // ——————————————————————— Wild life ———————————————————————
  // README: animal identification is reliable, park attribution is not.
  // "Bandhavgarh" and "Yala" are explicitly called plausible-but-unverifiable.
  "wild-life/kenya": {
    src: `${D}/lion-at-sunrise-masai-mara-kenya.jpg`,
    alt: "A lion at sunrise on the open grassland of the Masai Mara, Kenya",
    exact: true,
    note: "Masai Mara is on this route.",
  },
  "wild-life/botswana-and-zimbabwe": {
    src: `${D}/mokoro-canoe-okavango-delta-botswana.jpg`,
    alt: "A mokoro canoe poled through the reed channels of the Okavango Delta, Botswana",
    exact: true,
    note: "Okavango Delta is on this route.",
  },
  "wild-life/kaziranga": {
    src: `${D}/one-horned-rhino-kaziranga-india.jpg`,
    alt: "A one-horned rhinoceros in the grasslands of Kaziranga, India",
    exact: true,
    note: "README confirms this attribution is safe — one-horned rhino only occurs at Kaziranga/Chitwan.",
  },
  "wild-life/serengeti": {
    src: `${D}/elephants-savannah-snowcapped-peak.jpg`,
    alt: "Elephants crossing open savannah below a distant snow-capped peak",
    exact: false,
    note: "Frame resembles Amboseli, Kenya rather than Tanzania. Alt names no place.",
  },
  "wild-life/erindi": {
    src: `${D}/elephants-waterhole-safari-lodge.jpg`,
    alt: "Elephants gathered at a waterhole below a safari lodge",
    exact: false,
    note: "README: deliberately unnamed. Erindi is known for waterhole game viewing, so the subject fits.",
  },
  "wild-life/kruger": {
    src: `${D}/leopard-resting-in-a-tree.jpg`,
    alt: "A leopard resting along a horizontal tree branch",
    exact: false,
    note: "README: 'Yala' is unverifiable — park name dropped. Leopards occur at Kruger, so the subject fits.",
  },
  "wild-life/ranthambore": {
    src: `${D}/bengal-tiger-on-a-forest-track.jpg`,
    alt: "A Bengal tiger walking along a forest track at dawn",
    exact: false,
    note: "README: 'Bandhavgarh' is unverifiable — park name dropped. Animal ID is reliable.",
  },
  "wild-life/corbett": {
    src: `${D}/asian-elephant-forest-trail.jpg`,
    alt: "An Asian elephant on a forest trail",
    exact: false,
    note: "README: deliberately unnamed. Corbett has resident elephants, so the subject fits.",
  },
  "wild-life/masinagudi": {
    src: `${D}/indian-gaur-safari-jeep.jpg`,
    alt: "Indian gaur seen from a safari jeep",
    exact: false,
    note: "README: deliberately unnamed. Gaur are resident around Masinagudi and Bandipur.",
  },
};

export function getPlaceImage(place: Place): PlaceImage | undefined {
  return PLACE_IMAGES[`${place.categorySlug}/${place.slug}`];
}

/** Frames still needing a verified replacement — surfaced in the build log. */
export function approximateImageCount(): number {
  return Object.values(PLACE_IMAGES).filter((i) => !i.exact).length;
}
