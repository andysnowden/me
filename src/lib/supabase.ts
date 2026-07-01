import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Publishable ("anon") key — safe to expose to the browser. Read-only via RLS.
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** True when the app has enough config to talk to Supabase. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Returns a shared read-only Supabase client, or null if unconfigured. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, anonKey!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

const PHOTO_BUCKET = "trip-photos";

/**
 * Resolves a stored photo reference to a displayable URL.
 * - null            → null (caller renders a placeholder)
 * - absolute URL    → returned as-is
 * - storage path    → public URL in the trip-photos bucket
 */
export function photoUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  if (!url) return null;
  const clean = src.replace(/^\/+/, "");
  return `${url}/storage/v1/object/public/${PHOTO_BUCKET}/${clean}`;
}
