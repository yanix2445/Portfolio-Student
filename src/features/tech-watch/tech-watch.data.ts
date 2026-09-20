import type { WatchArticle, WatchSource } from "./tech-watch.types";

export const watchTopic = {
  title: "L’IA appliquée au développement web et applicatif",
  question:
    "Comment les outils d’intelligence artificielle transforment-ils la conception, le développement et la maintenance d’applications sans dégrader la sécurité ni la maîtrise technique ?",
  cadence: "Revue des sources chaque semaine, puis synthèse lorsqu’une évolution apporte un enseignement vérifiable.",
  selectionCriteria: [
    "Source primaire ou documentation officielle identifiable",
    "Impact concret sur un workflow de développement ou d’exploitation",
    "Information recoupable et assez stable pour être expliquée",
    "Limites, risques et conditions d’usage explicités",
  ],
} as const;

export const watchSources: readonly WatchSource[] = [
  {
    name: "Documentation Next.js",
    publisher: "Vercel",
    category: "Référentiels",
    url: "https://nextjs.org/docs",
    rationale: "Suivre les API, conventions App Router et recommandations officielles.",
  },
  {
    name: "AI SDK",
    publisher: "Vercel",
    category: "Écosystème IA",
    url: "https://ai-sdk.dev/docs",
    rationale: "Observer les modèles d’intégration de l’IA dans les applications TypeScript.",
  },
  {
    name: "Documentation Claude",
    publisher: "Anthropic",
    category: "Écosystème IA",
    url: "https://docs.anthropic.com",
    rationale: "Étudier les capacités, limites et pratiques des outils de développement assisté.",
  },
  {
    name: "Documentation OpenAI",
    publisher: "OpenAI",
    category: "Écosystème IA",
    url: "https://platform.openai.com/docs",
    rationale: "Comparer les interfaces et pratiques d’intégration proposées par un autre fournisseur.",
  },
  {
    name: "Next.js Blog",
    publisher: "Vercel",
    category: "Retours techniques",
    url: "https://nextjs.org/blog",
    rationale: "Repérer les évolutions du framework et leurs raisons techniques.",
  },
];

export const watchArticles: readonly WatchArticle[] = [
  {
    slug: "nextjs-mcp-agents-developpement",
    title: "Next.js 16 ouvre son runtime aux agents avec MCP",
    excerpt:
      "Le serveur de développement peut maintenant fournir aux agents un contexte réel sur les routes, erreurs et Server Actions.",
    publishedAt: "2026-09-18",
    readingTime: "4 min",
    question:
      "L’accès au runtime rend-il l’assistance par IA plus fiable pendant le développement d’une application Next.js ?",
    takeaways: [
      "Le support MCP de Next.js 16 expose aux outils autorisés des informations sur l’application en cours d’exécution.",
      "Un agent peut inspecter les erreurs, les routes, les métadonnées et les Server Actions au lieu de raisonner uniquement depuis le code statique.",
      "Ce contexte améliore le diagnostic, mais ne remplace ni les tests ni la revue humaine.",
    ],
    analysis: [
      "L’intérêt principal est de réduire l’écart entre ce que le code semble faire et ce que le framework exécute réellement. Pour un développeur, cela peut accélérer le diagnostic d’une erreur de routage ou d’une Server Action.",
      "Dans un portfolio comme celui-ci, le gain reste surtout méthodologique : l’agent peut vérifier la structure réelle des pages pendant le développement. La validation finale doit cependant continuer à s’appuyer sur le lint, les tests, le build et une inspection dans le navigateur.",
    ],
    limits: [
      "L’outil doit être explicitement configuré et n’accède qu’aux applications de développement en cours.",
      "Davantage de contexte ne garantit pas une correction juste : les permissions, la confidentialité et la validation humaine restent nécessaires.",
    ],
    sources: [
      {
        name: "Next.js MCP guide",
        publisher: "Next.js",
        url: "https://nextjs.org/docs/app/guides/mcp",
      },
      {
        name: "The agentic future of Next.js",
        publisher: "Next.js",
        url: "https://nextjs.org/blog/agentic-future",
      },
    ],
  },
  {
    slug: "integrer-ia-frontieres-serveur",
    title: "Intégrer l’IA sans exposer les secrets du fournisseur",
    excerpt:
      "Une intégration utile commence par une frontière claire : les clés et les appels sensibles restent sur le serveur.",
    publishedAt: "2026-09-20",
    readingTime: "5 min",
    question:
      "Quelles frontières appliquer lorsqu’une application web communique avec un fournisseur de modèles d’IA ?",
    takeaways: [
      "Les identifiants du fournisseur doivent rester dans l’environnement serveur et ne jamais rejoindre le bundle client.",
      "Les composants interactifs gagnent à rester petits ; la récupération et le traitement sensibles restent côté serveur.",
      "L’intégration RSC de l’AI SDK est annoncée comme expérimentale : sa documentation recommande AI SDK UI pour la production.",
    ],
    analysis: [
      "La séparation serveur-client n’est pas qu’une optimisation. Elle détermine aussi quelles données peuvent être inspectées par le navigateur. Une clé d’API importée dans une frontière cliente doit être considérée comme exposée.",
      "Une architecture sobre consiste donc à faire partir l’intention depuis l’interface, valider la demande sur le serveur, appeler le fournisseur depuis ce serveur puis ne retourner que le résultat nécessaire. Cette structure facilite aussi le contrôle des erreurs et des quotas.",
    ],
    limits: [
      "Conserver la clé sur le serveur ne suffit pas : il faut aussi valider les entrées, limiter les usages abusifs et filtrer les informations journalisées.",
      "Les API d’IA évoluent rapidement ; les guides officiels doivent être revérifiés avant une mise en production.",
    ],
    sources: [
      {
        name: "Choosing a Provider",
        publisher: "AI SDK",
        url: "https://ai-sdk.dev/docs/getting-started/choosing-a-provider",
      },
      {
        name: "AI SDK RSC: createAI",
        publisher: "AI SDK",
        url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-ai",
      },
      {
        name: "Server and Client Components",
        publisher: "Next.js",
        url: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
      },
    ],
  },
];

export function getWatchArticleBySlug(slug: string) {
  return watchArticles.find((article) => article.slug === slug);
}
