import { Hr, Link, Section, Text } from "react-email";
import {
  BrandedEmail,
  EmailButton,
  emailStyles,
} from "../components/branded-email";

export type WatchDigestEmailProps = {
  articleSummary: string;
  articleTitle: string;
  articleUrl: string;
  editionLabel: string;
  readTime: string;
  unsubscribeUrl: string;
};

export function WatchDigestEmail({
  articleSummary,
  articleTitle,
  articleUrl,
  editionLabel,
  readTime,
  unsubscribeUrl,
}: WatchDigestEmailProps) {
  return (
    <BrandedEmail
      preview={articleTitle + " · Nouvelle synthèse de veille"}
      subtitle="Une analyse courte et sourcée sur les usages concrets de l’intelligence artificielle dans le développement et l’exploitation."
      title={articleTitle}
    >
      <Section style={emailStyles.accentPanel}>
        <Text style={emailStyles.label}>{editionLabel}</Text>
        <Text style={emailStyles.message}>{articleSummary}</Text>
      </Section>

      <Text style={{ ...emailStyles.meta, marginTop: "22px", marginBottom: "18px" }}>
        Temps de lecture estimé :{" "}
        <strong style={{ color: "#f7f7f5" }}>{readTime}</strong>
      </Text>
      <EmailButton href={articleUrl}>Lire la synthèse</EmailButton>

      <Hr style={emailStyles.divider} />

      <Text style={{ ...emailStyles.bodyCopy, marginBottom: "8px" }}>
        Vous recevez ce message parce que vous avez choisi de suivre mes
        nouvelles synthèses de veille technologique.
      </Text>
      <Text style={{ ...emailStyles.meta, marginBottom: "0" }}>
        Vous pouvez{" "}
        <Link href={unsubscribeUrl} style={emailStyles.link}>
          vous désinscrire en un clic
        </Link>
        .
      </Text>
    </BrandedEmail>
  );
}

WatchDigestEmail.PreviewProps = {
  articleSummary:
    "Les assistants de code accélèrent certaines tâches, mais leur intégration exige une gestion stricte des secrets, des données envoyées au fournisseur et de la validation humaine.",
  articleTitle: "Intégrer l’IA sans exposer les secrets du fournisseur",
  articleUrl:
    "https://www.yanis-harrat.com/veille/integrer-ia-frontieres-serveur",
  editionLabel: "Veille technologique · Octobre 2026",
  readTime: "5 min",
  unsubscribeUrl: "https://www.yanis-harrat.com/#veille",
} satisfies WatchDigestEmailProps;

export default WatchDigestEmail;
