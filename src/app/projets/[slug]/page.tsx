import { notFound } from "next/navigation";
import { getProjectBySlug, portfolioProjects, ProjectDetail } from "@/features/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <ProjectDetail project={project} />
    </main>
  );
}
