import type { Metadata } from "next";
import { SkillsCatalog } from "@/features/skills";

export const metadata: Metadata = {
  title: "Compétences systèmes, réseaux et support",
  description:
    "Compétences de Yanis Harrat en support N1/N2, Windows Server, Linux, réseaux, virtualisation, cloud et développement web.",
  alternates: { canonical: "/competences" },
};

export default function SkillsPage() {
  return <SkillsCatalog />;
}
