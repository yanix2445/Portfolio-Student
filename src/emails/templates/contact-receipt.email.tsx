import { Hr, Section, Text } from "react-email";
import {
  BrandedEmail,
  EmailButton,
  emailStyles,
} from "../components/branded-email";
import { emailTemplateVariables as variable } from "../email-template.config";

export function ContactReceiptEmail() {
  return (
    <BrandedEmail
      eyebrow="Message bien reçu"
      preview={`Merci ${variable.visitorFirstName}, votre message est bien arrivé.`}
      subtitle="Votre demande a été transmise. Je vous répondrai personnellement depuis mon adresse professionnelle."
      title={<>Bonjour {variable.visitorFirstName},</>}
    >
      <Section style={emailStyles.calloutAccent}>
        <Text style={emailStyles.calloutTitle}>Votre demande</Text>
        <Text style={emailStyles.copyStrong}>{variable.reason}</Text>
        <Text style={{ ...emailStyles.copy, marginBottom: "0" }}>
          Une réponse vous sera envoyée depuis contact@yanis-harrat.com.
        </Text>
      </Section>

      <Hr style={emailStyles.divider} />

      <Text style={emailStyles.copyStrong}>Besoin d’échanger rapidement ?</Text>
      <Text style={emailStyles.copy}>
        Vous pouvez choisir un créneau d’appel audio ou de visioconférence dans
        mon calendrier.
      </Text>
      <EmailButton href="https://cal.com/yanis-harrat">
        Choisir un créneau
      </EmailButton>

      <Text style={{ ...emailStyles.copy, marginTop: "26px", marginBottom: "0" }}>
        Bien cordialement,
        <br />
        <strong style={{ color: "#f6f6f6" }}>Yanis Harrat</strong>
      </Text>
    </BrandedEmail>
  );
}

export default ContactReceiptEmail;
