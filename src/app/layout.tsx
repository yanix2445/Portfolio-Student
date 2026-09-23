import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";
import { siteConfig } from "@/shared/config/site.config";
import { ProfileJsonLd } from "@/shared/seo/profile-json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Yanis Harrat",
    "portfolio",
    "BTS SIO",
    "SISR",
    "systèmes",
    "réseaux",
    "cybersécurité",
  ],
  authors: [{ name: "Yanis Harrat" }],
  creator: "Yanis Harrat",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] bg-brand px-4 py-3 font-semibold text-brand-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Aller au contenu principal
        </a>
        <ProfileJsonLd />
        <SiteHeader />
        <div id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
