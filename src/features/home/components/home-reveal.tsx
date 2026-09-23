"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";

export function HomeReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-visible={visible || undefined} className={cn("home-reveal", className)}>
      {children}
    </div>
  );
}

export function HomeAnimatedTagline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -28%", threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={cn("text-balance", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="home-word"
          data-visible={visible || undefined}
          style={{ transitionDelay: `${Math.min(index * 45, 720)}ms` }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
