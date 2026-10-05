import { Link, Section, Text } from "react-email";
import {
  BrandedEmail,
  DetailRow,
  EmailButton,
  emailStyles,
} from "../components/branded-email";

export type ContactOwnerEmailProps = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  newsletterStatus: string;
  organization: string;
  phone: string;
  reason: string;
};

export function ContactOwnerEmail({
  email,
  firstName,
  lastName,
  message,
  newsletterStatus,
  organization,
  phone,
  reason,
}: ContactOwnerEmailProps) {
  const fullName = [firstName, lastName].join(" ");
  const emailHref = "mailto:" + email;

  return (
    <BrandedEmail
      preview={fullName + " vous contacte au sujet de « " + reason + " »."}
      subtitle={
        <>
          <strong style={{ color: "#f7f7f5" }}>{fullName}</strong> vous
          contacte depuis votre portfolio au sujet de « {reason} ».
        </>
      }
      title="Nouvelle demande reçue."
    >
      <Section style={emailStyles.panel}>
        <DetailRow label="E-mail" value={email} />
        <DetailRow label="Téléphone" value={phone} />
        <DetailRow label="Organisation" value={organization} />
        <DetailRow label="Newsletter" value={newsletterStatus} />
      </Section>

      <Section style={{ ...emailStyles.accentPanel, marginTop: "24px" }}>
        <Text style={emailStyles.label}>Son message</Text>
        <Text style={emailStyles.message}>{message}</Text>
      </Section>

      <Text style={{ ...emailStyles.bodyCopy, marginTop: "24px" }}>
        Le bouton ouvre une réponse à l’adresse indiquée. Le champ Reply-To de
        cet e-mail est également configuré pour répondre directement au
        visiteur.
      </Text>
      <EmailButton href={emailHref}>Répondre à {firstName}</EmailButton>

      <Text style={{ ...emailStyles.meta, marginTop: "18px" }}>
        Si le bouton ne s’ouvre pas, écrivez à{" "}
        <Link href={emailHref} style={emailStyles.link}>
          {email}
        </Link>
        .
      </Text>
    </BrandedEmail>
  );
}

ContactOwnerEmail.PreviewProps = {
  email: "camille.martin@example.com",
  firstName: "Camille",
  lastName: "Martin",
  message:
    "Bonjour Yanis,\n\nNous recherchons un profil en support systèmes et réseaux pour renforcer notre équipe. Votre parcours a retenu notre attention. Seriez-vous disponible cette semaine pour un premier échange ?",
  newsletterStatus: "Inscription non demandée",
  organization: "Atelier Réseau",
  phone: "+33 6 12 34 56 78",
  reason: "Opportunité professionnelle",
} satisfies ContactOwnerEmailProps;

export default ContactOwnerEmail;
