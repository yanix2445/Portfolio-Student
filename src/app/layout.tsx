import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
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
  title: "Yanis Harrat — Portfolio BTS SIO SISR",
  description:
    "Portfolio de Yanis Harrat, étudiant en BTS SIO option SISR : compétences, projets, épreuves E5 et E6, et veille technologique.",
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
