import { describe, expect, it } from "vitest";
import { productInterestFromSearchParam } from "./query-param";

describe("productInterestFromSearchParam", () => {
  it("maps fitness and aliases", () => {
    expect(productInterestFromSearchParam("fitness")).toBe("Fitness");
    expect(productInterestFromSearchParam("f")).toBe("Fitness");
  });

  it("maps newer product codes", () => {
    expect(productInterestFromSearchParam("kanban")).toBe("Kanban");
    expect(productInterestFromSearchParam("marketing")).toBe("Marketing");
    expect(productInterestFromSearchParam("consultatech")).toBe("Credit");
    expect(productInterestFromSearchParam("zyncora")).toBe("Chat");
  });

  it("returns undefined for unknown", () => {
    expect(productInterestFromSearchParam("unknown")).toBeUndefined();
    expect(productInterestFromSearchParam("")).toBeUndefined();
  });
});
