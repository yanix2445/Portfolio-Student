import type { Metadata } from "next";
import { WatchHub } from "@/features/tech-watch";

export const metadata: Metadata = {
  title: "Veille technologique",
  description:
    "Veille de Yanis Harrat sur l’intelligence artificielle appliquée au développement web et applicatif.",
  alternates: { canonical: "/veille" },
};

export default function TechWatchPage() {
  return <WatchHub />;
}
