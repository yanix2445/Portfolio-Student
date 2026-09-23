import type { MetadataRoute } from "next";
import { e5Missions } from "@/features/bts-e5";
import { e6Realizations } from "@/features/bts-e6";
import { portfolioProjects } from "@/features/projects";
import { watchArticles } from "@/features/tech-watch";
import { siteConfig } from "@/shared/config/site.config";

const staticRoutes = [
  "",
  "/competences",
  "/parcours",
  "/epreuves/e5",
  "/epreuves/e6",
  "/projets",
  "/certifications",
  "/veille",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-09-20T00:00:00.000Z");
  const detailRoutes = [
    ...e5Missions.map((mission) => `/epreuves/e5/${mission.slug}`),
    ...e6Realizations.map((realization) => `/epreuves/e6/${realization.slug}`),
    ...portfolioProjects.map((project) => `/projets/${project.slug}`),
  ];

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: updatedAt,
      changeFrequency: route === "/veille" ? ("weekly" as const) : ("monthly" as const),
      priority: index === 0 ? 1 : 0.8,
    })),
    ...detailRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...watchArticles.map((article) => ({
      url: `${siteConfig.siteUrl}/veille/${article.slug}`,
      lastModified: new Date(`${article.publishedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
