import { describe, expect, it } from "vitest";

import { timingSafeEqualString } from "./timing-safe";

describe("timingSafeEqualString", () => {
  it("returns true for equal strings", () => {
    expect(timingSafeEqualString("secret", "secret")).toBe(true);
  });

  it("returns false for different strings of same length", () => {
    expect(timingSafeEqualString("secret", "secrex")).toBe(false);
  });

  it("returns false for different lengths", () => {
    expect(timingSafeEqualString("short", "longer")).toBe(false);
  });
});
