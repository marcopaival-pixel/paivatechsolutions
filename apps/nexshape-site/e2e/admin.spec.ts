import { expect, test, type APIRequestContext } from "@playwright/test";

const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

async function waitForHealth(request: APIRequestContext) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await request.get("/api/health");
      if (res.status() === 200) return;
    } catch {
      /* servidor ainda subindo */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Servidor não respondeu a tempo");
}

test.describe("painel admin", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ request }) => {
    await waitForHealth(request);
  });

  test("login via API abre dashboard", async ({ page, request }) => {
    const loginRes = await request.post("/admin/api/login", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ password: adminPassword }),
    });
    expect(loginRes.ok(), `login status ${loginRes.status()}`).toBeTruthy();

    const state = await request.storageState();
    await page.context().addCookies(state.cookies);

    await page.goto("/admin");
    await expect(page.locator("h2").filter({ hasText: /painel de leads/i })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("API leads exige sessão", async ({ request }) => {
    const res = await request.get("/admin/api/leads");
    expect(res.status()).toBe(401);
  });

  test("API leads PUT exige CSRF", async ({ request }) => {
    const loginRes = await request.post("/admin/api/login", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ password: adminPassword }),
    });
    expect(loginRes.ok(), `login status ${loginRes.status()}`).toBeTruthy();

    const putRes = await request.put("/admin/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ id: "x", status: "novo" }),
    });
    expect(putRes.status()).toBe(403);
  });
});
