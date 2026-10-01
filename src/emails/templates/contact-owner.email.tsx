import { Link, Section, Text } from "react-email";
import {
  BrandedEmail,
  DetailRow,
  emailStyles,
} from "../components/branded-email";
import { emailTemplateVariables as variable } from "../email-template.config";

export function ContactOwnerEmail() {
  return (
    <BrandedEmail
      eyebrow="Nouvelle demande · Portfolio"
      preview={`Nouvelle demande de ${variable.visitorFirstName} ${variable.visitorLastName}`}
      subtitle="Toutes les informations utiles sont regroupées ici pour vous permettre de répondre directement."
      title={
        <>
          {variable.visitorFirstName} {variable.visitorLastName}
        </>
      }
    >
      <Section style={emailStyles.callout}>
        <DetailRow label="Objet" value={variable.reason} />
        <DetailRow
          label="E-mail"
          value={
            <Link
              href={`mailto:${variable.visitorEmail}`}
              style={{ color: "#ff9838", textDecoration: "underline" }}
            >
              {variable.visitorEmail}
            </Link>
          }
        />
        <DetailRow label="Téléphone" value={variable.phone} />
        <DetailRow label="Organisation" value={variable.organization} />
        <DetailRow label="Veille" value={variable.newsletterStatus} />
      </Section>

      <Section style={{ ...emailStyles.calloutAccent, marginTop: "22px" }}>
        <Text style={emailStyles.calloutTitle}>Message</Text>
        <Text style={emailStyles.message}>{variable.message}</Text>
      </Section>

      <Text style={{ ...emailStyles.copy, marginTop: "22px", marginBottom: "0" }}>
        Répondez simplement à cet e-mail : le champ de réponse est déjà dirigé
        vers le visiteur.
      </Text>
    </BrandedEmail>
  );
}

export default ContactOwnerEmail;
