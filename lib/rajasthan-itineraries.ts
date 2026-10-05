/**
 * Tour Rajasthan itineraries — the "Tour Rajasthan" brand in Our brands
 * (lib/site.ts CO_BRANDS), contact Mr. Krishnamurthy, Jaipur.
 *
 * Source: rajasthanitineraries.zip (8 .docx files, supplied 2026-10-05).
 * Six are published; the source files were edited as follows:
 * - "08 Days Rajasthan Tour.docx" dropped — near-duplicate of the 09 Days
 *   file, and its heading ("08 Nights – 09 Days") contradicted its 8 days.
 * - "08 Days Rajasthan Tour with Khatu Salasar.docx" dropped — untitled,
 *   fixed dates, "night stay at own arranged": one family's booking, not a
 *   publishable tour.
 * - Fixed dates ("19 Jan", "Feb") replaced with day numbers.
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
  itinerary: ItineraryDay[];
};

/**
 * Tour Rajasthan's own contact. Every page under /tour-rajasthan uses this
 * instead of Tourglobe's: the phone link, both WhatsApp buttons, and (via
 * app/api/enquiry) the inbox enquiries from these pages are sent to.
 */
export const TOUR_RAJASTHAN = {
  name: "Tour Rajasthan",
  path: "/tour-rajasthan",
  contact: {
    name: "Mr. Krishnamurthy",
    phone: "+91 96729 88705",
    location: "Jaipur",
    // Digits only, for wa.me. Client confirmed (2026-10-05) this number for
    // Tour Rajasthan's phone and WhatsApp.
    whatsappNumber: "919672988705",
  },
} as const;

export function tourRajasthanWhatsAppUrl(message: string) {
  return `https://wa.me/${TOUR_RAJASTHAN.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
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
    metaTitle: "6-Day Rajasthan Tour: Jaipur, Jodhpur, Udaipur",
    metaDescription:
      "5 nights / 6 days through Jaipur, Ajmer, Pushkar, Jodhpur, Nathdwara and Udaipur. A Tour Rajasthan itinerary, planned with Tourglobe.",
    itinerary: [
      {
        title: "Arrival in Jaipur",
        text: "Met at the airport or railway station and transferred to your hotel. Time permitting, an easy first look at the city: Patrika Gate, Birla Temple, Albert Hall Museum, and the bazaars around Bapu and Johari Bazaar for textiles, jewellery and handicrafts.",
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
        text: "After breakfast, transfer to Udaipur airport or railway station for your onward journey.",
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
    metaTitle: "7-Day Rajasthan Tour with Udaipur & Pushkar",
    metaDescription:
      "6 nights / 7 days: Jaipur, Jodhpur, Nathdwara, Udaipur, Chittorgarh, Ajmer and Pushkar, returning to Jaipur. A Tour Rajasthan itinerary.",
    itinerary: [
      {
        title: "Arrival & Jaipur city sights",
        text: "Pickup from Jaipur railway station or airport and transfer to your hotel. Then Patrika Gate, Birla Temple, Albert Hall Museum, Hawa Mahal, the City Palace, Jantar Mantar and Govind Dev Ji Temple.",
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
        text: "Drive back to Jaipur, with time in the market before your drop at the railway station or airport.",
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
    metaTitle: "7-Day Rajasthan Desert Tour with Jaisalmer",
    metaDescription:
      "6 nights / 7 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp and Jodhpur, returning to Jaipur. A Tour Rajasthan itinerary.",
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
        text: "Drive back to Jaipur, with stops on the way, for your drop at the airport, railway station or another point you choose.",
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
    metaTitle: "8-Day Rajasthan Tour: Desert, Jodhpur & Pushkar",
    metaDescription:
      "7 nights / 8 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp, Jodhpur and Pushkar, returning to Jaipur. A Tour Rajasthan itinerary.",
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
        text: "A slow morning by the lake, then back to Jaipur for your drop at the airport or railway station.",
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
    metaTitle: "8-Day Rajasthan Tour with Khatu Shyam Ji",
    metaDescription:
      "7 nights / 8 days: Jaipur, Khatu Shyam Ji, Jaisalmer, Sam, Jodhpur, Udaipur, Chittorgarh and Pushkar. A Tour Rajasthan itinerary.",
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
        text: "Free time by the lake or in the bazaars, then back to Jaipur for your drop at the airport or railway station.",
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
    metaTitle: "9-Day Rajasthan Tour: Jaipur to Udaipur",
    metaDescription:
      "8 nights / 9 days: Jaipur, Bikaner, Jaisalmer, a Sam desert camp, Jodhpur, Nathdwara and Udaipur. A Tour Rajasthan itinerary.",
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
        text: "Drop at Udaipur airport.",
      },
    ],
  },
];

export function getRajasthanItinerary(slug: string) {
  return RAJASTHAN_ITINERARIES.find((t) => t.slug === slug);
}
