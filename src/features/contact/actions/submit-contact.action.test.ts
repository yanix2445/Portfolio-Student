import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./submit-contact.action";

const contactMocks = vi.hoisted(() => ({
  sendBatch: vi.fn(),
  getClient: vi.fn(),
  verifyTurnstile: vi.fn(),
  registerNewsletter: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("@/server/integrations/resend.client", () => ({
  getResendContactClient: contactMocks.getClient,
}));

vi.mock("@/server/security/turnstile", () => ({
  verifyTurnstileToken: contactMocks.verifyTurnstile,
}));

vi.mock("@/features/newsletter/server/register-newsletter-subscription", () => ({
  registerNewsletterSubscription: contactMocks.registerNewsletter,
}));

function createValidFormData() {
  const data = new FormData();
  data.set("submissionId", "550e8400-e29b-41d4-a716-446655440000");
  data.set("firstName", "Jean");
  data.set("lastName", "Dupont");
  data.set("email", "jean@example.com");
  data.set("phone", "+33 6 00 00 00 00");
  data.set("organization", "Entreprise Exemple");
  data.set("reason", "opportunity");
  data.set(
    "message",
    "Je souhaite échanger avec vous au sujet d’une opportunité professionnelle.",
  );
  data.set("consent", "on");
  data.set("cf-turnstile-response", "turnstile_contact_token");
  return data;
}

beforeEach(() => {
  contactMocks.sendBatch.mockReset();
  contactMocks.getClient.mockReset();
  contactMocks.verifyTurnstile.mockReset();
  contactMocks.registerNewsletter.mockReset();
  contactMocks.verifyTurnstile.mockResolvedValue(true);
  contactMocks.sendBatch.mockResolvedValue({
    data: { data: [{ id: "owner_email" }, { id: "receipt_email" }] },
    error: null,
    headers: null,
  });
  contactMocks.getClient.mockReturnValue({
    resend: { batch: { send: contactMocks.sendBatch } },
    fromEmail: "Yanis Harrat <contact@yanis-harrat.com>",
    toEmail: "contact@yanis-harrat.com",
  });
});

describe("submitContact", () => {
  const idleState = { status: "idle", message: "" } as const;

  it("validates required fields before calling external services", async () => {
    const state = await submitContact(idleState, new FormData());

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.firstName).toBeDefined();
    expect(contactMocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(contactMocks.sendBatch).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile verification", async () => {
    contactMocks.verifyTurnstile.mockResolvedValue(false);

    const state = await submitContact(idleState, createValidFormData());

    expect(state.status).toBe("error");
    expect(state.message).toContain("anti-robot");
    expect(state.issue).toBe("turnstile");
    expect(contactMocks.sendBatch).not.toHaveBeenCalled();
  });

  it("verifies a fresh Turnstile token for every submission", async () => {
    const firstSubmission = createValidFormData();
    firstSubmission.set("cf-turnstile-response", "turnstile_token_1");
    const secondSubmission = createValidFormData();
    secondSubmission.set("cf-turnstile-response", "turnstile_token_2");

    await submitContact(idleState, firstSubmission);
    await submitContact(idleState, secondSubmission);

    expect(contactMocks.verifyTurnstile).toHaveBeenCalledTimes(2);
    expect(contactMocks.verifyTurnstile).toHaveBeenNthCalledWith(
      1,
      "turnstile_token_1",
      "contact",
    );
    expect(contactMocks.verifyTurnstile).toHaveBeenNthCalledWith(
      2,
      "turnstile_token_2",
      "contact",
    );
  });

  it("sends the owner notification and visitor receipt without attachments", async () => {
    const state = await submitContact(idleState, createValidFormData());

    expect(state.status).toBe("success");
    expect(contactMocks.verifyTurnstile).toHaveBeenCalledWith(
      "turnstile_contact_token",
      "contact",
    );
    expect(contactMocks.sendBatch).toHaveBeenCalledOnce();
    const [emails, options] = contactMocks.sendBatch.mock.calls[0];
    expect(emails).toHaveLength(2);
    expect(emails[0]).toMatchObject({
      to: "contact@yanis-harrat.com",
      replyTo: "jean@example.com",
    });
    expect(emails[1]).toMatchObject({
      to: "jean@example.com",
      replyTo: "contact@yanis-harrat.com",
    });
    expect(emails[0]).not.toHaveProperty("attachments");
    expect(emails[1]).not.toHaveProperty("attachments");
    expect(options.idempotencyKey).toBe(
      "portfolio-contact-550e8400-e29b-41d4-a716-446655440000",
    );
    expect(contactMocks.registerNewsletter).not.toHaveBeenCalled();
  });

  it("uses a new idempotency key for a new user submission", async () => {
    const firstSubmission = createValidFormData();
    const secondSubmission = createValidFormData();
    secondSubmission.set(
      "submissionId",
      "550e8400-e29b-41d4-a716-446655440001",
    );

    await submitContact(idleState, firstSubmission);
    await submitContact(idleState, secondSubmission);

    expect(contactMocks.sendBatch.mock.calls[0][1].idempotencyKey).toBe(
      "portfolio-contact-550e8400-e29b-41d4-a716-446655440000",
    );
    expect(contactMocks.sendBatch.mock.calls[1][1].idempotencyKey).toBe(
      "portfolio-contact-550e8400-e29b-41d4-a716-446655440001",
    );
  });

  it("registers the newsletter only after explicit optional consent", async () => {
    const data = createValidFormData();
    data.set("newsletter", "on");

    const state = await submitContact(idleState, data);

    expect(state.status).toBe("success");
    expect(contactMocks.registerNewsletter).toHaveBeenCalledWith(
      "jean@example.com",
    );
  });

  it("returns a neutral response to the honeypot", async () => {
    const data = createValidFormData();
    data.set("website", "https://spam.example");

    const state = await submitContact(idleState, data);

    expect(state.status).toBe("success");
    expect(contactMocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(contactMocks.sendBatch).not.toHaveBeenCalled();
  });
});
