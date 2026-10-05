import type { ReactNode } from "react";
import { ContactOwnerEmail } from "./templates/contact-owner.email";
import { ContactReceiptEmail } from "./templates/contact-receipt.email";
import { NewsletterConfirmationEmail } from "./templates/newsletter-confirmation.email";
import { WatchDigestEmail } from "./templates/watch-digest.email";
import {
  emailTemplateAliases,
  emailTemplateVariables as variable,
} from "./email-template.config";

type StringEmailTemplateVariable = {
  fallbackValue?: string | null;
  key: string;
  type: "string";
};

type NumberEmailTemplateVariable = {
  fallbackValue?: number | null;
  key: string;
  type: "number";
};

type EmailTemplateVariable =
  | NumberEmailTemplateVariable
  | StringEmailTemplateVariable;

export type EmailTemplateDefinition = {
  alias: string;
  name: string;
  react: ReactNode;
  subject: string;
  text: string;
  variables: EmailTemplateVariable[];
};

export const emailTemplateRegistry: EmailTemplateDefinition[] = [
  {
    alias: emailTemplateAliases.contactOwner,
    name: "Portfolio · Nouvelle demande de contact",
    react: (
      <ContactOwnerEmail
        email={variable.visitorEmail}
        firstName={variable.visitorFirstName}
        lastName={variable.visitorLastName}
        message={variable.message}
        newsletterStatus={variable.newsletterStatus}
        organization={variable.organization}
        phone={variable.phone}
        reason={variable.reason}
      />
    ),
    subject: `[Portfolio] ${variable.reason} — ${variable.visitorFirstName} ${variable.visitorLastName}`,
    text: [
      "Nouvelle demande reçue depuis yanis-harrat.com/contact",
      "",
      `Nom : ${variable.visitorFirstName} ${variable.visitorLastName}`,
      `E-mail : ${variable.visitorEmail}`,
      `Téléphone : ${variable.phone}`,
      `Organisation : ${variable.organization}`,
      `Objet : ${variable.reason}`,
      `Newsletter : ${variable.newsletterStatus}`,
      "Consentement : traitement et suivi de la demande accepté",
      "",
      "Message :",
      variable.message,
      "",
      "Répondez simplement à cet e-mail pour contacter le visiteur.",
    ].join("\n"),
    variables: [
      { key: "VISITOR_FIRST_NAME", type: "string" },
      { key: "VISITOR_LAST_NAME", type: "string" },
      { key: "VISITOR_EMAIL", type: "string" },
      { key: "PHONE", type: "string", fallbackValue: "Non renseigné" },
      {
        key: "ORGANIZATION",
        type: "string",
        fallbackValue: "Non renseignée",
      },
      { key: "REASON", type: "string" },
      { key: "MESSAGE", type: "string" },
      {
        key: "NEWSLETTER_STATUS",
        type: "string",
        fallbackValue: "Non demandée",
      },
    ],
  },
  {
    alias: emailTemplateAliases.contactReceipt,
    name: "Portfolio · Accusé de réception",
    react: (
      <ContactReceiptEmail
        firstName={variable.visitorFirstName}
        reason={variable.reason}
      />
    ),
    subject: `Votre message est bien arrivé, ${variable.visitorFirstName}`,
    text: [
      `Bonjour ${variable.visitorFirstName},`,
      "",
      "Merci pour votre message. Votre demande a bien été transmise et je vous répondrai personnellement depuis contact@yanis-harrat.com.",
      "",
      `Objet : ${variable.reason}`,
      "",
      "Pour choisir un créneau d’appel audio ou de visioconférence :",
      "https://cal.com/yanis-harrat",
      "",
      "Bien cordialement,",
      "Yanis Harrat",
      "Technicien support systèmes et réseaux",
      "https://www.yanis-harrat.com",
    ].join("\n"),
    variables: [
      { key: "VISITOR_FIRST_NAME", type: "string" },
      { key: "REASON", type: "string" },
    ],
  },
  {
    alias: emailTemplateAliases.newsletterConfirmation,
    name: "Portfolio · Confirmation d’inscription à la veille",
    react: (
      <NewsletterConfirmationEmail
        subscriberEmail={variable.subscriberEmail}
      />
    ),
    subject: "Votre inscription à la veille est confirmée",
    text: [
      "Votre inscription à la veille technologique est confirmée.",
      "",
      `Adresse inscrite : ${variable.subscriberEmail}`,
      "",
      "Vous recevrez uniquement une nouvelle synthèse lorsqu’une analyse utile sera publiée.",
      "Les synthèses sont courtes, sourcées et consacrées à l’IA appliquée au développement web et applicatif.",
      "",
      "Découvrir la veille : https://www.yanis-harrat.com/veille",
      "",
      "Chaque future synthèse contiendra un lien de désinscription immédiate.",
      "Si vous n’êtes pas à l’origine de cette inscription, répondez à cet e-mail.",
      "",
      "Yanis Harrat",
      "https://www.yanis-harrat.com",
    ].join("\n"),
    variables: [{ key: "SUBSCRIBER_EMAIL", type: "string" }],
  },
  {
    alias: emailTemplateAliases.watchDigest,
    name: "Portfolio · Synthèse de veille",
    react: (
      <WatchDigestEmail
        articleSummary={variable.articleSummary}
        articleTitle={variable.articleTitle}
        articleUrl={variable.articleUrl}
        editionLabel={variable.editionLabel}
        readTime={variable.readTime}
        unsubscribeUrl={variable.unsubscribeUrl}
      />
    ),
    subject: `Veille techno · ${variable.articleTitle}`,
    text: [
      `${variable.editionLabel} · Nouvelle synthèse de veille`,
      "",
      variable.articleTitle,
      "",
      variable.articleSummary,
      "",
      `Temps de lecture : ${variable.readTime}`,
      `Lire la synthèse : ${variable.articleUrl}`,
      "",
      `Se désinscrire : ${variable.unsubscribeUrl}`,
    ].join("\n"),
    variables: [
      { key: "EDITION_LABEL", type: "string" },
      { key: "ARTICLE_TITLE", type: "string" },
      { key: "ARTICLE_SUMMARY", type: "string" },
      { key: "READ_TIME", type: "string" },
      { key: "ARTICLE_URL", type: "string" },
    ],
  },
];
