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
    <main>
      <header className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">Certifications</p>
          <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Six badges pour situer mon parcours technique.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            Les certifications professionnelles principales sont distinguées des certificats de cours et des formations complémentaires.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Catalogue de certifications">
        <div className="mx-auto w-full max-w-[90rem]">
          <CertificationCatalog />
        </div>
      </section>
    </main>
  );
}
