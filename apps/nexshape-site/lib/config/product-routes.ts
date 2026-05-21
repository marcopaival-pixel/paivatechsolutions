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

/** Query `?produto=` nas landings → formulário de contato. */
export const CONTACT_PRODUCT_QUERY: Record<string, string> = {
  fitness: "fitness",
  dental: "oralbyte",
  chat: "zyncora",
  credit: "credit",
  kanban: "kanban",
  commerce: "commerce",
  marketing: "marketing",
};

export const PRODUCT_LANDING_URLS = Object.values(PRODUCT_LANDING_PATHS);
