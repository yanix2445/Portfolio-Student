import type {
  HomeE6Project,
  HomeProof,
  HomeSkill,
} from "./home.types";

export const homeRoutes = {
  skills: "/competences",
  e5: "/epreuves/e5",
  e6: "/epreuves/e6",
  projects: "/projets",
  certifications: "/certifications",
  watch: "/veille",
} as const;

export const homeProofs: readonly HomeProof[] = [
  { value: "2", label: "expériences terrain" },
  { value: "6", label: "missions E5 réalisées" },
  { value: "2", label: "dossiers E6 en cours" },
  { value: "6", label: "certifications et formations" },
];

export const homeSkills: readonly HomeSkill[] = [
  {
    title: "Support utilisateurs N1/N2",
    context: "Stage · EDLearn",
    summary:
      "Prendre en charge une demande, établir un diagnostic et accompagner l’utilisateur jusqu’à une résolution ou une escalade documentée.",
    practices: [
      "Qualifier les incidents matériels, système et applicatifs",
      "Résoudre les demandes accessibles et valider la solution avec l’utilisateur",
      "Documenter la résolution ou transmettre un historique exploitable",
    ],
    tools: ["Zendesk", "Windows", "Google Workspace", "Support à distance"],
    proofs: [
      {
        label: "Support N1/N2 et administration de Google Workspace",
        status: "Mission réalisée",
        href: "/epreuves/e5/support-n1-n2-google-workspace",
      },
    ],
  },
  {
    title: "Gestion de parc et postes de travail",
    context: "Stage · Secours Catholique",
    summary:
      "Préparer, enrôler et suivre les postes de travail afin de conserver un inventaire fiable et une traçabilité des interventions.",
    practices: [
      "Vérifier le matériel, son affectation et les prérequis du poste",
      "Enrôler les machines et contrôler la remontée d’inventaire",
      "Mettre à jour les fiches d’équipement et tracer les interventions",
    ],
    tools: ["GLPI", "Windows", "Outils de gestion de parc"],
    proofs: [
      {
        label: "Enrôlement des postes et suivi du parc informatique",
        status: "Mission réalisée",
        href: "/epreuves/e5/enrolement-postes-suivi-parc",
      },
    ],
  },
  {
    title: "Administration Microsoft et services",
    context: "Stage + réalisation E6",
    summary:
      "Administrer les services courants et préparer des environnements Windows structurés, sécurisés et documentés.",
    practices: [
      "Gérer des comptes, groupes et services collaboratifs dans le périmètre confié",
      "Préparer Active Directory, DNS, DHCP, GPO et services de fichiers en laboratoire",
      "Contrôler les accès et accompagner les migrations de services",
    ],
    tools: ["Windows Server", "Active Directory", "Microsoft 365", "Azure", "DFS"],
    proofs: [
      {
        label: "Migration d’un serveur de fichiers sur site vers le cloud",
        status: "Mission réalisée",
        href: "/epreuves/e5/migration-serveur-fichiers-cloud",
      },
      {
        label: "Infrastructure PME et automatisation",
        status: "Réalisation en cours",
        href: "/epreuves/e6/infrastructure-pme-automatisation",
      },
    ],
  },
  {
    title: "Réseaux, Wi-Fi et accès distant",
    context: "Stages + réalisation E6",
    summary:
      "Observer la qualité du réseau, mettre en service des accès distants et préparer une segmentation adaptée aux usages.",
    practices: [
      "Réaliser des relevés et restituer les constats d’un audit Wi-Fi",
      "Déployer, tester et dépanner un accès VPN utilisateur",
      "Préparer des VLAN et des règles de filtrage dans une maquette documentée",
    ],
    tools: ["Cisco Meraki", "VPN", "OPNsense", "VLAN"],
    proofs: [
      {
        label: "Audit du réseau Wi-Fi",
        status: "Mission réalisée",
        href: "/epreuves/e5/audit-reseau-wifi",
      },
      {
        label: "Mise en place et maintenance d’un VPN",
        status: "Mission réalisée",
        href: "/epreuves/e5/vpn-acces-distant",
      },
    ],
  },
  {
    title: "Virtualisation et Linux",
    context: "Laboratoires techniques",
    summary:
      "Construire des environnements isolés pour déployer, tester et dépanner des services sans exposer l’infrastructure hôte.",
    practices: [
      "Créer et organiser des machines virtuelles selon le besoin du laboratoire",
      "Administrer les services Linux courants et analyser leurs journaux",
      "Utiliser snapshots, sauvegardes et restauration pendant les phases de test",
    ],
    tools: ["Linux", "Proxmox", "VMware Fusion Pro"],
    proofs: [
      {
        label: "Maquette virtuelle de l’infrastructure PME",
        status: "Réalisation en cours",
        href: "/epreuves/e6/infrastructure-pme-automatisation",
      },
    ],
  },
  {
    title: "Automatisation et développement web",
    context: "Réalisation E6 + projet personnel",
    summary:
      "Automatiser les opérations répétitives et construire des interfaces web versionnées, déployées et documentées.",
    practices: [
      "Écrire des scripts PowerShell idempotents pour les opérations d’administration",
      "Développer des interfaces accessibles avec React et Next.js",
      "Versionner le code et organiser son déploiement continu",
    ],
    tools: ["PowerShell", "TypeScript", "React", "Next.js", "GitHub", "Vercel"],
    proofs: [
      {
        label: "Scripts de l’infrastructure PME",
        status: "Réalisation en cours",
        href: "/epreuves/e6/infrastructure-pme-automatisation",
      },
      {
        label: "Portfolio professionnel multipage",
        status: "Projet en cours",
        href: "/projets/portfolio-professionnel",
      },
    ],
  },
];

export const homeFaqs = [
  ["Quel poste recherchez-vous ?", "Une alternance ou un CDI comme technicien support systèmes et réseaux."],
  ["Où pouvez-vous travailler ?", "À Paris et dans toute l’Île-de-France, en présentiel, en hybride ou à distance."],
  ["Quel est votre niveau d’études ?", "Je prépare un BTS SIO option SISR et je documente mes réalisations E5 et E6 sur ce portfolio."],
  ["Avez-vous déjà travaillé en entreprise ?", "Oui. Mes six missions E5 proviennent de stages chez EDLearn et au Secours Catholique-Caritas France."],
  ["Quels environnements maîtrisez-vous le mieux ?", "Le support N1/N2, Windows Server, Microsoft 365, Google Workspace, les réseaux et la virtualisation."],
  ["Comment vous contacter rapidement ?", "Réservez un échange de 30 minutes, téléchargez mon CV ou écrivez-moi directement."],
] as const;

export const homeE6Projects: readonly HomeE6Project[] = [
  {
    slug: "infrastructure-pme-automatisation",
    title: "Infrastructure PME et automatisation",
    status: "En cours",
    summary:
      "Conception d’une infrastructure segmentée, redondée et automatisée pour une PME simulée.",
    proofs: [
      "4 VLAN isolés par OPNsense",
      "2 contrôleurs de domaine redondants",
      "Réplication de fichiers avec DFS-R et DFS-N",
      "Déploiement automatisé avec PowerShell",
    ],
  },
  {
    slug: "seconde-realisation-professionnelle",
    title: "Seconde réalisation professionnelle",
    status: "En cours",
    summary:
      "Le périmètre détaillé sera publié dès que les travaux et les preuves seront suffisamment avancés.",
    proofs: [],
  },
];
