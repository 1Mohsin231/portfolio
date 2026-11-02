"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Download, Menu, X, ArrowUpRight, Volume2, VolumeX, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { sound, useSoundFx } from "../utils/audio";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useInspector } from "../context/InspectorContext";
import { useMounted } from "../hooks/useMounted";

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "simulator", label: "Simulator", href: "#simulator" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Terminal", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled: soundOn, toggleSound } = useSoundFx();
  const { isInspectorActive, toggleInspector } = useInspector();
  const [timeStr, setTimeStr] = useState("");
  const isMounted = useMounted();

  const activeSection = useScrollSpy(SECTION_IDS, "about");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false });
      setTimeStr(`${ist} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Prevent browser from restoring scroll to bottom on page reload
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll with header offset to avoid content clipping
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sound.playClick();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // Do not push '#contact' or hashes to window.history.
      // Keeping the URL address bar clean ensures that any page reload always stays at the top.
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

          {/* Logo & Operational Telemetry */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => scrollToSection(e, "#about")}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
                <img src="/favicon.svg" alt="Mohsin Baba Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black tracking-widest text-slate-900 dark:text-neutral-50 uppercase group-hover:text-emerald-500 transition-colors">
                MB<span className="text-emerald-500">.</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                PROD.v3
              </span>
            </a>

            {/* Live UTC/IST Clock Telemetry */}
            {isMounted && timeStr && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span suppressHydrationWarning>{timeStr}</span>
              </div>
            )}
          </div>

          {/* Desktop Nav Links with Sliding Active Pill Indicator */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs font-mono tracking-widest uppercase">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 select-none ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}

            <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-1" />

            <a
              href="/resume/frontend_cv_mohsin.docx"
              download="frontend_cv_mohsin.docx"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSuccess()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Audio SFX Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full text-slate-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={soundOn ? "Mute sound FX" : "Unmute sound FX"}
              aria-label="Toggle sound FX"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* DevTools Component Inspector Toggle */}
            <button
              onClick={toggleInspector}
              className={`p-2 rounded-full transition-all cursor-pointer relative group flex items-center justify-center ${
                isInspectorActive
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "text-slate-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              title={isInspectorActive ? "Disable Inspector Mode [I]" : "Enable Inspector Mode [I]"}
              aria-label="Toggle Component Inspector mode"
            >
              <Search className={`w-4 h-4 ${isInspectorActive ? "text-emerald-500 animate-pulse" : ""}`} />
              <span className="hidden xl:inline-block ml-1.5 text-[10px] font-mono font-bold tracking-tight uppercase">
                {isInspectorActive ? "Active" : "Inspect [I]"}
              </span>
            </button>

            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              onMouseEnter={() => sound.playHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs tracking-wider uppercase font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-slate-950 transition-all shadow-sm"
            >
              <span>Initialize</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Subtle 2px Spring-Loaded Scroll Progress Bar at the bottom edge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 p-6 md:hidden shadow-2xl flex flex-col gap-4 font-mono text-sm uppercase"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-neutral-500">{isActive ? "●" : "→"}</span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
              <a
                href="/resume/frontend_cv_mohsin.docx"
                download="frontend_cv_mohsin.docx"
                onClick={() => sound.playSuccess()}
                className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2 font-semibold text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (DOCX)</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-center font-bold tracking-wider"
              >
                Launch Terminal Shell
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
