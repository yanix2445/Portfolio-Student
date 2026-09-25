import type { Metadata } from "next";
import { ProjectGallery } from "@/features/projects";

export const metadata: Metadata = {
  title: "Projets personnels et étudiants",
  description:
    "Projets documentés de Yanis Harrat avec contexte, contribution, méthode, technologies et preuves consultables.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsPage() {
  return <ProjectGallery />;
}
