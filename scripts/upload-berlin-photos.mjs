// One-off uploader for the Berlin self-guided-day photos.
// Processes each image (auto-orient, cap at 2560px long edge, re-encode JPEG,
// strip EXIF/GPS) and uploads to the public `trip-photos` bucket.
//
// Uploads require the service_role key (bypasses RLS for trusted server-side
// use). Keep it out of git — put it in .env.local (gitignored) and run:
//   node --env-file=.env.local scripts/upload-berlin-photos.mjs
// You can rotate the key in the Supabase dashboard afterward.

import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

// macOS stores filenames in decomposed Unicode (NFD), so hardcoded name
// literals won't match. Discover folders/files dynamically instead.
const isJpeg = (f) => /\.jpe?g$/i.test(f);
const listJpegsRecursive = (dir) => {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...listJpegsRecursive(full));
    else if (isJpeg(e)) out.push(full);
  }
  return out;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Supabase → Settings → API → service_role).",
  );
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const BUCKET = "trip-photos";
const BASE = process.argv[2] || "/Users/asnowden/Desktop/trip/berlin";

// Natural sort by filename so IMG_2 < IMG_10 (and nesting doesn't reorder).
const natSort = (a, b) =>
  path
    .basename(a)
    .localeCompare(path.basename(b), undefined, {
      numeric: true,
      sensitivity: "base",
    });

const topDirs = readdirSync(BASE).filter((e) =>
  statSync(path.join(BASE, e)).isDirectory(),
);
const technikDir = topDirs.find((d) => /^deutsches/i.test(d));
const naturkundeDir = topDirs.find((d) => /natural/i.test(d));
if (!technikDir || !naturkundeDir) {
  console.error("Could not find the Technikmuseum / natural history folders in", BASE);
  process.exit(1);
}

const groups = [
  {
    key: "technikmuseum",
    files: listJpegsRecursive(path.join(BASE, technikDir)).sort(natSort),
  },
  {
    // Includes the shot in the stray nested folder inside "natural history".
    key: "naturkunde",
    files: listJpegsRecursive(path.join(BASE, naturkundeDir)).sort(natSort),
  },
];

async function processImage(file) {
  // Auto-orient via EXIF, cap long edge at 2560, strip metadata (default),
  // re-encode as high-quality JPEG.
  return sharp(file)
    .rotate()
    .resize(2560, 2560, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

const manifest = {};

for (const { key: group, files } of groups) {
  manifest[group] = [];
  for (let i = 0; i < files.length; i++) {
    const n = String(i + 1).padStart(2, "0");
    const dest = `eastern-europe/berlin/${group}/${group}-${n}.jpg`;
    const buf = await processImage(files[i]);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(dest, buf, { contentType: "image/jpeg", upsert: true });
    if (error) {
      console.error(`FAIL ${dest}: ${error.message}`);
      process.exit(1);
    }
    console.log(`OK   ${dest}  (${(buf.length / 1024).toFixed(0)} KB)`);
    manifest[group].push(dest);
  }
}

console.log("\n---MANIFEST---");
console.log(JSON.stringify(manifest));
