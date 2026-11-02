"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook that monitors currently visible sections using IntersectionObserver
 * and returns the active section ID for scrollspy navigation.
 */
export function useScrollSpy(sectionIds: string[], fallbackId = "about"): string {
  const [activeId, setActiveId] = useState<string>(fallbackId);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    // Use IntersectionObserver with a targeted rootMargin focused on the viewport center
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Fallback: Check scroll position at very top of page
    const handleScrollTop = () => {
      if (window.scrollY < 120) {
        setActiveId(sectionIds[0] || fallbackId);
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [sectionIds, fallbackId]);

  return activeId;
}

