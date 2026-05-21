import { expect, test } from "@playwright/test";

async function waitForHealth(request: import("@playwright/test").APIRequestContext) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await request.get("/api/health");
      if (res.status() === 200) return res;
    } catch {
      /* servidor ainda subindo */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Servidor não respondeu em /api/health a tempo");
}

test.describe("site público", () => {
  test("home carrega", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("página de contato exibe formulário", async ({ page }) => {
    await page.goto("/contato");
    await expect(page.getByRole("button", { name: /enviar mensagem/i })).toBeVisible();
  });

  test("health API responde ok ou degraded", async ({ request }) => {
    const res = await waitForHealth(request);
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as { status: string; service: string };
    expect(body.service).toBe("nexshape-site");
    expect(["ok", "degraded"]).toContain(body.status);
  });
});
