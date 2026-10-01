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

const brand = {
  canvas: "#070707",
  surface: "#111111",
  surfaceRaised: "#181818",
  border: "#2b2b2b",
  text: "#f6f6f6",
  muted: "#b5b5b5",
  subtle: "#8c8c8c",
  accent: "#ff7a00",
  accentSoft: "#ff9838",
  ink: "#111111",
} as const;

const absoluteSiteUrl = "https://www.yanis-harrat.com";
const legacyImageAttributes = { border: "0" } as const;

type BrandedEmailProps = {
  children: ReactNode;
  eyebrow: string;
  preview: string;
  subtitle: string;
  title: ReactNode;
};

export function BrandedEmail({
  children,
  eyebrow,
  preview,
  subtitle,
  title,
}: BrandedEmailProps) {
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={accentRuleStyle} />
          <Section style={headerStyle}>
            <Row>
              <Column style={logoColumnStyle}>
                <Img
                  {...legacyImageAttributes}
                  alt="Logo de Yanis Harrat"
                  height="52"
                  src={`${absoluteSiteUrl}/images/brand/yanis-harrat-logo.png`}
                  style={logoStyle}
                  width="52"
                />
              </Column>
              <Column>
                <Text style={brandNameStyle}>Yanis Harrat</Text>
                <Text style={brandRoleStyle}>
                  Technicien support systèmes et réseaux
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={heroStyle}>
            <Text style={eyebrowStyle}>{eyebrow}</Text>
            <Heading as="h1" style={headingStyle}>
              {title}
            </Heading>
            <Text style={subtitleStyle}>{subtitle}</Text>
          </Section>

          <Section style={contentStyle}>{children}</Section>

          <Section style={footerStyle}>
            <Hr style={footerRuleStyle} />
            <Text style={footerTextStyle}>
              Yanis Harrat · Technicien support systèmes et réseaux
            </Text>
            <Text style={footerLinksStyle}>
              <Link href={absoluteSiteUrl} style={footerLinkStyle}>
                Voir le portfolio
              </Link>
              <span aria-hidden="true"> · </span>
              <Link
                href="mailto:contact@yanis-harrat.com"
                style={footerLinkStyle}
              >
                contact@yanis-harrat.com
              </Link>
            </Text>
            <Text style={legalStyle}>
              Message envoyé par le portfolio professionnel de Yanis Harrat.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

type EmailButtonProps = {
  children: ReactNode;
  href: string;
};

export function EmailButton({ children, href }: EmailButtonProps) {
  return (
    <Button href={href} style={buttonStyle}>
      {children}
    </Button>
  );
}

type DetailRowProps = {
  label: string;
  value: ReactNode;
};

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Row style={detailRowStyle}>
      <Column style={detailLabelColumnStyle}>
        <Text style={detailLabelStyle}>{label}</Text>
      </Column>
      <Column>
        <Text style={detailValueStyle}>{value}</Text>
      </Column>
    </Row>
  );
}

