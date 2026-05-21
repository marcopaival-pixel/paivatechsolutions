import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validBody = {
  fullName: "Maria Silva",
  email: "maria@empresa.com.br",
  phone: "(11) 98765-4321",
  companyName: "Empresa Exemplo LTDA",
  productInterest: "Fitness",
  message: "Gostaria de uma demonstração do sistema.",
  consentAccepted: true,
  website: "",
};

function postJson(body: unknown, ip = "203.0.113.1") {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("LEAD_DISPATCH_MODE", "noop_preview");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns 200 for valid payload", async () => {
    const res = await postJson(validBody);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ ok: true });
  });

  it("rejects honeypot", async () => {
    const res = await postJson({ ...validBody, website: "bot" });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("honeypot");
  });

  it("returns 422 for invalid phone", async () => {
    const res = await postJson({ ...validBody, phone: "1" });
    expect(res.status).toBe(422);
    const data = await res.json();
    expect(data.error).toBe("validation_failed");
  });

  it("accepts optional cfTurnstileToken when turnstile is disabled", async () => {
    const res = await postJson({ ...validBody, cfTurnstileToken: "test-token" });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ ok: true });
  });

  it("returns 413 for oversized payload header", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "content-length": "20000" },
        body: JSON.stringify(validBody),
      }),
    );
    expect(res.status).toBe(413);
  });
});
