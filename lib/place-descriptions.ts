/**
 * A 40–60 word description for every destination page, keyed
 * `${categorySlug}/${slug}` like lib/place-images.ts.
 *
 * Why this exists: Search Console (2026-10-06) showed 81 destination pages
 * "Discovered – currently not indexed" and 14 "Crawled – currently not
 * indexed". Each page was ~110 words, nearly all shared template text, so
 * Google read them as near-duplicates. A unique description per page is
 * the fix claude.md's content model already asked for.
 *
 * DRAFTED BY US (2026-10-06), NOT CLIENT COPY. TODO(client): approve or
 * edit. Rules followed:
 * - Describes the destination only — nothing about the company beyond
 *   "Madurai, our home city", which is a verified fact.
 * - Only well-established facts about each place; no prices, no promises
 *   about what is included or bookable.
 * - Built around the stops the client listed for that programme, so the
 *   text never describes a place the itinerary doesn't visit.
 * - Client spellings in names and stop lists ("Angkor Watt", "Edinburg",
 *   "Seam Reap") are left alone there; prose uses the standard spelling.
 */
export const PLACE_DESCRIPTIONS: Record<string, string> = {
  // Cultural Tourism
  "cultural-tourism/kyoto":
    "Kyoto holds more than a thousand years of Japanese culture: Zen temples, wooden machiya townhouses and the lantern-lit lanes of Gion. This programme pairs it with Nara's ancient temples and free-roaming deer, and Osaka's street-food districts, for a rounded first look at Japan's cultural heartland.",
  "cultural-tourism/rome":
    "Rome layers almost three thousand years of history into one walkable city: the Colosseum, the Forum and the Pantheon, Baroque piazzas and fountains. The programme includes the Vatican, home to St Peter's Basilica and the Sistine Chapel, with time left for neighbourhood trattorias and the evening passeggiata.",
  "cultural-tourism/budapest":
    "Budapest straddles the Danube: hilly Buda, with its castle district and Fisherman's Bastion, on one bank; grand Pest, with the Parliament and its café culture, on the other. Thermal baths, opera, ruin bars and Central European cooking make it one of Europe's most rewarding cultural city breaks.",
  "cultural-tourism/new-york":
    "New York packs world-class museums, Broadway theatre, Central Park and neighbourhoods from Harlem to Greenwich Village onto one island. This programme adds Niagara Falls, so the trip balances the energy of Manhattan with one of North America's great natural sights.",
  "cultural-tourism/beijing":
    "Beijing is imperial China: the Forbidden City, the Temple of Heaven, hutong lanes and the Great Wall within reach of the city. Shanghai shows the other side, with the historic Bund facing the Pudong skyline across the river. Together they trace China's story from the dynasties to today.",
  "cultural-tourism/hanoi":
    "Hanoi's Old Quarter, lakes, temples and French-era boulevards make it Vietnam's cultural capital, and its street food is reason enough to visit. The programme includes an overnight cruise, a chance to slow down on the water after the bustle of the city.",
  "cultural-tourism/varanasi":
    "Varanasi, or Kasi, is one of the world's oldest living cities, where daily life and ritual unfold on the ghats of the Ganga, most memorably at the evening aarti. The programme continues to Prayagraj, at the confluence of the Ganga, the Yamuna and the mythical Saraswati.",
  "cultural-tourism/marrakesh":
    "Marrakesh is Morocco at full volume: the souks of the medina, Jemaa el-Fnaa square at dusk, riads, palaces and gardens. The programme ends on the Atlantic coast at Agadir, trading the medina's bustle for a long sandy beach and a slower pace.",
  "cultural-tourism/cairo":
    "Cairo is the gateway to ancient Egypt, with the Pyramids of Giza and the Sphinx on its edge and the treasures of the pharaohs in its museums. Beyond them are the mosques of Islamic Cairo, the Khan el-Khalili bazaar and evenings on the Nile.",

  // Pilgrimage & Divine
  "pilgrimage-divine/gaya":
    "Bodh Gaya, near Gaya, is where the Buddha attained enlightenment, marked by the Mahabodhi Temple, a UNESCO World Heritage Site. Gaya itself is an important Hindu pilgrimage town. Rajgir and the ruins of Nalanda, one of the ancient world's great universities, complete a journey through Buddhist and Hindu heritage.",
  "pilgrimage-divine/puri":
    "Puri is home to the Jagannath Temple, one of the four Char Dham pilgrimage sites and the setting of the annual Rath Yatra chariot festival. The programme begins in Bhubaneswar, the capital of Odisha, a city known for its many ancient temples.",
  "pilgrimage-divine/lhasa":
    "Lhasa is the spiritual heart of Tibet, crowned by the Potala Palace and the Jokhang Temple. This high-altitude programme also reaches Everest Base Camp and sacred Lake Manasarovar, revered by Hindus, Buddhists, Jains and Bon followers alike. Altitude makes careful pacing essential, and a counsellor plans it with you.",
  "pilgrimage-divine/hampi":
    "This Karnataka pilgrimage runs from the coast to the Deccan: the temples of Mangalore, Udupi's Sri Krishna Matha, the rock-cut cave temples of Badami, and Hampi, the ruined capital of the Vijayanagara Empire, where the Virupaksha Temple is still in worship among the boulders.",
  "pilgrimage-divine/madurai":
    "Madurai, our home city, is built around the Meenakshi Amman Temple and its towering gopurams. The programme continues to Rameswaram's Ramanathaswamy Temple, one of the Char Dham, and to Kanyakumari at India's southern tip, where three seas meet. Each is a living temple town, busiest during its festival seasons.",
  "pilgrimage-divine/assisi":
    "Assisi, in the hills of Umbria, is the town of St Francis, whose basilica is filled with frescoes by Giotto and his contemporaries. The programme pairs it with Rome and the Vatican, making it a natural pilgrimage for Catholic travellers and a beautiful journey for anyone.",
  "pilgrimage-divine/angkor-watt":
    "Angkor Wat, near Siem Reap in Cambodia, is the largest religious monument in the world, built as a Hindu temple and later a Buddhist one. The programme also covers Angkor Thom, with its giant carved stone faces, and Ta Prohm, where tree roots wrap around the ruins.",
  "pilgrimage-divine/mt-nebo":
    "Mount Nebo is where, in the Bible, Moses was shown the Promised Land, and its view stretches over the Dead Sea and the Jordan valley. The programme crosses Jordan from Aqaba on the Red Sea through the desert of Wadi Rum to the rose-red city of Petra.",
  "pilgrimage-divine/camino-de-santiago":
    "Santiago de Compostela, in Galicia, is the end point of the Camino de Santiago, the pilgrim routes walked to the shrine of St James for more than a thousand years. The programme begins in Madrid and arrives at the cathedral, where pilgrims gather every day.",

  // Culinary Hotspots
  "culinary-hotspots/lima":
    "Lima is regularly named among the world's great food cities. Expect ceviche made with fresh Pacific fish, Nikkei cooking born of Peru's Japanese community — the style that made restaurants like Maido famous — and pisco, the grape brandy behind the pisco sour.",
  "culinary-hotspots/japan":
    "Japan rewards eaters at every level: Tokyo's sushi counters and ramen shops, Kyoto's refined kaiseki, and Osaka, famous for its love of eating and street food such as takoyaki and okonomiyaki. Seasonal ingredients and precise technique run through all of it.",
  "culinary-hotspots/france":
    "Paris is where much of the Western idea of fine food took shape: bakeries and patisseries, cheese shops, bistros, markets and wine bars, alongside celebrated restaurants. A food-led stay here is about the everyday rituals as much as the grand tables.",
  "culinary-hotspots/italy":
    "Italian food is regional, and this programme travels it: Tuscany for olive oil, wine and rustic cooking; the Amalfi Coast for lemons, seafood and mozzarella; and Rome for carbonara, cacio e pepe and its neighbourhood trattorias. Markets, wineries and long lunches set the rhythm of the days.",
  "culinary-hotspots/thailand":
    "Thai cooking balances sweet, sour, salty and spicy, and Bangkok's street stalls and markets are the best place to taste it. The programme includes Ayutthaya, the former royal capital, known for grilled river prawns and boat noodles, and the seafood of coastal Pattaya.",
  "culinary-hotspots/uae":
    "Dubai's food scene spans Emirati dishes, Levantine and Persian cooking, Indian and Pakistani kitchens, spice and date souks, and international fine dining. Neighbouring Sharjah, the UAE's cultural capital, adds traditional markets and a quieter, older feel. Arabic coffee with dates is the traditional welcome in both.",
  "culinary-hotspots/turkey":
    "Istanbul's food sits between Europe and Asia: meze, kebabs, fish by the Bosphorus, simit, baklava and endless glasses of tea. Bursa, the first Ottoman capital, is the home of the İskender kebab and candied chestnuts — a worthwhile detour for anyone who travels to eat.",
  "culinary-hotspots/tamil-nadu":
    "Tamil Nadu's cooking changes from town to town. Madurai, our home city, is known for jigarthanda, kari dosa and late-night street food; Tirunelveli for its halwa; and the coast around Kanyakumari for fresh seafood. Meals served on a banana leaf tie the journey together.",
  "culinary-hotspots/rajasthan":
    "Rajasthani food was shaped by the desert: dal baati churma, gatte ki sabzi, laal maas and ker sangri. Jaipur is known for its sweets and kachoris, Jodhpur for mirchi vada and makhaniya lassi, and Udaipur for long dinners beside its lakes.",

  // Beaches & water front
  "beaches-water-front/malta":
    "Malta, in the middle of the Mediterranean, combines clear blue water with thousands of years of history. Swim in the Blue Lagoon off Comino, wander the walled capital Valletta and the silent city of Mdina, and eat fresh fish in the harbour villages.",
  "beaches-water-front/elafonisi":
    "Elafonisi, on the south-west tip of Crete, is known for its shallow turquoise lagoon and pink-tinged sand. The programme also explores Crete itself — the old harbour towns, Minoan sites and village tavernas of Greece's largest island. Crete's olive oil, cheeses and raki are part of every meal.",
  "beaches-water-front/bodrum":
    "Bodrum, on Turkey's Aegean coast, mixes beach clubs and quiet coves with a whitewashed old town, a busy marina and a medieval crusader castle. Boat trips along the peninsula and fresh seafood by the water set an easy pace. Evenings centre on the harbour and its waterfront restaurants.",
  "beaches-water-front/seychelles":
    "The Seychelles, an archipelago in the Indian Ocean, are known for granite boulders framing white beaches, turquoise water and protected reefs. Snorkelling, island hopping and unhurried days on beaches such as Anse Source d'Argent make them a favourite for honeymoons and slow holidays.",
  "beaches-water-front/maldives":
    "The Maldives are a chain of coral atolls in the Indian Ocean, famous for overwater villas, reefs and calm lagoons. Snorkelling and diving among reef fish, rays and turtles, sandbank picnics and sunset cruises fill the days — or nothing at all.",
  "beaches-water-front/florida-and-miami":
    "Florida is the United States at the beach. Siesta Beach, on the Gulf Coast near Sarasota, is known for its fine white quartz sand; Miami adds the Art Deco buildings of South Beach, Cuban food in Little Havana and lively nightlife.",
  "beaches-water-front/thailand":
    "Thailand's Andaman coast is limestone cliffs rising from turquoise water. Phuket offers beaches and resorts for every pace, while Krabi is the base for long-tail boat trips to the Phi Phi islands, the cliff-backed beaches of Railay and memorable sunsets.",
  "beaches-water-front/bondi-and-gold-coast":
    "Australia's east coast is beach culture at its best. In Sydney, Bondi's surf and coastal walk are minutes from the Opera House and the harbour; further north, Brisbane is the gateway to the Gold Coast, with miles of surf beaches and theme parks.",
  "beaches-water-front/havelock":
    "Havelock Island, now Swaraj Dweep, in the Andaman Islands has some of India's most beautiful beaches, including Radhanagar, with its white sand and forest edge. Clear water, coral reefs and diving make it ideal for a relaxed tropical holiday. The island is reached by ferry from Port Blair.",

  // Hill stations
  "hill-stations/interlaken":
    "Interlaken sits between two lakes beneath the Eiger, Mönch and Jungfrau, the classic base for the Swiss Alps. The programme starts in Lucerne, with its covered wooden bridge and lake steamers, then climbs into mountain railways, high viewpoints and alpine villages.",
  "hill-stations/fairbanks":
    "Fairbanks, in the interior of Alaska, is one of the best places on earth to see the northern lights, with long, dark winter nights well suited to aurora watching. Hot springs, dog sledding and the vast, quiet wilderness of the subarctic complete the trip.",
  "hill-stations/innsbruck":
    "Innsbruck is an Alpine city ringed by mountains, where a cable car rises from the old town to the Nordkette peaks. The programme pairs the Tyrolean Alps with Vienna, Austria's imperial capital of palaces, coffee houses and classical music. Mountains and imperial city make a well-balanced first visit to Austria.",
  "hill-stations/pokhara":
    "Pokhara, on Phewa Lake, looks straight up at the Annapurna range and the peak of Machapuchare, and is Nepal's gateway to the Himalaya. The programme begins in Kathmandu, with its temples, stupas and old royal squares, before heading into the mountains.",
  "hill-stations/darjeeling":
    "Darjeeling is known for its tea gardens, its toy train and sunrise views of Kanchenjunga from Tiger Hill. The programme continues into Sikkim and its capital Gangtok, with Buddhist monasteries, mountain lakes and wide Himalayan views. Spring and autumn usually bring the clearest mountain views.",
  "hill-stations/manali":
    "This Himachal Pradesh route climbs from Shimla, the old colonial summer capital, through the Kullu valley to Manali, set among pine forests and snow peaks. River rafting, apple orchards and the high road towards Solang Valley make it a favourite mountain holiday.",
  "hill-stations/leh":
    "Leh is the capital of Ladakh, a high-altitude desert of bare mountains, monasteries and prayer flags. Days take in Buddhist gompas such as Thiksey, mountain passes and turquoise lakes. At about 3,500 metres, time to acclimatise on arrival is essential.",
  "hill-stations/karuizawa":
    "Karuizawa is a cool, forested mountain resort in Nagano, long a summer retreat from Tokyo. The programme also includes Hakone, with its hot springs and views of Mount Fuji, and begins or ends in Tokyo — a balance of city life and mountain air.",
  "hill-stations/nuwara-eliya":
    "Nuwara Eliya, in Sri Lanka's central highlands, is tea country: rolling estates, waterfalls, cool air and colonial-era bungalows. The programme starts in Kandy, home of the Temple of the Sacred Tooth Relic, and travels up into the hills. The rail line through the tea country is one of the island's most scenic journeys.",

  // Rock-cut and Caves
  "rock-cut-caves-and-temples/jordan":
    "Petra's tombs and temples, carved into rose-red cliffs by the Nabataeans, are among the world's great rock-cut monuments. The programme also crosses the desert of Wadi Rum and visits the Roman city of Jerash and Jordan's capital, Amman. Petra is best explored early in the morning, before the heat and crowds.",
  "rock-cut-caves-and-temples/vietnam":
    "Phong Nha-Ke Bang National Park, near Dong Hoi, holds some of the largest caves on earth, including Son Doong, the biggest known cave passage in the world. Expeditions into Son Doong are strictly limited and booked far in advance. The programme ends in Ho Chi Minh City.",
  "rock-cut-caves-and-temples/sri-lanka":
    "Sigiriya, the Lion Rock, is a fifth-century fortress-palace on a sheer rock column, with frescoes and a mirror wall. Nearby Dambulla's cave temples are filled with Buddha statues and painted ceilings. Habarana is the base for both, and the journey ends in Colombo.",
  "rock-cut-caves-and-temples/egypt":
    "Egypt has the greatest rock-cut monuments of the ancient world: the tombs of the Valley of the Kings at Luxor, and the temples of Ramesses II at Abu Simbel, carved from a cliff and later moved above the waters of Lake Nasser. The journey ends in Cairo.",
  "rock-cut-caves-and-temples/turkey":
    "Cappadocia is a landscape of fairy chimneys, cave churches with Byzantine frescoes and underground cities cut into soft volcanic rock, best seen from a hot-air balloon at sunrise. The programme pairs it with Istanbul, the city of Hagia Sophia and the Blue Mosque.",
  "rock-cut-caves-and-temples/china":
    "The Longmen Grottoes hold tens of thousands of Buddhist statues carved into limestone cliffs over several centuries. From Zhengzhou, the programme also reaches the Shaolin Temple, birthplace of Shaolin kung fu, before continuing to Beijing and Shanghai. The grottoes are a UNESCO World Heritage Site, on the banks of the Yi River near Luoyang.",
  "rock-cut-caves-and-temples/karnataka":
    "Northern Karnataka is a cradle of Indian temple architecture. Badami's rock-cut cave temples, Aihole's early experiments in stone and the vast ruins of Hampi, capital of the Vijayanagara Empire, trace centuries of temple building in one journey. Nearby Pattadakal, a UNESCO site, continues the same story.",
  "rock-cut-caves-and-temples/india":
    "The Ajanta caves, with Buddhist paintings up to two thousand years old, and Ellora, where Hindu, Buddhist and Jain temples were cut from the same cliff — including the Kailasa temple, carved from a single rock — are both UNESCO sites. The programme includes Shirdi, the town of Sai Baba.",
  "rock-cut-caves-and-temples/tamil-nadu":
    "Tamil Nadu's rock-cut heritage begins at Mahabalipuram, with its Pallava Shore Temple, monolithic rathas and great carved reliefs. Sittanavasal's Jain cave holds rare ancient paintings, and Madurai, our home city, adds the Meenakshi Temple. The journey starts or ends in Chennai.",

  // Wellness & Yoga
  "wellness-yoga/rishikesh":
    "Rishikesh, on the Ganga in the Himalayan foothills, is often called the yoga capital of the world. Ashrams and retreats offer daily yoga, meditation and Ayurveda, and the evening Ganga aarti at Triveni Ghat brings each day to a calm close.",
  "wellness-yoga/ngari-purang":
    "Ngari, in far western Tibet, is the land of Mount Kailash and Lake Manasarovar, sacred to Hindus, Buddhists, Jains and Bon followers. The programme includes the hot springs of Thirthapuri. At over 4,500 metres it is demanding, and a counsellor will talk you through fitness and acclimatisation.",
  "wellness-yoga/kerala":
    "Kerala is the home of Ayurveda, and Kovalam's beaches near Thiruvananthapuram (Trivandrum) are a long-established place to experience it: oil therapies, massage, yoga and diet, beside the Arabian Sea. A restful programme built around treatment and slow days. Many Ayurvedic programmes run for a week or more.",
  "wellness-yoga/indonesia":
    "Ubud, in the green hills of Bali, is a centre for yoga, meditation and healing among rice terraces, temples and river valleys. Spa rituals, Balinese massage and fresh, plant-based food make it one of Asia's best-known wellness retreats. Ubud's craft villages and traditional dance add a cultural side to the stay.",
  "wellness-yoga/thailand":
    "Northern Thailand moves at a slower pace. Chiang Mai is known for meditation retreats, traditional Thai massage schools and mountain temples; Chiang Rai adds the White Temple and quiet hill country. Cooler air and green landscapes suit a restorative trip.",
  "wellness-yoga/bhutan":
    "Bhutan measures its progress by Gross National Happiness, and a visit feels like it. Paro's Tiger's Nest monastery, the dzongs of Thimphu and the river valley of Punakha offer mountain air, Buddhist calm, hot-stone baths and gentle hiking. Visitor numbers are managed, which keeps the country calm and uncrowded.",
  "wellness-yoga/sri-lanka":
    "Sri Lanka has its own tradition of Ayurveda, and Bentota, on the south-west coast, has many retreats offering treatments beside the beach. Kandy adds the hill country and the Temple of the Tooth, and the journey begins and ends in Colombo.",
  "wellness-yoga/czech-republic":
    "Karlovy Vary is the most famous of Bohemia's spa towns, where visitors have taken the hot mineral springs for centuries amid colonnades and pastel buildings. The programme pairs it with Prague, with its castle, Charles Bridge and old-town squares. Spa treatments, mineral-water cures and forest walks fill the days in Karlovy Vary.",
  "wellness-yoga/jordan":
    "The hot-spring waterfalls of Hammamat Ma'in, in a canyon above the Dead Sea basin, are the heart of this programme. It combines them with Petra, the desert silence of Wadi Rum and the Red Sea at Aqaba, finishing in Amman.",

  // History & Archeology
  "history-archeology/italy":
    "Italy holds layers of history in every city: ancient Rome's Colosseum and Forum, Renaissance masterpieces in the Vatican Museums, the Leaning Tower of Pisa, and the canals and palaces of Venice, once a great maritime republic. A journey through two thousand years of Western history.",
  "history-archeology/peru":
    "Machu Picchu, the Inca citadel high in the Andes, is one of the world's great archaeological sites. The programme travels through Cusco, the former Inca capital, where Spanish churches stand on Inca stone foundations, and begins in Lima. The altitude is significant, so the pace allows for it.",
  "history-archeology/cambodia":
    "The temples of Angkor, near Siem Reap, were the centre of the Khmer Empire, which ruled much of South-East Asia for centuries. The programme also visits Phnom Penh, the capital, with its Royal Palace, National Museum and memorials to the country's recent history.",
  "history-archeology/jordan":
    "Jordan is a crossroads of ancient civilisations. The highlights are Petra, the Nabataean city carved from rock, and Jerash, one of the best-preserved Roman provincial cities, with colonnaded streets, theatres and temples still standing. Both are within a day's reach of Amman, Jordan's capital, which has its own Roman theatre and citadel.",
  "history-archeology/greece":
    "Greece is where much of Western history begins. Athens has the Acropolis and the Parthenon; Delphi, the sanctuary of the ancient oracle on the slopes of Mount Parnassus; and Santorini, the volcanic island where Akrotiri, a Bronze Age town, was preserved under ash.",
  "history-archeology/morocco":
    "Volubilis, near Meknes, is Morocco's best-preserved Roman city, with mosaics still in place. Rabat, the capital, adds the Kasbah of the Udayas and the Hassan Tower, and Casablanca the Hassan II Mosque, one of the largest mosques in the world.",
  "history-archeology/united-kingdom":
    "This programme spans five thousand years of English history: the prehistoric stone circle of Stonehenge, the Roman baths and Georgian crescents of Bath, and in London the Tower, Westminster Abbey and the British Museum. England's countryside villages and country houses lie along the way between them.",
  "history-archeology/scotland":
    "Edinburgh's castle crowns a volcanic rock above the medieval Royal Mile and the Georgian New Town. Glasgow, Scotland's largest city, adds Victorian architecture, the work of Charles Rennie Mackintosh and fine museums. Together they cover Scotland's royal, industrial and cultural history.",
  "history-archeology/india":
    "India's Golden Triangle links three cities of empire: Delhi, with its Mughal monuments and colonial-era capital; Agra, home of the Taj Mahal and Agra Fort; and Jaipur, the Pink City of the Rajput kings. It is the classic introduction to North Indian history.",

  // Wild life
  "wild-life/kenya":
    "Kenya's Masai Mara is one of Africa's great game reserves, home to lions, cheetahs and elephants and, from around July to October, the Great Migration. Lake Nakuru adds flamingos and rhinos, and the journey starts in Nairobi. Early-morning and late-afternoon game drives give the best sightings.",
  "wild-life/serengeti":
    "Tanzania's Serengeti hosts the largest land migration on earth, as wildebeest and zebra move across its plains through the year. The Ngorongoro Crater, a vast caldera with one of Africa's densest concentrations of wildlife, and Arusha, the safari gateway, complete the route.",
  "wild-life/erindi":
    "Erindi is a large private game reserve in central Namibia, where elephants, lions, cheetahs, wild dogs and giraffes roam open savannah and rocky hills. Game drives, guided walks and night drives are the focus. The trip begins in Windhoek, Namibia's capital.",
  "wild-life/kruger":
    "Kruger National Park is South Africa's flagship reserve and one of the best places to see the Big Five: lion, leopard, elephant, buffalo and rhino. Game drives at dawn and dusk set the rhythm of the days, with Johannesburg as the gateway.",
  "wild-life/botswana-and-zimbabwe":
    "This programme starts at Victoria Falls on the Zambezi, then crosses into Botswana for Chobe National Park and its huge elephant herds, the waterways of the Okavango Delta, explored by mokoro canoe, and Moremi Game Reserve. It ends in Maun, the safari hub.",
  "wild-life/ranthambore":
    "Ranthambore National Park in Rajasthan is one of the best places in India to see wild tigers, which roam dry forest around an ancient hilltop fort and lakes. Jungle safaris are the focus, starting from Jaipur. The park is generally open from October to June, and safari permits are limited.",
  "wild-life/kaziranga":
    "Kaziranga National Park, in Assam, is home to about two-thirds of the world's greater one-horned rhinoceroses, as well as tigers, elephants and wild water buffalo. Jeep safaris cross its tall grasslands. The programme also visits Shillong, the hill capital of Meghalaya.",
  "wild-life/corbett":
    "Jim Corbett National Park, in the Uttarakhand foothills, is India's oldest national park, known for its tigers, elephants and birdlife. The programme combines safaris with the hill towns of Nainital, set around its lake, and Ranikhet. The park is named after Jim Corbett, the hunter-turned-conservationist who helped establish it.",
  "wild-life/masinagudi":
    "Masinagudi sits on the edge of Mudumalai Tiger Reserve, in the Nilgiri Biosphere Reserve, where elephants, gaur, deer and leopards are regularly seen. The programme adds Bandipur National Park, the palace city of Mysore and the Nilgiri hill station of Ooty.",
};

export function getPlaceDescription(categorySlug: string, slug: string) {
  return PLACE_DESCRIPTIONS[`${categorySlug}/${slug}`];
}
