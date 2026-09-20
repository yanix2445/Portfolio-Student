import { notFound } from "next/navigation";
import { E5Detail, e5Missions, getE5MissionBySlug } from "@/features/bts-e5";

export const dynamicParams = false;

export function generateStaticParams() {
  return e5Missions.map((mission) => ({ slug: mission.slug }));
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
