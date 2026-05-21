import { describe, expect, it } from "vitest";

import { PRODUCT_SLUGS } from "@/lib/config/products";
import { PRODUCT_LANDING_PATHS } from "@/lib/config/product-routes";
import {
  getProductAccessFallbackPath,
  getProductAccessRedirectPath,
} from "./product-access-redirect";

describe("product-access-redirect", () => {
  it.each(PRODUCT_SLUGS)("maps %s to landing /acessar route", (slug) => {
    const landing = PRODUCT_LANDING_PATHS[slug];
    expect(getProductAccessRedirectPath(slug)).toBe(`${landing}/acessar`);
  });

  it("builds contact fallback for fitness", () => {
    expect(getProductAccessFallbackPath("fitness")).toBe("/contato?produto=fitness");
  });
});
