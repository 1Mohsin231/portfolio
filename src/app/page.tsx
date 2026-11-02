"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SkillsMatrix from "../components/SkillsMatrix";
import CaseStudies from "../components/CaseStudies";
import ExperienceVault from "../components/ExperienceVault";
import ParticleCanvas from "../components/ParticleCanvas";
import InteractiveGridBackground from "../components/InteractiveGridBackground";
import DevDeck from "../components/DevDeck";
import Inspectable from "../components/Inspectable";
import InspectorOverlay from "../components/InspectorOverlay";
import ShortcutsModal from "../components/ShortcutsModal";
import { InspectorProvider } from "../context/InspectorContext";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { SimulatorSkeleton, TerminalSkeleton } from "../components/skeletons/ComponentSkeletons";

// Next.js App Router Performance: Dynamic Imports with Zero-Layout-Shift Fallbacks
const ArchitectureLab = dynamic(() => import("../components/ArchitectureLab"), {
  ssr: false,
  loading: () => <SimulatorSkeleton />,
});

const TerminalContact = dynamic(() => import("../components/TerminalContact"), {
  ssr: false,
  loading: () => <TerminalSkeleton />,
});

function PortfolioContent() {
  const { isHelpOpen, closeHelp } = useKeyboardShortcuts();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-slate-950 font-sans transition-colors duration-300 relative overflow-x-hidden">
      {/* Component Inspector Floating Banner & Slide-out Audit Drawer */}
      <InspectorOverlay />

      {/* Global Keyboard Shortcuts Cheat-Sheet Modal */}
      <ShortcutsModal isOpen={isHelpOpen} onClose={closeHelp} />

      {/* Dynamic Cursor Spotlight on Tech Grid */}
      <InteractiveGridBackground />

      {/* Living Interactive Canvas Particles */}
      <ParticleCanvas />

      {/* Floating HUD Dev Deck Controls */}
      <DevDeck />

      {/* Primary Sci-Fi Cockpit Navigation */}
      <Navbar />

      <main className="relative z-10">
        <section id="about">
          <Inspectable
            id="hero"
            name="Hero"
            propsSummary="status='L5' | ping='18ms' | audio=enabled"
            renderTiming="0.4ms (Client Hydrated)"
            architectureNotes="Tactile 3D spring tilt physics profile card, real-time cipher scrambler role pill, and cursor spotlight sheen with zero external asset dependencies."
            techStack={["React 19", "Framer Motion", "Web Audio API", "Tailwind CSS"]}
          >
            <Hero />
          </Inspectable>
        </section>

        <section id="simulator">
          <Inspectable
            id="simulator"
            name="ArchitectureLab"
            propsSummary="traffic={25000} | mode='optimized' | latency='22ms'"
            renderTiming="0.6ms (Client Dynamic)"
            architectureNotes="Dynamic traffic surge simulator benchmarking decoupled MERN microservices vs legacy monolith architectures. Features procedural slider micro-haptics."
            techStack={["React 19", "Web Audio API", "Dynamic SSR: false", "Tailwind CSS"]}
          >
            <ArchitectureLab />
          </Inspectable>
        </section>

        <section id="skills">
          <Inspectable
            id="skills"
            name="SkillsMatrix"
            propsSummary="activeCategory='all' | totalCompetencies=28"
            renderTiming="0.5ms (Client Hydrated)"
            architectureNotes="Two-tier Developer Skill Matrix featuring 4-card Bento Grid core pillars, Framer Motion active tab sliding indicator, and live search with ⌘K hotkey listener."
            techStack={["React 19", "Framer Motion", "Lucide Icons", "Tailwind CSS"]}
          >
            <SkillsMatrix />
          </Inspectable>
        </section>

        <section id="projects">
          <Inspectable
            id="projects"
            name="CaseStudies"
            propsSummary="caseCount=3 | viewport='desktop' | modal=enabled"
            renderTiming="0.8ms (Client Hydrated)"
            architectureNotes="Interactive mission files featuring device viewport morphing (Desktop/Mobile), sub-navigation crossfades, Web Audio equalizer, webhook simulator, and vernacular AI chat widget."
            techStack={["React 19", "Framer Motion", "Web Audio API", "SVG Morphing"]}
          >
            <CaseStudies />
          </Inspectable>
        </section>

        <section id="experience">
          <Inspectable
            id="experience"
            name="ExperienceVault"
            propsSummary="roles=3 | metrics='10x scale, -40% latency'"
            renderTiming="0.4ms (Static Hydrated)"
            architectureNotes="Enterprise career timeline dossier detailing Senior Frontend & Full-Stack engineering wins with verified deliverables."
            techStack={["React 19", "Tailwind CSS", "Semantic HTML5"]}
          >
            <ExperienceVault />
          </Inspectable>
        </section>

        <section id="contact">
          <Inspectable
            id="terminal"
            name="TerminalContact"
            propsSummary="bash='5.2' | clearance='L5' | game=active"
            renderTiming="0.7ms (Client Dynamic)"
            architectureNotes="Interactive Unix terminal shell with command auto-typing, full-stack cyber trivia mini-game, VIP hire easter egg with canvas confetti burst, and mechanical keyclicks."
            techStack={["React 19", "HTML5 Canvas", "Web Audio API", "Dynamic SSR: false"]}
          >
            <TerminalContact />
          </Inspectable>
        </section>
      </main>

      <footer className="relative z-10 py-12 border-t border-black/10 dark:border-white/10 bg-white/50 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          
          {/* Status Branding */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-neutral-300 font-semibold tracking-wider uppercase">
              MOHSIN BABA / ENTERPRISE PORTFOLIO
            </span>
            <span className="hidden sm:inline-block text-slate-400 dark:text-neutral-600">|</span>
            <span className="hidden sm:inline-block text-slate-500 dark:text-neutral-500">
              ALL SYSTEMS NOMINAL
            </span>
          </div>

          {/* Quick Coordinates & Direct Dossier Download */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-neutral-400">
            <a 
              href="mailto:1mohsinbaba@gmail.com" 
              className="hover:text-emerald-500 transition-colors"
            >
              1mohsinbaba@gmail.com
            </a>
            <a 
              href="tel:+916360463695" 
              className="hover:text-emerald-500 transition-colors"
            >
              +91 63604 63695
            </a>
            <a
              href="/resume/frontend_cv_mohsin.docx"
              download="frontend_cv_mohsin.docx"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Resume (DOCX)</span>
              <span>⇩</span>
            </a>
            <button 
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              ↑ Top
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-6 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400 dark:text-neutral-500">
          <span>© 2026 Mohsin Baba. Designed for high performance.</span>
          <span>Framework: Next.js 16 (App Router) • React 19 • Tailwind CSS • Web Audio API</span>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <InspectorProvider>
      <PortfolioContent />
    </InspectorProvider>
  );
}
