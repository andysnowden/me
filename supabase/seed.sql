-- Seed: Globus "The Best of Eastern Europe" (Tour RO 60620), June 19 – July 3, 2026.
-- Route: Berlin → Warsaw → Kraków → Budapest → Vienna → Prague, returning to Berlin.
-- Idempotent, deleting the trip cascades to stops → activities → photos.
-- Mirrors src/data/sample-trip.ts. Photos are empty placeholder slots until uploaded.

do $$
declare
  v_trip uuid;
  v_stop uuid;
  v_act  uuid;
begin
  delete from public.trips where slug = 'eastern-europe';

  insert into public.trips
    (slug, title, subtitle, summary, tour_operator, start_date, end_date, published)
  values
    ('eastern-europe',
     'The Best of Eastern Europe',
     'Fourteen days, six countries, a guided Globus tour',
     'Two weeks across Eastern Europe on Globus''s “Best of Eastern Europe” tour. Starting and ending in Berlin, the route ran through Poland, with a sobering day at Auschwitz, and on to Budapest, Vienna, and Prague. Here''s the journey, city by city.',
     'Globus', '2026-06-19', '2026-07-03', true)
  returning id into v_trip;

  insert into public.photos (trip_id, src, sort_order) values (v_trip, 'eastern-europe/cover-01.jpg', 0);

  -- 1 · Berlin (start)
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'berlin', 'Berlin', 'Germany', 52.52, 13.405, 1, 3, '2026-06-19', '2026-06-22',
          'Where the tour began. We arrived a day early and spent a self-guided first day among Berlin''s museums before meeting the group.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Museum Island',
          'Before the rest of the day, a walk out onto Museum Island, the cluster of grand nineteenth-century museums set on an island in the Spree. We took most of them in from outside, and stepped into one.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/museum-island/museum-island-01.jpg', 'The Alte Nationalgalerie, its temple front raised on a high plinth with Friedrich Wilhelm IV on horseback at the head of the stairs. We admired it from outside but didn''t go in.', 1),
  (v_act, 'eastern-europe/berlin/museum-island/museum-island-02.jpg', 'The Bode Museum at the northern tip of the island, its copper dome and neo-Baroque front rising where the Spree divides around Museumsinsel.', 2),
  (v_act, 'eastern-europe/berlin/museum-island/museum-island-03.jpg', 'Inside the Bode, the bronze equestrian statue of the Great Elector under the dome, above a sweep of red carpet. The collection was mostly religious art, so this was the only photo I took.', 3);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Deutsches Technikmuseum',
          'With a free day before the tour, a self-guided morning at the Deutsches Technikmuseum, aircraft, locomotives, and hands-on exhibits across its sprawling halls.', false, 2)
  returning id into v_act;
  -- 08 was a duplicate of 07 and was removed; 13-15 (watersports hall, barge, tug) added later.
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-01.jpg', 'In the aviation hall, the corrugated Junkers Ju 52 in Lufthansa colours, framed by a neighbor''s brightly painted wing overhead.', 1),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-02.jpg', 'Looking down over the maritime hall and its centrepiece, the Kaffe barge, a roof-tile cargo boat that sank in the Havel off Spandau around 1855 and was raised in 1987.', 2),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-14.jpg', 'The same barge at floor level, its weathered ribs and planking laid open. The hull, cabin, and rudder are original; the mast, sail, and rigging were reconstructed by the museum.', 3),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-03.jpg', 'An early glider of the kind Otto Lilienthal pioneered, the fragile beginning of human flight.', 4),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-04.jpg', 'Aircraft strung throughout the atrium, from a Swiss-marked trainer to a delicate early glider.', 5),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-05.jpg', 'A wartime fighter overhead, still wearing its Luftwaffe cross.', 6),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-06.jpg', 'Early jet engines, one cut open to show the workings of a turbojet.', 7),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-07.jpg', 'The Ju 52 from the side, D-AZAW in Lufthansa livery, with travelers dressed for the 1930s about to board.', 8),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-09.jpg', 'A Messerschmitt Bf 110 head-on, flight gear and life vests laid out in the cases below.', 9),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-10.jpg', 'A swept-wing Cold War jet overhead, a battered propeller from an earlier era beneath it.', 10),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-11.jpg', 'The Bf 110 again from the side, among the aircraft packed wing to wing across the hall.', 11),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-12.jpg', 'A V-1 flying bomb and other munitions, hung against photographs of the bombed city.', 12),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-13.jpg', 'The watersports hall, historic sailing dinghies rigged and hung above the story of boating on Berlin''s Havel and Spree.', 13),
  (v_act, 'eastern-europe/berlin/technikmuseum/technikmuseum-15.jpg', 'The tugboat Kurt-Heinz (SB2-804), a preserved Berlin workboat filling one end of the maritime hall.', 14);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Museum für Naturkunde',
          'Berlin''s Museum of Natural History, home to the world''s tallest mounted dinosaur skeleton. It didn''t quite win us over, though, hence only a couple of photos.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/naturkunde/naturkunde-01.jpg', 'The wet collection, a glowing glass vault of thousands of creatures preserved in alcohol and one of the museum''s signature sights.', 1),
  (v_act, 'eastern-europe/berlin/naturkunde/naturkunde-02.jpg', 'A towering Tyrannosaurus rex skeleton in the dinosaur hall.', 2);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Welcome dinner',
          'Met the Tour Director and traveling companions over a welcome dinner at the hotel.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/welcome/welcome-01.jpg', 'The whole tour group together. We didn''t get a photo at the welcome dinner, so this one is from the end of the trip.', 1);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Historic Berlin',
          'A guided walk through Berlin''s twentieth-century history, roughly in this order: a marker tracing the line of the Berlin Wall, Checkpoint Charlie, the Topographie des Terrors beside a surviving stretch of the Wall, and the Memorial to the Murdered Jews of Europe. That memorial sits directly across from the deliberately unmarked site of the Führerbunker, said to be a quiet, pointed slight against Hitler. From there to the Brandenburg Gate, and finally the Kurfürstendamm. The Reichstag stayed out of reach behind a city event, and the State Opera House slipped past without a photo.', false, 5)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-01.jpg', 'A double line of cobblestones and this bronze strip, “Berliner Mauer 1961–1989”, trace where the Wall once cut through the city.', 1),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-02.jpg', 'Checkpoint Charlie: the Cold War crossing between the American and Soviet sectors, and its famous four-language sign.', 2),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-03.jpg', 'The reverse side, “You are entering the American sector.”', 3),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-04.jpg', 'Us at the Checkpoint Charlie guard house.', 4),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-05.jpg', 'The Topographie des Terrors, on the cleared site of the Gestapo and SS headquarters, with a preserved stretch of Wall out front.', 5),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-06.jpg', 'Beneath the walkway, the excavated cellars where the SS and Gestapo once held and interrogated prisoners.', 6),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-07.jpg', 'One of the longest surviving stretches of the Wall, pitted and rebar-bared by years of souvenir-hunting “wall-peckers.”', 7),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-08.jpg', 'The Memorial to the Murdered Jews of Europe: Peter Eisenman''s field of 2,711 concrete stelae, rising and falling like a swell underfoot.', 8),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-09.jpg', 'The site of the Führerbunker, where Hitler spent his final days in 1945. Left deliberately unmarked and now, fittingly, a car park. The Memorial to the Murdered Jews of Europe stands just across the way.', 9),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-10.jpg', 'Down Straße des 17. Juni to the Siegessäule, the Victory Column, its gilded Victoria catching the sun above the Tiergarten.', 10),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-14.jpg', 'The Victory Column up close, its shaft ringed with gilded gun barrels and topped by the golden Victoria that Berliners nicknamed “Goldelse.”', 11),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-15.jpg', 'The Soviet War Memorial on Straße des 17. Juni, just west of the Brandenburg Gate. Built in 1945, its curved colonnade is crowned by a bronze Red Army soldier and honours the Soviet dead of the Battle of Berlin.', 12),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-11.jpg', 'The Brandenburg Gate, once stranded in the Wall''s no-man''s-land, now Berlin''s symbol of reunification.', 13),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-12.jpg', 'Up close: the Quadriga, victory driving her four-horse chariot atop the gate.', 14),
  (v_act, 'eastern-europe/berlin/historic-berlin/historic-berlin-13.jpg', 'On the Kurfürstendamm, the Kaiser Wilhelm Memorial Church, its bomb-shattered spire left unrepaired as a memorial, nicknamed by Berliners “the hollow tooth.”', 15);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Half-Day Potsdam Discovery',
          'Out to Potsdam: the House of the Wannsee Conference, the gardens of Sanssouci Palace, the Dutch Quarter and the Alexandrowka Russian colony, and the Glienicke Brücke, the Cold War ''Bridge of Spies.''', false, 6)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-01.jpg', 'The House of the Wannsee Conference. In this lakeside villa, on 20 January 1942, fifteen senior Nazi officials met for barely ninety minutes to coordinate the “Final Solution to the Jewish Question.” I had just watched the film Nuremberg, and standing here was surreal. A place this beautiful was where the murder of millions was set in motion.', 1),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-02.jpg', 'Inside, a facsimile of Hitler''s letter of 1 September 1939 authorising the murder of the “incurably ill,” dated to the very day the war began. It is the only surviving written order from Hitler to kill an entire group of people.', 2),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-03.jpg', 'Göring''s authorisation of 31 July 1941 tasking Reinhard Heydrich with preparing a “comprehensive solution of the Jewish question.” This is the order that led Heydrich to convene the conference in this house. Seeing the actual paperwork, lives reduced to bureaucratic language, was the hardest part of the day.', 3),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-04.jpg', 'Into Potsdam''s old centre, and a lighter mood: the rebuilt City Palace, now the Brandenburg state parliament, entered through the Fortuna Portal with its gilded figure of Fortune on top.', 4),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-05.jpg', 'The obelisk on the Alter Markt, Potsdam''s historic market square, framed by the Potsdam Museum and, in yellow, the Museum Barberini.', 5),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-06.jpg', 'The Baroque Old Town Hall on the same square, crowned by a gilded Atlas shouldering the globe. It now forms part of the Potsdam Museum.', 6),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-07.jpg', 'St. Nicholas'' Church, its huge green dome the work of Karl Friedrich Schinkel, rising behind the obelisk.', 7),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-08.jpg', 'On to Sanssouci. Twin colonnades frame the park, with a hilltop folly closing the view in the distance.', 8),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-09.jpg', 'Sanssouci itself, Frederick the Great''s summer palace. Its name, French for “without a care,” runs across the front, where sculpted atlantes stand in for columns along the golden-yellow façade.', 9),
  (v_act, 'eastern-europe/berlin/potsdam/potsdam-10.jpg', 'The view from the terrace down over the fountain and the great parterre, the gardens rolling out toward the town.', 10);

  -- 2 · Warsaw
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'warsaw', 'Warsaw', 'Poland', 52.2297, 21.0122, 2, 2, '2026-06-22', '2026-06-24',
          'Poland''s capital, reached by a long drive south across the border.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Poznań en route',
          'A break in Poznań, one of Poland''s oldest cities, to wander the colourful Old Market Square, where the Town Hall clock''s mechanical goats butt heads at noon.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, video_src, caption, sort_order) values
  (v_act, 'eastern-europe/warsaw/poznan/poznan-01.jpg', null, 'Making our way through the old town toward the Stary Rynek, Poznań''s Old Market Square, flags hanging from the merchant houses.', 1),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-02.jpg', null, 'The square opens up, the Renaissance Town Hall with its arcaded loggia on the right, colourful merchant houses ranged down the far side.', 2),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-03.jpg', null, 'The Town Hall up close. Its tower was under wraps for restoration, but the painted Renaissance façade and its little turrets still held the square.', 3),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-04.jpg', 'eastern-europe/warsaw/poznan/poznan-04.mp4', 'Every day at noon, two mechanical billy goats emerge above the Town Hall clock and butt heads twelve times, Poznań''s best-loved tradition. We waited for midday to catch it.', 4),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-05.jpg', null, 'A flower-draped restaurant front under the arcades just off the square, tables set out in the sun.', 5),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-06.jpg', null, 'One of the bronze fountains around the square, a helmeted, spear-bearing Mars, the god of war, mid-stride.', 6),
  (v_act, 'eastern-europe/warsaw/poznan/poznan-07.jpg', null, 'A last look across the Stary Rynek: café umbrellas, the Proserpina Fountain, and the scaffolded tower rising over the pastel houses.', 7);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Old Town & St. John''s Cathedral',
          'A guided walk through the rebuilt medieval Stare Miasto and the Cathedral of St. John, on into the New Town and past the city''s great memorials to the Warsaw Uprising and the Ghetto Heroes.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-01.jpg', 'Castle Square, where the Old Town begins. Sigismund''s Column, raised in 1644 to King Sigismund III Vasa, who moved the capital from Kraków to Warsaw, stands over the pastel merchant houses.', 1),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-02.jpg', 'The Royal Castle on Castle Square, seat of Poland''s kings and parliament. Blown up by the Germans in 1944, it was rebuilt from nothing between 1971 and 1984.', 2),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-03.jpg', 'The brick Gothic front of St. John''s Archcathedral, the oldest church in Warsaw and, like the rest of the Old Town, raised again after the war. The banner honours the beatified Cardinal Stefan Wyszyński.', 3),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-04.jpg', 'Inside St. John''s, the whitewashed Gothic nave under its ribbed vault, hung with Polish military and heraldic banners above the checkerboard aisle.', 4),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-05.jpg', 'Tall stained-glass windows light the side aisle, over a marble monument and bronze memorials to figures of Polish history.', 5),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-06.jpg', 'Looking up into the star-vaulting, ranks of red-and-white banners carrying the Polish eagle and old coats of arms.', 6),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-07.jpg', 'The chancel and its carved choir stalls, a venerated icon of the Madonna set above the high altar between the stained glass.', 7),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-08.jpg', 'At the west end, the organ on its gallery above the door, banners hanging the length of the nave.', 8),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-09.jpg', 'The Old Town Market Square, ringed by reconstructed burghers'' houses in candy colours, cafe umbrellas filling the middle. The Museum of Warsaw lines the far side.', 9),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-10.jpg', 'The Warsaw Mermaid at the heart of the square, sword and shield raised. The Syrenka is the city''s emblem and, by legend, its sworn protector.', 10),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-11.jpg', 'The Barbican, the round red-brick outwork that guarded the gate between the Old and New Towns, rebuilt after the war from old prints and paintings.', 11),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-12.jpg', 'Up on the restored medieval walls that ring the Old Town, the rampart walk running along the battlements.', 12),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-13.jpg', 'Into the New Town, to the house on ulica Freta where Maria Skłodowska-Curie was born in 1867, now a museum to the twice Nobel-winning scientist.', 13),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-17.jpg', 'The Monument to the Warsaw Uprising on Krasiński Square: bronze insurgents charging out from beneath a great tilting slab, the columned Supreme Court behind.', 14),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-14.jpg', 'Closer in on the same monument, fighters breaking from the rubble with a chaplain at their side.', 15),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-15.jpg', 'The Monument to the Ghetto Heroes, on the ground of the former Warsaw Ghetto. Nathan Rapoport''s 1948 memorial to the fighters of the 1943 uprising, a menorah set before it. Willy Brandt knelt here in 1970.', 16),
  (v_act, 'eastern-europe/warsaw/oldtown/oldtown-16.jpg', 'The monument to Jan Kiliński, the master shoemaker who led Warsaw''s townsfolk in the 1794 uprising against the Russian garrison, sabre raised on Podwale by the Old Town walls.', 17);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Chopin concert',
          'An evening Chopin recital by Prof. Maciej Poliszewski at the Fryderyk Concert Hall, a program running from the G minor Ballade and the Op. 41 Mazurkas to the “Heroic” Polonaise.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/warsaw/chopin/chopin-01.jpg', 'The Fryderyk Concert Hall, chandeliers and portraits of Chopin looking on over the grand piano, just before the recital began.', 1),
  (v_act, 'eastern-europe/warsaw/chopin/chopin-02.jpg', 'The evening''s program, all Chopin: the Ballade, three Mazurkas, a Scherzo, three Waltzes, and the “Heroic” Polonaise.', 2);

  -- 3 · Kraków
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'krakow', 'Kraków', 'Poland', 50.0647, 19.945, 3, 2, '2026-06-24', '2026-06-26',
          'A UNESCO-listed old town that came through the war virtually unscathed, and the base for the day at Auschwitz.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Częstochowa en route',
          'On the drive south from Warsaw, a stop at the Jasna Góra monastery, Poland''s great pilgrimage site, home to the Black Madonna.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/krakow/czestochowa/czestochowa-01.jpg', 'The approach to Jasna Góra, a broad avenue walled in brick and lined with the flags of pilgrim nations, the monastery tower waiting at the far end.', 1),
  (v_act, 'eastern-europe/krakow/czestochowa/czestochowa-02.jpg', 'The monastery''s bell tower, at 106 metres the tallest historic church tower in Poland, rising white above the ramparts.', 2),
  (v_act, 'eastern-europe/krakow/czestochowa/czestochowa-03.jpg', 'One of the great vaulted halls inside, hung with the embroidered banners of pilgrimage groups who have walked here for centuries.', 3),
  (v_act, 'eastern-europe/krakow/czestochowa/czestochowa-04.jpg', 'A case in the monastery museum: historic musical instruments from Jasna Góra''s long tradition of sacred music, violins and harps and horns behind glass.', 4),
  (v_act, 'eastern-europe/krakow/czestochowa/czestochowa-05.jpg', 'A painted copy of the Black Madonna of Częstochowa. Mass was underway in the chapel where the original hangs, so this faithful reproduction was as close as the camera could get.', 5);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Auschwitz-Birkenau Memorial',
          'Auschwitz-Birkenau was the largest of the Nazi German concentration and extermination camps. Between 1940 and 1945 at least 1.3 million people were deported here and roughly 1.1 million were murdered, about nine in ten of them Jews, along with Poles, Roma, Soviet prisoners of war, and others. Coming here is not sightseeing. It is a place to stand with the people who were taken here, and to hold on to what it asks of anyone who comes: that this was carried out by a modern state and ordinary people, within living memory, and that remembering it honestly is part of how it is kept from happening again. Visiting was one of the reasons I chose this route. It was the most important day of the trip, and the hardest.

