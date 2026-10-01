import { Hr, Link, Section, Text } from "react-email";
import {
  BrandedEmail,
  EmailButton,
  emailStyles,
} from "../components/branded-email";
import { emailTemplateVariables as variable } from "../email-template.config";

export function WatchDigestEmail() {
  return (
    <BrandedEmail
      eyebrow={`Veille technologique · ${variable.editionLabel}`}
      preview={`${variable.articleTitle} · Nouvelle synthèse de veille`}
      subtitle="Une analyse courte, sourcée et reliée à des usages concrets du développement et de l’exploitation."
      title={variable.articleTitle}
    >
      <Section style={emailStyles.calloutAccent}>
        <Text style={emailStyles.calloutTitle}>À retenir</Text>
        <Text style={emailStyles.message}>{variable.articleSummary}</Text>
      </Section>

      <Text style={{ ...emailStyles.copy, marginTop: "22px" }}>
        Temps de lecture estimé : <strong>{variable.readTime}</strong>
      </Text>
      <EmailButton href={variable.articleUrl}>Lire la synthèse</EmailButton>

      <Hr style={emailStyles.divider} />

      <Text style={{ ...emailStyles.copy, marginBottom: "0" }}>
        Vous recevez uniquement les nouvelles synthèses publiées. Vous pouvez{" "}
        <Link href={variable.unsubscribeUrl} style={{ color: "#ff9838" }}>
          vous désinscrire à tout moment
        </Link>
        .
      </Text>
    </BrandedEmail>
  );
}

export default WatchDigestEmail;
