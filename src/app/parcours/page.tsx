import type { Metadata } from "next";
import { ExperienceTimeline } from "@/features/experiences";

export const metadata: Metadata = {
  title: "Parcours professionnel",
  description:
    "Expériences de Yanis Harrat comme technicien support systèmes et réseaux chez EDLearn et au Secours Catholique-Caritas France.",
  alternates: { canonical: "/parcours" },
};

export default function CareerPage() {
  return (
    <main>
      <header className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">Parcours professionnel</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Deux terrains, un même métier.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            En 2026, j’ai exercé comme technicien support systèmes et réseaux chez EDLearn puis au Secours Catholique-Caritas France.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Chronologie des expériences">
        <div className="mx-auto w-full max-w-[90rem]">
          <ExperienceTimeline />
        </div>
      </section>
    </main>
  );
}
