"use client";

import { useEffect } from "react";

const trackedSectionIds = [
  "accueil",
  "competences",
  "epreuves",
  "experiences",
  "projets",
  "certifications",
  "veille",
  "faq",
] as const;

export function HomeScrollAnchor() {
  useEffect(() => {
    const sections = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;
    let initialFrame = 0;
    let initialTimer = 0;
    let settleFrame = 0;
    let trackingReady = false;

    const cancelPendingAlignment = () => {
      if (initialTimer !== 0) {
        window.clearTimeout(initialTimer);
        initialTimer = 0;
      }

      if (initialFrame !== 0) {
        window.cancelAnimationFrame(initialFrame);
        initialFrame = 0;
      }

      if (settleFrame !== 0) {
        window.cancelAnimationFrame(settleFrame);
        settleFrame = 0;
      }
    };

    const updateAnchor = () => {
      animationFrame = 0;

      if (window.location.pathname !== "/") {
        return;
      }

      const activationLine = Math.min(window.innerHeight * 0.32, 320);
      const reachedPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let activeSection = sections[0];

      if (reachedPageEnd) {
        activeSection = sections.at(-1) ?? activeSection;
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) {
            activeSection = section;
          } else {
            break;
          }
        }
      }

      const nextHash = `#${activeSection.id}`;

      if (window.location.hash !== nextHash) {
        window.history.replaceState(window.history.state, "", nextHash);
      }
    };

    const scheduleAnchorUpdate = () => {
      if (trackingReady && animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateAnchor);
      }
    };

    const requestedSection = sections.find(
      (section) => section.id === window.location.hash.slice(1),
    );

    const alignSection = (section: HTMLElement) => {
      trackingReady = false;
      cancelPendingAlignment();

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      initialTimer = window.setTimeout(() => {
        initialFrame = window.requestAnimationFrame(() => {
          section.scrollIntoView({ block: "start", behavior: "instant" });
          settleFrame = window.requestAnimationFrame(() => {
            trackingReady = true;
            scheduleAnchorUpdate();
          });
        });
      }, 0);
    };

    const alignRequestedSection = () => {
      if (requestedSection) {
        alignSection(requestedSection);
      }
    };

    const handleHashChange = () => {
      const hashSection = sections.find(
        (section) => section.id === window.location.hash.slice(1),
      );

      if (hashSection) {
        alignSection(hashSection);
      }
    };

    if (requestedSection) {
      if (document.readyState === "complete") {
        alignRequestedSection();
      } else {
        window.addEventListener("load", alignRequestedSection, { once: true });
      }
    } else {
      trackingReady = true;
      scheduleAnchorUpdate();
    }

    window.addEventListener("scroll", scheduleAnchorUpdate, { passive: true });
    window.addEventListener("resize", scheduleAnchorUpdate);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", scheduleAnchorUpdate);
      window.removeEventListener("resize", scheduleAnchorUpdate);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", alignRequestedSection);
      cancelPendingAlignment();

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
