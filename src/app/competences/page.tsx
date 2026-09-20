import type { Metadata } from "next";
import { SkillsCatalog } from "@/features/skills";
import { PageIntro } from "@/shared/components/page-intro";
import { editorialMedia } from "@/shared/config/editorial-media.config";

export const metadata: Metadata = {
  title: "Compétences systèmes, réseaux et support",
  description:
    "Compétences de Yanis Harrat en support N1/N2, Windows Server, Linux, réseaux, virtualisation, cloud et développement web.",
  alternates: { canonical: "/competences" },
};

export default function SkillsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Compétences"
        title="Des compétences reliées à des pratiques réelles."
        description="Mes niveaux distinguent l’autonomie, la capacité opérationnelle et les sujets que je continue d’approfondir."
        media={editorialMedia.support}
      />
      <section className="page-shell pb-20 lg:pb-28" aria-label="Catalogue de compétences">
        <div>
          <SkillsCatalog />
        </div>
      </section>
    </main>
  );
}
