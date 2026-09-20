import type { E6Realization } from "./e6.types";

export const e6Realizations: readonly E6Realization[] = [
  {
    slug: "infrastructure-pme-automatisation",
    title: "Infrastructure PME et automatisation",
    status: "En cours",
    summary:
      "Concevoir une infrastructure système et réseau segmentée, redondée, sauvegardée et automatisée pour une PME simulée.",
    context:
      "Le scénario représente Yanix Labs, une PME numérique simulée d’environ 150 collaborateurs. Il sert de cadre pédagogique à la première réalisation E6.",
    objective:
      "Préparer une infrastructure exploitable qui démontre la continuité de service, le moindre privilège, la traçabilité et l’automatisation des opérations courantes.",
    plannedScope: [
      "Segmenter les usages en VLAN utilisateurs, serveurs, management et sauvegarde",
      "Préparer une redondance Active Directory et DHCP",
      "Organiser les accès aux fichiers avec DFS et un modèle de permissions AGDLP",
      "Définir une stratégie de sauvegarde et de reprise",
      "Automatiser le déploiement et les opérations récurrentes avec PowerShell",
    ],
    currentWork: [
      "Conception de l’architecture et préparation de la maquette virtuelle",
      "Écriture progressive des scripts PowerShell documentés",
      "Préparation du dossier technique et du protocole de preuves",
    ],
    tools: [
      "VMware Fusion Pro",
      "Windows Server",
      "PowerShell",
      "OPNsense",
      "Active Directory",
      "DFS",
    ],
    competencies: [
      "Concevoir une solution d’infrastructure réseau",
      "Installer, tester et déployer une solution d’infrastructure réseau",
      "Exploiter, dépanner et superviser une solution d’infrastructure réseau",
    ],
    availableEvidence: [
      "Description du scénario et de l’architecture cible",
      "Scripts et dossier technique en cours de construction",
      "Résultats et tests de continuité non encore publiables",
    ],
    result: null,
  },
  {
    slug: "seconde-realisation-professionnelle",
    title: "Seconde réalisation professionnelle E6",
    status: "En cours",
    summary:
      "Le sujet, le périmètre technique et les preuves seront publiés après validation de la réalisation.",
    context:
      "Une seconde réalisation distincte est prévue pour compléter le dossier E6. Son contexte définitif n’est pas encore validé.",
    objective:
      "Documenter une seconde situation professionnelle d’administration des systèmes et des réseaux sans anticiper son contenu.",
    plannedScope: [
      "Valider le sujet et son contexte professionnel",
      "Définir les objectifs techniques et les critères de réussite",
      "Réaliser les opérations et collecter des preuves expurgées",
    ],
    currentWork: [
      "Cadrage du sujet",
      "Identification des compétences à démontrer",
    ],
    tools: [],
    competencies: [
      "Concevoir une solution d’infrastructure réseau",
      "Installer, tester et déployer une solution d’infrastructure réseau",
      "Exploiter, dépanner et superviser une solution d’infrastructure réseau",
    ],
    availableEvidence: ["Aucun résultat publié à ce stade"],
    result: null,
  },
];

export function getE6RealizationBySlug(slug: string) {
  return e6Realizations.find((realization) => realization.slug === slug);
}
