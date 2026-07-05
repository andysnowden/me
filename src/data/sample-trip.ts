import type { Photo, Trip } from "@/lib/types";

// Real itinerary: Globus "The Best of Eastern Europe" (Tour RO 60620),
// land dates June 19 – July 3, 2026. Route: Berlin → Warsaw → Kraków →
// Budapest → Vienna → Prague, returning to Berlin. Photos are placeholders
// until uploaded (empty `src` renders a "photo coming soon" slot).
//
// The app reads this only when Supabase env vars are absent (see src/lib/trips.ts);
// the live site reads the matching seed in supabase/seed.sql.

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
          id: "krakow-wieliczka",
          title: "Wieliczka Salt Mine",
          description:
            "Down 136 metres into a UNESCO-listed labyrinth carved entirely from salt, tunnels, a subterranean lake, and the astonishing Chapel of St. Kinga, salt from chandelier to altarpiece.",
          isHighlight: false,
          sortOrder: 3,
          photos: storedCaptioned("eastern-europe/krakow", "wieliczka", [
            [1, "The gated shaft at the surface. From here the tour heads down into the oldest part of the mine, worked for salt since the 13th century."],
            [2, "The Antonia fore-shaft, mid-17th century, a woven basket still hanging from its hoist rope in the timbered dark."],
            [3, "Chamber Urszula, its roof held up by great stacked-log cribbing. The whole mine is shored with timber like this."],
            [4, "One of the towering timbered chambers, braced floor to ceiling with wood and topped by an old winding wheel."],
            [5, "An old winding machine of timber and rope, once worked by hand to raise salt and men through the levels."],
            [6, "A horse-powered gin, the kind of treadmill a blindfolded horse walked in circles to haul salt up the shafts. Horses lived their whole lives down here."],
            [7, "A diorama of the beginnings: long before the deep mine, people boiled the salty spring water here to draw out the salt."],
            [8, "The legend of Saint Kinga, carved in salt. The Hungarian princess is said to have thrown her ring into a salt mine at home, and when miners sank the first shaft at Wieliczka they found it in the first lump of salt."],
            [9, "Salt figures of the methane burners at work. The gas gathered along the ceilings, so a miner would crawl below it and reach up a lit torch on a long pole to burn it away before it could build to an explosion."],
            [10, "The salt shows itself everywhere, here as a rough white crust blooming across the ceiling of a chamber."],
            [11, "The Kunegunda Chamber, lit in colour and peopled with salt dwarfs. The miners carved them in tribute to the old legends of the little folk who guard the treasures of the mine."],
            [12, "A monument to Nicolaus Copernicus carved from salt, set up in 1973 for the 500th anniversary of his birth. He is said to have visited the mine as a young man."],
            [13, "The doorway to the Chapel of St. Anthony, the oldest of the mine's chapels, carved at the end of the 17th century so miners could hear Mass before their shift."],
            [16, "St. Kinga's Chapel, the great one, over 100 metres down and more than 50 metres long. Miners spent decades carving it. Everything here is salt: the walls, the altars, the chandeliers, even the tiled floor underfoot."],
            [14, "The Flight into Egypt, one of the salt reliefs carved into the chapel walls, Joseph leading the donkey with Mary and the child on toward a domed city."],
            [15, "A copy of Leonardo's Last Supper cut in low relief into the salt wall of the chapel."],
            [17, "One of the largest reliefs, a whole town worked into the rock with a lit Nativity set at its heart."],
            [18, "Another scene carved straight into the salt, framed and lit against the grey wall."],
            [19, "An underground lake, still and green under the lights. The water is brine, so dense with salt that you would float on it like the Dead Sea."],
            [20, "A low passage between chambers, a channel cut to carry the brine that constantly weeps from the walls."],
            [21, "A brick-and-timber corridor linking the workings, propped and arched against the weight of the rock."],
            [22, "The Daniłowicz Shaft, sunk in the 1630s and still the way in and out. From here the lift carried us back up to daylight."],
          ]),
        },
        {
          id: "krakow-city",
          title: "Kraków city tour",
          description:
            "A guided walk through the old town. The extreme heat that day trimmed the route: the planned walk through Kazimierz, Kraków's old Jewish quarter, was dropped. We spent the time instead in St. Mary's Basilica on the Main Market Square, under its blue star-painted vault and before the great carved altarpiece of Veit Stoss, with a stop across the river at the Ghetto Heroes Square in Podgórze.",
          isHighlight: false,
          sortOrder: 4,
          photos: captioned("eastern-europe/krakow", "citytour", [
            "St. Mary's Basilica on the Main Market Square, its two unequal brick Gothic towers over the old town. Every hour a trumpeter sounds the hejnał from the taller tower, breaking off mid-note in memory of a medieval bugler.",
            "Inside, the nave opens toward the chancel under a vault painted deep blue and scattered with gold stars.",
            "The star-spangled vault overhead, nineteenth-century painting by Jan Matejko and his pupils over the medieval ribs.",
            "The chancel, its tall Gothic windows bright with stained glass above the great carved altarpiece.",
            "The altarpiece up close: the high altar of Veit Stoss, finished in 1489, its central scene the Dormition of the Virgin among the Apostles. It is the largest Gothic altarpiece in the world.",
            "Turning back toward the west end, the organ on its gallery and the painted columns leading the eye down the nave.",
            "Plac Bohaterów Getta in Podgórze, the square from which Kraków's Jews were deported. Its field of empty bronze chairs, set out in 2005, stands for the people and the belongings taken from the ghetto.",
          ]),
        },
        {
          id: "krakow-polka",
          title: "Polish Polka and Dinner Party",
          description:
            "An optional evening out at a country tavern: a Polish dinner of hearty traditional dishes and wine, with a costumed troupe playing folk and polka tunes and dancing between the courses.",
          isHighlight: false,
          sortOrder: 5,
          photos: captioned("eastern-europe/krakow", "polka", [
            "The folk troupe in full swing, a dancer's skirt flying and her partner leading her by the hand, with an accordion and a double bass behind. They played and danced between the courses.",
          ]),
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
          id: "budapest-cruise",
          title: "Danube dinner cruise",
          description:
            "An evening cruise down the Danube with a Hungarian buffet, past Margaret Island, the Parliament, Castle Hill with Fishermen's Bastion, the Royal Palace, and the Citadel on Gellért Hill.",
          isHighlight: false,
          sortOrder: 1,
          photos: captioned("eastern-europe/budapest", "danube", [
            "Casting off at golden hour. The Buda bank slides past, the twin baroque towers of St. Anne's Church on Batthyány Square catching the last of the sun.",
            "The Hungarian Parliament, lit gold from the water. Imre Steindl's vast neo-Gothic building runs along the Pest bank, its dome rising 96 metres, a nod to the year 896 when the Magyars are said to have arrived.",
            "Buda Castle up on Castle Hill, the old Royal Palace with its green dome. The crane is part of the long restoration of the palace quarter.",
            "The long river front of the Budapest University of Technology on the Buda bank, red roofs and corner towers in the evening light.",
            "On the Pest bank, the old Main Customs House by Miklós Ybl, now part of Corvinus University, a river cruiser moored below.",
            "The monument to Saint Gellért on the side of the hill that bears his name, a bishop raising his cross inside a curving colonnade, a waterfall tumbling beneath.",
            "The Cave Church set into the rock of Gellért Hill, its little neo-Romanesque front built onto a natural cave.",
            "A cross planted on the bare crag of Gellért Hill, a small chapel at its foot.",
            "The Liberty Statue on the summit, a woman holding a palm frond high over the city. Raised in 1947, she has watched over Budapest ever since.",
            "Under way at sunset, the green ironwork of Liberty Bridge ahead and the sky going pink over the water.",
            "One of Margaret Bridge's stone piers up close, carved with a winged figure crowned in laurel, resting on a shield amid trophies of arms. Its French sculptor set a group like this on each pier in the 1870s.",
            "Mom and I on the deck as the sun went down over the Danube, one of the bridges behind us.",
          ]),
        },
        {
          id: "budapest-city",
          title: "Budapest sightseeing",
          description:
            "The planned city drive was meant to take in Heroes' Square and Fishermen's Bastion, but the city was packed with events that week and the tour went a bit off script. We could not stop at either and came away without photos from the drive itself. The one picture here, of the Shoes on the Danube Bank, was taken by another member of our group.",
          isHighlight: false,
          sortOrder: 2,
          photos: captioned("eastern-europe/budapest", "sightseeing", [
            "The Shoes on the Danube Bank, sixty pairs of iron shoes fixed to the embankment. They remember the Jews who were shot into the river here in the winter of 1944 and 1945, ordered to leave their shoes at the water's edge first. A member of our group took this at sunset.",
          ]),
        },
        {
          id: "budapest-unicum",
          title: "Hungarian Sips",
          description:
            "A taste of Unicum, Hungary's celebrated herbal liqueur, straight from the barrel at the House of Unicum.",
          isHighlight: false,
          sortOrder: 3,
          photos: captioned("eastern-europe/budapest", "unicum", [
            "Bottles of Unicum in the shop, the round dark flask with its white script and red cross. Zwack's bitter herbal liqueur is a Budapest institution, and the exact recipe is still a closely kept family secret.",
            "The House of Unicum, Zwack's home in Budapest, its black tower lettered down the side. On the wall is the old advertisement that made the drink famous: a shipwrecked man reaching for a bottle in the waves.",
            "Inside the distillery, copper pot stills and the green stillroom gear marked Zwack. More than forty herbs and spices go into Unicum, which is then aged in oak.",
            "A great wooden tub of dried botanicals, the roots and herbs that flavour the liqueur, sorted into bays, with the old apothecary cabinets behind.",
            "The herb room, its pine cabinets stacked with amber demijohns and apothecary jars behind chicken wire and rows of little drawers below, Zwack J. és Társai Budapest lettered across the top.",
            "The same room from the doorway, big glass jars with wooden lids holding the dried herbs, drawer after drawer beneath the brick vaults.",
            "A huge old cask fixed to the wall, shelves built into its face, its rim and the iron bung at the base picked out in chipped red paint, a chalk note scrawled across the staves.",
            "Down in the cellar, rows of oak casks with red-painted rims line the passage where the liqueur is left to age, the floor tiled in black and white.",
          ]),
        },
        {
          id: "budapest-concert",
          title: "An evening of Vivaldi",
          description:
            "After the day's touring, Mom and I went to a chamber music concert at St. Michael's Church on Váci utca, an evening of Vivaldi's Four Seasons and other classics.",
          isHighlight: false,
          sortOrder: 4,
          photos: captioned("eastern-europe/budapest", "concert", [
            "St. Michael's Church on Váci utca, the baroque venue for the concert, its banner out front advertising Vivaldi's Four Seasons.",
            "Inside, the gilded high altar under a frescoed ceiling, a grotto shrine to the Virgin off to the left, and music stands set out at the altar rail ready for the players.",
          ]),
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
            "A morning drive along the grand Ringstrasse, then into the old town on foot for St. Stephen's Cathedral. The day was blazingly hot, so most of what I came away with is the cathedral itself. We passed the Hofburg and Heldenplatz as well, but the heat meant I did not stop to photograph them.",
          isHighlight: false,
          sortOrder: 1,
          photos: captioned("eastern-europe/vienna", "sightseeing", [
            "St. Stephen's Cathedral from the square, its great south tower and the roof of glazed tiles laid in bold zigzags. The Steffl, as the Viennese call the tower, climbs to 136 metres.",
            "Looking straight up the south tower from a side street, the tiled roof running off to the left. It took some seventy years to raise and was finished in 1433.",
            "Inside, down the long Gothic nave toward the altar, the ribbed vault rising overhead and the floor laid in red and white.",
            "The Wiener Neustädter Altar, a gilded winged altarpiece from 1447, set beneath the tall traceried windows of the north nave.",
            "The high altar in the chancel, black marble framing a painting of the stoning of Saint Stephen, the church's patron. Baroque work of the 1640s beneath the soaring Gothic stone.",
            "The red marble tomb of Emperor Frederick III, who died in 1493, a massive carved chest that took decades to finish.",
            "The west end, the giant organ on its gallery below the rose window, chairs set out in the nave beneath.",
            "The Gothic stone pulpit, carved around 1500. Along its rail sit the four great teachers of the early Church, and under the stairs the sculptor left a little portrait of himself peering from a window.",
            "Out on the Ring, one of the grand twin museums on Maria-Theresien-Platz, the Museum of Fine Arts and the Natural History Museum facing each other in matching stone.",
            "A formal rose garden off the Ringstrasse, a museum dome rising beyond the clipped trees. Even the shade was warm that afternoon.",
          ]),
        },
        {
          id: "vienna-free",
          title: "A free day in Vienna",
          description:
            "The tour offered an optional day trip to Bratislava, but we spent our free day at Schönbrunn instead, the Habsburgs' summer palace. It reminded us of Versailles: room after gilded room inside, and vast formal gardens outside. It was one of the hottest days of the trip, around 41°C, and we still walked about half the grounds, close to five miles. After the state rooms we came down the Great Parterre to the Neptune Fountain, over to the Japanese garden, the Palm House and the Desert House, and finally the imperial carriage museum, the Wagenburg, before lunch at the Fürstenkarussell bistro (bratwurst for both of us).",
          isHighlight: false,
          sortOrder: 2,
          photos: (() => {
            const p = captioned("eastern-europe/vienna", "schonbrunn", [
              "Schönbrunn Palace across its great forecourt, the long yellow front baking under a cloudless sky. The Habsburgs' summer residence has some 1,400 rooms, and about forty of them are open to walk through.",
              "A map of the grounds by the entrance. From the palace at the bottom we walked up the Great Parterre to the Neptune Fountain, then out to the Japanese garden, the glasshouses, and the carriage museum.",
              "The palace chapel, its altarpiece crowned by a gilded sunburst and cherubs. There has been a chapel on this spot since the palace's earliest days.",
              "The Blue Staircase up to the state rooms, a vast Baroque fresco spread across the ceiling above the red carpet.",
              "The Guards' Room, first of the state rooms, white and gold with crystal chandeliers and a tall porcelain stove in the corner.",
              "The Billiard Room, where callers once waited for an audience with Emperor Franz Joseph, its walls hung with large ceremonial paintings.",
              "The Walnut Room, panelled in carved walnut and gilt beneath a gilt-bronze chandelier. This was Franz Joseph's audience chamber.",
              "One of the private rooms, hung with blue and white flowered silk, a portrait of the young Empress Elisabeth on the wall.",
              "An imperial table laid with white linen and crystal, a portrait of Emperor Franz Joseph in his white tunic looking on.",
              "One of the state salons, white and gold, its mirrors doubling the crystal chandeliers down the room.",
              "A salon hung with big landscape canvases in gilt frames, a full-length portrait and an ornate French clock along the far wall.",
              "The Great Gallery, the palace's grand ballroom, better than forty metres of white and gold beneath its painted ceilings.",
              "The Great Gallery again, this time from the middle of the room looking one way down its length, chandeliers and mirrors all the way.",
              "The same spot, turned the other way, the gallery running back toward the far end under its painted ceiling.",
              "Looking straight up at one of the ceilings, a Baroque fresco of figures adrift in cloud, painted in the 1760s under Maria Theresa.",
              "A close look at one of the gallery's gilded chandeliers, a cascade of scrollwork and candle branches.",
              "The Vieux-Laque Room, its walls set with panels of black and gold East Asian lacquer in carved gilt frames.",
              "A closer look at the lacquer panels, framing a full-length portrait of Emperor Franz Stephan, Maria Theresa's husband.",
              "One of the most lavish rooms of all, panelled in rosewood and hung with small framed miniatures, its ceiling painted overhead.",
              "A state bed heavy with red and silver embroidery, kept now behind glass.",
              "Out into the gardens at last, a small formal garden with clipped lawns and a pair of dark trellised pavilions.",
              "The Great Parterre opening up, its broad walk running between the flowerbeds toward the Gloriette on the ridge.",
              "The Neptune Fountain at the foot of the hill, the sea god above his tritons and horses while the water tumbles into the basin.",
              "Mom and I in front of the Neptune Fountain, partway up through the gardens.",
              "Looking back from the fountain down the Great Parterre to the palace, the yellow front small across the gravel.",
              "Inside the hedge maze, high walls of clipped hornbeam closing in on every side. We did brave it, heat and all.",
              "The little Japanese garden, rocks and water tucked in among tall conifers, a cool green corner.",
              "Inside the Desert House, cacti and succulents on dry ground under a great span of glass. Ducking into a desert house when it was already 41°C outside felt slightly mad, but in we went.",
              "The Palmenhaus, the huge iron and glass palm house, its three pavilions rising from the lawn.",
              "Formal flowerbeds near the glasshouses, patterns of red and silver laid out on the grass under the midday sun.",
              "The Wagenburg, the imperial carriage museum, and one of the old court coaches with its gilt and red wheels.",
              "A black and gold state carriage, the imperial arms on the door, drawn up under the museum lights.",
              "A bright yellow court carriage with its team of grey horses.",
              "A glass state coach in black and gold, its cushioned interior glowing pink behind the windows.",
              "The black court funeral carriage, draped and hung with silver, used to carry the Habsburgs to their burial.",
              "A last look down the hall, a team of plumed white horses in ceremonial harness and, beyond them, the great gold Imperial Coach kept for coronations.",
            ]);
            p[22].videoSrc = "eastern-europe/vienna/schonbrunn/schonbrunn-23.mp4";
            return p;
          })(),
        },
        {
          id: "vienna-concert",
          title: "Austrian dinner & classical concert",
          description:
            "Dinner at the Marchfelderhof, a gloriously over-the-top country restaurant crammed to the rafters with antiques and curios, then a Vienna concert of arias, waltzes and polkas by Strauss, Lehár and Mozart. The concert was a treat, and we had front row seats.",
          isHighlight: false,
          sortOrder: 3,
          photos: captioned("eastern-europe/vienna", "dinner", [
            "The Marchfelderhof just outside Vienna, where we had dinner, its yellow Baroque front hung with flags and a red carpet rolled out at the door. The Latin over the windows makes asparagus the law of the house and the guest its king.",
            "Inside, every wall and beam crammed with antiques, paintings, birdcages and chandeliers, red velvet stools along the bar. The place is famous for its gloriously cluttered rooms.",
          ]),
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
          photos: captioned("eastern-europe/prague", "telc", [
            "The upper end of the square, by the château, a white bell tower with an onion dome rising over the arcaded houses. We stopped here for lunch on the drive north.",
            "The heart of the square, a Baroque Marian column ringed by flowerbeds and benches, arcaded houses in pink and cream behind.",
            "The long triangular market square, its rows of pastel Renaissance and Baroque houses with arcades and shaped gables. This centre is UNESCO-listed, and it is easy to see why.",
          ]),
        },
        {
          id: "prague-illuminated",
          title: "Illuminated Prague & tavern visit",
          description:
            "An evening on foot from the castle heights down to the river. We started up by Strahov Monastery, stopped for a Czech beer at a tavern, then wound down through the Lesser Town to Charles Bridge as dusk settled and the lights came on.",
          isHighlight: false,
          sortOrder: 2,
          photos: captioned("eastern-europe/prague", "illuminated", [
            "The evening began up in the castle quarter, by a Baroque church with a tavern (a výčep, a Czech tap room) across the little square.",
            "An old rampart on the way down, a great wall of brick and rough stone with an arch cut through for the lane.",
            "The church of Strahov Monastery, its white Baroque front topped by a gilded sunburst, Vatican flags by the door.",
            "The same church from the monastery courtyard, its twin green-capped towers and long white flank.",
            "Starting down the hill, the lane dropping away and the city opening up in the haze ahead.",
            "The view out over Prague from the heights, the castle and the spires of St. Vitus off to the left, the city rolling away into the evening.",
            "Prague Castle closer to, the Gothic spires of St. Vitus Cathedral rising over the red roofs of the Lesser Town.",
            "Down at the river, Charles Bridge at dusk, the Old Town spires catching the last pink light while people gathered on the steps to watch.",
            "Under one of the bridge's arches, the little Čertovka channel and an old mill wheel, the corner they call Prague's Venice.",
            "From the bridge, the Lesser Town tower in silhouette and the castle glowing on the skyline as the sun went down.",
            "Blue hour on the Vltava, a riverboat gliding past the lit embankment.",
            "Looking upriver as the light went, the terraces along the Kampa bank lit up and boats out on the water.",
            "The castle and St. Vitus lit gold at sundown, above a red roof with one window already glowing.",
            "The Lesser Town bridge towers at the far end of Charles Bridge, the lamps lit and the crowds still crossing at dusk.",
          ]),
        },
        {
          id: "prague-city",
          title: "Prague sightseeing",
          description:
            "A guided walk through the Hradčany castle district and down into the Old Town, taking in Prague Castle and St. Vitus Cathedral, the river, and the Astronomical Clock.",
          isHighlight: false,
          sortOrder: 3,
          photos: (() => {
            const p = captioned("eastern-europe/prague", "sightseeing", [
              "A bronze monument to the astronomers Tycho Brahe and Johannes Kepler, who both worked in Prague under Emperor Rudolf II. Our castle tour set off from here on Pohořelec.",
              "The Černín Palace, the longest Baroque facade in the city and now the Foreign Ministry, running the whole length of Loretánské náměstí.",
              "The bell tower of the Loreta pilgrimage church across the same square, its green onion dome housing a carillon that still chimes the hour.",
              "An ornate cast-iron lamp on the castle square, a cluster of lanterns on a single tall column.",
              "A Baroque plague column on the castle square, the Virgin gilded at the top above a ring of saints, raised in thanks after an outbreak of plague.",
              "One of the grand old palaces on Hradčanské náměstí, its walls worked in Renaissance sgraffito beneath shaped gables.",
              "Inside the gates, one of the castle's great courtyards opening up, the spires of St. Vitus Cathedral rising over the far buildings.",
              "A castle guard at his post, still as a statue in the striped sentry box by the gate.",
              "The west front of St. Vitus Cathedral, its twin Gothic towers and great rose window. After several days of 40°C-plus heat, the rain finally came, cooled the air, and stayed with us the rest of the day. You can see it on the wet cobbles.",
              "A closer look at the cathedral's Gothic skin, buttresses, pinnacles and carved tracery worked in pale stone.",
              "The south side of the cathedral across the courtyard, the great tower over the Golden Gate rising above the flying buttresses.",
              "The lane at the eastern end of the castle, past the Lobkowicz Palace, dropping toward the Black Tower gate.",
              "A glimpse of the Old Town through a gap in the castle wall, the twin Gothic spires of the Týn Church across the river.",
              "The group at a viewpoint on the castle ramparts, the red roofs of the Lesser Town falling away below.",
              "Down by the Vltava afterward, tour boats moored along the bank and the castle back up on its hill in the distance.",
              "Old Town Square, the Gothic spires of the Týn Church over the pastel houses, the cobbles still wet from the afternoon rain.",
              "The Astronomical Clock on the Old Town Hall, more than six hundred years old. On the hour the windows open and the Apostles file past, and the crowd, umbrellas up in the rain, gathers to watch.",
            ]);
            p[16].videoSrc = "eastern-europe/prague/sightseeing/sightseeing-17.mp4";
            return p;
          })(),
        },
        {
          id: "prague-czech-please",
          title: "Czech, please!",
          description:
            "A guided culinary walk through three local eateries, savory to sweet, finishing with a traditional kolache.",
          isHighlight: false,
          sortOrder: 4,
          photos: captioned("eastern-europe/prague", "czech", [
            "A chlebíček to start, the classic Czech open sandwich: a slice of baguette layered with potato salad and rolled ham, topped with a tuft of fresh cress.",
            "Svíčková, about as national as it gets: braised beef in a smooth root-vegetable cream sauce with bread dumplings, a spoon of cranberry, and a swirl of cream.",
            "A potato dumpling stuffed with smoked meat, sauerkraut alongside and a tangle of crisp fried onions on top.",
            "A strange sight between courses: a ghostly figure of black wire strung on cables above the street, seeming to float over the rooftops.",
            "The Municipal House, Prague's great Art Nouveau concert hall, its golden mosaic gleaming above the cafe terrace.",
            "The Powder Tower right beside it, a dark Gothic gate that once stored gunpowder and marks the start of the old coronation route into the Old Town.",
            "Back on Old Town Square to finish, the Old Town Hall tower at the left, the green dome of St. Nicholas, and the Jan Hus memorial out in the square.",
          ]),
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
            "On the final leg back to Berlin, a morning in Dresden to walk the rebuilt Baroque centre: the Fürstenzug (the porcelain Procession of Princes), the Hofkirche and Residenzschloss, the Semperoper, and the Zwinger. Then the drive on to a farewell dinner in the city where it all began.",
          isHighlight: false,
          sortOrder: 1,
          photos: captioned("eastern-europe/berlin-return", "dresden-2", [
            "The morning walk began by the Academy of Fine Arts on Brühl's Terrace, its glass-domed corner (Dresdeners call it the Lemon Squeezer) rising behind the older wing.",
            "The Fürstenzug seen from the end of the street, a mural more than a hundred metres long running the whole length of the old royal stables wall.",
            "One of the earliest riders in the Procession of Princes, the margrave Konrad the Great (1127-1156), banner bearers and men-at-arms crowding behind him.",
            "Further along, the Saxon electors and kings: Johann Georg IV, then Augustus the Strong (August II) and August III, and Friedrich Christian, each named and dated in the border below.",
            "This is the Fürstenzug, the Procession of Princes: a 102-metre mural of Saxony's rulers along the wall of the old royal stables. First painted in 1876, it was later baked into some 23,000 Meissen porcelain tiles so it would endure, which makes it the largest porcelain artwork in the world. Here at the tail come the scholars, artists and children on foot, beside a verse thanking the people for their old loyalty.",
            "Behind that wall lies the Stallhof, the old tournament yard. This is a historic photograph of it printed on the builders' netting while the courtyard was under repair.",
            "The Katholische Hofkirche, the Catholic court church and now Dresden's cathedral, its tall tower and a parade of saints along the roofline.",
            "The monument to King Friedrich August the Just on the Schlossplatz, cast in bronze above allegorical figures, in front of the old Saxon parliament house.",
            "The Residenzschloss, the royal palace, its tall Hausmannsturm rising over the rooftops and an ornate covered passage bridging the lane below.",
            "The palace again from the open Schlossplatz, the Saxon flag flying, the square busy under a hot blue sky.",
            "The Semperoper on Theatre Square, Dresden's opera house, the bronze equestrian statue of King Johann out front and one corner still wrapped in scaffolding.",
            "Into the Zwinger, the great Baroque showpiece, its long gallery of arched windows looking out over the formal gardens.",
            "The Zwinger courtyard from above, the whole quadrangle of pavilions and galleries laid out around the lawns and fountains.",
            "The Kronentor, the Crown Gate of the Zwinger, its onion dome topped by a gilded crown held up by four eagles.",
            "An old cannon on its carriage outside the Pulverturm by the Frauenkirche, one of the odd little finds along the way.",
            "Our coach for the whole trip, a Globus touring bus, parked on the cobbles in Dresden. It carried us out from Berlin through Poland, Hungary, Austria and the Czech Republic and all the way back, two weeks and six countries. It felt right to give it a nod on the last leg home.",
            "Two Stolpersteine (stumbling stones) among the cobbles, the small brass memorials that mark where victims of the Nazis once lived or worked. These name Max Hermann Dietze and Ernst Fritz Gottschling, who worked here and were persecuted as Jehovah's Witnesses. Both were arrested in the 1930s and sent to the camps, and neither survived: Dietze died in 1938, Gottschling on a death march in 1945. Each stone carries a single name, so that no one is left a number.",
          ]),
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
