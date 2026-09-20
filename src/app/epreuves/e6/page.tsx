import type { Metadata } from "next";
import { E6List } from "@/features/bts-e6";
import { PageIntro } from "@/shared/components/page-intro";
import { editorialMedia } from "@/shared/config/editorial-media.config";

export const metadata: Metadata = {
  title: "Épreuve E6 · BTS SIO SISR",
  description:
    "Deux réalisations E6 d’administration des systèmes et réseaux, présentées selon leur état réel d’avancement.",
  alternates: { canonical: "/epreuves/e6" },
};

export default function E6Page() {
  return (
    <main>
      <PageIntro
        eyebrow="BTS SIO SISR · E6"
        title="Administration des systèmes et des réseaux."
        description="Deux réalisations professionnelles documentées selon leur état réel. Elles restent marquées en cours tant que leurs tests et leurs preuves ne sont pas terminés."
        media={editorialMedia.infrastructure}
      />
      <section className="page-shell pb-20 lg:pb-28" aria-label="Réalisations E6">
        <div>
          <E6List />
        </div>
      </section>
    </main>
  );
}