export const emailStyles = {
  callout: {
    backgroundColor: brand.surfaceRaised,
    borderColor: brand.border,
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "12px",
    paddingTop: "20px",
    paddingRight: "22px",
    paddingBottom: "20px",
    paddingLeft: "22px",
  },
  calloutAccent: {
    backgroundColor: "#1a130d",
    borderColor: "#5d3413",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "12px",
    paddingTop: "20px",
    paddingRight: "22px",
    paddingBottom: "20px",
    paddingLeft: "22px",
  },
  calloutTitle: {
    color: brand.accentSoft,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    lineHeight: "18px",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "8px",
    marginLeft: "0",
    textTransform: "uppercase" as const,
  },
  copy: {
    color: brand.muted,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "15px",
    lineHeight: "24px",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "20px",
    marginLeft: "0",
  },
  copyStrong: {
    color: brand.text,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "24px",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "8px",
    marginLeft: "0",
  },
  divider: {
    borderColor: brand.border,
    borderStyle: "solid",
    borderWidth: "0",
    borderTopWidth: "1px",
    marginTop: "24px",
    marginRight: "0",
    marginBottom: "24px",
    marginLeft: "0",
  },
  message: {
    color: brand.text,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "15px",
    lineHeight: "25px",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
} as const;

const bodyStyle = {
  backgroundColor: brand.canvas,
  color: brand.text,
  fontFamily: "Arial, Helvetica, sans-serif",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
  paddingTop: "32px",
  paddingRight: "12px",
  paddingBottom: "32px",
  paddingLeft: "12px",
};

const containerStyle = {
  backgroundColor: brand.surface,
  borderColor: brand.border,
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "16px",
  maxWidth: "600px",
  overflow: "hidden",
  width: "100%",
};

const accentRuleStyle = {
  backgroundColor: brand.accent,
  height: "4px",
  lineHeight: "4px",
};

const headerStyle = {
  borderBottomColor: brand.border,
  borderBottomStyle: "solid",
  borderBottomWidth: "1px",
  paddingTop: "22px",
  paddingRight: "28px",
  paddingBottom: "22px",
  paddingLeft: "28px",
} as const;

const logoColumnStyle = {
  width: "66px",
};

const logoStyle = {
  borderRadius: "14px",
  display: "block",
} as const;

const brandNameStyle = {
  color: brand.text,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "22px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "2px",
  marginLeft: "0",
};

const brandRoleStyle = {
  color: brand.muted,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "12px",
  lineHeight: "17px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
};

const heroStyle = {
  paddingTop: "34px",
  paddingRight: "28px",
  paddingBottom: "26px",
  paddingLeft: "28px",
};

const eyebrowStyle = {
  color: brand.accentSoft,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.16em",
  lineHeight: "16px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "10px",
  marginLeft: "0",
  textTransform: "uppercase" as const,
};

const headingStyle = {
  color: brand.text,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "-0.03em",
  lineHeight: "38px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "12px",
  marginLeft: "0",
};

const subtitleStyle = {
  color: brand.muted,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "15px",
  lineHeight: "24px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
};

const contentStyle = {
  paddingTop: "0",
  paddingRight: "28px",
  paddingBottom: "34px",
  paddingLeft: "28px",
};

const detailRowStyle = {
  borderBottomColor: brand.border,
  borderBottomStyle: "solid",
  borderBottomWidth: "1px",
} as const;

const detailLabelColumnStyle = {
  width: "132px",
};

const detailLabelStyle = {
  color: brand.subtle,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "18px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
  paddingTop: "13px",
  paddingRight: "12px",
  paddingBottom: "13px",
  paddingLeft: "0",
  textTransform: "uppercase" as const,
};

const detailValueStyle = {
  color: brand.text,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "14px",
  lineHeight: "21px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
  paddingTop: "13px",
  paddingRight: "0",
  paddingBottom: "13px",
  paddingLeft: "0",
  wordBreak: "break-word" as const,
};

const buttonStyle = {
  backgroundColor: brand.accent,
  borderColor: brand.accent,
  borderStyle: "solid",
  borderWidth: "1px",
  borderRadius: "10px",
  boxSizing: "border-box" as const,
  color: brand.ink,
  display: "inline-block",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "20px",
  paddingTop: "13px",
  paddingRight: "20px",
  paddingBottom: "13px",
  paddingLeft: "20px",
  textDecoration: "none",
};

const footerStyle = {
  backgroundColor: "#0d0d0d",
  paddingTop: "0",
  paddingRight: "28px",
  paddingBottom: "26px",
  paddingLeft: "28px",
};

const footerRuleStyle = {
  borderColor: brand.border,
  borderStyle: "solid",
  borderWidth: "0",
  borderTopWidth: "1px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "22px",
  marginLeft: "0",
};

const footerTextStyle = {
  color: brand.muted,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "12px",
  lineHeight: "18px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "4px",
  marginLeft: "0",
};

const footerLinksStyle = {
  color: brand.subtle,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "12px",
  lineHeight: "18px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "12px",
  marginLeft: "0",
};

const footerLinkStyle = {
  color: brand.accentSoft,
  textDecoration: "underline",
};

const legalStyle = {
  color: brand.subtle,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "11px",
  lineHeight: "17px",
  marginTop: "0",
  marginRight: "0",
  marginBottom: "0",
  marginLeft: "0",
};
