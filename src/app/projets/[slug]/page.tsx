import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, portfolioProjects, ProjectDetail } from "@/features/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.problem,
    alternates: { canonical: `/projets/${project.slug}` },
  };
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
