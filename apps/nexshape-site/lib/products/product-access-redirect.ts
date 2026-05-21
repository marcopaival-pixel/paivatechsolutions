import type { ProductSlug } from "@/lib/config/products";
import { CONTACT_PRODUCT_QUERY, PRODUCT_LANDING_PATHS } from "@/lib/config/product-routes";
import { getSystemAccessUrlBySlug } from "./landing-access";

/** Rota interna que redireciona para a URL configurada no painel admin. */
export function getProductAccessRedirectPath(slug: ProductSlug): string | null {
  const landing = PRODUCT_LANDING_PATHS[slug];
  if (!landing) return null;
  return `${landing}/acessar`;
}

export function getProductAccessFallbackPath(slug: ProductSlug): string {
  const query = CONTACT_PRODUCT_QUERY[slug];
  return `/contato?produto=${query}`;
}

/** URL externa resolvida no admin (produção ou desenvolvimento ativo). */
export async function resolveProductAccessRedirectTarget(
  slug: ProductSlug,
): Promise<string | null> {
  return getSystemAccessUrlBySlug(slug);
}
