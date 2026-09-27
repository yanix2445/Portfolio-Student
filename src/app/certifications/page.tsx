import type { Metadata } from "next";
import { CertificationCatalog } from "@/features/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Les badges Google, Cisco et Anthropic obtenus par Yanis Harrat en support informatique, cybersécurité et intelligence artificielle.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <main className="portfolio-surface min-h-screen text-[var(--home-text)]">
      <CertificationCatalog />
    </main>
  );
}
