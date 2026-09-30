"use server";

import { verifyTurnstileToken } from "@/server/security/turnstile";
import { newsletterSchema } from "../newsletter.schema";
import { registerNewsletterSubscription } from "../server/register-newsletter-subscription";
import type { NewsletterState } from "../newsletter.types";

const successState: NewsletterState = {
  status: "success",
  message: "Inscription confirmée. Vous recevrez les prochaines synthèses de veille.",
};

export async function subscribeNewsletter(
  _previousState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const website = String(formData.get("website") ?? "");

  // A bot gets a neutral success response without reaching the provider.
  if (website.trim()) {
    return successState;
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    consent: formData.get("consent"),
    website,
  });

  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Vérifiez les informations indiquées.",
      fieldErrors: {
        email: fields.email,
        consent: fields.consent,
      },
    };
  }

  try {
    const turnstileToken = String(
      formData.get("cf-turnstile-response") ?? "",
    );
    const isHuman = await verifyTurnstileToken(turnstileToken, "newsletter");

    if (!isHuman) {
      return {
        status: "error",
        message:
          "La vérification anti-robot a expiré. Recommencez la vérification puis réessayez.",
      };
    }

    await registerNewsletterSubscription(parsed.data.email);
    return successState;
  } catch {
    // Provider and configuration details must stay on the server.
  }

  return {
    status: "error",
    message:
      "L’inscription est momentanément indisponible. Réessayez dans quelques instants.",
  };
}
