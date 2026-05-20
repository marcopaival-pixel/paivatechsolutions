import { afterEach, describe, expect, it, vi } from "vitest";
import { isTurnstileEnabled, verifyTurnstileToken } from "./turnstile";

describe("turnstile", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("isTurnstileEnabled requires both keys", () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site");
    expect(isTurnstileEnabled()).toBe(false);

    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site");
    expect(isTurnstileEnabled()).toBe(true);
  });

  it("verifyTurnstileToken returns false without secret", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(await verifyTurnstileToken("token")).toBe(false);
  });

  it("verifyTurnstileToken returns true on success response", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      }),
    );
    expect(await verifyTurnstileToken("valid-token", "127.0.0.1")).toBe(true);
  });
});
