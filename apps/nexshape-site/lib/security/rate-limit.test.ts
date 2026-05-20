import { describe, expect, it } from "vitest";
import { checkMemoryRateLimit } from "./rate-limit";

describe("checkMemoryRateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-${Date.now()}-a`;
    expect(checkMemoryRateLimit(key, 3, 60_000).allowed).toBe(true);
    expect(checkMemoryRateLimit(key, 3, 60_000).allowed).toBe(true);
    expect(checkMemoryRateLimit(key, 3, 60_000).allowed).toBe(true);
  });

  it("blocks after max requests", () => {
    const key = `test-${Date.now()}-b`;
    for (let i = 0; i < 2; i++) {
      expect(checkMemoryRateLimit(key, 2, 60_000).allowed).toBe(true);
    }
    const blocked = checkMemoryRateLimit(key, 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });
});
