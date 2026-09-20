export type WatchSourceCategory = "Référentiels" | "Écosystème IA" | "Retours techniques";

export type WatchSource = {
  name: string;
  publisher: string;
  category: WatchSourceCategory;
  url: string;
  rationale: string;
};

export type WatchArticleSource = Pick<WatchSource, "name" | "publisher" | "url">;

export type WatchArticle = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  question: string;
  takeaways: readonly string[];
  analysis: readonly string[];
  limits: readonly string[];
  sources: readonly WatchArticleSource[];
};
