import type { Metadata } from "next";
import { ProjectList } from "@/features/projects";
import { PageIntro } from "@/shared/components/page-intro";
import { editorialMedia } from "@/shared/config/editorial-media.config";

export const metadata: Metadata = {
  title: "Projets personnels et étudiants",
  description:
    "Projets documentés de Yanis Harrat avec contexte, contribution, méthode, technologies et preuves consultables.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Projets"
        title="Des projets dont je peux montrer la démarche."
        description="Seuls les projets disposant d’un contexte réel, d’une contribution identifiable et d’une preuve consultable sont publiés."
        media={editorialMedia.development}
      />
      <section className="page-shell pb-20 lg:pb-28" aria-label="Liste des projets">
        <div>
          <ProjectList />
        </div>
      </section>
    </main>
  );
}
