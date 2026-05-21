import { afterEach, describe, expect, it, vi } from "vitest";

import { assertCrmWebhookUrlAllowed } from "./crm-webhook";

describe("assertCrmWebhookUrlAllowed", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows any https host in development without allowlist", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(() => assertCrmWebhookUrlAllowed("https://hooks.example.com/lead")).not.toThrow();
  });

  it("requires allowlist in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CRM_WEBHOOK_ALLOWED_HOSTS", "");
    expect(() => assertCrmWebhookUrlAllowed("https://hooks.example.com/lead")).toThrow(
      /CRM_WEBHOOK_ALLOWED_HOSTS/,
    );
  });

  it("accepts host in production allowlist", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CRM_WEBHOOK_ALLOWED_HOSTS", "hooks.example.com");
    expect(() => assertCrmWebhookUrlAllowed("https://hooks.example.com/lead")).not.toThrow();
  });

  it("rejects host not in allowlist", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CRM_WEBHOOK_ALLOWED_HOSTS", "hooks.example.com");
    expect(() => assertCrmWebhookUrlAllowed("https://evil.com/lead")).toThrow(/not allowed/);
  });
});
