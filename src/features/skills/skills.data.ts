import type { SkillDomain } from "./skill.types";

export const skillDomains: readonly SkillDomain[] = [
  {
    slug: "windows-server",
    title: "Administration Windows Server",
    level: "Autonome",
    summary:
      "Administrer les identités, services réseau, partages et politiques d’un environnement Windows.",
    practices: [
      "Active Directory et unités d’organisation",
      "DNS, DHCP et stratégies de groupe",
      "Partages, permissions et continuité de service",
      "Automatisation PowerShell",
    ],
    tools: ["Windows Server", "Active Directory", "PowerShell", "DFS"],
  },
  {
    slug: "support",
    title: "Support N1 et N2",
    level: "Autonome",
    summary:
      "Qualifier une demande, diagnostiquer son origine et accompagner l’utilisateur jusqu’à une résolution documentée.",
    practices: [
      "Diagnostic matériel, système et applicatif",
      "Gestion des incidents et demandes",
      "Documentation et communication utilisateur",
      "Administration des outils collaboratifs",
    ],
    tools: ["GLPI", "Zendesk", "Google Workspace", "Microsoft 365"],
  },
  {
    slug: "linux-virtualisation",
    title: "Linux et virtualisation",
    level: "Opérationnel",
    summary:
      "Déployer des services et construire des laboratoires reproductibles sur des hyperviseurs modernes.",
    practices: [
      "Administration courante Linux",
      "Création et segmentation de machines virtuelles",
      "Snapshots, sauvegardes et restauration",
      "Analyse des journaux et dépannage",
    ],
    tools: ["Linux", "Proxmox", "VMware Fusion Pro"],
  },
  {
    slug: "reseaux-securite",
    title: "Réseaux et sécurité",
    level: "Opérationnel",
    summary:
      "Configurer, segmenter et diagnostiquer des réseaux locaux et des accès distants sécurisés.",
    practices: [
      "VLAN, routage et filtrage inter-réseaux",
      "VPN et accès distant",
      "Audit Wi-Fi et analyse de couverture",
      "Pare-feu et principe de moindre privilège",
    ],
    tools: ["Cisco", "Cisco Meraki", "OPNsense", "VPN"],
  },
  {
    slug: "cloud-collaboration",
    title: "Cloud et collaboration",
    level: "Opérationnel",
    summary:
      "Administrer des environnements collaboratifs et participer à des migrations de services vers le cloud.",
    practices: [
      "Gestion des comptes et groupes",
      "Administration des services collaboratifs",
      "Migration de fichiers et d’impression",
      "Accompagnement au changement",
    ],
    tools: ["Microsoft Azure", "Microsoft 365", "Google Workspace"],
  },
  {
    slug: "developpement-automatisation",
    title: "Développement et automatisation",
    level: "En cours d’approfondissement",
    summary:
      "Automatiser les tâches répétitives et construire des interfaces web maintenables et accessibles.",
    practices: [
      "Scripts PowerShell idempotents",
      "Interfaces React et Next.js",
      "Versionnement et revue Git",
      "Déploiement continu",
    ],
    tools: ["PowerShell", "TypeScript", "React", "Next.js", "GitHub", "Vercel"],
  },
];
