import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWatchArticleBySlug, WatchArticle, watchArticles } from "@/features/tech-watch";

export const dynamicParams = false;

export function generateStaticParams() {
  return watchArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/veille/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getWatchArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function TechWatchArticlePage({ params }: PageProps<"/veille/[slug]">) {
  const { slug } = await params;
  const article = getWatchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <WatchArticle article={article} />
    </main>
  );
}
