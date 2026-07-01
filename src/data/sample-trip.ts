import type { Photo, Trip } from "@/lib/types";

// Real itinerary: Globus "The Best of Eastern Europe" (Tour RO 60620),
// land dates June 19 – July 3, 2026. Route: Berlin → Warsaw → Kraków →
// Budapest → Vienna → Prague, returning to Berlin. Photos are placeholders
// until uploaded (empty `src` renders a "photo coming soon" slot).
//
// The app reads this only when Supabase env vars are absent (see src/lib/trips.ts);
// the live site reads the matching seed in supabase/seed.sql.

// Helper: make N empty photo slots with a stable id prefix (awaiting upload).
function slots(prefix: string, n: number): Photo[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    src: null,
    caption: null,
    sortOrder: i + 1,
  }));
}

// Helper: N uploaded photos in the trip-photos bucket, named <group>-NN.jpg.
function stored(dir: string, group: string, n: number): Photo[] {
  return Array.from({ length: n }, (_, i) => {
    const nn = String(i + 1).padStart(2, "0");
    return {
      id: `${group}-${nn}`,
      src: `${dir}/${group}/${group}-${nn}.jpg`,
      caption: null,
      sortOrder: i + 1,
    };
  });
}

export const sampleTrip: Trip = {
  id: "best-of-eastern-europe",
  slug: "eastern-europe",
  title: "The Best of Eastern Europe",
  subtitle: "Fourteen days, six countries — a guided Globus tour",
  summary:
    "Two weeks across Eastern Europe on Globus's “Best of Eastern Europe” tour. Starting and ending in Berlin, the route ran through Poland — with a sobering day at Auschwitz — and on to Budapest, Vienna, and Prague. Here's the journey, city by city.",
  tourOperator: "Globus",
  startDate: "2026-06-19",
  endDate: "2026-07-03",
  coverPhoto: { id: "cover-1", src: null, caption: null, sortOrder: 0 },
  stops: [
    {
      id: "stop-berlin",
      slug: "berlin",
      city: "Berlin",
      country: "Germany",
      lat: 52.52,
      lng: 13.405,
      order: 1,
      nights: 3,
      dateFrom: "2026-06-19",
      dateTo: "2026-06-22",
      summary:
        "Where the tour began — and, arriving a day early, a self-guided first day among Berlin's museums before meeting the group.",
      activities: [
        {
          id: "berlin-technikmuseum",
          title: "Deutsches Technikmuseum",
          description:
            "With a free day before the tour, a self-guided morning at the Deutsches Technikmuseum — aircraft, locomotives, and hands-on exhibits across its sprawling halls.",
          isHighlight: false,
          sortOrder: 1,
          photos: stored("eastern-europe/berlin", "technikmuseum", 12),
        },
        {
          id: "berlin-naturkunde",
          title: "Museum für Naturkunde",
          description:
            "Berlin's Museum of Natural History, home to the world's tallest mounted dinosaur skeleton. It didn't quite win us over, though — hence only a couple of photos.",
          isHighlight: false,
          sortOrder: 2,
          photos: stored("eastern-europe/berlin", "naturkunde", 2),
        },
        {
          id: "berlin-welcome",
          title: "Welcome dinner",
          description:
            "Met the Tour Director and traveling companions over a welcome dinner at the hotel.",
          isHighlight: false,
          sortOrder: 3,
          photos: [],
        },
        {
          id: "berlin-historic",
          title: "Historic Berlin",
          description:
            "A guided sightseeing tour past the State Opera House, Museum Island, the Reichstag, Tiergarten, and Ku'damm, with photo stops at the Brandenburg Gate, the Kaiser Wilhelm Memorial Church, and the Holocaust Memorial.",
          isHighlight: false,
          sortOrder: 4,
          photos: slots("berlin-historic", 3),
        },
        {
          id: "berlin-potsdam",
          title: "Half-Day Potsdam Discovery",
          description:
            "Out to Potsdam: the House of the Wannsee Conference, the gardens of Sanssouci Palace, the Dutch Quarter and the Alexandrowka Russian colony, and the Glienicke Brücke — the Cold War 'Bridge of Spies.'",
          isHighlight: false,
          sortOrder: 5,
          photos: slots("berlin-potsdam", 3),
        },
      ],
    },
    {
      id: "stop-warsaw",
      slug: "warsaw",
      city: "Warsaw",
      country: "Poland",
      lat: 52.2297,
      lng: 21.0122,
      order: 2,
      nights: 2,
      dateFrom: "2026-06-22",
      dateTo: "2026-06-24",
      summary:
        "Poland's capital, reached by a long drive south across the border.",
      activities: [
        {
          id: "warsaw-poznan",
          title: "Poznań en route",
          description:
            "A break in Poznań, one of Poland's oldest cities, to wander the colourful Old Market Square — where the Town Hall clock's mechanical goats butt heads at noon.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("warsaw-poznan", 2),
        },
        {
          id: "warsaw-oldtown",
          title: "Old Town & St. John's Cathedral",
          description:
            "A guided walk through the rebuilt medieval Stare Miasto and the Cathedral of St. John.",
          isHighlight: false,
          sortOrder: 2,
          photos: slots("warsaw-oldtown", 2),
        },
        {
          id: "warsaw-chopin",
          title: "Chopin concert",
          description:
            "An evening recital of Chopin's compositions in an elegant Warsaw hall.",
          isHighlight: false,
          sortOrder: 3,
          photos: slots("warsaw-chopin", 1),
        },
      ],
    },
    {
      id: "stop-krakow",
      slug: "krakow",
      city: "Kraków",
      country: "Poland",
      lat: 50.0647,
      lng: 19.945,
      order: 3,
      nights: 2,
      dateFrom: "2026-06-24",
      dateTo: "2026-06-26",
      summary:
        "A UNESCO-listed old town that came through the war virtually unscathed — and the base for the day at Auschwitz.",
      activities: [
        {
          id: "krakow-czestochowa",
          title: "Częstochowa en route",
          description:
            "On the drive south from Warsaw, a stop at the Jasna Góra monastery — Poland's great pilgrimage site, home to the Black Madonna.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("krakow-czestochowa", 2),
        },
        {
          id: "krakow-auschwitz",
          title: "Auschwitz-Birkenau Memorial",
          description:
            "A moving guided visit to the site of the former concentration camp — the heaviest, most important day of the trip.",
          isHighlight: true,
          sortOrder: 2,
          photos: slots("krakow-auschwitz", 6),
        },
        {
          id: "krakow-city",
          title: "Kraków city tour",
          description:
            "A walk through Kazimierz, the Old Jewish Quarter, plus St. Mary's Church and a photo stop at Wawel Castle.",
          isHighlight: false,
          sortOrder: 3,
          photos: slots("krakow-city", 3),
        },
        {
          id: "krakow-wieliczka",
          title: "Wieliczka Salt Mine",
          description:
            "Down 136 metres into a UNESCO-listed labyrinth carved entirely from salt — tunnels, a subterranean lake, and the astonishing Chapel of St. Kinga, salt from chandelier to altarpiece.",
          isHighlight: false,
          sortOrder: 4,
          photos: slots("krakow-wieliczka", 3),
        },
      ],
    },
    {
      id: "stop-budapest",
      slug: "budapest",
      city: "Budapest",
      country: "Hungary",
      lat: 47.4979,
      lng: 19.0402,
      order: 4,
      nights: 2,
      dateFrom: "2026-06-26",
      dateTo: "2026-06-28",
      summary: "The 'Pearl of the Danube,' reached through Slovakia.",
      activities: [
        {
          id: "budapest-donovaly",
          title: "Donovaly, Slovakia en route",
          description:
            "Three countries in a day: a scenic pause at the alpine ski resort of Donovaly, near two national parks, on the way from Poland into Hungary.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("budapest-donovaly", 1),
        },
        {
          id: "budapest-cruise",
          title: "Danube dinner cruise",
          description:
            "An evening cruise down the Danube with a Hungarian buffet, past Margaret Island, the Parliament, Castle Hill with Fishermen's Bastion, the Royal Palace, and the Citadel on Gellért Hill.",
          isHighlight: false,
          sortOrder: 2,
          photos: slots("budapest-cruise", 2),
        },
        {
          id: "budapest-city",
          title: "Budapest sightseeing",
          description:
            "A guided tour taking in Heroes' Square and a panoramic view of Fishermen's Bastion.",
          isHighlight: false,
          sortOrder: 3,
          photos: slots("budapest-city", 3),
        },
        {
          id: "budapest-unicum",
          title: "Hungarian Sips",
          description:
            "A taste of Unicum, Hungary's celebrated herbal liqueur, straight from the barrel at the House of Unicum.",
          isHighlight: false,
          sortOrder: 4,
          photos: slots("budapest-unicum", 1),
        },
      ],
    },
    {
      id: "stop-vienna",
      slug: "vienna",
      city: "Vienna",
      country: "Austria",
      lat: 48.2082,
      lng: 16.3738,
      order: 5,
      nights: 2,
      dateFrom: "2026-06-28",
      dateTo: "2026-06-30",
      summary: "The City of Music, across the border in Austria.",
      activities: [
        {
          id: "vienna-city",
          title: "Vienna sightseeing",
          description:
            "A drive along the grand Ringstrasse with photo stops at the Hofburg Palace and Heldenplatz, and a visit to St. Stephen's Cathedral and its Romanesque Giant's Door.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("vienna-city", 3),
        },
        {
          id: "vienna-free",
          title: "A free day in Vienna",
          description:
            "Museums, shops, and Viennese coffee-house culture — a kaffee und kuchen in one of the city's elegant cafés.",
          isHighlight: false,
          sortOrder: 2,
          photos: slots("vienna-free", 1),
        },
        {
          id: "vienna-concert",
          title: "Austrian dinner & classical concert",
          description:
            "A three-course dinner of Viennese specialties followed by arias, waltzes and polkas from Strauss, Lehár, and Mozart in one of Europe's prettiest concert halls.",
          isHighlight: false,
          sortOrder: 3,
          photos: slots("vienna-concert", 2),
        },
      ],
    },
    {
      id: "stop-prague",
      slug: "prague",
      city: "Prague",
      country: "Czech Republic",
      lat: 50.0755,
      lng: 14.4378,
      order: 6,
      nights: 2,
      dateFrom: "2026-06-30",
      dateTo: "2026-07-02",
      summary: "The 'Golden City' — the final stop before the journey home.",
      activities: [
        {
          id: "prague-telc",
          title: "Telč en route",
          description:
            "A light lunch on the UNESCO-listed triangular market square of Telč, amid pastel Renaissance and Baroque townhouses, on the scenic drive through Moravia and Bohemia.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("prague-telc", 2),
        },
        {
          id: "prague-illuminated",
          title: "Illuminated Prague & tavern visit",
          description:
            "An evening walk through the lit-up Old Town, a Czech beer in a local tavern, and a crossing of the 14th-century Charles Bridge for the view of Prague Castle.",
          isHighlight: false,
          sortOrder: 2,
          photos: slots("prague-illuminated", 2),
        },
        {
          id: "prague-city",
          title: "Prague sightseeing",
          description:
            "A guided tour to the Astronomical Clock and the Hradčany Castle grounds.",
          isHighlight: false,
          sortOrder: 3,
          photos: slots("prague-city", 3),
        },
        {
          id: "prague-czech-please",
          title: "Czech, please!",
          description:
            "A guided culinary walk through three local eateries — savory to sweet, finishing with a traditional kolache.",
          isHighlight: false,
          sortOrder: 4,
          photos: slots("prague-czech-please", 2),
        },
      ],
    },
    {
      id: "stop-berlin-return",
      slug: "berlin-return",
      city: "Berlin",
      country: "Germany",
      lat: 52.52,
      lng: 13.405,
      order: 7,
      nights: 1,
      dateFrom: "2026-07-02",
      dateTo: "2026-07-03",
      summary: "Back where it started, for a farewell night and the flight home.",
      activities: [
        {
          id: "berlin-return-dresden",
          title: "Home via Dresden",
          description:
            "On the final leg back to Berlin, a stop in Dresden for the Baroque courtyard of the Zwinger Palace, then a farewell dinner in the city where it all began.",
          isHighlight: false,
          sortOrder: 1,
          photos: slots("berlin-return", 2),
        },
        {
          id: "berlin-return-depart",
          title: "Departure",
          description: "The tour ended after breakfast — auf Wiedersehen, Berlin.",
          isHighlight: false,
          sortOrder: 2,
          photos: [],
        },
      ],
    },
  ],
};

export const sampleTrips: Trip[] = [sampleTrip];
