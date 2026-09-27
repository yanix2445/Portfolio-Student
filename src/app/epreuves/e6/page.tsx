import type { Metadata } from "next";
import { E6System } from "@/features/bts-e6";

export const metadata: Metadata = {
  title: "Épreuve E6 · BTS SIO SISR",
  description:
    "Deux réalisations E6 d’administration des systèmes et réseaux, présentées selon leur état réel d’avancement.",
  alternates: { canonical: "/epreuves/e6" },
};

export default function E6Page() {
  return <E6System />;
}
