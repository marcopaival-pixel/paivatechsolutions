import { describe, expect, it } from "vitest";
import { PRODUCT_DEFINITIONS } from "@/lib/config/products";
import { OTHER_PRODUCT_INTEREST, PRODUCT_INTEREST_OPTIONS } from "./product-interest-options";

describe("PRODUCT_INTEREST_OPTIONS", () => {
  it("lists every product system plus Outros", () => {
    expect(PRODUCT_INTEREST_OPTIONS).toHaveLength(PRODUCT_DEFINITIONS.length + 1);
    expect(PRODUCT_INTEREST_OPTIONS.at(-1)?.value).toBe(OTHER_PRODUCT_INTEREST);
    expect(PRODUCT_INTEREST_OPTIONS.at(-1)?.label).toBe("Outros");
  });
});
