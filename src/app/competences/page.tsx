import type { Metadata } from "next";
import { SkillsCatalog } from "@/features/skills";

export const metadata: Metadata = {
  title: "Compétences systèmes, réseaux et support",
  description:
    "Compétences de Yanis Harrat en support N1/N2, Windows Server, Linux, réseaux, virtualisation, cloud et développement web.",
  alternates: { canonical: "/competences" },
};

export default function SkillsPage() {
  return (
    <main>
      <header className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">Compétences</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Des compétences reliées à des pratiques réelles.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            Mes niveaux distinguent l’autonomie, la capacité opérationnelle et les sujets que je continue d’approfondir.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Catalogue de compétences">
        <div className="mx-auto w-full max-w-[90rem]">
          <SkillsCatalog />
        </div>
      </section>
    </main>
  );
}
