import type { Metadata } from "next";
import { E5List } from "@/features/bts-e5";
import { PageIntro } from "@/shared/components/page-intro";

export const metadata: Metadata = {
  title: "Épreuve E5 · BTS SIO SISR",
  description:
    "Six réalisations professionnelles E5 menées par Yanis Harrat en stage chez EDLearn et au Secours Catholique-Caritas France.",
  alternates: { canonical: "/epreuves/e5" },
};

export default function E5Page() {
  return (
    <main>
      <PageIntro
        eyebrow="BTS SIO SISR · E5"
        title="Support et mise à disposition de services informatiques."
        description="Six réalisations menées en stage, regroupées par organisation et reliées aux compétences mobilisées."
      />
      <section className="page-shell pb-20 lg:pb-28" aria-label="Réalisations E5">
        <div>
          <E5List />
        </div>
      </section>
    </main>
  );
}
