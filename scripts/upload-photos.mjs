// General photo uploader for the trip-photos bucket.
//
// Usage:
//   node --env-file=.env.local scripts/upload-photos.mjs <sourceDir> <bucketPrefix> [namePrefix] [startIndex]
//
// Example:
//   node --env-file=.env.local scripts/upload-photos.mjs \
//     "/mnt/nfs/truenas/Photos/berlin/historic-berlin" \
//     "eastern-europe/berlin/historic-berlin"
//
// Uploads every JPEG under <sourceDir> (recursively, natural-sorted by filename)
// to trip-photos/<bucketPrefix>/<namePrefix>-NN.jpg, resized to a 2560px long
// edge with EXIF/GPS stripped. Prints a JSON manifest of the uploaded paths.
//
// startIndex (default 1) sets the first NN, so you can append to an existing
// gallery without overwriting it: pass 13 to start naming at <namePrefix>-13.jpg.
//
// Requires SUPABASE_SERVICE_ROLE_KEY (anon is read-only). Keep it in .env.local
// (gitignored) and rotate afterward if desired.

import { readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Supabase → Settings → API → service_role).",
  );
  process.exit(1);
}

const sourceDir = process.argv[2];
const bucketPrefix = (process.argv[3] || "").replace(/^\/+|\/+$/g, "");
const namePrefix = process.argv[4] || path.basename(bucketPrefix);
const startIndex = Number.parseInt(process.argv[5] ?? "1", 10);
if (!sourceDir || !bucketPrefix) {
  console.error(
    "Usage: node --env-file=.env.local scripts/upload-photos.mjs <sourceDir> <bucketPrefix> [namePrefix] [startIndex]",
  );
  process.exit(1);
}
if (!Number.isInteger(startIndex) || startIndex < 1) {
  console.error(`Invalid startIndex "${process.argv[5]}" (must be a positive integer).`);
  process.exit(1);
}
if (!existsSync(sourceDir)) {
  console.error(`Source folder not found: ${sourceDir}`);
  process.exit(1);
}

const BUCKET = "trip-photos";
const supabase = createClient(url, key, { auth: { persistSession: false } });

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
// Natural sort by filename so IMG_2 < IMG_10 (and nesting doesn't reorder).
const natSort = (a, b) =>
  path
    .basename(a)
    .localeCompare(path.basename(b), undefined, {
      numeric: true,
      sensitivity: "base",
    });

const files = listJpegsRecursive(sourceDir).sort(natSort);
if (files.length === 0) {
  console.error(`No JPEGs found under ${sourceDir}`);
  process.exit(1);
}

const manifest = [];
for (let i = 0; i < files.length; i++) {
  const n = String(startIndex + i).padStart(2, "0");
  const dest = `${bucketPrefix}/${namePrefix}-${n}.jpg`;
  const buf = await sharp(files[i])
    .rotate()
    .resize(2560, 2560, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(dest, buf, { contentType: "image/jpeg", upsert: true });
  if (error) {
    console.error(`FAIL ${dest}: ${error.message}`);
    process.exit(1);
  }
  console.log(`OK   ${path.basename(files[i])} -> ${dest}  (${(buf.length / 1024).toFixed(0)} KB)`);
  manifest.push(dest);
}

console.log("\n---MANIFEST---");
console.log(JSON.stringify({ [namePrefix]: manifest }));
