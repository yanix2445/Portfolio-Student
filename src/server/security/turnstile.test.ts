import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "./turnstile";

const turnstileMocks = vi.hoisted(() => ({
  headers: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("next/headers", () => ({
  headers: turnstileMocks.headers,
}));

const originalEnvironment = {
  secret: process.env.TURNSTILE_SECRET,
  hostnames: process.env.TURNSTILE_HOSTNAMES,
  testMode: process.env.TURNSTILE_TEST_MODE,
  vercelEnvironment: process.env.VERCEL_ENV,
  vercelUrl: process.env.VERCEL_URL,
};

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  process.env.TURNSTILE_SECRET = "secret_test";
  process.env.TURNSTILE_HOSTNAMES = "localhost,127.0.0.1";
  delete process.env.TURNSTILE_TEST_MODE;
  delete process.env.VERCEL_ENV;
  delete process.env.VERCEL_URL;
  turnstileMocks.headers.mockResolvedValue(
    new Headers({ "x-forwarded-for": "127.0.0.1" }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  process.env.TURNSTILE_SECRET = originalEnvironment.secret;
  process.env.TURNSTILE_HOSTNAMES = originalEnvironment.hostnames;
  process.env.TURNSTILE_TEST_MODE = originalEnvironment.testMode;
  process.env.VERCEL_ENV = originalEnvironment.vercelEnvironment;
  process.env.VERCEL_URL = originalEnvironment.vercelUrl;
});

describe("verifyTurnstileToken", () => {
  it("accepts only a successful response with the expected action and hostname", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          action: "contact",
          hostname: "localhost",
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      verifyTurnstileToken("valid_token", "contact"),
    ).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("rejects a token issued for another action", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            success: true,
            action: "newsletter",
            hostname: "localhost",
          }),
          { status: 200 },
        ),
      ),
    );

    await expect(
      verifyTurnstileToken("wrong_action_token", "contact"),
    ).resolves.toBe(false);
  });

  it("rejects a token issued for an unapproved hostname", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            success: true,
            action: "contact",
            hostname: "malicious.example",
          }),
          { status: 200 },
        ),
      ),
    );

    await expect(
      verifyTurnstileToken("wrong_hostname_token", "contact"),
    ).resolves.toBe(false);
  });

  it("fails closed when no hostname allowlist is configured", async () => {
    process.env.TURNSTILE_HOSTNAMES = "";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      verifyTurnstileToken("valid_token", "contact"),
    ).resolves.toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts only Cloudflare's dummy token when explicit test mode is enabled", async () => {
    process.env.TURNSTILE_TEST_MODE = "1";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            success: true,
            action: null,
            hostname: "example.com",
          }),
          { status: 200 },
        ),
      ),
    );

    await expect(
      verifyTurnstileToken("XXXX.DUMMY.TOKEN.XXXX", "contact"),
    ).resolves.toBe(true);
    await expect(
      verifyTurnstileToken("forged-test-token", "contact"),
    ).resolves.toBe(false);
  });
});
