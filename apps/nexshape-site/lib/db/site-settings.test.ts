import { afterEach, describe, expect, it } from "vitest";

import { getSiteSettings, saveSiteSettings } from "./index";

describe("site settings", () => {
  const previous = process.env.UPSTASH_REDIS_REST_URL;
  const previousToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  afterEach(async () => {
    if (previous) process.env.UPSTASH_REDIS_REST_URL = previous;
    else delete process.env.UPSTASH_REDIS_REST_URL;
    if (previousToken) process.env.UPSTASH_REDIS_REST_TOKEN = previousToken;
    else delete process.env.UPSTASH_REDIS_REST_TOKEN;
    await saveSiteSettings({});
  });

  it("persists whatsapp phone to local db", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    await saveSiteSettings({
      whatsappPhone: "5511987654321",
      whatsappDisplay: "+55 (11) 98765-4321",
    });

    const settings = await getSiteSettings();
    expect(settings.whatsappPhone).toBe("5511987654321");
    expect(settings.whatsappDisplay).toBe("+55 (11) 98765-4321");
  });
});
