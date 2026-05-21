import { NextRequest, NextResponse } from "next/server";

import type { ProductSlug } from "@/lib/config/products";
import {
  getProductAccessFallbackPath,
  resolveProductAccessRedirectTarget,
} from "@/lib/products/product-access-redirect";

export async function handleProductAccessGet(
  request: NextRequest,
  slug: ProductSlug,
): Promise<NextResponse> {
  const target = await resolveProductAccessRedirectTarget(slug);

  if (target) {
    return NextResponse.redirect(target, 302);
  }

  const fallback = new URL(getProductAccessFallbackPath(slug), request.url);
  return NextResponse.redirect(fallback, 302);
}
