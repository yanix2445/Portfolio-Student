import type {
  HomeCertification,
  HomeE6Project,
  HomeExperience,
  HomeProject,
  HomeProof,
  HomeSkill,
} from "./home.types";

export const homeRoutes = {
  skills: "/competences",
  career: "/parcours",
  e5: "/epreuves/e5",
  e6: "/epreuves/e6",
  projects: "/projets",
  certifications: "/certifications",
} as const;

export const homeProofs: readonly HomeProof[] = [
  { value: "2", label: "expériences terrain en 2026" },
  { value: "6", label: "réalisations professionnelles E5" },
  { value: "2", label: "réalisations E6 en cours" },
  { value: "6", label: "certifications et formations clés" },
];

export const homeSkills: readonly HomeSkill[] = [
  {
    title: "Administration Windows Server",
    level: "Autonome",
    summary: "Active Directory, services réseau, fichiers et stratégies de groupe.",
    tools: ["Windows Server", "PowerShell", "Microsoft 365"],
  },
  {
    title: "Support N1 et N2",
    level: "Autonome",
    summary: "Diagnostic, résolution, accompagnement et suivi des demandes.",
    tools: ["GLPI", "Zendesk", "Google Workspace"],
  },
  {
    title: "Réseaux et sécurité",
    level: "Opérationnel",
    summary: "Segmentation, VPN, Wi-Fi, pare-feu et analyse des flux.",
    tools: ["Cisco", "Meraki", "OPNsense"],
  },
  {
    title: "Linux et virtualisation",
    level: "Opérationnel",
    summary: "Administration de services et construction de laboratoires isolés.",
    tools: ["Linux", "Proxmox", "VMware"],
  },
  {
    title: "Cloud et collaboration",
    level: "Opérationnel",
    summary: "Gestion des identités, outils collaboratifs et migrations de services.",
    tools: ["Azure", "Microsoft 365", "Google Workspace"],
  },
  {
    title: "Développement web",
    level: "En cours d’approfondissement",
    summary: "Interfaces accessibles, déploiement continu et documentation du code.",
    tools: ["React", "Next.js", "GitHub", "Vercel"],
  },
];

export const homeExperiences: readonly HomeExperience[] = [
  {
    organization: "EDLearn",
    period: "Février — avril 2026",
    role: "Technicien support systèmes et réseaux",
    missions: [
      "Migration d’un serveur d’impression sur site vers le cloud",
      "Audit du réseau Wi-Fi",
      "Support N1/N2 et administration Google Workspace avec Zendesk",
    ],
  },
  {
    organization: "Secours Catholique-Caritas France",
    period: "Juin — septembre 2026",
    role: "Technicien support systèmes et réseaux",
    missions: [
      "Enrôlement des postes et suivi du parc avec GLPI",
      "Déploiement et maintenance d’un VPN pour l’accès distant",
      "Migration d’un serveur de fichiers sur site vers le cloud",
    ],
  },
];

export const homeE6Projects: readonly HomeE6Project[] = [
  {
    slug: "infrastructure-pme-automatisation",
    title: "Infrastructure PME et automatisation",
    status: "En cours",
    summary:
      "Conception d’une infrastructure segmentée, redondée et automatisée pour une PME simulée.",
  },
  {
    slug: "seconde-realisation-professionnelle",
    title: "Seconde réalisation professionnelle",
    status: "En cours",
    summary:
      "Le périmètre détaillé sera publié dès que les travaux et les preuves seront suffisamment avancés.",
  },
];

export const homeProjects: readonly HomeProject[] = [
  {
    slug: "portfolio-professionnel",
    title: "Portfolio professionnel multipage",
    kind: "Projet personnel",
    summary:
      "Centraliser mon parcours, mes preuves BTS et ma veille dans une expérience claire pour les recruteurs.",
    evidence: "Code versionné sur GitHub et déploiement continu sur Vercel.",
  },
];

export const homeCertifications: readonly HomeCertification[] = [
  {
    title: "Google Cybersecurity",
    issuer: "Google",
    kind: "Certificat professionnel",
  },
  {
    title: "Google IT Support",
    issuer: "Google",
    kind: "Certificat professionnel",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    kind: "Certification",
  },
  { title: "Claude 101", issuer: "Anthropic", kind: "Formation" },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    kind: "Formation",
  },
  { title: "AI Fluency", issuer: "Anthropic", kind: "Formation" },
];