A note on the photographs that follow: some are hard to look at. Inside several of the buildings we were asked not to take pictures, out of respect for the dead, and those rooms are not shown here.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-01.jpg', 'The gate into Auschwitz I, and its iron sign: ARBEIT MACHT FREI, "work sets you free." It was a lie. The words hung over the entrance the work columns passed twice a day, and almost no one was ever set free.', 1),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-02.jpg', 'Arriving at Auschwitz I under the willows. The site is a museum and memorial now, but these brick blocks were the camp itself, built up around a former Polish army barracks.', 2),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-03.jpg', 'Walking in along the perimeter, a wooden fence on one side and a guard tower ahead. Everything here was built to keep people from leaving.', 3),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-04.jpg', 'Rows of barracks behind the double line of electrified fence, the concrete posts curving inward to carry the wire.', 4),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-05.jpg', 'A street between the blocks. Part of what unsettles you here is how ordinary it looks: brick buildings, trees, gravel roads, all built to run a machine of murder.', 5),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-06.jpg', 'Between the two-story blocks. Each held hundreds of prisoners in conditions meant to kill slowly, through hunger, cold, and disease.', 6),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-07.jpg', 'The tree-lined road through the camp, quiet now.', 7),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-08.jpg', 'Another of the camp streets. The blocks are numbered, and many now hold the museum''s exhibitions.', 8),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-09.jpg', 'One of the brick blocks. Several are given over to the main exhibition, room after room documenting who was brought here and what was done to them.', 9),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-10.jpg', 'A map of the deportations: lines drawn from ghettos, transit camps, and prisons across occupied Europe, all converging on Auschwitz.', 10),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-11.jpg', 'The memorial''s plain statement of the toll. At least 1.3 million people deported, about 1.1 million killed, some 90 percent of them Jews, most murdered in the gas chambers.', 11),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-12.jpg', 'Inside the exhibition, walls of photographs of the deportations, beside a column counting the numbers brought from each country.', 12),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-13.jpg', 'An enlarged photograph from 1944: families with their bundles beside the freight cars, just after arrival, before they understood what waited.', 13),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-14.jpg', '"Before the selection." Newly arrived people massed on the Birkenau ramp, waiting for the SS to divide them, most sent straight to the gas.', 14),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-15.jpg', '"After the selection." The same ramp cleared, SS men among the cattle cars and the belongings left on the ground.', 15),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-16.jpg', 'A drawing in the exhibition of the deportees, huddled and afraid, a human answer to the perpetrators'' own photographs.', 16),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-17.jpg', 'Behind glass, empty canisters of Zyklon B, the poison the SS used to murder people in the gas chambers.', 17),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-18.jpg', 'Confiscated suitcases, many still painted with their owners'' names and addresses, packed by people who were told they were being resettled.', 18),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-19.jpg', 'A corridor inside one of the blocks, the floor worn smooth by prisoners once and by those who come to remember them now.', 19),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-20.jpg', 'A room kept furnished as it was: a single bed, a cupboard, a table, spare and cold.', 20),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-21.jpg', 'Worn blankets spread across a barrack floor, beneath a photograph from the camp''s final days.', 21),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-22.jpg', 'The Death Wall, between Blocks 10 and 11, where the SS shot thousands of prisoners. People still lay wreaths and candles here.', 22),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-23.jpg', 'A watchtower set into the perimeter wall, the electrified fence running out to either side.', 23),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-24.jpg', 'The narrow ground between two blocks, hemmed in by the double electrified fence.', 24),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-25.jpg', 'The fences run the length of the camp, post after post, wire above wire.', 25),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-26.jpg', 'The entrance to the gas chamber and crematorium of Auschwitz I, dug into an earth mound. Inside, we were asked not to photograph, and it is right that some places stay unphotographed.', 26),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-27.jpg', 'Three kilometres away lies Birkenau, or Auschwitz II, built when Auschwitz I could no longer hold the numbers. The gatehouse from within the camp, its long brick wing running off along the perimeter.', 27),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-28.jpg', 'The same gatehouse from the front, the way the transports approached it, the arch the prisoners called the Gate of Death with the railway running straight through it into the camp.', 28),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-29.jpg', 'The single track leading in, vanishing toward the horizon. The trains stopped on this ramp, and the selections were made where they stood.', 29),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-30.jpg', 'One of the surviving wooden barracks. They were built to a design for army horse stables, and each was packed with hundreds of people.', 30),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-31.jpg', 'Inside a barrack, the brick flue that ran down the middle for a heat that rarely came. Prisoners were crammed onto wooden bunks along the walls.', 31),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-32.jpg', 'The latrine barrack, a long concrete bench pierced with holes. Prisoners were allowed here only briefly, and only at set times.', 32),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-33.jpg', 'The scale of Birkenau is hard to take in. Paths and a watchtower reach out across a field where hundreds of barracks once stood.', 33),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-34.jpg', 'Where the barracks were pulled down or burned, the brick chimneys and lines of fence posts still stand across the grass.', 34),
  (v_act, 'eastern-europe/krakow/auschwitz/auschwitz-35.jpg', 'A last look: one fence post, its insulators and wire, against an open sky. The camp was liberated in January 1945, and what remains is kept so that no one can ever say it did not happen.', 35);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Wieliczka Salt Mine',
          'Down 136 metres into a UNESCO-listed labyrinth carved entirely from salt, tunnels, a subterranean lake, and the astonishing Chapel of St. Kinga, salt from chandelier to altarpiece.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-01.jpg', 'The gated shaft at the surface. From here the tour heads down into the oldest part of the mine, worked for salt since the 13th century.', 1),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-02.jpg', 'The Antonia fore-shaft, mid-17th century, a woven basket still hanging from its hoist rope in the timbered dark.', 2),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-03.jpg', 'Chamber Urszula, its roof held up by great stacked-log cribbing. The whole mine is shored with timber like this.', 3),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-04.jpg', 'One of the towering timbered chambers, braced floor to ceiling with wood and topped by an old winding wheel.', 4),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-05.jpg', 'An old winding machine of timber and rope, once worked by hand to raise salt and men through the levels.', 5),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-06.jpg', 'A horse-powered gin, the kind of treadmill a blindfolded horse walked in circles to haul salt up the shafts. Horses lived their whole lives down here.', 6),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-07.jpg', 'A diorama of the beginnings: long before the deep mine, people boiled the salty spring water here to draw out the salt.', 7),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-08.jpg', 'The legend of Saint Kinga, carved in salt. The Hungarian princess is said to have thrown her ring into a salt mine at home, and when miners sank the first shaft at Wieliczka they found it in the first lump of salt.', 8),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-09.jpg', 'Salt figures of the methane burners at work. The gas gathered along the ceilings, so a miner would crawl below it and reach up a lit torch on a long pole to burn it away before it could build to an explosion.', 9),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-10.jpg', 'The salt shows itself everywhere, here as a rough white crust blooming across the ceiling of a chamber.', 10),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-11.jpg', 'The Kunegunda Chamber, lit in colour and peopled with salt dwarfs. The miners carved them in tribute to the old legends of the little folk who guard the treasures of the mine.', 11),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-12.jpg', 'A monument to Nicolaus Copernicus carved from salt, set up in 1973 for the 500th anniversary of his birth. He is said to have visited the mine as a young man.', 12),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-13.jpg', 'The doorway to the Chapel of St. Anthony, the oldest of the mine''s chapels, carved at the end of the 17th century so miners could hear Mass before their shift.', 13),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-16.jpg', 'St. Kinga''s Chapel, the great one, over 100 metres down and more than 50 metres long. Miners spent decades carving it. Everything here is salt: the walls, the altars, the chandeliers, even the tiled floor underfoot.', 14),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-14.jpg', 'The Flight into Egypt, one of the salt reliefs carved into the chapel walls, Joseph leading the donkey with Mary and the child on toward a domed city.', 15),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-15.jpg', 'A copy of Leonardo''s Last Supper cut in low relief into the salt wall of the chapel.', 16),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-17.jpg', 'One of the largest reliefs, a whole town worked into the rock with a lit Nativity set at its heart.', 17),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-18.jpg', 'Another scene carved straight into the salt, framed and lit against the grey wall.', 18),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-19.jpg', 'An underground lake, still and green under the lights. The water is brine, so dense with salt that you would float on it like the Dead Sea.', 19),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-20.jpg', 'A low passage between chambers, a channel cut to carry the brine that constantly weeps from the walls.', 20),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-21.jpg', 'A brick-and-timber corridor linking the workings, propped and arched against the weight of the rock.', 21),
  (v_act, 'eastern-europe/krakow/wieliczka/wieliczka-22.jpg', 'The Daniłowicz Shaft, sunk in the 1630s and still the way in and out. From here the lift carried us back up to daylight.', 22);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Kraków city tour',
          'A guided walk through the old town. The extreme heat that day trimmed the route: the planned walk through Kazimierz, Kraków''s old Jewish quarter, was dropped. We spent the time instead in St. Mary''s Basilica on the Main Market Square, under its blue star-painted vault and before the great carved altarpiece of Veit Stoss, with a stop across the river at the Ghetto Heroes Square in Podgórze.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/krakow/citytour/citytour-01.jpg', 'St. Mary''s Basilica on the Main Market Square, its two unequal brick Gothic towers over the old town. Every hour a trumpeter sounds the hejnał from the taller tower, breaking off mid-note in memory of a medieval bugler.', 1),
  (v_act, 'eastern-europe/krakow/citytour/citytour-02.jpg', 'Inside, the nave opens toward the chancel under a vault painted deep blue and scattered with gold stars.', 2),
  (v_act, 'eastern-europe/krakow/citytour/citytour-03.jpg', 'The star-spangled vault overhead, nineteenth-century painting by Jan Matejko and his pupils over the medieval ribs.', 3),
  (v_act, 'eastern-europe/krakow/citytour/citytour-04.jpg', 'The chancel, its tall Gothic windows bright with stained glass above the great carved altarpiece.', 4),
  (v_act, 'eastern-europe/krakow/citytour/citytour-05.jpg', 'The altarpiece up close: the high altar of Veit Stoss, finished in 1489, its central scene the Dormition of the Virgin among the Apostles. It is the largest Gothic altarpiece in the world.', 5),
  (v_act, 'eastern-europe/krakow/citytour/citytour-06.jpg', 'Turning back toward the west end, the organ on its gallery and the painted columns leading the eye down the nave.', 6),
  (v_act, 'eastern-europe/krakow/citytour/citytour-07.jpg', 'Plac Bohaterów Getta in Podgórze, the square from which Kraków''s Jews were deported. Its field of empty bronze chairs, set out in 2005, stands for the people and the belongings taken from the ghetto.', 7);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Polish Polka and Dinner Party',
          'An optional evening out at a country tavern: a Polish dinner of hearty traditional dishes and wine, with a costumed troupe playing folk and polka tunes and dancing between the courses.', false, 5)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/krakow/polka/polka-01.jpg', 'The folk troupe in full swing, a dancer''s skirt flying and her partner leading her by the hand, with an accordion and a double bass behind. They played and danced between the courses.', 1);

  -- 4 · Budapest
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'budapest', 'Budapest', 'Hungary', 47.4979, 19.0402, 4, 2, '2026-06-26', '2026-06-28',
          'The ''Pearl of the Danube,'' reached through Slovakia.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Donovaly, Slovakia en route',
          'Three countries in a day: a scenic pause at the alpine ski resort of Donovaly, near two national parks, on the way from Poland into Hungary.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 1) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Danube dinner cruise',
          'An evening cruise down the Danube with a Hungarian buffet, past Margaret Island, the Parliament, Castle Hill with Fishermen''s Bastion, the Royal Palace, and the Citadel on Gellért Hill.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Budapest sightseeing',
          'A guided tour taking in Heroes'' Square and a panoramic view of Fishermen''s Bastion.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Hungarian Sips',
          'A taste of Unicum, Hungary''s celebrated herbal liqueur, straight from the barrel at the House of Unicum.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 1) g;

  -- 5 · Vienna
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'vienna', 'Vienna', 'Austria', 48.2082, 16.3738, 5, 2, '2026-06-28', '2026-06-30',
          'The City of Music, across the border in Austria.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Vienna sightseeing',
          'A drive along the grand Ringstrasse with photo stops at the Hofburg Palace and Heldenplatz, and a visit to St. Stephen''s Cathedral and its Romanesque Giant''s Door.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'A free day in Vienna',
          'Museums, shops, and Viennese coffee-house culture, a kaffee und kuchen in one of the city''s elegant cafés.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 1) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Austrian dinner & classical concert',
          'A three-course dinner of Viennese specialties followed by arias, waltzes and polkas from Strauss, Lehár, and Mozart in one of Europe''s prettiest concert halls.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  -- 6 · Prague
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'prague', 'Prague', 'Czech Republic', 50.0755, 14.4378, 6, 2, '2026-06-30', '2026-07-02',
          'The ''Golden City'', the final stop before the journey home.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Telč en route',
          'A light lunch on the UNESCO-listed triangular market square of Telč, amid pastel Renaissance and Baroque townhouses, on the scenic drive through Moravia and Bohemia.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Illuminated Prague & tavern visit',
          'An evening walk through the lit-up Old Town, a Czech beer in a local tavern, and a crossing of the 14th-century Charles Bridge for the view of Prague Castle.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Prague sightseeing',
          'A guided tour to the Astronomical Clock and the Hradčany Castle grounds.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Czech, please!',
          'A guided culinary walk through three local eateries, savory to sweet, finishing with a traditional kolache.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  -- 7 · Berlin (return)
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'berlin-return', 'Berlin', 'Germany', 52.52, 13.405, 7, 1, '2026-07-02', '2026-07-03',
          'Back where it started, for a farewell night and the flight home.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Home via Dresden',
          'On the final leg back to Berlin, a stop in Dresden for the Baroque courtyard of the Zwinger Palace, then a farewell dinner in the city where it all began.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Departure',
          'The tour ended after breakfast, auf Wiedersehen, Berlin.', false, 2);
end $$;
