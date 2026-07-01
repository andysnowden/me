-- Seed: Globus "The Best of Eastern Europe" (Tour RO 60620), June 19 – July 3, 2026.
-- Route: Berlin → Warsaw → Kraków → Budapest → Vienna → Prague, returning to Berlin.
-- Idempotent — deleting the trip cascades to stops → activities → photos.
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
     'Fourteen days, six countries — a guided Globus tour',
     'Two weeks across Eastern Europe on Globus''s “Best of Eastern Europe” tour. Starting and ending in Berlin, the route ran through Poland — with a sobering day at Auschwitz — and on to Budapest, Vienna, and Prague. Here''s the journey, city by city.',
     'Globus', '2026-06-19', '2026-07-03', true)
  returning id into v_trip;

  insert into public.photos (trip_id, sort_order) values (v_trip, 0);

  -- 1 · Berlin
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'berlin', 'Berlin', 'Germany', 52.52, 13.405, 1, 4, '2026-06-19', '2026-06-22',
          'Where the tour began and ended — a few nights to start, and a farewell night on the way home.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Welcome dinner',
          'Met the Tour Director and traveling companions over a welcome dinner at the hotel.', false, 1);

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Historic Berlin',
          'A guided sightseeing tour past the State Opera House, Museum Island, the Reichstag, Tiergarten, and Ku''damm, with photo stops at the Brandenburg Gate, the Kaiser Wilhelm Memorial Church, and the Holocaust Memorial.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Half-Day Potsdam Discovery',
          'Out to Potsdam: the House of the Wannsee Conference, the gardens of Sanssouci Palace, the Dutch Quarter and the Alexandrowka Russian colony, and the Glienicke Brücke — the Cold War ''Bridge of Spies.''', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Home via Dresden',
          'On the final leg back to Berlin, a stop in Dresden for the Baroque courtyard of the Zwinger Palace, then a farewell dinner in the city where it all began.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  -- 2 · Warsaw
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'warsaw', 'Warsaw', 'Poland', 52.2297, 21.0122, 2, 2, '2026-06-22', '2026-06-24',
          'Poland''s capital, reached by a long drive south across the border.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Poznań en route',
          'A break in Poznań, one of Poland''s oldest cities, to wander the colourful Old Market Square — where the Town Hall clock''s mechanical goats butt heads at noon.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Old Town & St. John''s Cathedral',
          'A guided walk through the rebuilt medieval Stare Miasto and the Cathedral of St. John.', false, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Chopin concert',
          'An evening recital of Chopin''s compositions in an elegant Warsaw hall.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 1) g;

  -- 3 · Kraków
  insert into public.stops (trip_id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary)
  values (v_trip, 'krakow', 'Kraków', 'Poland', 50.0647, 19.945, 3, 2, '2026-06-24', '2026-06-26',
          'A UNESCO-listed old town that came through the war virtually unscathed — and the base for the day at Auschwitz.')
  returning id into v_stop;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Częstochowa en route',
          'On the drive south from Warsaw, a stop at the Jasna Góra monastery — Poland''s great pilgrimage site, home to the Black Madonna.', false, 1)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Auschwitz-Birkenau Memorial',
          'A moving guided visit to the site of the former concentration camp — the heaviest, most important day of the trip.', true, 2)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 6) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Kraków city tour',
          'A walk through Kazimierz, the Old Jewish Quarter, plus St. Mary''s Church and a photo stop at Wawel Castle.', false, 3)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

  insert into public.activities (stop_id, title, description, is_highlight, sort_order)
  values (v_stop, 'Wieliczka Salt Mine',
          'Down 136 metres into a UNESCO-listed labyrinth carved entirely from salt — tunnels, a subterranean lake, and the astonishing Chapel of St. Kinga, salt from chandelier to altarpiece.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 3) g;

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
          'Museums, shops, and Viennese coffee-house culture — a kaffee und kuchen in one of the city''s elegant cafés.', false, 2)
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
          'The ''Golden City'' — the final stop before the journey home.')
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
          'A guided culinary walk through three local eateries — savory to sweet, finishing with a traditional kolache.', false, 4)
  returning id into v_act;
  insert into public.photos (activity_id, sort_order) select v_act, g from generate_series(1, 2) g;
end $$;
