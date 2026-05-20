import type { MetadataRoute } from "next";
import { PRODUCT_LANDING_URLS } from "@/lib/config/product-routes";
import { PRODUCT_SLUGS } from "@/lib/content/products";
import { siteUrl } from "@/lib/site";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date(PRIVACY_POLICY_VERSION);
  const staticPaths = ["", "/sobre", "/contato", "/contato/enviado", "/privacidade", "/termos"];

  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const landingEntries = PRODUCT_LANDING_URLS.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const legacyProductEntries = PRODUCT_SLUGS.map((slug) => ({
    url: `${base}/produtos/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...landingEntries, ...legacyProductEntries];
}
