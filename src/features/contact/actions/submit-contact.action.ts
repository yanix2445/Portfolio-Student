"use server";

import { getResendContactClient } from "@/server/integrations/resend.client";
import { verifyTurnstileToken } from "@/server/security/turnstile";
import {
  contactReasonLabels,
  contactSchema,
  type ContactInput,
} from "../contact.schema";
import type { ContactState } from "../contact.types";
import { registerNewsletterSubscription } from "@/features/newsletter/server/register-newsletter-subscription";

const successMessage =
  "Votre message a bien été envoyé. Je vous répondrai depuis contact@yanis-harrat.com.";

function formatOwnerMessage(input: ContactInput) {
  return [
    "Nouvelle demande reçue depuis yanis-harrat.com/contact",
    "",
    `Nom : ${input.firstName} ${input.lastName}`,
    `E-mail : ${input.email}`,
    `Téléphone : ${input.phone || "Non renseigné"}`,
    `Organisation : ${input.organization || "Non renseignée"}`,
    `Objet : ${contactReasonLabels[input.reason]}`,
    `Newsletter : ${input.newsletter ? "Accord explicite donné" : "Non demandée"}`,
    "Consentement : traitement et suivi de la demande accepté",
    "",
    "Message :",
    input.message,
  ].join("\n");
}

function formatVisitorReceipt(input: ContactInput) {
  return [
    `Bonjour ${input.firstName},`,
    "",
    "Merci pour votre message. Votre demande a bien été transmise et je vous répondrai directement depuis contact@yanis-harrat.com.",
    "",
    `Objet : ${contactReasonLabels[input.reason]}`,
    "",
    "Pour choisir dès maintenant un créneau d’échange audio ou visioconférence :",
    "https://cal.com/yanis-harrat",
    "",
    "Bien cordialement,",
    "Yanis Harrat",
    "Technicien support systèmes et réseaux",
    "https://yanis-harrat.com",
  ].join("\n");
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
    const { resend, fromEmail, toEmail } = getResendContactClient();
    const delivery = await resend.batch.send(
      [
        {
          from: fromEmail,
          to: toEmail,
          replyTo: parsed.data.email,
          subject: `[Portfolio] ${contactReasonLabels[parsed.data.reason]} — ${parsed.data.firstName} ${parsed.data.lastName}`,
          text: formatOwnerMessage(parsed.data),
          tags: [{ name: "source", value: "portfolio-contact" }],
        },
        {
          from: fromEmail,
          to: parsed.data.email,
          replyTo: toEmail,
          subject: "Votre message à Yanis Harrat a bien été reçu",
          text: formatVisitorReceipt(parsed.data),
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
