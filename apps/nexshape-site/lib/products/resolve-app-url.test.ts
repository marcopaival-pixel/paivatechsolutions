import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildAppUrlFromHostInput,
  resolveProductAppUrl,
  previewProductAppUrls,
} from "./resolve-app-url";

describe("buildAppUrlFromHostInput", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env, NODE_ENV: "development" };
    process.env.NEXT_PUBLIC_APP_DOMAIN_PRODUCTION = "paivatech.com.br";
    process.env.NEXT_PUBLIC_APP_DOMAIN_DEVELOPMENT = "localhost:8000";
    delete process.env.NEXT_PUBLIC_FORCE_APP_ACCESS_MODE;
  });

  afterEach(() => {
    process.env = env;
  });

  it("builds production subdomain URL", () => {
    expect(buildAppUrlFromHostInput("fitness", "production")).toBe(
      "https://fitness.paivatech.com.br",
    );
  });

  it("accepts absolute production URL", () => {
    expect(buildAppUrlFromHostInput("https://app.example.paivatech.com.br", "production")).toBe(
      "https://app.example.paivatech.com.br",
    );
  });

  it("builds development localhost URL", () => {
    expect(buildAppUrlFromHostInput("localhost:8000", "development")).toBe(
      "http://localhost:8000",
    );
  });

  it("returns null for empty input", () => {
    expect(buildAppUrlFromHostInput("", "production")).toBeNull();
  });
});

describe("resolveProductAppUrl", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env, NODE_ENV: "development" };
    process.env.NEXT_PUBLIC_APP_DOMAIN_PRODUCTION = "paivatech.com.br";
    process.env.NEXT_PUBLIC_APP_DOMAIN_DEVELOPMENT = "localhost:8000";
    delete process.env.NEXT_PUBLIC_FORCE_APP_ACCESS_MODE;
  });

  afterEach(() => {
    process.env = env;
  });

  it("uses development host when mode is development", () => {
    const url = resolveProductAppUrl({
      appHostProduction: "fitness",
      appHostDevelopment: "localhost:8000",
      appAccessMode: "development",
    });
    expect(url).toBe("http://localhost:8000");
  });

  it("uses production host when mode is production", () => {
    const url = resolveProductAppUrl({
      appHostProduction: "fitness",
      appHostDevelopment: "localhost:8000",
      appAccessMode: "production",
    });
    expect(url).toBe("https://fitness.paivatech.com.br");
  });

  it("respects forced mode from env", () => {
    process.env.NEXT_PUBLIC_FORCE_APP_ACCESS_MODE = "development";
    const url = resolveProductAppUrl({
      appHostProduction: "fitness",
      appHostDevelopment: "localhost:8000",
      appAccessMode: "production",
    });
    expect(url).toBe("http://localhost:8000");
  });
});

describe("previewProductAppUrls", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns both previews and active", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_APP_DOMAIN_PRODUCTION", "paivatech.com.br");
    vi.stubEnv("NEXT_PUBLIC_APP_DOMAIN_DEVELOPMENT", "localhost:8000");

    const result = previewProductAppUrls({
      appHostProduction: "fitness",
      appHostDevelopment: "localhost:8000",
      appAccessMode: "production",
    });
    expect(result.production).toBe("https://fitness.paivatech.com.br");
    expect(result.development).toBe("http://localhost:8000");
    expect(result.active).toBe("https://fitness.paivatech.com.br");
    expect(result.activeMode).toBe("production");
  });
});
