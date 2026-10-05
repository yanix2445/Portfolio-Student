import { Hr, Section, Text } from "react-email";
import {
  BrandedEmail,
  DetailRow,
  EmailButton,
  emailStyles,
} from "../components/branded-email";

export type NewsletterConfirmationEmailProps = {
  subscriberEmail: string;
};

export function NewsletterConfirmationEmail({
  subscriberEmail,
}: NewsletterConfirmationEmailProps) {
  return (
    <BrandedEmail
      preview="Votre inscription est confirmée. La prochaine synthèse vous sera envoyée dès sa publication."
      subtitle="Bienvenue dans ma veille technologique : peu d’e-mails, uniquement lorsqu’une analyse utile est publiée."
      title="Votre inscription est confirmée."
    >
      <Section style={emailStyles.accentPanel}>
        <Text style={emailStyles.label}>Ce que vous recevrez</Text>
        <Text style={emailStyles.bodyStrong}>
          Des synthèses courtes, sourcées et directement utiles.
        </Text>
        <Text style={{ ...emailStyles.bodyCopy, marginBottom: "0" }}>
          Je partage mes analyses sur l’IA appliquée au développement web et
          applicatif, sans calendrier artificiel ni message promotionnel entre
          deux publications.
        </Text>
      </Section>

      <Section style={{ ...emailStyles.panel, marginTop: "24px" }}>
        <DetailRow label="Adresse inscrite" value={subscriberEmail} />
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.bodyStrong}>
        La veille est déjà disponible en ligne.
      </Text>
      <Text style={emailStyles.bodyCopy}>
        Vous pouvez consulter les synthèses publiées dès maintenant, puis
        revenir quand vous le souhaitez pour suivre les prochaines analyses.
      </Text>
      <EmailButton href="https://www.yanis-harrat.com/veille">
        Découvrir la veille technologique
      </EmailButton>

      <Text
        style={{
          ...emailStyles.meta,
          marginTop: "28px",
        }}
      >
        Chaque future synthèse contiendra un lien de désinscription immédiate.
        Si vous n’êtes pas à l’origine de cette inscription, répondez simplement
        à cet e-mail.
      </Text>
    </BrandedEmail>
  );
}

NewsletterConfirmationEmail.PreviewProps = {
  subscriberEmail: "camille.martin@example.com",
} satisfies NewsletterConfirmationEmailProps;

export default NewsletterConfirmationEmail;
