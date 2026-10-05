import type { WatchArticle, WatchSource } from "./tech-watch.types";

export const watchTopic = {
  title:
    "Comment l’intelligence artificielle transforme l’administration des systèmes, des réseaux et la cybersécurité",
  question:
    "Dans quelles tâches l’IA aide-t-elle réellement un technicien SISR, et quelles vérifications restent indispensables pour garder la maîtrise de l’infrastructure et des accès ?",
  cadence: "Revue des sources chaque semaine, puis synthèse lorsqu’une évolution apporte un enseignement vérifiable.",
  selectionCriteria: [
    "Source primaire ou documentation officielle identifiable",
    "Usage concret pour l’administration, le réseau, le support ou la cybersécurité",
    "Permissions, données traitées et prérequis techniques identifiés",
    "Limites, risques et rôle de la validation humaine explicités",
  ],
} as const;

export const watchSources: readonly WatchSource[] = [
  {
    name: "Cisco Catalyst Center AI Assistant",
    publisher: "Cisco",
    category: "Administration et réseau",
    url: "https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center/articles/cisco-catalyst-center-ai-assistant.html",
    rationale: "Suivre les usages de l’IA pour la supervision, le diagnostic et la documentation réseau.",
  },
  {
    name: "Cisco AI Network Analytics",
    publisher: "Cisco",
    category: "Administration et réseau",
    url: "https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center-assurance/3-2-x/cisco-catalyst-assurance-user-guide-3-2-x/b_cisco_catalyst_assurance_3_2_x_ug_chapter_010.html",
    rationale: "Comprendre comment l’analyse réseau utilise les événements, les tendances et la comparaison de performances.",
  },
  {
    name: "Microsoft Copilot dans Intune",
    publisher: "Microsoft Learn",
    category: "Administration et réseau",
    url: "https://learn.microsoft.com/en-us/intune/copilot/",
    rationale: "Observer l’assistance à la gestion des postes, des politiques, de la conformité et du dépannage.",
  },
  {
    name: "Security Copilot dans Microsoft Defender",
    publisher: "Microsoft Learn",
    category: "Cybersécurité",
    url: "https://learn.microsoft.com/en-us/defender-xdr/security-copilot-in-microsoft-365-defender",
    rationale: "Suivre l’assistance à l’analyse d’incidents, aux requêtes KQL et à la production de rapports.",
  },
  {
    name: "Authentification de Microsoft Security Copilot",
    publisher: "Microsoft Learn",
    category: "Cybersécurité",
    url: "https://learn.microsoft.com/en-us/copilot/security/authentication",
    rationale: "Vérifier la séparation entre les rôles Copilot et les autorisations d’accès aux données de sécurité.",
  },
  {
    name: "Sécuriser un système d’IA générative",
    publisher: "ANSSI · MesServicesCyber",
    category: "Référentiels",
    url: "https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative",
    rationale: "Conserver un cadre français de prudence pour intégrer une IA générative dans un système d’information.",
  },
  {
    name: "AI Risk Management Framework",
    publisher: "NIST",
    category: "Référentiels",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    rationale: "Structurer l’analyse des risques, de la fiabilité et de la gouvernance des systèmes d’intelligence artificielle.",
  },
];

