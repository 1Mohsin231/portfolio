"use client";

import { useEffect, useState, useCallback } from "react";
import { sound } from "../utils/audio";
import { useInspector } from "../context/InspectorContext";

export function useKeyboardShortcuts() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { toggleInspector, setSelectedMeta } = useInspector();

  const openHelp = useCallback(() => {
    sound.playClick();
    setIsHelpOpen(true);
  }, []);

  const closeHelp = useCallback(() => {
    sound.playClick();
    setIsHelpOpen(false);
  }, []);

  const toggleHelp = useCallback(() => {
    sound.playClick();
    setIsHelpOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // 'T' -> Scroll to Terminal & focus
      if (key === "t" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        sound.playClick();
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          const headerOffset = 84;
          const pos = contactEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: pos, behavior: "smooth" });
          // Focus terminal input after smooth scroll
          setTimeout(() => {
            const input = contactEl.querySelector("input");
            input?.focus();
          }, 350);
        }
        return;
      }

      // 'S' -> Scroll to Traffic Surge Simulator
      if (key === "s" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        sound.playClick();
        const simEl = document.getElementById("simulator");
        if (simEl) {
          const headerOffset = 84;
          const pos = simEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: pos, behavior: "smooth" });
        }
        return;
      }

      // 'I' -> Toggle Component Inspector Mode
      if (key === "i" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        toggleInspector();
        return;
      }

      // '?' or '/' (Shift + /) -> Toggle Keyboard Shortcuts Cheat-sheet
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        toggleHelp();
        return;
      }

      // 'Escape' -> Close active modals
      if (e.key === "Escape") {
        setIsHelpOpen(false);
        setSelectedMeta(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleHelp, setSelectedMeta]);

  return {
    isHelpOpen,
    openHelp,
    closeHelp,
    toggleHelp,
  };
}

