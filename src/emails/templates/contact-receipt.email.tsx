import { Hr, Section, Text } from "react-email";
import {
  BrandedEmail,
  EmailButton,
  emailStyles,
} from "../components/branded-email";

export type ContactReceiptEmailProps = {
  firstName: string;
  reason: string;
};

export function ContactReceiptEmail({
  firstName,
  reason,
}: ContactReceiptEmailProps) {
  return (
    <BrandedEmail
      preview={
        "Merci " + firstName + ", votre message est bien arrivé à Yanis."
      }
      subtitle={
        <>
          Merci <strong style={{ color: "#f7f7f5" }}>{firstName}</strong>. Votre
          message a bien été transmis et je vous répondrai personnellement.
        </>
      }
      title="Votre message est bien arrivé."
    >
      <Section style={emailStyles.accentPanel}>
        <Text style={emailStyles.label}>Demande transmise</Text>
        <Text style={emailStyles.bodyStrong}>{reason}</Text>
        <Text style={{ ...emailStyles.bodyCopy, marginBottom: "0" }}>
          Ma réponse vous parviendra depuis contact@yanis-harrat.com. Vous
          pourrez répondre directement à cet e-mail pour poursuivre l’échange.
        </Text>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.bodyStrong}>Vous préférez un échange oral ?</Text>
      <Text style={emailStyles.bodyCopy}>
        Mon calendrier propose les créneaux disponibles pour un appel audio ou
        une visioconférence.
      </Text>
      <EmailButton href="https://cal.com/yanis-harrat">
        Voir mes disponibilités
      </EmailButton>

      <Text style={{ ...emailStyles.bodyCopy, marginTop: "30px", marginBottom: "0" }}>
        Bien cordialement,
        <br />
        <strong style={{ color: "#f7f7f5" }}>Yanis Harrat</strong>
        <br />
        <span style={{ color: "#9b9b96", fontSize: "13px" }}>
          Technicien support systèmes et réseaux
        </span>
      </Text>
    </BrandedEmail>
  );
}

ContactReceiptEmail.PreviewProps = {
  firstName: "Camille",
  reason: "Opportunité professionnelle",
} satisfies ContactReceiptEmailProps;

export default ContactReceiptEmail;
