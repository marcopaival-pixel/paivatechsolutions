import type { ProductSlug } from "@/lib/config/products";
import { getProductsDynamic } from "@/lib/db";
import { resolveProductAppUrl } from "./resolve-app-url";

/** URL exibida nos botões "Acessar sistema" (lida do painel admin). */
export async function getSystemAccessUrlBySlug(slug: ProductSlug): Promise<string | null> {
  const products = await getProductsDynamic();
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  return resolveProductAppUrl(product);
}
