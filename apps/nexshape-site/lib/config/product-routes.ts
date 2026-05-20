/** Canonical marketing URLs per product slug (nav + sitemap + redirects). */
export const PRODUCT_LANDING_PATHS: Record<string, string> = {
  fitness: "/nexshape-fitness",
  dental: "/oralbyte",
  chat: "/zyncora",
  kanban: "/kanban",
  commerce: "/paivatech-commerce",
  credit: "/consultatech",
  marketing: "/paivagrowth",
};

export const PRODUCT_LANDING_URLS = Object.values(PRODUCT_LANDING_PATHS);
