-- Add optional video support to photos.
--
-- When video_src is set, the existing `src` column holds the poster still shown
-- in the gallery grid, and video_src points to a playable file (e.g. an mp4) in
-- the trip-photos bucket that the lightbox plays when the photo is enlarged.
alter table public.photos add column if not exists video_src text;
