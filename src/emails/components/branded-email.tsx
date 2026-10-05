import type { ReactNode } from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

export const emailBrand = {
  canvas: "#070707",
  surface: "#111111",
  raised: "#181818",
  accentSurface: "#20150c",
  border: "#303030",
  accentBorder: "#704018",
  text: "#f7f7f5",
  muted: "#c1c1bd",
  subtle: "#9b9b96",
  accent: "#ff7a00",
  accentSoft: "#ffad61",
  ink: "#111111",
} as const;

const siteUrl = "https://www.yanis-harrat.com";
const fontFamily = "Arial, Helvetica, sans-serif";

type BrandedEmailProps = {
  children: ReactNode;
  preview: string;
  subtitle: ReactNode;
  title: ReactNode;
};

export function BrandedEmail({
  children,
  preview,
  subtitle,
  title,
}: BrandedEmailProps) {
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body lang="fr" dir="ltr" style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.accentRule} />
          <Section style={styles.header}>
            <Row>
              <Column style={styles.logoColumn}>
                <Img
                  alt="Logo de Yanis Harrat"
                  height="48"
                  src={`${siteUrl}/images/brand/yanis-harrat-logo.png`}
                  style={styles.logo}
                  width="48"
                />
              </Column>
              <Column>
                <Text style={styles.brandName}>Yanis Harrat</Text>
                <Text style={styles.brandRole}>
                  Support informatique · Systèmes &amp; réseaux
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={styles.hero}>
            <Heading as="h1" style={styles.heading}>
              {title}
            </Heading>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </Section>

          <Section style={styles.content}>{children}</Section>

          <Section style={styles.footer}>
            <Hr style={styles.footerRule} />
            <Text style={styles.footerIdentity}>
              Yanis Harrat · Technicien support systèmes et réseaux
            </Text>
            <Text style={styles.footerLinks}>
              <Link href={siteUrl} style={styles.footerLink}>
                Portfolio
              </Link>
              <span aria-hidden="true"> · </span>
              <Link
                href="mailto:contact@yanis-harrat.com"
                style={styles.footerLink}
              >
                contact@yanis-harrat.com
              </Link>
            </Text>
            <Text style={styles.legal}>
              Communication professionnelle envoyée depuis yanis-harrat.com.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Button href={href} style={styles.button}>
      {children}
      <span aria-hidden="true"> →</span>
    </Button>
  );
}

export function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <Row style={styles.detailRow}>
      <Column>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </Column>
    </Row>
  );
}

export const emailStyles = {
  accentPanel: {
    backgroundColor: emailBrand.accentSurface,
    borderColor: emailBrand.accentBorder,
    borderRadius: "14px",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "22px 24px",
  },
  bodyCopy: {
    color: emailBrand.muted,
    fontFamily,
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0 0 20px",
  },
  bodyStrong: {
    color: emailBrand.text,
    fontFamily,
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "25px",
    margin: "0 0 8px",
  },
  divider: {
    borderColor: emailBrand.border,
    borderStyle: "solid",
    borderWidth: "1px 0 0",
    margin: "28px 0",
  },
  label: {
    color: emailBrand.accentSoft,
    fontFamily,
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    lineHeight: "18px",
    margin: "0 0 10px",
    textTransform: "uppercase" as const,
  },
  link: {
    color: emailBrand.accentSoft,
    textDecoration: "underline",
  },
  message: {
    color: emailBrand.text,
    fontFamily,
    fontSize: "16px",
    lineHeight: "27px",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  panel: {
    backgroundColor: emailBrand.raised,
    borderColor: emailBrand.border,
    borderRadius: "14px",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "8px 22px",
  },
  meta: {
    color: emailBrand.subtle,
    fontFamily,
    fontSize: "13px",
    lineHeight: "20px",
    margin: "0",
  },
} as const;

const styles = {
  accentRule: { backgroundColor: emailBrand.accent, height: "5px" },
  body: {
    backgroundColor: emailBrand.canvas,
    color: emailBrand.text,
    fontFamily,
    margin: "0",
    padding: "40px 12px",
  },
  brandName: {
    color: emailBrand.text,
    fontFamily,
    fontSize: "17px",
    fontWeight: "700",
    lineHeight: "21px",
    margin: "0 0 2px",
  },
  brandRole: {
    color: emailBrand.muted,
    fontFamily,
    fontSize: "11px",
    lineHeight: "16px",
    margin: "0",
  },
  button: {
    backgroundColor: emailBrand.accent,
    border: `1px solid ${emailBrand.accent}`,
    borderRadius: "10px",
    boxSizing: "border-box" as const,
    color: emailBrand.ink,
    display: "inline-block",
    fontFamily,
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "20px",
    padding: "14px 21px",
    textDecoration: "none",
  },
  container: {
    backgroundColor: emailBrand.surface,
    border: `1px solid ${emailBrand.border}`,
    borderRadius: "16px",
    maxWidth: "600px",
    overflow: "hidden",
    width: "100%",
  },
  content: { padding: "0 32px 40px" },
  detailLabel: {
    color: emailBrand.subtle,
    fontFamily,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.04em",
    lineHeight: "18px",
    margin: "0",
    padding: "14px 0 0",
    textTransform: "uppercase" as const,
  },
  detailRow: {
    borderBottom: `1px solid ${emailBrand.border}`,
  },
  detailValue: {
    color: emailBrand.text,
    fontFamily,
    fontSize: "14px",
    lineHeight: "21px",
    margin: "0",
    padding: "4px 0 14px",
    wordBreak: "break-word" as const,
  },
  footer: { backgroundColor: "#0d0d0d", padding: "0 32px 28px" },
  footerIdentity: {
    color: emailBrand.muted,
    fontFamily,
    fontSize: "12px",
    lineHeight: "18px",
    margin: "0 0 4px",
  },
  footerLink: { color: emailBrand.accentSoft, textDecoration: "underline" },
  footerLinks: {
    color: emailBrand.subtle,
    fontFamily,
    fontSize: "12px",
    lineHeight: "18px",
    margin: "0 0 12px",
  },
  footerRule: {
    borderColor: emailBrand.border,
    borderStyle: "solid",
    borderWidth: "1px 0 0",
    margin: "0 0 22px",
  },
  header: {
    borderBottom: `1px solid ${emailBrand.border}`,
    padding: "20px 28px",
  },
  heading: {
    color: emailBrand.text,
    fontFamily,
    fontSize: "34px",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: "40px",
    margin: "0 0 14px",
  },
  hero: { padding: "42px 32px 28px" },
  legal: {
    color: emailBrand.subtle,
    fontFamily,
    fontSize: "11px",
    lineHeight: "17px",
    margin: "0",
  },
  logo: { borderRadius: "13px", display: "block" },
  logoColumn: { width: "62px" },
  subtitle: {
    color: emailBrand.muted,
    fontFamily,
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0",
  },
} as const;
