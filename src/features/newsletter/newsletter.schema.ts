import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Saisissez votre adresse e-mail.")
    .email("Saisissez une adresse e-mail valide."),
  consent: z.literal("on", {
    error: "Confirmez votre accord pour recevoir la veille.",
  }),
  website: z.string().trim().max(0, "Envoi refusé."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
