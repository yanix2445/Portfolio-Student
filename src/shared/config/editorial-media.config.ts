export type EditorialMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  creditLabel: string;
  creditHref: string;
  licenseLabel: string;
  licenseHref: string;
  role: "illustration";
};

export const editorialMedia = {
  support: {
    src: "/images/editorial/support-workspace.webp",
    width: 2400,
    height: 3600,
    alt: "Composants électroniques et bobines de cuivre sur une carte informatique",
    caption: "Illustration éditoriale du diagnostic matériel.",
    creditLabel: "Jonathan Castañeda",
    creditHref:
      "https://unsplash.com/photos/a-close-up-of-electronic-components-on-a-table-NqxgFFjoC2Y",
    licenseLabel: "Unsplash",
    licenseHref: "https://unsplash.com/license",
    role: "illustration",
  },
  infrastructure: {
    src: "/images/editorial/network-infrastructure.webp",
    width: 2400,
    height: 1347,
    alt: "Baies de serveurs reliées par des câbles réseau dans un centre de données",
    caption: "Illustration éditoriale d’une infrastructure réseau.",
    creditLabel: "Taylor Vick",
    creditHref: "https://unsplash.com/photos/cable-network-M5tzZtFCOfs",
    licenseLabel: "Unsplash",
    licenseHref: "https://unsplash.com/license",
    role: "illustration",
  },
  development: {
    src: "/images/editorial/web-development.webp",
    width: 2400,
    height: 3600,
    alt: "Code source coloré affiché en gros plan sur un écran",
    caption: "Illustration éditoriale du développement web.",
    creditLabel: "Markus Spiske",
    creditHref:
      "https://unsplash.com/photos/computer-programming-codes-displayed-on-a-monitor-MgtHZ4zlC1U",
    licenseLabel: "Unsplash",
    licenseHref: "https://unsplash.com/license",
    role: "illustration",
  },
  artificialIntelligence: {
    src: "/images/editorial/ai-watch.webp",
    width: 2400,
    height: 1350,
    alt: "Structure abstraite de sphères transparentes reliées entre elles",
    caption: "Illustration éditoriale des usages multiples de l’intelligence artificielle.",
    creditLabel: "Nidia Dias pour Google DeepMind",
    creditHref: "https://unsplash.com/photos/a-bunch-of-water-drops-LIlsk-UFVxk",
    licenseLabel: "Unsplash",
    licenseHref: "https://unsplash.com/license",
    role: "illustration",
  },
} as const satisfies Record<string, EditorialMedia>;
