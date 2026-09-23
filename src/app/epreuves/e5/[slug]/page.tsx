import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { E5Detail, e5Missions, getE5MissionBySlug } from "@/features/bts-e5";

export const dynamicParams = false;

export function generateStaticParams() {
  return e5Missions.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/epreuves/e5/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const mission = getE5MissionBySlug(slug);

  if (!mission) {
    return {};
  }

  return {
    title: `${mission.title} · E5`,
    description: mission.need,
    alternates: { canonical: `/epreuves/e5/${mission.slug}` },
  };
}

export default async function E5MissionPage({
  params,
}: PageProps<"/epreuves/e5/[slug]">) {
  const { slug } = await params;
  const mission = getE5MissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  return (
    <main>
      <E5Detail mission={mission} />
    </main>
  );
}
