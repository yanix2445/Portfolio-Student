import type { E5Mission } from "./e5.types";

const commonEvidence = [
  {
    label: "Captures et documents expurgés des données internes",
    publication: "En préparation",
  },
] as const;

export const e5Missions: readonly E5Mission[] = [
  {
    slug: "migration-serveur-impression-cloud",
    title: "Migration d’un serveur d’impression sur site vers le cloud",
    organization: "EDLearn",
    period: "Février — avril 2026",
    status: "Réalisée",
    context:
      "Une partie des services d’impression reposait sur une infrastructure locale à faire évoluer.",
    need:
      "Préparer et accompagner le passage vers un service d’impression hébergé, sans interrompre l’usage quotidien.",
    contribution: [
      "Recenser les usages et contraintes des postes concernés",
      "Participer à la préparation et au déploiement de la solution",
      "Accompagner les utilisateurs et traiter les incidents de transition",
    ],
    tools: ["Windows", "Services d’impression cloud", "Zendesk"],
    approach: [
      "Inventaire des imprimantes, pilotes et usages",
      "Préparation d’un périmètre de migration contrôlé",
      "Déploiement progressif puis validation auprès des utilisateurs",
      "Documentation des opérations de support",
    ],
    difficulties: [
      "Les incidents précis et les configurations internes seront décrits uniquement après anonymisation.",
    ],
    result:
      "La mission a été réalisée pendant le stage. Aucun indicateur chiffré n’est publié sans preuve expurgée.",
    evidence: commonEvidence,
    competencies: [
      "Mettre à disposition des utilisateurs un service informatique",
      "Répondre aux incidents et aux demandes d’assistance et d’évolution",
      "Travailler en mode projet",
    ],
  },
  {
    slug: "audit-reseau-wifi",
    title: "Audit du réseau Wi-Fi",
    organization: "EDLearn",
    period: "Février — avril 2026",
    status: "Réalisée",
    context:
      "La qualité de la couverture et l’usage du réseau sans fil devaient être observés sur le terrain.",
    need:
      "Identifier les zones ou situations à analyser et restituer des constats exploitables par l’équipe technique.",
    contribution: [
      "Collecter les informations utiles sur les équipements et la couverture",
      "Réaliser des observations et mesures dans les zones concernées",
      "Organiser les constats et formuler des pistes de suivi",
    ],
    tools: ["Cisco Meraki", "Wi-Fi", "Outils de diagnostic réseau"],
    approach: [
      "Définition du périmètre de contrôle",
      "Relevés et observation des conditions d’usage",
      "Comparaison des résultats entre zones",
      "Synthèse des constats pour l’équipe",
    ],
    difficulties: [
      "Les plans de locaux, adresses d’équipements et mesures détaillées ne sont pas publiés.",
    ],
    result:
      "L’audit a été mené et restitué en entreprise. Les données techniques détaillées restent confidentielles.",
    evidence: commonEvidence,
    competencies: [
      "Gérer le patrimoine informatique",
      "Répondre aux incidents et aux demandes d’assistance et d’évolution",
      "Mettre à disposition des utilisateurs un service informatique",
    ],
  },
  {
    slug: "support-n1-n2-google-workspace",
    title: "Support N1/N2 et administration de Google Workspace",
    organization: "EDLearn",
    period: "Février — avril 2026",
    status: "Réalisée",
    context:
      "Les utilisateurs avaient besoin d’un point de contact pour leurs incidents matériels, système et collaboratifs.",
    need:
      "Qualifier les demandes, résoudre les incidents accessibles et escalader avec un historique exploitable.",
    contribution: [
      "Prendre en charge les tickets de support N1 et N2",
      "Administrer les comptes et services Google Workspace dans le périmètre confié",
      "Documenter les résolutions et communiquer avec les utilisateurs",
    ],
    tools: ["Zendesk", "Google Workspace", "Windows", "Support à distance"],
    approach: [
      "Qualification de la demande et collecte du contexte",
      "Diagnostic puis application d’une solution contrôlée",
      "Validation avec l’utilisateur",
      "Traçabilité de la résolution ou escalade documentée",
    ],
    difficulties: [
      "Les identités, tickets, captures et informations de compte sont exclus de la publication.",
    ],
    result:
      "Les demandes confiées ont été traitées pendant le stage. Les volumes et délais ne sont pas affichés faute de données publiables.",
    evidence: commonEvidence,
    competencies: [
      "Répondre aux incidents et aux demandes d’assistance et d’évolution",
      "Gérer le patrimoine informatique",
      "Organiser son développement professionnel",
    ],
  },
  {
    slug: "enrolement-postes-suivi-parc",
    title: "Enrôlement des postes et suivi du parc informatique",
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    status: "Réalisée",
    context:
      "Le parc informatique associatif nécessite une identification fiable des postes et de leur cycle de vie.",
    need:
      "Intégrer les machines dans le processus de gestion du parc et maintenir des informations de suivi exploitables.",
    contribution: [
      "Préparer et enrôler les postes selon la procédure de l’équipe",
      "Contrôler et mettre à jour les informations d’inventaire",
      "Participer au support lié à la remise et à l’usage des équipements",
    ],
    tools: ["GLPI", "Windows", "Outils de gestion de parc"],
    approach: [
      "Vérification du matériel et de son affectation",
      "Enrôlement puis contrôle de la remontée d’inventaire",
      "Mise à jour de la fiche d’équipement",
      "Traçabilité de la remise ou de l’intervention",
    ],
    difficulties: [
      "Les numéros de série, noms de machines, affectations et comptes sont systématiquement expurgés.",
    ],
    result:
      "Les postes confiés ont été intégrés au suivi du parc. Aucun volume n’est publié sans export anonymisé.",
    evidence: commonEvidence,
    competencies: [
      "Gérer le patrimoine informatique",
      "Répondre aux incidents et aux demandes d’assistance et d’évolution",
    ],
  },
  {
    slug: "vpn-acces-distant",
    title: "Mise en place et maintenance d’un VPN pour l’accès distant",
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    status: "Réalisée",
    context:
      "Les utilisateurs distants devaient accéder aux ressources autorisées depuis un environnement extérieur au site.",
    need:
      "Configurer et maintenir un accès distant utilisable tout en respectant les règles de sécurité de l’organisation.",
    contribution: [
      "Participer à la préparation et au déploiement des accès VPN",
      "Accompagner les utilisateurs lors de la connexion initiale",
      "Diagnostiquer les incidents de connexion et documenter leur résolution",
    ],
    tools: ["VPN", "Windows", "Outils de diagnostic réseau"],
    approach: [
      "Vérification des prérequis du poste et du compte",
      "Installation ou configuration du client autorisé",
      "Test d’accès aux seules ressources prévues",
      "Documentation et suivi des incidents",
    ],
    difficulties: [
      "Les adresses, profils, règles d’accès et éléments d’authentification ne sont pas publiés.",
    ],
    result:
      "Les accès confiés ont été mis en service et maintenus pendant le stage, sans publication de la configuration interne.",
    evidence: commonEvidence,
    competencies: [
      "Mettre à disposition des utilisateurs un service informatique",
      "Répondre aux incidents et aux demandes d’assistance et d’évolution",
      "Gérer le patrimoine informatique",
    ],
  },
  {
    slug: "migration-serveur-fichiers-cloud",
    title: "Migration d’un serveur de fichiers sur site vers le cloud",
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    status: "Réalisée",
    context:
      "Des ressources documentaires hébergées localement devaient évoluer vers un environnement cloud administré.",
    need:
      "Préparer la migration des données et des usages sans publier ni compromettre les contenus de l’organisation.",
    contribution: [
      "Participer à l’inventaire des données et des accès concernés",
      "Contribuer aux opérations de migration et aux contrôles postérieurs",
      "Accompagner les utilisateurs et documenter les anomalies rencontrées",
    ],
    tools: ["Windows Server", "Microsoft 365", "Microsoft Azure"],
    approach: [
      "Recensement des partages et des contraintes d’accès",
      "Préparation du périmètre et des contrôles",
      "Migration progressive selon les consignes de l’équipe",
      "Vérification des accès et accompagnement utilisateur",
    ],
    difficulties: [
      "Les arborescences, noms de groupes, volumes, comptes et documents migrés restent confidentiels.",
    ],
    result:
      "La mission confiée a été réalisée pendant le stage. Les métriques et captures seront ajoutées uniquement après expurgation.",
    evidence: commonEvidence,
    competencies: [
      "Mettre à disposition des utilisateurs un service informatique",
      "Gérer le patrimoine informatique",
      "Travailler en mode projet",
    ],
  },
];

export function getE5MissionBySlug(slug: string) {
  return e5Missions.find((mission) => mission.slug === slug);
}
