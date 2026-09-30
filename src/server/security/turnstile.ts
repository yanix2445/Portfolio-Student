import "server-only";

import { headers } from "next/headers";

type TurnstileAction = "contact" | "newsletter";

type TurnstileResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const TURNSTILE_TEST_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

function getExpectedHostnames() {
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    expectedHostnames.add(process.env.VERCEL_URL);
  }

  return expectedHostnames;
}

export async function verifyTurnstileToken(
  token: string,
  expectedAction: TurnstileAction,
) {
  const testMode =
    process.env.NODE_ENV !== "production" ||
    process.env.TURNSTILE_TEST_MODE === "1";
  const secret = testMode
    ? TURNSTILE_TEST_SECRET
    : process.env.TURNSTILE_SECRET;
  const expectedHostnames = getExpectedHostnames();

  if (!secret || !token || expectedHostnames.size === 0) {
    return false;
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret,
          response: token,
          ...(clientIp ? { remoteip: clientIp } : {}),
        }),
        cache: "no-store",
      },
    );
    const result = (await response.json()) as TurnstileResponse;

    if (testMode) {
      return Boolean(
        response.ok &&
          result.success === true &&
          token === TURNSTILE_TEST_TOKEN,
      );
    }

    return Boolean(
      response.ok &&
        result.success === true &&
        result.action === expectedAction &&
        result.hostname &&
        expectedHostnames.has(result.hostname),
    );
  } catch {
    return false;
  }
}
