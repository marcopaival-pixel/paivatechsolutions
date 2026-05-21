import { describe, expect, it } from "vitest";

import { verifyAdminCsrf } from "./csrf";

describe("verifyAdminCsrf", () => {
  it("allows GET without token", () => {
    const req = new Request("http://localhost/admin/api/leads", { method: "GET" });
    expect(verifyAdminCsrf(req)).toBe(true);
  });

  it("rejects PUT without csrf header", () => {
    const req = new Request("http://localhost/admin/api/leads", { method: "PUT" });
    expect(verifyAdminCsrf(req)).toBe(false);
  });

  it("rejects PUT with cookie only (no header)", () => {
    const token = "11111111-1111-1111-1111-111111111111";
    const req = new Request("http://localhost/admin/api/leads", {
      method: "PUT",
      headers: { cookie: `paivatech_admin_csrf=${token}` },
    });
    expect(verifyAdminCsrf(req)).toBe(false);
  });

  it("accepts PUT when header matches cookie", () => {
    const token = "11111111-1111-1111-1111-111111111111";
    const req = new Request("http://localhost/admin/api/leads", {
      method: "PUT",
      headers: {
        cookie: `paivatech_admin_csrf=${token}`,
        "x-admin-csrf": token,
      },
    });
    expect(verifyAdminCsrf(req)).toBe(true);
  });
});
