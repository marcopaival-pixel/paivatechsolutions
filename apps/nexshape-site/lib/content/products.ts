import {
  PRODUCT_DEFINITIONS,
  PRODUCT_SLUGS,
  type ProductSlug,
  isProductSlug,
} from "@/lib/config/products";
import type { ProductInterest } from "@/lib/contact/schema";

export { PRODUCT_SLUGS, isProductSlug };
export type { ProductSlug };

/** Prefill do formulário na página `/produtos/[slug]` (enum OpenAPI). */
export function productInterestFromProductSlug(slug: string): ProductInterest | undefined {
  if (!isProductSlug(slug)) return undefined;
  const p = PRODUCT_DEFINITIONS.find((item) => item.slug === slug);
  return p?.apiValue as ProductInterest | undefined;
}

interface ProductContent {
  slug: ProductSlug;
  title: string;
  short: string;
}

export const PRODUCTS: Record<ProductSlug, ProductContent> = PRODUCT_DEFINITIONS.reduce(
  (acc, p) => {
    acc[p.slug] = {
      slug: p.slug,
      title: p.title,
      short: p.short,
    };
    return acc;
  },
  {} as Record<ProductSlug, ProductContent>,
);
