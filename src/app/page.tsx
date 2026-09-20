import type { Metadata } from "next";
import { HomePage } from "@/features/home";

export const metadata: Metadata = {
  title: "Yanis Harrat — Technicien support systèmes et réseaux",
  description:
    "Découvrez le parcours, les compétences, les réalisations BTS SIO SISR et les projets de Yanis Harrat, disponible en Île-de-France.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
