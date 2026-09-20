export const siteConfig = {
  name: "Yanis Harrat",
  initials: "YH",
  title: "Yanis Harrat — Technicien support systèmes et réseaux",
  description:
    "Portfolio de Yanis Harrat, technicien support systèmes et réseaux en BTS SIO SISR, disponible en Île-de-France pour une alternance ou un CDI.",
  email: "contact@yanis-harrat.com",
  location: "Île-de-France",
  bookingUrl: "https://cal.com/yanis-harrat/rdv-30min",
  cvUrl: null as string | null,
  navigation: [
    { label: "Compétences", href: "/#competences" },
    { label: "Expériences", href: "/#e5" },
    { label: "E6", href: "/#e6" },
    { label: "Veille", href: "/veille" },
  ],
} as const;
