import { defineConfig, devices } from "@playwright/test";

const e2ePort = process.env.PLAYWRIGHT_PORT ?? "3099";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${e2ePort}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: `npx next dev --turbopack -p ${e2ePort}`,
        url: `${baseURL}/api/health`,
        reuseExistingServer: false,
        timeout: 120_000,
        env: {
          ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "admin123",
          LEAD_DISPATCH_MODE: "noop_preview",
          NEXT_PUBLIC_SITE_URL: baseURL,
        },
      },
});
