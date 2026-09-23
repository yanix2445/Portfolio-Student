import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewsletterForm } from "./newsletter-form";
import type { NewsletterAction } from "../newsletter.types";
import { subscribeNewsletter } from "../actions/subscribe-newsletter.action";

const resendMocks = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  getClient: vi.fn(),
}));

vi.mock("@/server/integrations/resend.client", () => ({
  getResendNewsletterClient: resendMocks.getClient,
}));

beforeEach(() => {
  resendMocks.create.mockReset();
  resendMocks.update.mockReset();
  resendMocks.getClient.mockReset();
  resendMocks.getClient.mockReturnValue({
    resend: {
      contacts: {
        create: resendMocks.create,
        update: resendMocks.update,
      },
    },
    audienceId: "audience_test",
  });
});

describe("NewsletterForm", () => {
  const idleAction: NewsletterAction = async (state) => state;

  it("associates validation errors with their fields", () => {
    render(
      <NewsletterForm
        action={idleAction}
        initialState={{
          status: "error",
          message: "Vérifiez les informations indiquées.",
          fieldErrors: {
            email: ["Saisissez une adresse e-mail valide."],
            consent: ["Confirmez votre accord pour recevoir la veille."],
          },
        }}
      />,
    );

    const email = screen.getByLabelText("Adresse e-mail");
    const consent = screen.getByRole("checkbox");

    expect(email.getAttribute("aria-describedby")).toBe("newsletter-email-error");
    expect(consent.getAttribute("aria-describedby")).toBe("newsletter-consent-error");
    expect(screen.getByRole("alert").textContent).toContain("Vérifiez");
  });

  it("announces a successful subscription", () => {
    render(
      <NewsletterForm
        action={idleAction}
        initialState={{
          status: "success",
          message: "Inscription confirmée.",
        }}
      />,
    );

    expect(screen.getByRole("status").textContent).toContain("Inscription confirmée");
  });

  it("shows and disables the pending state", async () => {
    let resolveAction: ((value: Awaited<ReturnType<NewsletterAction>>) => void) | undefined;
    const pendingAction: NewsletterAction = () =>
      new Promise((resolve) => {
        resolveAction = resolve;
      });

    render(<NewsletterForm action={pendingAction} />);

    fireEvent.change(screen.getByLabelText("Adresse e-mail"), {
      target: { value: "yanis@example.com" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: "Recevoir les synthèses" }).closest("form")!);

    const pendingButton = await screen.findByRole("button", { name: "Inscription en cours…" });
    expect(pendingButton.getAttribute("disabled")).not.toBeNull();

    resolveAction?.({ status: "success", message: "Inscription confirmée." });
    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain("Inscription confirmée");
    });
  });
});

describe("subscribeNewsletter", () => {
  const idleState = { status: "idle", message: "" } as const;

  it("rejects an invalid address before calling Resend", async () => {
    const data = new FormData();
    data.set("email", "adresse-invalide");
    data.set("consent", "on");

    const state = await subscribeNewsletter(idleState, data);

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email?.[0]).toContain("valide");
    expect(resendMocks.getClient).not.toHaveBeenCalled();
  });

  it("returns a neutral success to a honeypot without calling Resend", async () => {
    const data = new FormData();
    data.set("email", "robot@example.com");
    data.set("consent", "on");
    data.set("website", "https://spam.example");

    const state = await subscribeNewsletter(idleState, data);

    expect(state.status).toBe("success");
    expect(resendMocks.getClient).not.toHaveBeenCalled();
  });

  it("reactivates an existing contact and reports success", async () => {
    resendMocks.create.mockResolvedValue({
      data: null,
      error: { statusCode: 409, name: "validation_error", message: "Contact already exists" },
      headers: null,
    });
    resendMocks.update.mockResolvedValue({
      data: { id: "contact_1", object: "contact" },
      error: null,
      headers: null,
    });
    const data = new FormData();
    data.set("email", "abonne@example.com");
    data.set("consent", "on");

    const state = await subscribeNewsletter(idleState, data);

    expect(state.status).toBe("success");
    expect(resendMocks.update).toHaveBeenCalledWith({
      audienceId: "audience_test",
      email: "abonne@example.com",
      unsubscribed: false,
    });
  });

  it("hides provider details when Resend is unavailable", async () => {
    resendMocks.create.mockRejectedValue(new Error("private provider failure"));
    const data = new FormData();
    data.set("email", "yanis@example.com");
    data.set("consent", "on");

    const state = await subscribeNewsletter(idleState, data);

    expect(state.status).toBe("error");
    expect(state.message).toContain("momentanément indisponible");
    expect(state.message).not.toContain("private provider failure");
  });
});
