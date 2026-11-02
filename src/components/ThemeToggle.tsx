"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { sound } from "../utils/audio";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      const prefersDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    sound.playClick();
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.add("theme-transition");
      setIsDark((prev) => !prev);
      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 400);
    } else {
      setIsDark((prev) => !prev);
    }
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center opacity-70"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => sound.playHover()}
      className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:scale-110 transition-all border border-zinc-300 dark:border-zinc-700 flex items-center justify-center cursor-pointer shadow-sm"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
    </button>
  );
}
