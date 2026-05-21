import type { NextRequest } from "next/server";

import { handleProductAccessGet } from "@/lib/products/product-access-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleProductAccessGet(request, "commerce");
}
