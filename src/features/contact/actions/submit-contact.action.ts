"use server";

import { getResendContactClient } from "@/server/integrations/resend.client";
import { verifyTurnstileToken } from "@/server/security/turnstile";
import {
  contactReasonLabels,
  contactSchema,
} from "../contact.schema";
import type { ContactState } from "../contact.types";
import { registerNewsletterSubscription } from "@/features/newsletter/server/register-newsletter-subscription";

const successMessage =
  "Votre message a bien été envoyé. Je vous répondrai depuis contact@yanis-harrat.com.";

function toSafeTemplateText(value: string, fallback: string) {
  const normalized = value.trim();

  if (!normalized) {
    return fallback;
  }

  return normalized.replaceAll("<", "‹").replaceAll(">", "›");
}

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const website = String(formData.get("website") ?? "");

  if (website.trim()) {
    return { status: "success", message: successMessage };
  }

  const parsed = contactSchema.safeParse({
    submissionId: formData.get("submissionId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    organization: formData.get("organization"),
    reason: formData.get("reason"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    newsletter: formData.get("newsletter"),
    website,
    turnstileToken: formData.get("cf-turnstile-response"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const visibleFieldNames = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "organization",
      "reason",
      "message",
      "consent",
    ] as const;
    const hasVisibleFieldError = visibleFieldNames.some(
      (field) => fieldErrors[field]?.length,
    );

    return {
      status: "error",
      message:
        !hasVisibleFieldError && fieldErrors.turnstileToken?.length
          ? "La protection anti-robot n’a pas confirmé l’envoi. Relancez-la puis réessayez."
          : "Vérifiez les informations indiquées.",
      fieldErrors,
      ...(!hasVisibleFieldError && fieldErrors.turnstileToken?.length
        ? { issue: "turnstile" as const }
        : {}),
    };
  }

  const turnstileToken = parsed.data.turnstileToken;
  const isHuman = await verifyTurnstileToken(turnstileToken, "contact");

  if (!isHuman) {
    return {
      status: "error",
      message:
        "La protection anti-robot n’a pas confirmé l’envoi. Relancez-la puis réessayez.",
      issue: "turnstile",
    };
  }

  try {
    const {
      resend,
      fromEmail,
      toEmail,
      ownerTemplateId,
      receiptTemplateId,
    } = getResendContactClient();
    const delivery = await resend.batch.send(
      [
        {
          from: fromEmail,
          to: toEmail,
          replyTo: parsed.data.email,
          template: {
            id: ownerTemplateId,
            variables: {
              VISITOR_FIRST_NAME: parsed.data.firstName,
              VISITOR_LAST_NAME: parsed.data.lastName,
              VISITOR_EMAIL: parsed.data.email,
              PHONE: toSafeTemplateText(parsed.data.phone, "Non renseigné"),
              ORGANIZATION: toSafeTemplateText(
                parsed.data.organization,
                "Non renseignée",
              ),
              REASON: contactReasonLabels[parsed.data.reason],
              MESSAGE: toSafeTemplateText(parsed.data.message, "Sans message"),
              NEWSLETTER_STATUS: parsed.data.newsletter
                ? "Accord explicite donné"
                : "Non demandée",
            },
          },
          tags: [{ name: "source", value: "portfolio-contact" }],
        },
        {
          from: fromEmail,
          to: parsed.data.email,
          replyTo: toEmail,
          template: {
            id: receiptTemplateId,
            variables: {
              VISITOR_FIRST_NAME: parsed.data.firstName,
              REASON: contactReasonLabels[parsed.data.reason],
            },
          },
          tags: [{ name: "source", value: "portfolio-receipt" }],
        },
      ],
      {
        idempotencyKey: `portfolio-contact-${parsed.data.submissionId}`,
      },
    );

    if (delivery.error) {
      throw new Error("Unable to deliver the contact request.");
    }

    if (parsed.data.newsletter) {
      try {
        await registerNewsletterSubscription(parsed.data.email);
      } catch {
        return {
          status: "success",
          message:
            `${successMessage} L’inscription aux synthèses n’a toutefois pas pu être confirmée ; vous pourrez la refaire depuis la page d’accueil.`,
        };
      }
    }

    return { status: "success", message: successMessage };
  } catch {
    return {
      status: "error",
      message:
        "L’envoi est momentanément indisponible. Vous pouvez réessayer ou écrire directement à contact@yanis-harrat.com.",
    };
  }
}
