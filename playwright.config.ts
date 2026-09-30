import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const turnstileTestSiteKey = "1x00000000000000000000AA";
const externalBaseUrl = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: externalBaseUrl ?? `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: `pnpm build && pnpm start --port ${port}`,
        url: `http://127.0.0.1:${port}`,
        env: {
          CONTACT_TO_EMAIL: "contact@yanis-harrat.com",
          NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${port}`,
          NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstileTestSiteKey,
          RESEND_API_KEY: "re_test_provider_unavailable",
          RESEND_FROM_EMAIL: "Yanis Harrat <contact@yanis-harrat.com>",
          RESEND_SEGMENT_ID: "test-segment",
          RESEND_TOPIC_ID: "test-topic",
          TURNSTILE_HOSTNAMES: "127.0.0.1,localhost",
          TURNSTILE_TEST_MODE: "1",
        },
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