export const watchArticles: readonly WatchArticle[] = [
  {
    slug: "ia-diagnostic-reseau-cisco-catalyst",
    title: "Cisco Catalyst : ce que l’IA change dans le diagnostic réseau",
    excerpt:
      "L’assistant de Catalyst Center rapproche les événements réseau, le contexte des équipements et la documentation pour accélérer le passage du symptôme à l’hypothèse.",
    publishedAt: "2026-10-05",
    readingTime: "5 min",
    question:
      "Comment un assistant IA peut-il accélérer le diagnostic d’un réseau sans remplacer les vérifications de l’administrateur ?",
    takeaways: [
      "Dans Catalyst Center, l’assistant IA peut répondre en langage naturel à des questions de supervision, de dépannage et de documentation.",
      "Cisco AI Network Analytics analyse des événements réseau désidentifiés pour faire ressortir des anomalies, des tendances et des pistes de cause racine.",
      "Cisco recommande de vérifier les suggestions et les actions proposées, en particulier lorsqu’une configuration critique est concernée.",
    ],
    analysis: [
      "Pour un technicien SISR, le gain principal se situe au début du diagnostic. Une question ciblée peut rapprocher plus vite l’état d’un équipement, les échecs d’association, la santé d’un site et la documentation utile. L’IA aide ainsi à réduire le temps passé à chercher l’information, mais elle ne prouve pas à elle seule la cause d’un incident.",
      "Une utilisation fiable conserve une méthode classique : définir le périmètre touché, comparer la réponse avec les métriques et les journaux, vérifier les changements récents, puis documenter l’intervention. Toute modification doit rester contrôlée, testée et accompagnée d’une possibilité de retour arrière.",
    ],
    limits: [
      "Les fonctions disponibles dépendent de la version de Catalyst Center, des licences sous-jacentes et de la connexion aux services cloud nécessaires.",
      "Une recommandation générée reste une hypothèse : elle ne doit pas déclencher automatiquement un changement réseau critique sans contrôle humain.",
    ],
    sources: [
      {
        name: "Cisco Catalyst Center AI Assistant",
        publisher: "Cisco",
        url: "https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center/articles/cisco-catalyst-center-ai-assistant.html",
      },
      {
        name: "Cisco AI Network Analytics Overview",
        publisher: "Cisco",
        url: "https://www.cisco.com/c/en/us/td/docs/cloud-systems-management/network-automation-and-management/catalyst-center-assurance/3-2-x/cisco-catalyst-assurance-user-guide-3-2-x/b_cisco_catalyst_assurance_3_2_x_ug_chapter_010.html",
      },
    ],
  },
  {
    slug: "security-copilot-intune-administration",
    title: "Security Copilot dans Intune : assister l’administration sans élargir les droits",
    excerpt:
      "Dans Intune, l’IA peut résumer une politique, explorer les données d’un parc et aider au dépannage tout en restant soumise aux rôles et aux périmètres existants.",
    publishedAt: "2026-10-05",
    readingTime: "5 min",
    question:
      "Que peut apporter Security Copilot à l’administration des terminaux sans contourner le principe du moindre privilège ?",
    takeaways: [
      "Copilot dans Intune peut explorer les données du parc, résumer des politiques, expliquer des paramètres et assister le dépannage d’un appareil.",
      "Les réponses restent limitées par les rôles RBAC Intune et les scope tags déjà attribués à l’administrateur.",
      "Un rôle Security Copilot donne accès à la plateforme, mais ne donne pas à lui seul accès aux données protégées des autres services Microsoft.",
    ],
    analysis: [
      "Pour l’administration système, l’intérêt est de rendre un parc complexe plus lisible : comprendre rapidement l’effet d’une politique, retrouver les appareils concernés ou préparer une piste de dépannage. Cette assistance peut réduire la charge de recherche et faciliter la transmission d’une intervention entre techniciens.",
      "La réponse générée doit toutefois être traitée comme une aide au diagnostic. Avant d’appliquer une recommandation, il reste nécessaire de vérifier les groupes ciblés, les conflits avec les politiques existantes, l’impact utilisateur et le résultat sur un groupe pilote. Le contrôle d’accès doit être défini avant l’outil d’IA, jamais compensé par lui.",
    ],
    limits: [
      "L’usage nécessite Security Copilot configuré, une capacité disponible, le plug-in Intune activé et des rôles adaptés.",
      "Les données envoyées, les réponses produites et les actions proposées doivent rester encadrées par les règles de sécurité et la validation humaine de l’organisation.",
    ],
    sources: [
      {
        name: "Microsoft Copilot in Intune",
        publisher: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/intune/copilot/",
      },
      {
        name: "Understand authentication in Microsoft Security Copilot",
        publisher: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/copilot/security/authentication",
      },
      {
        name: "Recommandations de sécurité pour un système d’IA générative",
        publisher: "ANSSI · MesServicesCyber",
        url: "https://messervices.cyber.gouv.fr/guides/recommandations-de-securite-pour-un-systeme-dia-generative",
      },
    ],
  },
];

export function getWatchArticleBySlug(slug: string) {
  return watchArticles.find((article) => article.slug === slug);
}
