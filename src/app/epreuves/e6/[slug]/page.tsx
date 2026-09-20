import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { E6Detail, e6Realizations, getE6RealizationBySlug } from "@/features/bts-e6";

export const dynamicParams = false;

export function generateStaticParams() {
  return e6Realizations.map((realization) => ({ slug: realization.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/epreuves/e6/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const realization = getE6RealizationBySlug(slug);

  if (!realization) {
    return {};
  }

  return {
    title: `${realization.title} · E6`,
    description: realization.summary,
    alternates: { canonical: `/epreuves/e6/${realization.slug}` },
  };
}

export default async function E6RealizationPage({
  params,
}: PageProps<"/epreuves/e6/[slug]">) {
  const { slug } = await params;
  const realization = getE6RealizationBySlug(slug);

  if (!realization) {
    notFound();
  }

  return (
    <main>
      <E6Detail realization={realization} />
    </main>
  );
}
