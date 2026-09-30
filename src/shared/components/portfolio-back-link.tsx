import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function PortfolioBackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("portfolio-back-link", className)}>
      <ArrowLeft aria-hidden="true" />
      {children}
    </Link>
  );
}
