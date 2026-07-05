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
  values (v_stop, 'Danube dinner cruise',
          'An evening cruise down the Danube with a Hungarian buffet, past Margaret Island, the Parliament, Castle Hill with Fishermen''s Bastion, the Royal Palace, and the Citadel on Gellért Hill.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/budapest/danube/danube-01.jpg', 'Casting off at golden hour. The Buda bank slides past, the twin baroque towers of St. Anne''s Church on Batthyány Square catching the last of the sun.', 1),
  (v_act, 'eastern-europe/budapest/danube/danube-02.jpg', 'The Hungarian Parliament, lit gold from the water. Imre Steindl''s vast neo-Gothic building runs along the Pest bank, its dome rising 96 metres, a nod to the year 896 when the Magyars are said to have arrived.', 2),
  (v_act, 'eastern-europe/budapest/danube/danube-03.jpg', 'Buda Castle up on Castle Hill, the old Royal Palace with its green dome. The crane is part of the long restoration of the palace quarter.', 3),
  (v_act, 'eastern-europe/budapest/danube/danube-04.jpg', 'The long river front of the Budapest University of Technology on the Buda bank, red roofs and corner towers in the evening light.', 4),
  (v_act, 'eastern-europe/budapest/danube/danube-05.jpg', 'On the Pest bank, the old Main Customs House by Miklós Ybl, now part of Corvinus University, a river cruiser moored below.', 5),
  (v_act, 'eastern-europe/budapest/danube/danube-06.jpg', 'The monument to Saint Gellért on the side of the hill that bears his name, a bishop raising his cross inside a curving colonnade, a waterfall tumbling beneath.', 6),
  (v_act, 'eastern-europe/budapest/danube/danube-07.jpg', 'The Cave Church set into the rock of Gellért Hill, its little neo-Romanesque front built onto a natural cave.', 7),
  (v_act, 'eastern-europe/budapest/danube/danube-08.jpg', 'A cross planted on the bare crag of Gellért Hill, a small chapel at its foot.', 8),
  (v_act, 'eastern-europe/budapest/danube/danube-09.jpg', 'The Liberty Statue on the summit, a woman holding a palm frond high over the city. Raised in 1947, she has watched over Budapest ever since.', 9),
  (v_act, 'eastern-europe/budapest/danube/danube-10.jpg', 'Under way at sunset, the green ironwork of Liberty Bridge ahead and the sky going pink over the water.', 10),
  (v_act, 'eastern-europe/budapest/danube/danube-11.jpg', 'One of Margaret Bridge''s stone piers up close, carved with a winged figure crowned in laurel, resting on a shield amid trophies of arms. Its French sculptor set a group like this on each pier in the 1870s.', 11),
  (v_act, 'eastern-europe/budapest/danube/danube-12.jpg', 'Mom and I on the deck as the sun went down over the Danube, one of the bridges behind us.', 12);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Budapest sightseeing',
          'The planned city drive was meant to take in Heroes'' Square and Fishermen''s Bastion, but the city was packed with events that week and the tour went a bit off script. We could not stop at either and came away without photos from the drive itself. The one picture here, of the Shoes on the Danube Bank, was taken by another member of our group.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/budapest/sightseeing/sightseeing-01.jpg', 'The Shoes on the Danube Bank, sixty pairs of iron shoes fixed to the embankment. They remember the Jews who were shot into the river here in the winter of 1944 and 1945, ordered to leave their shoes at the water''s edge first. A member of our group took this at sunset.', 1);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Hungarian Sips',
          'A taste of Unicum, Hungary''s celebrated herbal liqueur, straight from the barrel at the House of Unicum.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/budapest/unicum/unicum-01.jpg', 'Bottles of Unicum in the shop, the round dark flask with its white script and red cross. Zwack''s bitter herbal liqueur is a Budapest institution, and the exact recipe is still a closely kept family secret.', 1),
  (v_act, 'eastern-europe/budapest/unicum/unicum-02.jpg', 'The House of Unicum, Zwack''s home in Budapest, its black tower lettered down the side. On the wall is the old advertisement that made the drink famous: a shipwrecked man reaching for a bottle in the waves.', 2),
  (v_act, 'eastern-europe/budapest/unicum/unicum-03.jpg', 'Inside the distillery, copper pot stills and the green stillroom gear marked Zwack. More than forty herbs and spices go into Unicum, which is then aged in oak.', 3),
  (v_act, 'eastern-europe/budapest/unicum/unicum-04.jpg', 'A great wooden tub of dried botanicals, the roots and herbs that flavour the liqueur, sorted into bays, with the old apothecary cabinets behind.', 4),
  (v_act, 'eastern-europe/budapest/unicum/unicum-05.jpg', 'The herb room, its pine cabinets stacked with amber demijohns and apothecary jars behind chicken wire and rows of little drawers below, Zwack J. és Társai Budapest lettered across the top.', 5),
  (v_act, 'eastern-europe/budapest/unicum/unicum-06.jpg', 'The same room from the doorway, big glass jars with wooden lids holding the dried herbs, drawer after drawer beneath the brick vaults.', 6),
  (v_act, 'eastern-europe/budapest/unicum/unicum-07.jpg', 'A huge old cask fixed to the wall, shelves built into its face, its rim and the iron bung at the base picked out in chipped red paint, a chalk note scrawled across the staves.', 7),
  (v_act, 'eastern-europe/budapest/unicum/unicum-08.jpg', 'Down in the cellar, rows of oak casks with red-painted rims line the passage where the liqueur is left to age, the floor tiled in black and white.', 8);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'An evening of Vivaldi',
          'After the day''s touring, Mom and I went to a chamber music concert at St. Michael''s Church on Váci utca, an evening of Vivaldi''s Four Seasons and other classics.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/budapest/concert/concert-01.jpg', 'St. Michael''s Church on Váci utca, the baroque venue for the concert, its banner out front advertising Vivaldi''s Four Seasons.', 1),
  (v_act, 'eastern-europe/budapest/concert/concert-02.jpg', 'Inside, the gilded high altar under a frescoed ceiling, a grotto shrine to the Virgin off to the left, and music stands set out at the altar rail ready for the players.', 2);

  -- 5 · Vienna
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'vienna', 'Vienna', 'Austria', 48.2082, 16.3738, 5, 2, '2026-06-28', '2026-06-30',
          'The City of Music, across the border in Austria.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Vienna sightseeing',
          'A morning drive along the grand Ringstrasse, then into the old town on foot for St. Stephen''s Cathedral. The day was blazingly hot, so most of what I came away with is the cathedral itself. We passed the Hofburg and Heldenplatz as well, but the heat meant I did not stop to photograph them.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-01.jpg', 'St. Stephen''s Cathedral from the square, its great south tower and the roof of glazed tiles laid in bold zigzags. The Steffl, as the Viennese call the tower, climbs to 136 metres.', 1),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-02.jpg', 'Looking straight up the south tower from a side street, the tiled roof running off to the left. It took some seventy years to raise and was finished in 1433.', 2),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-03.jpg', 'Inside, down the long Gothic nave toward the altar, the ribbed vault rising overhead and the floor laid in red and white.', 3),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-04.jpg', 'The Wiener Neustädter Altar, a gilded winged altarpiece from 1447, set beneath the tall traceried windows of the north nave.', 4),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-05.jpg', 'The high altar in the chancel, black marble framing a painting of the stoning of Saint Stephen, the church''s patron. Baroque work of the 1640s beneath the soaring Gothic stone.', 5),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-06.jpg', 'The red marble tomb of Emperor Frederick III, who died in 1493, a massive carved chest that took decades to finish.', 6),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-07.jpg', 'The west end, the giant organ on its gallery below the rose window, chairs set out in the nave beneath.', 7),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-08.jpg', 'The Gothic stone pulpit, carved around 1500. Along its rail sit the four great teachers of the early Church, and under the stairs the sculptor left a little portrait of himself peering from a window.', 8),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-09.jpg', 'Out on the Ring, one of the grand twin museums on Maria-Theresien-Platz, the Museum of Fine Arts and the Natural History Museum facing each other in matching stone.', 9),
  (v_act, 'eastern-europe/vienna/sightseeing/sightseeing-10.jpg', 'A formal rose garden off the Ringstrasse, a museum dome rising beyond the clipped trees. Even the shade was warm that afternoon.', 10);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'A free day in Vienna',
          'The tour offered an optional day trip to Bratislava, but we spent our free day at Schönbrunn instead, the Habsburgs'' summer palace. It reminded us of Versailles: room after gilded room inside, and vast formal gardens outside. It was one of the hottest days of the trip, around 41°C, and we still walked about half the grounds, close to five miles. After the state rooms we came down the Great Parterre to the Neptune Fountain, over to the Japanese garden, the Palm House and the Desert House, and finally the imperial carriage museum, the Wagenburg, before lunch at the Fürstenkarussell bistro (bratwurst for both of us).', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, src, video_src, caption, sort_order) values
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-01.jpg', null, 'Schönbrunn Palace across its great forecourt, the long yellow front baking under a cloudless sky. The Habsburgs'' summer residence has some 1,400 rooms, and about forty of them are open to walk through.', 1),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-02.jpg', null, 'A map of the grounds by the entrance. From the palace at the bottom we walked up the Great Parterre to the Neptune Fountain, then out to the Japanese garden, the glasshouses, and the carriage museum.', 2),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-03.jpg', null, 'The palace chapel, its altarpiece crowned by a gilded sunburst and cherubs. There has been a chapel on this spot since the palace''s earliest days.', 3),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-04.jpg', null, 'The Blue Staircase up to the state rooms, a vast Baroque fresco spread across the ceiling above the red carpet.', 4),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-05.jpg', null, 'The Guards'' Room, first of the state rooms, white and gold with crystal chandeliers and a tall porcelain stove in the corner.', 5),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-06.jpg', null, 'The Billiard Room, where callers once waited for an audience with Emperor Franz Joseph, its walls hung with large ceremonial paintings.', 6),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-07.jpg', null, 'The Walnut Room, panelled in carved walnut and gilt beneath a gilt-bronze chandelier. This was Franz Joseph''s audience chamber.', 7),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-08.jpg', null, 'One of the private rooms, hung with blue and white flowered silk, a portrait of the young Empress Elisabeth on the wall.', 8),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-09.jpg', null, 'An imperial table laid with white linen and crystal, a portrait of Emperor Franz Joseph in his white tunic looking on.', 9),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-10.jpg', null, 'One of the state salons, white and gold, its mirrors doubling the crystal chandeliers down the room.', 10),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-11.jpg', null, 'A salon hung with big landscape canvases in gilt frames, a full-length portrait and an ornate French clock along the far wall.', 11),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-12.jpg', null, 'The Great Gallery, the palace''s grand ballroom, better than forty metres of white and gold beneath its painted ceilings.', 12),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-13.jpg', null, 'The Great Gallery again, this time from the middle of the room looking one way down its length, chandeliers and mirrors all the way.', 13),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-14.jpg', null, 'The same spot, turned the other way, the gallery running back toward the far end under its painted ceiling.', 14),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-15.jpg', null, 'Looking straight up at one of the ceilings, a Baroque fresco of figures adrift in cloud, painted in the 1760s under Maria Theresa.', 15),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-16.jpg', null, 'A close look at one of the gallery''s gilded chandeliers, a cascade of scrollwork and candle branches.', 16),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-17.jpg', null, 'The Vieux-Laque Room, its walls set with panels of black and gold East Asian lacquer in carved gilt frames.', 17),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-18.jpg', null, 'A closer look at the lacquer panels, framing a full-length portrait of Emperor Franz Stephan, Maria Theresa''s husband.', 18),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-19.jpg', null, 'One of the most lavish rooms of all, panelled in rosewood and hung with small framed miniatures, its ceiling painted overhead.', 19),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-20.jpg', null, 'A state bed heavy with red and silver embroidery, kept now behind glass.', 20),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-21.jpg', null, 'Out into the gardens at last, a small formal garden with clipped lawns and a pair of dark trellised pavilions.', 21),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-22.jpg', null, 'The Great Parterre opening up, its broad walk running between the flowerbeds toward the Gloriette on the ridge.', 22),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-23.jpg', 'eastern-europe/vienna/schonbrunn/schonbrunn-23.mp4', 'The Neptune Fountain at the foot of the hill, the sea god above his tritons and horses while the water tumbles into the basin.', 23),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-24.jpg', null, 'Mom and I in front of the Neptune Fountain, partway up through the gardens.', 24),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-25.jpg', null, 'Looking back from the fountain down the Great Parterre to the palace, the yellow front small across the gravel.', 25),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-26.jpg', null, 'Inside the hedge maze, high walls of clipped hornbeam closing in on every side. We did brave it, heat and all.', 26),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-27.jpg', null, 'The little Japanese garden, rocks and water tucked in among tall conifers, a cool green corner.', 27),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-28.jpg', null, 'Inside the Desert House, cacti and succulents on dry ground under a great span of glass. Ducking into a desert house when it was already 41°C outside felt slightly mad, but in we went.', 28),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-29.jpg', null, 'The Palmenhaus, the huge iron and glass palm house, its three pavilions rising from the lawn.', 29),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-30.jpg', null, 'Formal flowerbeds near the glasshouses, patterns of red and silver laid out on the grass under the midday sun.', 30),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-31.jpg', null, 'The Wagenburg, the imperial carriage museum, and one of the old court coaches with its gilt and red wheels.', 31),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-32.jpg', null, 'A black and gold state carriage, the imperial arms on the door, drawn up under the museum lights.', 32),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-33.jpg', null, 'A bright yellow court carriage with its team of grey horses.', 33),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-34.jpg', null, 'A glass state coach in black and gold, its cushioned interior glowing pink behind the windows.', 34),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-35.jpg', null, 'The black court funeral carriage, draped and hung with silver, used to carry the Habsburgs to their burial.', 35),
  (v_act, 'eastern-europe/vienna/schonbrunn/schonbrunn-36.jpg', null, 'A last look down the hall, a team of plumed white horses in ceremonial harness and, beyond them, the great gold Imperial Coach kept for coronations.', 36);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Austrian dinner & classical concert',
          'Dinner at the Marchfelderhof, a gloriously over-the-top country restaurant crammed to the rafters with antiques and curios, then a Vienna concert of arias, waltzes and polkas by Strauss, Lehár and Mozart. The concert was a treat, and we had front row seats.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/vienna/dinner/dinner-01.jpg', 'The Marchfelderhof just outside Vienna, where we had dinner, its yellow Baroque front hung with flags and a red carpet rolled out at the door. The Latin over the windows makes asparagus the law of the house and the guest its king.', 1),
  (v_act, 'eastern-europe/vienna/dinner/dinner-02.jpg', 'Inside, every wall and beam crammed with antiques, paintings, birdcages and chandeliers, red velvet stools along the bar. The place is famous for its gloriously cluttered rooms.', 2);

  -- 6 · Prague
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'prague', 'Prague', 'Czech Republic', 50.0755, 14.4378, 6, 2, '2026-06-30', '2026-07-02',
          'The ''Golden City'', the final stop before the journey home.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Telč en route',
          'A light lunch on the UNESCO-listed triangular market square of Telč, amid pastel Renaissance and Baroque townhouses, on the scenic drive through Moravia and Bohemia.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/prague/telc/telc-01.jpg', 'The upper end of the square, by the château, a white bell tower with an onion dome rising over the arcaded houses. We stopped here for lunch on the drive north.', 1),
  (v_act, 'eastern-europe/prague/telc/telc-02.jpg', 'The heart of the square, a Baroque Marian column ringed by flowerbeds and benches, arcaded houses in pink and cream behind.', 2),
  (v_act, 'eastern-europe/prague/telc/telc-03.jpg', 'The long triangular market square, its rows of pastel Renaissance and Baroque houses with arcades and shaped gables. This centre is UNESCO-listed, and it is easy to see why.', 3);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Illuminated Prague & tavern visit',
          'An evening on foot from the castle heights down to the river. We started up by Strahov Monastery, stopped for a Czech beer at a tavern, then wound down through the Lesser Town to Charles Bridge as dusk settled and the lights came on.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/prague/illuminated/illuminated-01.jpg', 'The evening began up in the castle quarter, by a Baroque church with a tavern (a výčep, a Czech tap room) across the little square.', 1),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-02.jpg', 'An old rampart on the way down, a great wall of brick and rough stone with an arch cut through for the lane.', 2),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-03.jpg', 'The church of Strahov Monastery, its white Baroque front topped by a gilded sunburst, Vatican flags by the door.', 3),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-04.jpg', 'The same church from the monastery courtyard, its twin green-capped towers and long white flank.', 4),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-05.jpg', 'Starting down the hill, the lane dropping away and the city opening up in the haze ahead.', 5),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-06.jpg', 'The view out over Prague from the heights, the castle and the spires of St. Vitus off to the left, the city rolling away into the evening.', 6),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-07.jpg', 'Prague Castle closer to, the Gothic spires of St. Vitus Cathedral rising over the red roofs of the Lesser Town.', 7),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-08.jpg', 'Down at the river, Charles Bridge at dusk, the Old Town spires catching the last pink light while people gathered on the steps to watch.', 8),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-09.jpg', 'Under one of the bridge''s arches, the little Čertovka channel and an old mill wheel, the corner they call Prague''s Venice.', 9),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-10.jpg', 'From the bridge, the Lesser Town tower in silhouette and the castle glowing on the skyline as the sun went down.', 10),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-11.jpg', 'Blue hour on the Vltava, a riverboat gliding past the lit embankment.', 11),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-12.jpg', 'Looking upriver as the light went, the terraces along the Kampa bank lit up and boats out on the water.', 12),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-13.jpg', 'The castle and St. Vitus lit gold at sundown, above a red roof with one window already glowing.', 13),
  (v_act, 'eastern-europe/prague/illuminated/illuminated-14.jpg', 'The Lesser Town bridge towers at the far end of Charles Bridge, the lamps lit and the crowds still crossing at dusk.', 14);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Prague sightseeing',
          'A guided walk through the Hradčany castle district and down into the Old Town, taking in Prague Castle and St. Vitus Cathedral, the river, and the Astronomical Clock.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, src, video_src, caption, sort_order) values
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-01.jpg', null, 'A bronze monument to the astronomers Tycho Brahe and Johannes Kepler, who both worked in Prague under Emperor Rudolf II. Our castle tour set off from here on Pohořelec.', 1),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-02.jpg', null, 'The Černín Palace, the longest Baroque facade in the city and now the Foreign Ministry, running the whole length of Loretánské náměstí.', 2),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-03.jpg', null, 'The bell tower of the Loreta pilgrimage church across the same square, its green onion dome housing a carillon that still chimes the hour.', 3),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-04.jpg', null, 'An ornate cast-iron lamp on the castle square, a cluster of lanterns on a single tall column.', 4),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-05.jpg', null, 'A Baroque plague column on the castle square, the Virgin gilded at the top above a ring of saints, raised in thanks after an outbreak of plague.', 5),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-06.jpg', null, 'One of the grand old palaces on Hradčanské náměstí, its walls worked in Renaissance sgraffito beneath shaped gables.', 6),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-07.jpg', null, 'Inside the gates, one of the castle''s great courtyards opening up, the spires of St. Vitus Cathedral rising over the far buildings.', 7),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-08.jpg', null, 'A castle guard at his post, still as a statue in the striped sentry box by the gate.', 8),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-09.jpg', null, 'The west front of St. Vitus Cathedral, its twin Gothic towers and great rose window. After several days of 40°C-plus heat, the rain finally came, cooled the air, and stayed with us the rest of the day. You can see it on the wet cobbles.', 9),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-10.jpg', null, 'A closer look at the cathedral''s Gothic skin, buttresses, pinnacles and carved tracery worked in pale stone.', 10),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-11.jpg', null, 'The south side of the cathedral across the courtyard, the great tower over the Golden Gate rising above the flying buttresses.', 11),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-12.jpg', null, 'The lane at the eastern end of the castle, past the Lobkowicz Palace, dropping toward the Black Tower gate.', 12),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-13.jpg', null, 'A glimpse of the Old Town through a gap in the castle wall, the twin Gothic spires of the Týn Church across the river.', 13),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-14.jpg', null, 'The group at a viewpoint on the castle ramparts, the red roofs of the Lesser Town falling away below.', 14),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-15.jpg', null, 'Down by the Vltava afterward, tour boats moored along the bank and the castle back up on its hill in the distance.', 15),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-16.jpg', null, 'Old Town Square, the Gothic spires of the Týn Church over the pastel houses, the cobbles still wet from the afternoon rain.', 16),
  (v_act, 'eastern-europe/prague/sightseeing/sightseeing-17.jpg', 'eastern-europe/prague/sightseeing/sightseeing-17.mp4', 'The Astronomical Clock on the Old Town Hall, more than six hundred years old. On the hour the windows open and the Apostles file past, and the crowd, umbrellas up in the rain, gathers to watch.', 17);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Czech, please!',
          'A guided culinary walk through three local eateries, savory to sweet, finishing with a traditional kolache.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/prague/czech/czech-01.jpg', 'A chlebíček to start, the classic Czech open sandwich: a slice of baguette layered with potato salad and rolled ham, topped with a tuft of fresh cress.', 1),
  (v_act, 'eastern-europe/prague/czech/czech-02.jpg', 'Svíčková, about as national as it gets: braised beef in a smooth root-vegetable cream sauce with bread dumplings, a spoon of cranberry, and a swirl of cream.', 2),
  (v_act, 'eastern-europe/prague/czech/czech-03.jpg', 'A potato dumpling stuffed with smoked meat, sauerkraut alongside and a tangle of crisp fried onions on top.', 3),
  (v_act, 'eastern-europe/prague/czech/czech-04.jpg', 'A strange sight between courses: a ghostly figure of black wire strung on cables above the street, seeming to float over the rooftops.', 4),
  (v_act, 'eastern-europe/prague/czech/czech-05.jpg', 'The Municipal House, Prague''s great Art Nouveau concert hall, its golden mosaic gleaming above the cafe terrace.', 5),
  (v_act, 'eastern-europe/prague/czech/czech-06.jpg', 'The Powder Tower right beside it, a dark Gothic gate that once stored gunpowder and marks the start of the old coronation route into the Old Town.', 6),
  (v_act, 'eastern-europe/prague/czech/czech-07.jpg', 'Back on Old Town Square to finish, the Old Town Hall tower at the left, the green dome of St. Nicholas, and the Jan Hus memorial out in the square.', 7);

  -- 7 · Berlin (return)
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'berlin-return', 'Berlin', 'Germany', 52.52, 13.405, 7, 1, '2026-07-02', '2026-07-03',
          'Back where it started, for a farewell night and the flight home.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Home via Dresden',
          'On the final leg back to Berlin, a morning in Dresden to walk the rebuilt Baroque centre: the Fürstenzug (the porcelain Procession of Princes), the Hofkirche and Residenzschloss, the Semperoper, and the Zwinger. Then the drive on to a farewell dinner in the city where it all began.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, src, caption, sort_order) values
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-01.jpg', 'The morning walk began by the Academy of Fine Arts on Brühl''s Terrace, its glass-domed corner (Dresdeners call it the Lemon Squeezer) rising behind the older wing.', 1),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-02.jpg', 'The Fürstenzug seen from the end of the street, a mural more than a hundred metres long running the whole length of the old royal stables wall.', 2),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-03.jpg', 'One of the earliest riders in the Procession of Princes, the margrave Konrad the Great (1127-1156), banner bearers and men-at-arms crowding behind him.', 3),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-04.jpg', 'Further along, the Saxon electors and kings: Johann Georg IV, then Augustus the Strong (August II) and August III, and Friedrich Christian, each named and dated in the border below.', 4),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-05.jpg', 'This is the Fürstenzug, the Procession of Princes: a 102-metre mural of Saxony''s rulers along the wall of the old royal stables. First painted in 1876, it was later baked into some 23,000 Meissen porcelain tiles so it would endure, which makes it the largest porcelain artwork in the world. Here at the tail come the scholars, artists and children on foot, beside a verse thanking the people for their old loyalty.', 5),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-06.jpg', 'Behind that wall lies the Stallhof, the old tournament yard. This is a historic photograph of it printed on the builders'' netting while the courtyard was under repair.', 6),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-07.jpg', 'The Katholische Hofkirche, the Catholic court church and now Dresden''s cathedral, its tall tower and a parade of saints along the roofline.', 7),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-08.jpg', 'The monument to King Friedrich August the Just on the Schlossplatz, cast in bronze above allegorical figures, in front of the old Saxon parliament house.', 8),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-09.jpg', 'The Residenzschloss, the royal palace, its tall Hausmannsturm rising over the rooftops and an ornate covered passage bridging the lane below.', 9),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-10.jpg', 'The palace again from the open Schlossplatz, the Saxon flag flying, the square busy under a hot blue sky.', 10),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-11.jpg', 'The Semperoper on Theatre Square, Dresden''s opera house, the bronze equestrian statue of King Johann out front and one corner still wrapped in scaffolding.', 11),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-12.jpg', 'Into the Zwinger, the great Baroque showpiece, its long gallery of arched windows looking out over the formal gardens.', 12),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-13.jpg', 'The Zwinger courtyard from above, the whole quadrangle of pavilions and galleries laid out around the lawns and fountains.', 13),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-14.jpg', 'The Kronentor, the Crown Gate of the Zwinger, its onion dome topped by a gilded crown held up by four eagles.', 14),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-15.jpg', 'An old cannon on its carriage outside the Pulverturm by the Frauenkirche, one of the odd little finds along the way.', 15),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-16.jpg', 'Our coach for the whole trip, a Globus touring bus, parked on the cobbles in Dresden. It carried us out from Berlin through Poland, Hungary, Austria and the Czech Republic and all the way back, two weeks and six countries. It felt right to give it a nod on the last leg home.', 16),
  (v_act, 'eastern-europe/berlin-return/dresden-2/dresden-2-17.jpg', 'Two Stolpersteine (stumbling stones) among the cobbles, the small brass memorials that mark where victims of the Nazis once lived or worked. These name Max Hermann Dietze and Ernst Fritz Gottschling, who worked here and were persecuted as Jehovah''s Witnesses. Both were arrested in the 1930s and sent to the camps, and neither survived: Dietze died in 1938, Gottschling on a death march in 1945. Each stone carries a single name, so that no one is left a number.', 17);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Departure',
          'The tour ended after breakfast, auf Wiedersehen, Berlin.', false, 2);
end $$;
