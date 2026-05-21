import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createSessionToken,
  isAdminAuthMisconfigured,
  isAdminPanelMisconfigured,
  isSessionSecretMisconfigured,
  verifySessionToken,
} from "./auth";

describe("admin auth config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not flag misconfig outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("SESSION_SECRET", "");
    expect(isAdminAuthMisconfigured()).toBe(false);
    expect(isSessionSecretMisconfigured()).toBe(false);
    expect(isAdminPanelMisconfigured()).toBe(false);
  });

  it("flags default password in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ADMIN_PASSWORD", "admin123");
    vi.stubEnv("SESSION_SECRET", "x".repeat(32));
    expect(isAdminAuthMisconfigured()).toBe(true);
    expect(isSessionSecretMisconfigured()).toBe(false);
    expect(isAdminPanelMisconfigured()).toBe(true);
  });

  it("flags missing SESSION_SECRET in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ADMIN_PASSWORD", "strong-password-here");
    vi.stubEnv("SESSION_SECRET", "");
    expect(isSessionSecretMisconfigured()).toBe(true);
    expect(isAdminPanelMisconfigured()).toBe(true);
  });

  it("creates and verifies session token in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ADMIN_PASSWORD", "local-dev-password");
    vi.stubEnv("SESSION_SECRET", "dev-session-secret-32chars-min");

    const token = await createSessionToken();
    expect(await verifySessionToken(token)).toBe(true);
    expect(await verifySessionToken("invalid.token")).toBe(false);
  });
});
