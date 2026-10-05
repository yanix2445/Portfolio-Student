import { z } from "zod";

export const contactReasonValues = [
  "opportunity",
  "mission",
  "collaboration",
  "question",
  "other",
] as const;

export const contactReasonLabels = {
  opportunity: "Opportunité professionnelle",
  mission: "Mission ou besoin technique",
  collaboration: "Collaboration ou projet",
  question: "Question sur mon parcours",
  other: "Autre demande",
} as const;

const optionalShortText = (maximum: number) =>
  z.preprocess(
    (value) => (value === null || value === undefined ? "" : value),
    z.string().trim().max(maximum, `Limitez ce champ à ${maximum} caractères.`),
  );

const personName = (label: "prénom" | "nom") =>
  z
    .string()
    .trim()
    .min(2, `Indiquez votre ${label}.`)
    .max(60, `Limitez le ${label} à 60 caractères.`)
    .refine(
      (value) =>
        value.length < 2 ||
        /^[\p{L}\p{M}][\p{L}\p{M}\s'’.\-]*$/u.test(value),
      `Le ${label} contient des caractères non autorisés.`,
    );

const optionalCheckbox = z
  .preprocess(
    (value) => (value === null || value === undefined ? undefined : value),
    z.literal("on").optional(),
  )
  .transform((value) => value === "on");

export const contactFormSchema = z.object({
  firstName: personName("prénom"),
  lastName: personName("nom"),
  email: z
    .string()
    .trim()
    .email("Saisissez une adresse e-mail valide.")
    .max(254, "L’adresse e-mail est trop longue."),
  phone: optionalShortText(30).refine((value) => {
    if (!value) {
      return true;
    }

    const digitCount = value.match(/\d/g)?.length ?? 0;
    return /^[+()0-9 .-]+$/.test(value) && digitCount >= 6 && digitCount <= 15;
  }, "Saisissez un numéro de téléphone valide."),
  organization: optionalShortText(100),
  reason: z.enum(contactReasonValues, {
    error: "Sélectionnez l’objet de votre demande.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre demande en au moins 20 caractères.")
    .max(4_000, "Limitez votre message à 4 000 caractères."),
  consent: z.literal("on", {
    error: "Votre accord est nécessaire pour traiter la demande.",
  }),
  newsletter: optionalCheckbox,
  website: z.string().trim().max(0, "Envoi refusé."),
});

export const contactSchema = contactFormSchema.extend({
  submissionId: z
    .string()
    .uuid("L’identifiant de la demande est invalide."),
  turnstileToken: z
    .string()
    .trim()
    .min(1, "Finalisez la vérification anti-robot.")
    .max(2_048, "La vérification anti-robot est invalide."),
});

export type ContactInput = z.infer<typeof contactSchema>;
