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

// Helper: uploaded photos with per-photo captions. Each entry is [number, caption];
// the number is the NN in <group>-NN.jpg, which lets us skip removed shots.
function storedCaptioned(
  dir: string,
  group: string,
  entries: [number, string | null][],
): Photo[] {
  return entries.map(([num, caption], i) => {
    const nn = String(num).padStart(2, "0");
    return {
      id: `${group}-${nn}`,
      src: `${dir}/${group}/${group}-${nn}.jpg`,
      caption,
      sortOrder: i + 1,
    };
  });
}

// Like stored(), but with a per-photo caption (in order). Length sets the count.
function captioned(
  dir: string,
  group: string,
  captions: (string | null)[],
): Photo[] {
  return captions.map((caption, i) => {
    const nn = String(i + 1).padStart(2, "0");
    return {
      id: `${group}-${nn}`,
      src: `${dir}/${group}/${group}-${nn}.jpg`,
      caption,
      sortOrder: i + 1,
    };
  });
}

export const sampleTrip: Trip = {
  id: "best-of-eastern-europe",
  slug: "eastern-europe",
  title: "The Best of Eastern Europe",
  subtitle: "Fourteen days, six countries, a guided Globus tour",
  summary:
    "Two weeks across Eastern Europe on Globus's “Best of Eastern Europe” tour. Starting and ending in Berlin, the route ran through Poland, with a sobering day at Auschwitz, and on to Budapest, Vienna, and Prague. Here's the journey, city by city.",
  tourOperator: "Globus",
  startDate: "2026-06-19",
  endDate: "2026-07-03",
  coverPhoto: { id: "cover-1", src: "eastern-europe/cover-01.jpg", caption: null, sortOrder: 0 },
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
        "Where the tour began. We arrived a day early and spent a self-guided first day among Berlin's museums before meeting the group.",
      activities: [
        {
          id: "berlin-museum-island",
          title: "Museum Island",
          description:
            "Before the rest of the day, a walk out onto Museum Island, the cluster of grand nineteenth-century museums set on an island in the Spree. We took most of them in from outside, and stepped into one.",
          isHighlight: false,
          sortOrder: 1,
          photos: captioned("eastern-europe/berlin", "museum-island", [
            "The Alte Nationalgalerie, its temple front raised on a high plinth with Friedrich Wilhelm IV on horseback at the head of the stairs. We admired it from outside but didn't go in.",
            "The Bode Museum at the northern tip of the island, its copper dome and neo-Baroque front rising where the Spree divides around Museumsinsel.",
            "Inside the Bode, the bronze equestrian statue of the Great Elector under the dome, above a sweep of red carpet. The collection was mostly religious art, so this was the only photo I took.",
          ]),
        },
        {
          id: "berlin-technikmuseum",
          title: "Deutsches Technikmuseum",
          description:
            "With a free day before the tour, a self-guided morning at the Deutsches Technikmuseum, aircraft, locomotives, and hands-on exhibits across its sprawling halls.",
          isHighlight: false,
          sortOrder: 2,
          photos: storedCaptioned("eastern-europe/berlin", "technikmuseum", [
            [1, "In the aviation hall, the corrugated Junkers Ju 52 in Lufthansa colours, framed by a neighbor's brightly painted wing overhead."],
            [2, "Looking down over the maritime hall and its centrepiece, the Kaffe barge, a roof-tile cargo boat that sank in the Havel off Spandau around 1855 and was raised in 1987."],
            [14, "The same barge at floor level, its weathered ribs and planking laid open. The hull, cabin, and rudder are original; the mast, sail, and rigging were reconstructed by the museum."],
            [3, "An early glider of the kind Otto Lilienthal pioneered, the fragile beginning of human flight."],
            [4, "Aircraft strung throughout the atrium, from a Swiss-marked trainer to a delicate early glider."],
            [5, "A wartime fighter overhead, still wearing its Luftwaffe cross."],
            [6, "Early jet engines, one cut open to show the workings of a turbojet."],
            [7, "The Ju 52 from the side, D-AZAW in Lufthansa livery, with travelers dressed for the 1930s about to board."],
            [9, "A Messerschmitt Bf 110 head-on, flight gear and life vests laid out in the cases below."],
            [10, "A swept-wing Cold War jet overhead, a battered propeller from an earlier era beneath it."],
            [11, "The Bf 110 again from the side, among the aircraft packed wing to wing across the hall."],
            [12, "A V-1 flying bomb and other munitions, hung against photographs of the bombed city."],
            [13, "The watersports hall, historic sailing dinghies rigged and hung above the story of boating on Berlin's Havel and Spree."],
            [15, "The tugboat Kurt-Heinz (SB2-804), a preserved Berlin workboat filling one end of the maritime hall."],
          ]), // 08 was a duplicate; 13-15 (watersports, barge, tug) added later
        },
        {
          id: "berlin-naturkunde",
          title: "Museum für Naturkunde",
          description:
            "Berlin's Museum of Natural History, home to the world's tallest mounted dinosaur skeleton. It didn't quite win us over, though, hence only a couple of photos.",
          isHighlight: false,
          sortOrder: 3,
          photos: storedCaptioned("eastern-europe/berlin", "naturkunde", [
            [1, "The wet collection, a glowing glass vault of thousands of creatures preserved in alcohol and one of the museum's signature sights."],
            [2, "A towering Tyrannosaurus rex skeleton in the dinosaur hall."],
          ]),
        },
        {
          id: "berlin-welcome",
          title: "Welcome dinner",
          description:
            "Met the Tour Director and traveling companions over a welcome dinner at the hotel.",
          isHighlight: false,
          sortOrder: 4,
          photos: captioned("eastern-europe/berlin", "welcome", [
            "The whole tour group together. We didn't get a photo at the welcome dinner, so this one is from the end of the trip.",
          ]),
        },
        {
          id: "berlin-historic",
          title: "Historic Berlin",
          description:
            "A guided walk through Berlin's twentieth-century history, roughly in this order: a marker tracing the line of the Berlin Wall, Checkpoint Charlie, the Topographie des Terrors beside a surviving stretch of the Wall, and the Memorial to the Murdered Jews of Europe. That memorial sits directly across from the deliberately unmarked site of the Führerbunker, said to be a quiet, pointed slight against Hitler. From there to the Brandenburg Gate, and finally the Kurfürstendamm. The Reichstag stayed out of reach behind a city event, and the State Opera House slipped past without a photo.",
          isHighlight: false,
          sortOrder: 5,
          photos: storedCaptioned("eastern-europe/berlin", "historic-berlin", [
            [1, "A double line of cobblestones and this bronze strip, “Berliner Mauer 1961–1989”, trace where the Wall once cut through the city."],
            [2, "Checkpoint Charlie: the Cold War crossing between the American and Soviet sectors, and its famous four-language sign."],
            [3, "The reverse side, “You are entering the American sector.”"],
            [4, "Us at the Checkpoint Charlie guard house."],
            [5, "The Topographie des Terrors, on the cleared site of the Gestapo and SS headquarters, with a preserved stretch of Wall out front."],
            [6, "Beneath the walkway, the excavated cellars where the SS and Gestapo once held and interrogated prisoners."],
            [7, "One of the longest surviving stretches of the Wall, pitted and rebar-bared by years of souvenir-hunting “wall-peckers.”"],
            [8, "The Memorial to the Murdered Jews of Europe: Peter Eisenman's field of 2,711 concrete stelae, rising and falling like a swell underfoot."],
            [9, "The site of the Führerbunker, where Hitler spent his final days in 1945. Left deliberately unmarked and now, fittingly, a car park. The Memorial to the Murdered Jews of Europe stands just across the way."],
            [10, "Down Straße des 17. Juni to the Siegessäule, the Victory Column, its gilded Victoria catching the sun above the Tiergarten."],
            [14, "The Victory Column up close, its shaft ringed with gilded gun barrels and topped by the golden Victoria that Berliners nicknamed “Goldelse.”"],
            [15, "The Soviet War Memorial on Straße des 17. Juni, just west of the Brandenburg Gate. Built in 1945, its curved colonnade is crowned by a bronze Red Army soldier and honours the Soviet dead of the Battle of Berlin."],
            [11, "The Brandenburg Gate, once stranded in the Wall's no-man's-land, now Berlin's symbol of reunification."],
            [12, "Up close: the Quadriga, victory driving her four-horse chariot atop the gate."],
            [13, "On the Kurfürstendamm, the Kaiser Wilhelm Memorial Church, its bomb-shattered spire left unrepaired as a memorial, nicknamed by Berliners “the hollow tooth.”"],
          ]),
        },
        {
          id: "berlin-potsdam",
          title: "Half-Day Potsdam Discovery",
          description:
            "Out to Potsdam: the House of the Wannsee Conference, the gardens of Sanssouci Palace, the Dutch Quarter and the Alexandrowka Russian colony, and the Glienicke Brücke, the Cold War 'Bridge of Spies.'",
          isHighlight: false,
          sortOrder: 6,
          photos: captioned("eastern-europe/berlin", "potsdam", [
            "The House of the Wannsee Conference. In this lakeside villa, on 20 January 1942, fifteen senior Nazi officials met for barely ninety minutes to coordinate the “Final Solution to the Jewish Question.” I had just watched the film Nuremberg, and standing here was surreal. A place this beautiful was where the murder of millions was set in motion.",
            "Inside, a facsimile of Hitler's letter of 1 September 1939 authorising the murder of the “incurably ill,” dated to the very day the war began. It is the only surviving written order from Hitler to kill an entire group of people.",
            "Göring's authorisation of 31 July 1941 tasking Reinhard Heydrich with preparing a “comprehensive solution of the Jewish question.” This is the order that led Heydrich to convene the conference in this house. Seeing the actual paperwork, lives reduced to bureaucratic language, was the hardest part of the day.",
            "Into Potsdam's old centre, and a lighter mood: the rebuilt City Palace, now the Brandenburg state parliament, entered through the Fortuna Portal with its gilded figure of Fortune on top.",
            "The obelisk on the Alter Markt, Potsdam's historic market square, framed by the Potsdam Museum and, in yellow, the Museum Barberini.",
            "The Baroque Old Town Hall on the same square, crowned by a gilded Atlas shouldering the globe. It now forms part of the Potsdam Museum.",
            "St. Nicholas' Church, its huge green dome the work of Karl Friedrich Schinkel, rising behind the obelisk.",
            "On to Sanssouci. Twin colonnades frame the park, with a hilltop folly closing the view in the distance.",
            "Sanssouci itself, Frederick the Great's summer palace. Its name, French for “without a care,” runs across the front, where sculpted atlantes stand in for columns along the golden-yellow façade.",
            "The view from the terrace down over the fountain and the great parterre, the gardens rolling out toward the town.",
          ]),
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
            "A break in Poznań, one of Poland's oldest cities, to wander the colourful Old Market Square, where the Town Hall clock's mechanical goats butt heads at noon.",
          isHighlight: false,
          sortOrder: 1,
          photos: [
            {
              id: "poznan-01",
              src: "eastern-europe/warsaw/poznan/poznan-01.jpg",
              caption:
                "Making our way through the old town toward the Stary Rynek, Poznań's Old Market Square, flags hanging from the merchant houses.",
              sortOrder: 1,
            },
            {
              id: "poznan-02",
              src: "eastern-europe/warsaw/poznan/poznan-02.jpg",
              caption:
                "The square opens up, the Renaissance Town Hall with its arcaded loggia on the right, colourful merchant houses ranged down the far side.",
              sortOrder: 2,
            },
            {
              id: "poznan-03",
              src: "eastern-europe/warsaw/poznan/poznan-03.jpg",
              caption:
                "The Town Hall up close. Its tower was under wraps for restoration, but the painted Renaissance façade and its little turrets still held the square.",
              sortOrder: 3,
            },
            {
              id: "poznan-04",
              src: "eastern-europe/warsaw/poznan/poznan-04.jpg",
              videoSrc: "eastern-europe/warsaw/poznan/poznan-04.mp4",
              caption:
                "Every day at noon, two mechanical billy goats emerge above the Town Hall clock and butt heads twelve times, Poznań's best-loved tradition. We waited for midday to catch it.",
              sortOrder: 4,
            },
            {
              id: "poznan-05",
              src: "eastern-europe/warsaw/poznan/poznan-05.jpg",
              caption:
                "A flower-draped restaurant front under the arcades just off the square, tables set out in the sun.",
              sortOrder: 5,
            },
            {
              id: "poznan-06",
              src: "eastern-europe/warsaw/poznan/poznan-06.jpg",
              caption:
                "One of the bronze fountains around the square, a helmeted, spear-bearing Mars, the god of war, mid-stride.",
              sortOrder: 6,
            },
            {
              id: "poznan-07",
              src: "eastern-europe/warsaw/poznan/poznan-07.jpg",
              caption:
                "A last look across the Stary Rynek: café umbrellas, the Proserpina Fountain, and the scaffolded tower rising over the pastel houses.",
              sortOrder: 7,
            },
          ],
        },
        {
          id: "warsaw-oldtown",
          title: "Old Town & St. John's Cathedral",
          description:
            "A guided walk through the rebuilt medieval Stare Miasto and the Cathedral of St. John, on into the New Town and past the city's great memorials to the Warsaw Uprising and the Ghetto Heroes.",
          isHighlight: false,
          sortOrder: 2,
          photos: storedCaptioned("eastern-europe/warsaw", "oldtown", [
            [1, "Castle Square, where the Old Town begins. Sigismund's Column, raised in 1644 to King Sigismund III Vasa, who moved the capital from Kraków to Warsaw, stands over the pastel merchant houses."],
            [2, "The Royal Castle on Castle Square, seat of Poland's kings and parliament. Blown up by the Germans in 1944, it was rebuilt from nothing between 1971 and 1984."],
            [3, "The brick Gothic front of St. John's Archcathedral, the oldest church in Warsaw and, like the rest of the Old Town, raised again after the war. The banner honours the beatified Cardinal Stefan Wyszyński."],
            [4, "Inside St. John's, the whitewashed Gothic nave under its ribbed vault, hung with Polish military and heraldic banners above the checkerboard aisle."],
            [5, "Tall stained-glass windows light the side aisle, over a marble monument and bronze memorials to figures of Polish history."],
            [6, "Looking up into the star-vaulting, ranks of red-and-white banners carrying the Polish eagle and old coats of arms."],
            [7, "The chancel and its carved choir stalls, a venerated icon of the Madonna set above the high altar between the stained glass."],
            [8, "At the west end, the organ on its gallery above the door, banners hanging the length of the nave."],
            [9, "The Old Town Market Square, ringed by reconstructed burghers' houses in candy colours, cafe umbrellas filling the middle. The Museum of Warsaw lines the far side."],
            [10, "The Warsaw Mermaid at the heart of the square, sword and shield raised. The Syrenka is the city's emblem and, by legend, its sworn protector."],
            [11, "The Barbican, the round red-brick outwork that guarded the gate between the Old and New Towns, rebuilt after the war from old prints and paintings."],
            [12, "Up on the restored medieval walls that ring the Old Town, the rampart walk running along the battlements."],
            [13, "Into the New Town, to the house on ulica Freta where Maria Skłodowska-Curie was born in 1867, now a museum to the twice Nobel-winning scientist."],
            [17, "The Monument to the Warsaw Uprising on Krasiński Square: bronze insurgents charging out from beneath a great tilting slab, the columned Supreme Court behind."],
            [14, "Closer in on the same monument, fighters breaking from the rubble with a chaplain at their side."],
            [15, "The Monument to the Ghetto Heroes, on the ground of the former Warsaw Ghetto. Nathan Rapoport's 1948 memorial to the fighters of the 1943 uprising, a menorah set before it. Willy Brandt knelt here in 1970."],
            [16, "The monument to Jan Kiliński, the master shoemaker who led Warsaw's townsfolk in the 1794 uprising against the Russian garrison, sabre raised on Podwale by the Old Town walls."],
          ]),
        },
        {
          id: "warsaw-chopin",
          title: "Chopin concert",
          description:
            "An evening Chopin recital by Prof. Maciej Poliszewski at the Fryderyk Concert Hall, a program running from the G minor Ballade and the Op. 41 Mazurkas to the “Heroic” Polonaise.",
          isHighlight: false,
          sortOrder: 3,
          photos: captioned("eastern-europe/warsaw", "chopin", [
            "The Fryderyk Concert Hall, chandeliers and portraits of Chopin looking on over the grand piano, just before the recital began.",
            "The evening's program, all Chopin: the Ballade, three Mazurkas, a Scherzo, three Waltzes, and the “Heroic” Polonaise.",
          ]),
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
        "A UNESCO-listed old town that came through the war virtually unscathed, and the base for the day at Auschwitz.",
      activities: [
        {
          id: "krakow-czestochowa",
          title: "Częstochowa en route",
          description:
            "On the drive south from Warsaw, a stop at the Jasna Góra monastery, Poland's great pilgrimage site, home to the Black Madonna.",
          isHighlight: false,
          sortOrder: 1,
          photos: captioned("eastern-europe/krakow", "czestochowa", [
            "The approach to Jasna Góra, a broad avenue walled in brick and lined with the flags of pilgrim nations, the monastery tower waiting at the far end.",
            "The monastery's bell tower, at 106 metres the tallest historic church tower in Poland, rising white above the ramparts.",
            "One of the great vaulted halls inside, hung with the embroidered banners of pilgrimage groups who have walked here for centuries.",
            "A case in the monastery museum: historic musical instruments from Jasna Góra's long tradition of sacred music, violins and harps and horns behind glass.",
            "A painted copy of the Black Madonna of Częstochowa. Mass was underway in the chapel where the original hangs, so this faithful reproduction was as close as the camera could get.",
          ]),
        },
        {
          id: "krakow-auschwitz",
          title: "Auschwitz-Birkenau Memorial",
          description:
            "Auschwitz-Birkenau was the largest of the Nazi German concentration and extermination camps. Between 1940 and 1945 at least 1.3 million people were deported here and roughly 1.1 million were murdered, about nine in ten of them Jews, along with Poles, Roma, Soviet prisoners of war, and others. Coming here is not sightseeing. It is a place to stand with the people who were taken here, and to hold on to what it asks of anyone who comes: that this was carried out by a modern state and ordinary people, within living memory, and that remembering it honestly is part of how it is kept from happening again. Visiting was one of the reasons I chose this route. It was the most important day of the trip, and the hardest.\n\nA note on the photographs that follow: some are hard to look at. Inside several of the buildings we were asked not to take pictures, out of respect for the dead, and those rooms are not shown here.",
          isHighlight: false,
          sortOrder: 2,
          photos: captioned("eastern-europe/krakow", "auschwitz", [
            'The gate into Auschwitz I, and its iron sign: ARBEIT MACHT FREI, "work sets you free." It was a lie. The words hung over the entrance the work columns passed twice a day, and almost no one was ever set free.',
            "Arriving at Auschwitz I under the willows. The site is a museum and memorial now, but these brick blocks were the camp itself, built up around a former Polish army barracks.",
            "Walking in along the perimeter, a wooden fence on one side and a guard tower ahead. Everything here was built to keep people from leaving.",
            "Rows of barracks behind the double line of electrified fence, the concrete posts curving inward to carry the wire.",
            "A street between the blocks. Part of what unsettles you here is how ordinary it looks: brick buildings, trees, gravel roads, all built to run a machine of murder.",
            "Between the two-story blocks. Each held hundreds of prisoners in conditions meant to kill slowly, through hunger, cold, and disease.",
            "The tree-lined road through the camp, quiet now.",
            "Another of the camp streets. The blocks are numbered, and many now hold the museum's exhibitions.",
            "One of the brick blocks. Several are given over to the main exhibition, room after room documenting who was brought here and what was done to them.",
            "A map of the deportations: lines drawn from ghettos, transit camps, and prisons across occupied Europe, all converging on Auschwitz.",
            "The memorial's plain statement of the toll. At least 1.3 million people deported, about 1.1 million killed, some 90 percent of them Jews, most murdered in the gas chambers.",
            "Inside the exhibition, walls of photographs of the deportations, beside a column counting the numbers brought from each country.",
            "An enlarged photograph from 1944: families with their bundles beside the freight cars, just after arrival, before they understood what waited.",
            '"Before the selection." Newly arrived people massed on the Birkenau ramp, waiting for the SS to divide them, most sent straight to the gas.',
            '"After the selection." The same ramp cleared, SS men among the cattle cars and the belongings left on the ground.',
            "A drawing in the exhibition of the deportees, huddled and afraid, a human answer to the perpetrators' own photographs.",
            "Behind glass, empty canisters of Zyklon B, the poison the SS used to murder people in the gas chambers.",
            "Confiscated suitcases, many still painted with their owners' names and addresses, packed by people who were told they were being resettled.",
            "A corridor inside one of the blocks, the floor worn smooth by prisoners once and by those who come to remember them now.",
            "A room kept furnished as it was: a single bed, a cupboard, a table, spare and cold.",
            "Worn blankets spread across a barrack floor, beneath a photograph from the camp's final days.",
            "The Death Wall, between Blocks 10 and 11, where the SS shot thousands of prisoners. People still lay wreaths and candles here.",
            "A watchtower set into the perimeter wall, the electrified fence running out to either side.",
            "The narrow ground between two blocks, hemmed in by the double electrified fence.",
            "The fences run the length of the camp, post after post, wire above wire.",
            "The entrance to the gas chamber and crematorium of Auschwitz I, dug into an earth mound. Inside, we were asked not to photograph, and it is right that some places stay unphotographed.",
            "Three kilometres away lies Birkenau, or Auschwitz II, built when Auschwitz I could no longer hold the numbers. The gatehouse from within the camp, its long brick wing running off along the perimeter.",
            "The same gatehouse from the front, the way the transports approached it, the arch the prisoners called the Gate of Death with the railway running straight through it into the camp.",
            "The single track leading in, vanishing toward the horizon. The trains stopped on this ramp, and the selections were made where they stood.",
            "One of the surviving wooden barracks. They were built to a design for army horse stables, and each was packed with hundreds of people.",
            "Inside a barrack, the brick flue that ran down the middle for a heat that rarely came. Prisoners were crammed onto wooden bunks along the walls.",
            "The latrine barrack, a long concrete bench pierced with holes. Prisoners were allowed here only briefly, and only at set times.",
            "The scale of Birkenau is hard to take in. Paths and a watchtower reach out across a field where hundreds of barracks once stood.",
            "Where the barracks were pulled down or burned, the brick chimneys and lines of fence posts still stand across the grass.",
            "A last look: one fence post, its insulators and wire, against an open sky. The camp was liberated in January 1945, and what remains is kept so that no one can ever say it did not happen.",
          ]),
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
            "Down 136 metres into a UNESCO-listed labyrinth carved entirely from salt, tunnels, a subterranean lake, and the astonishing Chapel of St. Kinga, salt from chandelier to altarpiece.",
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
            "Museums, shops, and Viennese coffee-house culture, a kaffee und kuchen in one of the city's elegant cafés.",
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
      summary: "The 'Golden City', the final stop before the journey home.",
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
            "A guided culinary walk through three local eateries, savory to sweet, finishing with a traditional kolache.",
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
          description: "The tour ended after breakfast, auf Wiedersehen, Berlin.",
          isHighlight: false,
          sortOrder: 2,
          photos: [],
        },
      ],
    },
  ],
};

export const sampleTrips: Trip[] = [sampleTrip];
