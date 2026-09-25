import type { Metadata } from "next";
import { ExperienceRegistry } from "@/features/experiences";

export const metadata: Metadata = {
  title: "Parcours professionnel",
  description:
    "Parcours professionnel de Yanis Harrat : support systèmes et réseaux, projets informatiques, service client et interventions télécoms.",
  alternates: { canonical: "/parcours" },
};

export default function CareerPage() {
  return (
    <main className="portfolio-surface min-h-screen bg-[var(--home-bg)] text-[var(--home-text)]">
      <ExperienceRegistry />
    </main>
  );
}
