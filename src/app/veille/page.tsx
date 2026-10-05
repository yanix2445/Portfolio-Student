import type { Metadata } from "next";
import { WatchHub } from "@/features/tech-watch";

export const metadata: Metadata = {
  title: "Veille technologique SISR",
  description:
    "Veille de Yanis Harrat sur l’impact de l’intelligence artificielle dans l’administration des systèmes, des réseaux et la cybersécurité.",
  alternates: { canonical: "/veille" },
};

export default function TechWatchPage() {
  return <WatchHub />;
}
