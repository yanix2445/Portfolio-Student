import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact.schema";

const validContact = {
  submissionId: "550e8400-e29b-41d4-a716-446655440000",
  firstName: "Jean-Pierre",
  lastName: "D’Angelo",
  email: "jean@example.com",
  phone: "+33 6 00 00 00 00",
  organization: "Entreprise Exemple",
  reason: "opportunity",
  message:
    "Je souhaite échanger avec vous au sujet d’une opportunité professionnelle.",
  consent: "on",
  newsletter: null,
  website: "",
  turnstileToken: "turnstile_contact_token",
} as const;

const invalidContactCases: Array<[
  keyof typeof validContact,
  unknown,
]> = [
  ["submissionId", "invalid-id"],
  ["firstName", "J3an"],
  ["lastName", "Dupont42"],
  ["email", "adresse-invalide"],
  ["phone", "abcdef"],
  ["organization", "A".repeat(101)],
  ["reason", "invalid-reason"],
  ["message", "Trop court"],
  ["consent", null],
  ["newsletter", "yes"],
  ["website", "https://spam.example"],
  ["turnstileToken", ""],
];

describe("contactSchema", () => {
  it("valide et normalise tous les champs du formulaire", () => {
    const parsed = contactSchema.parse(validContact);

    expect(parsed).toMatchObject({
      firstName: "Jean-Pierre",
      lastName: "D’Angelo",
      newsletter: false,
      phone: "+33 6 00 00 00 00",
    });
  });

  it.each(invalidContactCases)("refuse une valeur invalide pour %s", (field, value) => {
    const parsed = contactSchema.safeParse({
      ...validContact,
      [field]: value,
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.flatten().fieldErrors[field]).toBeDefined();
    }
  });

  it("n’affiche qu’une erreur utile pour un nom vide", () => {
    const parsed = contactSchema.safeParse({
      ...validContact,
      firstName: "",
      lastName: "",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;

      expect(errors.firstName).toEqual(["Indiquez votre prénom."]);
      expect(errors.lastName).toEqual(["Indiquez votre nom."]);
    }
  });

  it("accepte les champs facultatifs absents et un accord newsletter explicite", () => {
    const parsed = contactSchema.parse({
      ...validContact,
      phone: null,
      organization: null,
      newsletter: "on",
    });

    expect(parsed.phone).toBe("");
    expect(parsed.organization).toBe("");
    expect(parsed.newsletter).toBe(true);
  });
});
