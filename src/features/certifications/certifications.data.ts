import type { Certification } from "./certification.types";

export const certifications: readonly Certification[] = [
  {
    slug: "google-cybersecurity",
    title: "Google Cybersecurity",
    issuer: "Google",
    kind: "Certificat professionnel",
    featured: true,
    issued: "Mars 2026",
    description:
      "Parcours de neuf cours consacré aux fondamentaux de la cybersécurité, aux réseaux, à Linux, SQL, Python et à la détection d’incidents.",
    badge: {
      type: "image",
      src: "/images/certifications/google-cybersecurity-badge.png",
      alt: "Badge Certificat Google Cybersécurité",
    },
  },
  {
    slug: "google-it-support",
    title: "Google IT Support",
    issuer: "Google",
    kind: "Certificat professionnel",
    featured: true,
    issued: "2026",
    description:
      "Parcours professionnel consacré au support informatique, aux réseaux, aux systèmes d’exploitation et à l’administration des services.",
    badge: {
      type: "image",
      src: "/images/certifications/google-it-support-badge.png",
      alt: "Badge Google IT Support Certificate of Completion",
    },
  },
  {
    slug: "cisco-introduction-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    kind: "Certificat de cours",
    featured: true,
    issued: "Décembre 2025",
    description:
      "Introduction aux menaces courantes, à la protection des données et aux bonnes pratiques de sécurité en ligne.",
    badge: {
      type: "image",
      src: "/images/certifications/cisco-cybersecurity-badge.png",
      alt: "Badge Cisco Networking Academy Introduction to Cybersecurity",
    },
  },
  {
    slug: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    kind: "Formation",
    featured: false,
    issued: "2026",
    description:
      "Prise en main de Claude, de ses usages et des principes nécessaires à une interaction efficace avec le modèle.",
    badge: { type: "text", mark: "C101" },
  },
  {
    slug: "anthropic-claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    kind: "Formation",
    featured: false,
    issued: "Mars 2026",
    description:
      "Utilisation de Claude Code dans un flux de développement, de l’exploration du projet à la livraison de changements vérifiés.",
    badge: { type: "text", mark: "CC" },
  },
  {
    slug: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    kind: "Formation",
    featured: false,
    issued: "2026",
    description:
      "Cadre de compréhension et de collaboration responsable avec les systèmes d’intelligence artificielle.",
    badge: { type: "text", mark: "AI" },
  },
];
