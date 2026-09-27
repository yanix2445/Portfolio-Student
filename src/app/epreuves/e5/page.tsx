import type { Metadata } from "next";
import { E5System } from "@/features/bts-e5";

export const metadata: Metadata = {
  title: "Épreuve E5 · BTS SIO SISR",
  description:
    "Six réalisations professionnelles E5 menées par Yanis Harrat en stage chez EDLearn et au Secours Catholique-Caritas France.",
  alternates: { canonical: "/epreuves/e5" },
};

export default function E5Page() {
  return <E5System />;
}
