import type { NextConfig } from "next";

import { PRODUCT_LANDING_PATHS } from "./lib/config/product-routes";
import { PRODUCT_SLUGS } from "./lib/config/products";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
    ].join("; "),
  },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
];

const productRedirects = PRODUCT_SLUGS.map((slug) => {
  const destination = PRODUCT_LANDING_PATHS[slug];
  if (!destination) return null;
  return {
    source: `/produtos/${slug}`,
    destination,
    permanent: true,
  };
}).filter((r): r is { source: string; destination: string; permanent: true } => r !== null);

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return productRedirects;
  },
};

export default nextConfig;
