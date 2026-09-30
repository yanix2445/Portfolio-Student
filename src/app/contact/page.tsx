import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Yanis Harrat pour une opportunité professionnelle, une mission technique ou une collaboration en systèmes et réseaux.",
  alternates: { canonical: "/contact" },
};

export default function ContactRoute() {
  return <ContactPage />;
}
