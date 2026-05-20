/** Base URL for metadata and sitemap; fallback for local dev. */
export function siteUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return u && u.length > 0 ? u : "http://localhost:3000";
}
