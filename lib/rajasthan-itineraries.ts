import { COMPANY } from "@/lib/site";

/**
 * Tour Rajasthan itineraries — the "Tour Rajasthan" brand in Our brands
 * (lib/site.ts CO_BRANDS), contact Mr. Krishnamurthy, Jaipur.
 *
 * Source: rajasthanitineraries.zip (8 .docx files, supplied 2026-10-05).
 * All eight are published (the client asked for all eight, 2026-10-05).
 * The source files were edited as follows:
 * - "08 Days Rajasthan Tour.docx": its heading says "08 Nights – 09 Days"
 *   but it lists 8 days, so it is published as 07 Nights / 08 Days.
 * - "08 Days Rajasthan Tour with Khatu Salasar.docx" had no title; one was
 *   written from its route. Its day 1 says "night stay at own arranged" —
 *   TODO(client): confirm who arranges the Paota night.
 * - Fixed dates ("19 Jan", "20 Dec", "Feb") replaced with day numbers.
 * - Railway-station pickups and drops removed; airport only (client,
 *   2026-10-08).
 * - A third-party operator's signature block (name, phones, emails,
 *   websites) removed from the 07 Days Pushkar file. It must never ship.
 * - Its "Vehicle cost includes" list is NOT carried over: inclusions are
 *   unconfirmed for Tour Rajasthan. TODO(client): confirm inclusions.
 * - "The only Brahma Temple in the world" (one file) → "one of the few", as
 *   the other files say.
 * - Long prose condensed to the site's copy voice; the short operator-note
 *   files expanded into the same structure. No sight, drive time or
 *   overnight was added that the source does not state.
 *
 * No prices in the source, so none here — every tour is "enquire for a plan".
 */

export type ItineraryDay = {
  title: string;
  /** Drive time / distance exactly as the source gives it, if it does. */
  drive?: string;
  text: string;
  /** Where the night is spent; omitted on the departure day. */
  overnight?: string;
};

export type RajasthanItinerary = {
  slug: string;
  name: string;
  nights: number;
  days: number;
  /** Route in travel order, for cards, the "At a glance" panel and JSON-LD. */
  route: string[];
  /** One-line summary for cards and the page intro. */
  summary: string;
  /** ≤48 chars — the root layout appends " | Tourglobe" (≤60 total). */
  metaTitle: string;
  /** ≤155 chars. */
  metaDescription: string;
  image: TourImage;
  itinerary: ItineraryDay[];
};

/**
 * Tour photographs, 1500x1000 JPG crops (2x display) in
 * public/images/rajasthan/. All from Wikimedia Commons under CC BY-SA 4.0,
 * licence checked per file (2026-10-08), as claude.md § Images allows.
 * CC BY-SA requires a visible credit wherever the photo is shown — the
 * itinerary page captions it and the landing page lists every credit.
 * A dunes photo whose author asks to be contacted before commercial use
 * was rejected for that reason.
 */
export type TourImage = {
  src: string;
  alt: string;
  author: string;
  licence: string;
  licenceUrl: string;
  /** Commons file page — the attribution link. */
  source: string;
};

