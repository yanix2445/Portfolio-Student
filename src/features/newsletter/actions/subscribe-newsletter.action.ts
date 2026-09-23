"use server";

import { getResendNewsletterClient } from "@/server/integrations/resend.client";
import { newsletterSchema } from "../newsletter.schema";
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
    const { resend, audienceId } = getResendNewsletterClient();
    const creation = await resend.contacts.create({
      audienceId,
      email: parsed.data.email,
      unsubscribed: false,
    });

    if (!creation.error) {
      return successState;
    }

    if (creation.error.statusCode === 409) {
      const update = await resend.contacts.update({
        audienceId,
        email: parsed.data.email,
        unsubscribed: false,
      });

      if (!update.error) {
        return successState;
      }
    }
  } catch {
    // Provider and configuration details must stay on the server.
  }

  return {
    status: "error",
    message:
      "L’inscription est momentanément indisponible. Réessayez dans quelques instants.",
  };
}
