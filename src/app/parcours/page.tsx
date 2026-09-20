import type { Metadata } from "next";
import { ExperienceTimeline } from "@/features/experiences";
import { PageIntro } from "@/shared/components/page-intro";

export const metadata: Metadata = {
  title: "Parcours professionnel",
  description:
    "Expériences de Yanis Harrat comme technicien support systèmes et réseaux chez EDLearn et au Secours Catholique-Caritas France.",
  alternates: { canonical: "/parcours" },
};

export default function CareerPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Parcours professionnel"
        title="Deux terrains, un même métier."
        description="En 2026, j’ai exercé comme technicien support systèmes et réseaux chez EDLearn puis au Secours Catholique-Caritas France."
      />
      <section className="page-shell pb-20 lg:pb-28" aria-label="Chronologie des expériences">
        <div>
          <ExperienceTimeline />
        </div>
      </section>
    </main>
  );
}