const BY_SA = {
  licence: "CC BY-SA 4.0",
  licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

const IMG = {
  udaipur: {
    src: "/images/rajasthan/udaipur-lake-pichola.jpg",
    alt: "Sunset over Lake Pichola in Udaipur, with the Lake Palace on the water",
    author: "UnpetitproleX",
    source: "https://commons.wikimedia.org/wiki/File:Lake_Pichola_at_sunset,_Udaipur,_Rajasthan,_India.jpg",
    ...BY_SA,
  },
  pushkar: {
    src: "/images/rajasthan/pushkar-ghats.jpg",
    alt: "Pilgrims on the stone ghats beside Pushkar Lake",
    author: "Jakub Hałun",
    source: "https://commons.wikimedia.org/wiki/File:20191214_Ghats_in_Pushkar_1713_8593.jpg",
    ...BY_SA,
  },
  jaisalmer: {
    src: "/images/rajasthan/jaisalmer-fort.jpg",
    alt: "The golden sandstone bastions of Jaisalmer Fort",
    author: "Clément Bardot",
    source: "https://commons.wikimedia.org/wiki/File:Jaisalmer_Fort,_India.jpg",
    ...BY_SA,
  },
  dunes: {
    src: "/images/rajasthan/sam-sand-dunes.jpg",
    alt: "Wind-rippled sand dunes in the Thar Desert",
    author: "Clément Bardot",
    source: "https://commons.wikimedia.org/wiki/File:Dunes,_D%C3%A9sert_du_Thar.jpg",
    ...BY_SA,
  },
  chittorgarh: {
    src: "/images/rajasthan/chittorgarh-fort.jpg",
    alt: "A carved stone temple framed by an archway inside Chittorgarh Fort",
    author: "Navneet Sharma",
    source: "https://commons.wikimedia.org/wiki/File:Shiva_Temple_Chittaurgarh_Fort.jpg",
    ...BY_SA,
  },
  jodhpur: {
    src: "/images/rajasthan/jodhpur-mehrangarh.jpg",
    alt: "Carved sandstone palaces inside Mehrangarh Fort, Jodhpur",
    author: "Jakub Hałun",
    source: "https://commons.wikimedia.org/wiki/File:20191210_Mehrangarh_Fort,_Jodhpur_1016_7834.jpg",
    ...BY_SA,
  },
  bikaner: {
    src: "/images/rajasthan/bikaner-junagarh.jpg",
    alt: "A red sandstone arcade at Junagarh Fort, Bikaner",
    author: "Jakub Hałun",
    source: "https://commons.wikimedia.org/wiki/File:20191212_Junagarh_Fort,_Bikaner,_India_1524_8206.jpg",
    ...BY_SA,
  },
  jaipur: {
    src: "/images/rajasthan/jaipur-amber-fort.jpg",
    alt: "The courtyard and palace walls of Amber Fort, Jaipur, below the Aravalli hills",
    author: "Jakub Hałun",
    source: "https://commons.wikimedia.org/wiki/File:Amber_Fort,_Jaipur,_20191219_1011_9509.jpg",
    ...BY_SA,
  },
} satisfies Record<string, TourImage>;

/**
 * All enquiries are routed through Tourglobe (client, 2026-10-08): the
 * call and WhatsApp buttons on every /tour-rajasthan page use Tourglobe's
 * numbers (COMPANY in lib/site.ts). The Jaipur channel partner's number
 * (Mr. Krishnamurthy) appears only in the footer's brand contacts, from
 * CO_BRANDS in lib/site.ts — never on these pages (client, 2026-10-08).
 */
export const TOUR_RAJASTHAN = {
  name: "Tour Rajasthan",
  path: "/tour-rajasthan",
} as const;

/** WhatsApp click-to-chat to Tourglobe, with a tour-specific message. */
export function tourWhatsAppUrl(message: string) {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const RAJASTHAN_ITINERARIES: RajasthanItinerary[] = [
  {
    slug: "jaipur-pushkar-jodhpur-udaipur-6-days",
    name: "Rajasthan Heritage Journey",
    nights: 5,
    days: 6,
    route: ["Jaipur", "Ajmer", "Pushkar", "Jodhpur", "Nathdwara", "Udaipur"],
    summary:
      "The Pink City, the Blue City and the City of Lakes, with Ajmer, Pushkar and Nathdwara on the way.",
    metaTitle: "06 Days Rajasthan Tour: Jaipur, Jodhpur, Udaipur",
    metaDescription:
      "5 nights / 6 days through Jaipur, Ajmer, Pushkar, Jodhpur, Nathdwara and Udaipur. A Tour Rajasthan itinerary, planned with Tourglobe.",
    image: IMG.udaipur,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Met at Jaipur airport and transferred to your hotel. Time permitting, an easy first look at the city: Patrika Gate, Birla Temple, Albert Hall Museum, and the bazaars around Bapu and Johari Bazaar for textiles, jewellery and handicrafts.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur sightseeing",
        text: "Amber Fort and its Sheesh Mahal (Mirror Palace), with an optional jeep or elephant ride up the ramparts. A stop at Jal Mahal on Man Sagar Lake, then the City Palace, Jantar Mantar (UNESCO World Heritage Site) and Hawa Mahal at sunset. Evening free — Chokhi Dhani's folk performances are an option.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Ajmer – Pushkar – Jodhpur",
        drive: "Approx. 6–7 hrs",
        text: "In Ajmer, the Dargah Sharif of Khwaja Moinuddin Chishti. In Pushkar, the sacred lake and the Brahma Temple, one of the few temples dedicated to Lord Brahma. On to Jodhpur, the Blue City.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Nathdwara – Udaipur",
        drive: "Approx. 6 hrs",
        text: "Morning at Mehrangarh Fort and the marble cenotaph of Jaswant Thada, past the old blue houses. Shrinathji Temple at Nathdwara, then through the Aravalli hills to Udaipur for a sunset boat ride on Lake Pichola, with the City Palace and Jag Mandir in view.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur sightseeing",
        text: "The City Palace complex, with views over Lake Pichola and the Lake Palace. Jagdish Temple and Saheliyon ki Bari, the Garden of Maidens. Afternoon in the old city lanes among miniature-art and silver shops; dinner by the lake.",
        overnight: "Udaipur",
      },
      {
        title: "Departure from Udaipur",
        text: "After breakfast, drop off at Udaipur airport for your onward journey.",
      },
    ],
  },
  {
    slug: "jaipur-jodhpur-udaipur-pushkar-7-days",
    name: "Jaipur, Jodhpur, Udaipur & Pushkar",
    nights: 6,
    days: 7,
    route: ["Jaipur", "Jodhpur", "Nathdwara", "Udaipur", "Chittorgarh", "Ajmer", "Pushkar"],
    summary:
      "A loop from Jaipur through Jodhpur and Udaipur, returning via Chittorgarh Fort, Ajmer and Pushkar.",
    metaTitle: "07 Days Rajasthan Tour with Udaipur & Pushkar",
    metaDescription:
      "6 nights / 7 days: Jaipur, Jodhpur, Nathdwara, Udaipur, Chittorgarh, Ajmer and Pushkar, returning to Jaipur. A Tour Rajasthan itinerary.",
    image: IMG.pushkar,
    itinerary: [
      {
        title: "Arrival & Jaipur city sights",
        text: "Pickup from Jaipur airport and transfer to your hotel. Then Patrika Gate, Birla Temple, Albert Hall Museum, Hawa Mahal, the City Palace, Jantar Mantar and Govind Dev Ji Temple.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur forts & palaces",
        text: "Panna Meena Stepwell, Amer Fort, Elephant Village (optional elephant ride), Jal Mahal and Jaigarh Fort, ending at Nahargarh Fort for the sunset view. Free time for shopping.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Jodhpur",
        drive: "6–7 hrs",
        text: "Drive to Jodhpur. Mehrangarh Fort, Jaswant Thada and Umaid Bhawan Palace, with the evening in Jodhpur's market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Nathdwara – Udaipur",
        drive: "6–7 hrs",
        text: "Shreenath Ji Temple and the Statue of Belief at Nathdwara on the way. In Udaipur, Saheliyon ki Bari, Fateh Sagar Lake and the Vintage Car Museum.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur sightseeing",
        text: "The City Palace, Jagdish Temple, a boat ride on Lake Pichola to Jag Mandir, and Bagore ki Haveli.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur – Chittorgarh – Ajmer – Pushkar",
        text: "Sanwariya Seth Temple and Chittorgarh Fort, then Ajmer Dargah and Ana Sagar Lake, arriving at Pushkar for the lake and the Brahma Temple.",
        overnight: "Pushkar",
      },
      {
        title: "Pushkar – Jaipur departure",
        text: "Drive back to Jaipur, with time in the market before drop off at Jaipur airport.",
      },
    ],
  },
  {
    slug: "jaipur-bikaner-jaisalmer-jodhpur-7-days",
    name: "Desert Rajasthan",
    nights: 6,
    days: 7,
    route: ["Jaipur", "Bikaner", "Jaisalmer", "Sam", "Jodhpur"],
    summary:
      "West into the Thar: Bikaner, the golden fort of Jaisalmer, a night in a desert camp at Sam, and Jodhpur.",
    metaTitle: "07 Days Rajasthan Desert Tour with Jaisalmer",
    metaDescription:
      "6 nights / 7 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp and Jodhpur, returning to Jaipur. A Tour Rajasthan itinerary.",
    image: IMG.jaisalmer,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Met on arrival and transferred to your hotel. The City Palace, Jantar Mantar and a photo stop at Hawa Mahal; evening in Johari or Bapu Bazaar, with Chokhi Dhani's folk performance as an option.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur heritage trail",
        text: "Amber Fort above Maota Lake, with an optional jeep or elephant ride to the entrance. Jaigarh Fort, known for its giant cannon, Nahargarh Fort's views over the city, and the Albert Hall Museum.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Bikaner",
        drive: "Approx. 335 km / 6 hrs",
        text: "Through semi-arid country and desert villages to Bikaner. Afternoon at Junagarh Fort; the Karni Mata Temple at Deshnok is an option.",
        overnight: "Bikaner",
      },
      {
        title: "Bikaner – Jaisalmer",
        drive: "Approx. 330 km / 5–6 hrs",
        text: "West to the Golden City, past dunes and desert villages. Sunset walk around Gadisar Lake and its carved temples and shrines.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer & Sam Sand Dunes",
        text: "Jaisalmer Fort, one of the few living forts in the world, then Patwon Ki Haveli and Salim Singh Ki Haveli. Afternoon to the Sam Sand Dunes, about 40 km out, for a sunset camel safari, folk music and dance, and dinner at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jodhpur",
        drive: "Approx. 280 km / 5 hrs",
        text: "To the Blue City. Mehrangarh Fort — the Moti Mahal, Phool Mahal and armoury — and Jaswant Thada. Evening at the Clock Tower Market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Jaipur departure",
        drive: "Approx. 340 km / 6 hrs",
        text: "Drive back to Jaipur, with stops on the way, for drop off at Jaipur airport.",
      },
    ],
  },
  {
    slug: "jaipur-bikaner-jaisalmer-jodhpur-pushkar-8-days",
    name: "Rajasthan Heritage Trail",
    nights: 7,
    days: 8,
    route: ["Jaipur", "Bikaner", "Jaisalmer", "Sam", "Jodhpur", "Pushkar"],
    summary:
      "The desert circuit at an easier pace, ending with a quiet night by the lake in Pushkar.",
    metaTitle: "08 Days Rajasthan Tour: Desert & Pushkar",
    metaDescription:
      "7 nights / 8 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp, Jodhpur and Pushkar, returning to Jaipur. A Tour Rajasthan itinerary.",
    image: IMG.dunes,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "A traditional welcome and help with your hotel check-in. Afternoon at the City Palace and Jantar Mantar, a photo stop at Hawa Mahal, and an evening in Johari or Bapu Bazaar.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur forts",
        text: "Amber Fort above Maota Lake and its Sheesh Mahal, with an optional jeep or elephant ride up. Then Jaigarh Fort, known for its giant cannon, and Nahargarh Fort's panorama of the city.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Bikaner",
        drive: "Approx. 335 km / 6 hrs",
        text: "To Bikaner, the desert city of camel culture. Junagarh Fort, then the Karni Mata Temple at Deshnok before evening.",
        overnight: "Bikaner",
      },
      {
        title: "Bikaner – Jaisalmer",
        drive: "Approx. 330 km / 6 hrs",
        text: "Across the Thar to the Golden City. Time in the bazaars or a sunset walk around Gadisar Lake.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer – Sam Sand Dunes",
        drive: "Approx. 45 km / 1 hr",
        text: "Jaisalmer Fort, a living fort, and the havelis of Patwon, Nathmal and Salim Singh. Afternoon to Sam for a sunset camel ride, then folk dance, music and dinner by the bonfire at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jodhpur",
        drive: "Approx. 300 km / 5 hrs",
        text: "Desert sunrise, then on to the Blue City. Mehrangarh Fort, Jaswant Thada and a drive past Umaid Bhawan Palace; the Clock Tower Market for spices and handicrafts.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Pushkar",
        drive: "Approx. 185 km / 4 hrs",
        text: "Pushkar Lake and the Brahma Temple, one of the few dedicated to Lord Brahma. Evening in the bazaars and along the ghats.",
        overnight: "Pushkar",
      },
      {
        title: "Pushkar – Jaipur departure",
        drive: "Approx. 150 km / 3 hrs",
        text: "A slow morning by the lake, then back to Jaipur for drop off at Jaipur airport.",
      },
    ],
  },
  {
    slug: "jaipur-khatu-jaisalmer-udaipur-pushkar-8-days",
    name: "Rajasthan with Khatu Shyam Ji",
    nights: 7,
    days: 8,
    route: ["Jaipur", "Khatu", "Jaisalmer", "Sam", "Jodhpur", "Udaipur", "Chittorgarh", "Pushkar"],
    summary:
      "Darshan at Khatu Shyam Ji, then the full circle: Jaisalmer, the dunes, Jodhpur, Udaipur, Chittorgarh and Pushkar.",
    metaTitle: "08 Days Rajasthan Tour with Khatu Shyam Ji",
    metaDescription:
      "7 nights / 8 days: Jaipur, Khatu Shyam Ji, Jaisalmer, Sam, Jodhpur, Udaipur, Chittorgarh and Pushkar. A Tour Rajasthan itinerary.",
    image: IMG.chittorgarh,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Met and transferred to your hotel. The City Palace and the 18th-century Jantar Mantar, a photo stop at Hawa Mahal, and an evening in Johari Bazaar.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur forts & palaces",
        text: "Amber Fort by jeep or elephant, as you prefer, with views over Maota Lake. Jaigarh Fort, known for its giant cannon, Nahargarh Fort at sunset, and a Rajasthani thali for lunch.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Khatu Shyam Ji – Jaisalmer",
        drive: "Approx. 560 km / 10 hrs",
        text: "An early start for darshan at Khatu Shyam Ji Temple, then the long drive west to Jaisalmer, the Golden City.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer & Sam Sand Dunes",
        text: "Jaisalmer Fort and the havelis of Patwon, Nathmal Ji and Salim Singh. Afternoon at Sam for a camel safari and sunset, then folk music, a bonfire and dinner at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jodhpur",
        drive: "Approx. 300 km / 5 hrs",
        text: "To the Blue City. Mehrangarh Fort, Jaswant Thada and the Clock Tower Market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Udaipur",
        drive: "Approx. 250 km / 5 hrs",
        text: "Through the countryside to the City of Lakes. Evening boat ride on Lake Pichola, with the City Palace and Jag Mandir lit up; a walk along Gangaur Ghat if you wish.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur – Chittorgarh – Pushkar",
        drive: "Approx. 310 km / 6 hrs",
        text: "Chittorgarh Fort (UNESCO World Heritage Site): Vijay Stambha, Kirti Stambha and Padmini Palace. On to Pushkar for an evening in its lanes and ghats.",
        overnight: "Pushkar",
      },
      {
        title: "Pushkar – Jaipur departure",
        drive: "Approx. 150 km / 3 hrs",
        text: "Free time by the lake or in the bazaars, then back to Jaipur for drop off at Jaipur airport.",
      },
    ],
  },
  {
    slug: "jaipur-pushkar-jaisalmer-jodhpur-udaipur-8-days",
    name: "Rajasthan Desert & Lakes",
    nights: 7,
    days: 8,
    route: ["Jaipur", "Pushkar", "Jaisalmer", "Sam", "Jodhpur", "Nathdwara", "Udaipur"],
    summary:
      "Jaipur, then via Pushkar to the dunes of Jaisalmer, and south through Jodhpur to the lakes of Udaipur.",
    metaTitle: "08 Days Rajasthan Tour: Jaisalmer to Udaipur",
    metaDescription:
      "7 nights / 8 days: Jaipur, Pushkar, Jaisalmer, a Sam desert camp, Jodhpur, Nathdwara and Udaipur. A Tour Rajasthan itinerary.",
    image: IMG.jodhpur,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Pickup and transfer to your hotel. Then Birla Temple, Albert Hall, Hawa Mahal, the City Palace and Jantar Mantar.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur heritage sightseeing",
        text: "Jal Mahal, Amer Fort, Jaigarh Fort and Nahargarh Fort. Evening free for shopping.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Pushkar – Jaisalmer",
        text: "Pushkar Lake and the Brahma Temple on the way to Jaisalmer. Then the War Museum, Gadisar Lake and Jaisalmer Fort.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer – Sam",
        text: "Salim Singh Haveli, Patwon ki Haveli and Nathmal ki Haveli, then to the Sam Sand Dunes after lunch. Camel safari in the evening (jeep safari payable direct), with dinner, folk dance and music at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jodhpur",
        text: "Drive to Jodhpur. Mehrangarh Fort, Jaswant Thada and Umaid Bhawan Palace; evening free in the market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Nathdwara – Udaipur",
        text: "Nathdwara temple on the way to Udaipur, then an evening walk at Fateh Sagar Lake.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur sightseeing",
        text: "The City Palace, Jagdish Temple, a boat ride on Lake Pichola to Jag Mandir, the Karni Mata Temple, the Vintage Car Museum and Saheliyon ki Bari. Evening free in the market.",
        overnight: "Udaipur",
      },
      {
        title: "Departure",
        text: "Drop off at Udaipur or Jaipur airport.",
      },
    ],
  },
  {
    slug: "khatu-salasar-bikaner-jaisalmer-jodhpur-8-days",
    name: "Rajasthan with Khatu Shyam Ji & Salasar Balaji",
    nights: 7,
    days: 8,
    route: ["Jaipur", "Paota", "Khatu", "Salasar", "Bikaner", "Sam", "Jaisalmer", "Jodhpur", "Pushkar"],
    summary:
      "Temple darshan at Khatu Shyam Ji and Salasar Balaji, then Bikaner, the dunes, Jaisalmer, Jodhpur and Pushkar.",
    metaTitle: "08 Days Rajasthan Tour with Khatu & Salasar",
    metaDescription:
      "7 nights / 8 days: Khatu Shyam Ji, Salasar Balaji, Bikaner, a Sam desert camp, Jaisalmer, Jodhpur and Pushkar. A Tour Rajasthan itinerary.",
    image: IMG.bikaner,
    itinerary: [
      {
        title: "Jaipur – Shahpura – Paota",
        text: "Drive from Jaipur via Shahpura to Paota and visit the Kuldevi temple.",
        overnight: "Paota",
      },
      {
        title: "Paota – Khatu – Salasar",
        text: "Morning darshan at Khatu Shyam Ji, then on to Salasar. Evening visit to Salasar Balaji Temple.",
        overnight: "Salasar",
      },
      {
        title: "Salasar – Bikaner",
        text: "Drive to Bikaner. Junagarh Fort and its museum, the Karni Mata Temple and the camel research farm.",
        overnight: "Bikaner",
      },
      {
        title: "Bikaner – Sam",
        text: "Drive to the desert camp at Sam, Jaisalmer. Camel safari and jeep safari, then dinner with folk dance and music at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jaisalmer",
        text: "Into Jaisalmer for the fort, Gadisar, Salim Singh Haveli and the War Museum.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer – Jodhpur",
        text: "Drive to Jodhpur. Jaswant Thada, Mehrangarh Fort and Umaid Bhawan Palace; evening free in the market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Pushkar – Jaipur",
        text: "Pushkar Lake and the Brahma Temple on the way back to Jaipur.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur departure",
        text: "Drop off at Jaipur airport.",
      },
    ],
  },
  {
    slug: "jaipur-bikaner-jaisalmer-jodhpur-udaipur-9-days",
    name: "Grand Rajasthan",
    nights: 8,
    days: 9,
    route: ["Jaipur", "Bikaner", "Jaisalmer", "Sam", "Jodhpur", "Nathdwara", "Udaipur"],
    summary:
      "The longest route: Jaipur across the desert to Jaisalmer, then south through Jodhpur to finish in Udaipur.",
    metaTitle: "09 Days Rajasthan Tour: Jaipur to Udaipur",
    metaDescription:
      "8 nights / 9 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp, Jodhpur, Nathdwara and Udaipur. A Tour Rajasthan itinerary.",
    image: IMG.jaipur,
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Pickup and transfer to your hotel. Then Birla Temple, Albert Hall, Hawa Mahal, the City Palace and Jantar Mantar.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur heritage sightseeing",
        text: "Jal Mahal, Amer Fort, Jaigarh Fort and Nahargarh Fort. Evening free for shopping.",
        overnight: "Jaipur",
      },
      {
        title: "Jaipur – Bikaner",
        text: "Drive to Bikaner for Junagarh Fort and its museum, the Karni Mata Temple and the camel farm.",
        overnight: "Bikaner",
      },
      {
        title: "Bikaner – Jaisalmer",
        text: "Drive to Jaisalmer. The War Museum, Gadisar Lake and Jaisalmer Fort.",
        overnight: "Jaisalmer",
      },
      {
        title: "Jaisalmer – Sam",
        text: "Salim Singh Haveli, Patwon ki Haveli and Nathmal ki Haveli, then to the Sam Sand Dunes. Camel safari in the evening (jeep safari payable direct), with dinner, folk dance and music at camp.",
        overnight: "Desert camp, Sam",
      },
      {
        title: "Sam – Jodhpur",
        text: "Drive to Jodhpur. Mehrangarh Fort, Jaswant Thada and Umaid Bhawan Palace; evening free in the market.",
        overnight: "Jodhpur",
      },
      {
        title: "Jodhpur – Nathdwara – Udaipur",
        text: "Nathdwara temple on the way to Udaipur, then an evening walk at Fateh Sagar Lake.",
        overnight: "Udaipur",
      },
      {
        title: "Udaipur sightseeing",
        text: "The City Palace, Jagdish Temple, a boat ride on Lake Pichola to Jag Mandir, the Karni Mata Temple, the Vintage Car Museum and Saheliyon ki Bari. Evening free in the market.",
        overnight: "Udaipur",
      },
      {
        title: "Departure from Udaipur",
        text: "Drop off at Udaipur airport.",
      },
    ],
  },
];

export function getRajasthanItinerary(slug: string) {
  return RAJASTHAN_ITINERARIES.find((t) => t.slug === slug);
}
