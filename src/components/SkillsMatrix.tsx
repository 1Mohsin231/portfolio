"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Code2, 
  Database, 
  Wrench, 
  Cpu, 
  Layers, 
  Globe, 
  Server, 
  Workflow, 
  ShieldCheck, 
  Terminal, 
  Cloud, 
  Boxes, 
  FileCode, 
  Braces, 
  CheckCircle2, 
  Zap, 
  X,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { sound } from "../utils/audio";

export type SkillCategory = 
  | "all"
  | "frontend"
  | "state-data"
  | "backend"
  | "devops-cloud";

export interface CoreStackItem {
  id: string;
  name: string;
  subtitle: string;
  iconSrc?: string;
  iconFallback?: React.ComponentType<{ className?: string }>;
  badge: string;
  metrics: string;
  bullets: string[];
  glowColor: string;
}

export interface ExtendedSkill {
  id: string;
  name: string;
  category: "frontend" | "state-data" | "backend" | "devops-cloud";
  level: "Expert" | "Advanced";
  iconSrc?: string;
  iconComponent?: React.ComponentType<{ className?: string }>;
  appliedIn: string;
  tagline: string;
}

// Tier 1: Primary Core Stack (Bento Grid)
const coreStack: CoreStackItem[] = [
  {
    id: "nextjs",
    name: "Next.js (App Router / SSR)",
    subtitle: "Production SSR, Streaming & Edge Runtime",
    iconSrc: "/tech/nextjs.svg",
    badge: "Core Architecture",
    metrics: "Sub-Second LCP",
    bullets: [
      "App Router, Server Components & Route Handlers",
      "Streaming SSR with React Suspense boundaries",
      "Edge caching, ISR & predictive route prefetching",
    ],
    glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "react-ts",
    name: "React 19 / TypeScript",
    subtitle: "Fiber Concurrency & Strict Generics",
    iconSrc: "/tech/react.svg",
    badge: "Core Architecture",
    metrics: "100% Type-Safe",
    bullets: [
      "Concurrent Mode, Action Hooks & optimistic UI updates",
      "Strict nominal typing, complex generics & DX safety",
      "Custom hook pipelines eliminating re-render cascades",
    ],
    glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "state-arch",
    name: "Modern State Architecture",
    subtitle: "Redux Toolkit, RTK Query & Zustand",
    iconSrc: "/tech/redux.svg",
    badge: "Core Architecture",
    metrics: "Normalized Cache",
    bullets: [
      "RTK Query automated cache invalidation & polling",
      "Normalized entity state with memoized Reselect selectors",
      "Zustand atomic stores for transient high-frequency UI",
    ],
    glowColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "tailwind-motion",
    name: "Tailwind CSS / UI Motion",
    subtitle: "Design Systems & 60fps Spring Physics",
    iconSrc: "/tech/tailwind.svg",
    badge: "Core Architecture",
    metrics: "Smooth 60 FPS",
    bullets: [
      "Design token architecture with dynamic dark/light palettes",
      "Framer Motion hardware-accelerated 3D spring transforms",
      "Accessible WCAG standards & responsive container layouts",
    ],
    glowColor: "from-emerald-500/20 via-cyan-500/10 to-transparent",
  },
];

// Tier 2: Extended Tech Matrix
const extendedSkills: ExtendedSkill[] = [
  // Frontend & UI Engineering
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: "Expert",
    iconSrc: "/tech/typescript.svg",
    appliedIn: "Dialogue Dubs, Jaavapot, Portfolio",
    tagline: "Strict generic typings, DX safety & interface contracts",
  },
  {
    id: "react",
    name: "React.js (Fiber)",
    category: "frontend",
    level: "Expert",
    iconSrc: "/tech/react.svg",
    appliedIn: "Dialogue Dubs, Admin Workbench",
    tagline: "Component architecture, hooks & fiber performance",
  },
  {
    id: "nextjs-ext",
    name: "Next.js 16",
    category: "frontend",
    level: "Expert",
    iconSrc: "/tech/nextjs.svg",
    appliedIn: "Enterprise Portals & Client Apps",
    tagline: "App Router, SSR, SSG & edge runtime optimization",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "frontend",
    level: "Advanced",
    iconSrc: "/tech/react.svg",
    appliedIn: "Jaavapot Shopper App (iOS/Android)",
    tagline: "Cross-platform mobile apps with offline cache",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: "Expert",
    iconSrc: "/tech/tailwind.svg",
    appliedIn: "Production Web Portals",
    tagline: "Utility design systems, dynamic tokens & JIT engine",
  },
  {
    id: "javascript-es6",
    name: "JavaScript (ES6+)",
    category: "frontend",
    level: "Expert",
    iconComponent: Code2,
    appliedIn: "Core Web & Asynchronous Services",
    tagline: "Async runtime, event loop, closures & web APIs",
  },
  {
    id: "html5-css3",
    name: "HTML5 & CSS3",
    category: "frontend",
    level: "Expert",
    iconComponent: Braces,
    appliedIn: "All Web Interfaces",
    tagline: "Semantic structure, responsive Grid/Flexbox & CSS variables",
  },
  {
    id: "mui-bootstrap",
    name: "Bootstrap & MUI",
    category: "frontend",
    level: "Advanced",
    iconComponent: Layers,
    appliedIn: "Enterprise Admin Consoles",
    tagline: "Rapid accessible UI component kits & theme overrides",
  },
  {
    id: "web-audio-canvas",
    name: "Web Audio & Canvas",
    category: "frontend",
    level: "Advanced",
    iconComponent: Sparkles,
    appliedIn: "Portfolio Interactive Audio & Hero",
    tagline: "Synthesized audio feedback & GPU particle simulations",
  },

  // State & Data Fetching
  {
    id: "redux-toolkit",
    name: "Redux Toolkit",
    category: "state-data",
    level: "Expert",
    iconSrc: "/tech/redux.svg",
    appliedIn: "Dialogue Dubs, Jaavapot",
    tagline: "Predictable central store, slices & middleware",
  },
  {
    id: "rtk-query",
    name: "RTK Query",
    category: "state-data",
    level: "Expert",
    iconComponent: Workflow,
    appliedIn: "High-Traffic Commerce APIs",
    tagline: "Automatic caching, optimistic mutations & polling",
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "state-data",
    level: "Advanced",
    iconComponent: Boxes,
    appliedIn: "Interactive Simulator Lab",
    tagline: "Atomic transient stores & zero-boilerplate state",
  },
  {
    id: "context-api",
    name: "React Context API",
    category: "state-data",
    level: "Expert",
    iconComponent: Cpu,
    appliedIn: "Theme & Auth Infrastructure",
    tagline: "Scoped lightweight state without prop drilling",
  },
  {
    id: "axios",
    name: "Axios Interceptors",
    category: "state-data",
    level: "Expert",
    iconComponent: Globe,
    appliedIn: "JWT Refresh Handlers & API Clients",
    tagline: "Automated retry policies & token rotation wrappers",
  },
  {
    id: "tanstack-query",
    name: "TanStack Query",
    category: "state-data",
    level: "Advanced",
    iconComponent: Database,
    appliedIn: "Data-Heavy Real-time Views",
    tagline: "Background revalidation & window-focus hydration",
  },

  // Backend & APIs
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: "Expert",
    iconSrc: "/tech/nodejs.svg",
    appliedIn: "Dialogue Dubs, MSME Engine",
    tagline: "Event-driven asynchronous microservice runtimes",
  },
  {
    id: "expressjs",
    name: "Express.js",
    category: "backend",
    level: "Expert",
    iconComponent: Server,
    appliedIn: "Jaavapot Microservices",
    tagline: "Middleware chains, RESTful pipelines & validation",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    level: "Expert",
    iconSrc: "/tech/mongodb.svg",
    appliedIn: "Jaavapot Commerce Store",
    tagline: "NoSQL schema modeling, indexing & aggregations",
  },
  {
    id: "cosmos-db",
    name: "Azure Cosmos DB",
    category: "backend",
    level: "Advanced",
    iconSrc: "/tech/mongodb.svg",
    appliedIn: "Dialogue Dubs Platform",
    tagline: "Globally distributed multi-model NoSQL storage",
  },
  {
    id: "rest-apis",
    name: "RESTful Architecture",
    category: "backend",
    level: "Expert",
    iconComponent: Workflow,
    appliedIn: "All Microservice Endpoints",
    tagline: "Stateless contract design, status codes & pagination",
  },
  {
    id: "graphql",
    name: "GraphQL APIs",
    category: "backend",
    level: "Advanced",
    iconComponent: Braces,
    appliedIn: "Federated Query Pipelines",
    tagline: "Declarative schema design, queries & type resolvers",
  },
  {
    id: "jwt-rbac",
    name: "JWT & RBAC Security",
    category: "backend",
    level: "Expert",
    iconComponent: ShieldCheck,
    appliedIn: "Enterprise 3-Tier Auth Systems",
    tagline: "Cryptographic tokens, rotating refresh & role guards",
  },
  {
    id: "sql-server",
    name: "SQL Server",
    category: "backend",
    level: "Advanced",
    iconComponent: Database,
    appliedIn: "Relational Ledger Systems",
    tagline: "ACID transactions, relational schemas & stored queries",
  },

  // DevOps & Cloud
  {
    id: "azure-services",
    name: "Azure App Service & Blob",
    category: "devops-cloud",
    level: "Advanced",
    iconSrc: "/tech/azure.svg",
    appliedIn: "Dialogue Dubs Video Pipeline",
    tagline: "Direct media streaming & auto-scaling cloud apps",
  },
  {
    id: "digitalocean",
    name: "DigitalOcean Droplets",
    category: "devops-cloud",
    level: "Advanced",
    iconComponent: Cloud,
    appliedIn: "Jaavapot Production Host",
    tagline: "Droplets configuration, Nginx reverse proxy & PM2",
  },
  {
    id: "docker",
    name: "Docker Containers",
    category: "devops-cloud",
    level: "Advanced",
    iconComponent: Boxes,
    appliedIn: "Microservice Deployments",
    tagline: "Multi-stage builds, isolated runtimes & compose specs",
  },
  {
    id: "github-actions",
    name: "GitHub Actions CI/CD",
    category: "devops-cloud",
    level: "Advanced",
    iconComponent: Terminal,
    appliedIn: "Automated Deployment Workflows",
    tagline: "Continuous integration, lint checks & zero-loss deploy",
  },
  {
    id: "git-version",
    name: "Git & Version Control",
    category: "devops-cloud",
    level: "Expert",
    iconComponent: FileCode,
    appliedIn: "All Git Repositories",
    tagline: "Trunk-based workflows, interactive rebasing & PR reviews",
  },
  {
    id: "razorpay",
    name: "Razorpay Payment Engine",
    category: "devops-cloud",
    level: "Advanced",
    iconComponent: Zap,
    appliedIn: "Jaavapot Commerce Store",
    tagline: "Orders, cryptographic signature verification & webhooks",
  },
  {
    id: "jest-testing",
    name: "Jest & React Testing",
    category: "devops-cloud",
    level: "Advanced",
    iconComponent: CheckCircle2,
    appliedIn: "Frontend Test Coverage",
    tagline: "Unit test suites, mock runners & assertion coverage",
  },
  {
    id: "postman",
    name: "Postman & Thunder Client",
    category: "devops-cloud",
    level: "Expert",
    iconComponent: Terminal,
    appliedIn: "API Contract Testing",
    tagline: "Automated test collections & environment variables",
  },
  {
    id: "jira-confluence",
    name: "Jira & Confluence",
    category: "devops-cloud",
    level: "Expert",
    iconComponent: Layers,
    appliedIn: "Agile Sprint Workflows",
    tagline: "Sprint management, backlog refinement & tech docs",
  },
];

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global hotkey support for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        sound.playClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { id: "all", label: "All", icon: Sparkles },
    { id: "frontend", label: "Frontend & UI Engineering", icon: Code2 },
    { id: "state-data", label: "State & Data Fetching", icon: Workflow },
    { id: "backend", label: "Backend & APIs", icon: Database },
    { id: "devops-cloud", label: "DevOps & Cloud", icon: Wrench },
  ] as const;

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return extendedSkills.filter((skill) => {
      const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
      const matchesSearch =
        query === "" ||
        skill.name.toLowerCase().includes(query) ||
        skill.tagline.toLowerCase().includes(query) ||
        skill.appliedIn.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="skills"
      className="min-h-screen w-full bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 py-28 px-4 sm:px-6 md:px-12 flex flex-col items-center overflow-hidden transition-colors duration-300 relative bg-dot-pattern"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-emerald-500/20 dark:bg-emerald-900/30 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full">
        
        {/* Section Header */}
        <header className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase mb-3 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Developer Skill Matrix</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-neutral-100 dark:to-neutral-500 uppercase mb-4">
            Engineering Capabilities
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Architected for high throughput, sub-second latency, and deterministic state. Divided into primary architectural pillars and an extended production-proven tech matrix.
          </p>
        </header>

        {/* TIER A: Primary Core Stack (Bento Grid) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Tier 1 : Primary Core Stack</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Enterprise Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreStack.map((card) => (
              <div
                key={card.id}
                onMouseEnter={() => sound.playHover()}
                className="group relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-black/10 dark:border-emerald-500/25 backdrop-blur-xl shadow-lg hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.25)] hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Dynamic Subtle Ambient Gradient Glare */}
                <div 
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${card.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Top Header: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center p-2.5 shadow-inner group-hover:scale-105 transition-transform">
                      {card.iconSrc ? (
                        <img src={card.iconSrc} alt={card.name} className="w-7 h-7 object-contain" />
                      ) : (
                        card.iconFallback && <card.iconFallback className="w-6 h-6 text-emerald-400" />
                      )}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-neutral-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {card.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-neutral-400 mb-4 font-medium">
                    {card.subtitle}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 mb-4">
                    {card.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-300 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Metric Pill */}
                <div className="relative z-10 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                  <span>Benchmark</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    <span>{card.metrics}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TIER B: Extended Tech Matrix */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Tier 2 : Extended Tech Matrix</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
              Interactive Filter & Search
            </span>
          </div>

          {/* Controls: Search and Filter Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
            
            {/* Category Animated Pill Tabs */}
            <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 overflow-x-auto scrollbar-none shadow-sm">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer select-none whitespace-nowrap ${
                      isActive 
                        ? "text-emerald-600 dark:text-emerald-400 font-bold" 
                        : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillTab"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-500" : ""}`} />
                      <span>{cat.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input with Cmd+K Badge */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tech stack or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-black/10 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/50 shadow-sm transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-neutral-400 border border-black/5 dark:border-white/10 pointer-events-none">
                  ⌘K
                </span>
              )}
            </div>
          </div>

          {/* Status Counter Bar */}
          <div className="flex items-center justify-between w-full mb-6 px-1 text-xs font-mono text-slate-500 dark:text-neutral-400">
            <span>
              Displaying <strong className="text-emerald-600 dark:text-emerald-400">{filteredSkills.length}</strong> of {extendedSkills.length} verified technologies
            </span>
            {(searchQuery || selectedCategory !== "all") && (
              <button 
                onClick={() => {
                  sound.playClick();
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Compact & Tactile Skill Chips Grid with Stagger Transitions */}
          {filteredSkills.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-dashed border-black/15 dark:border-white/10">
              <p className="text-sm font-mono text-slate-500 dark:text-neutral-400 mb-2">
                No matching technologies found for &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-bold"
              >
                Clear search and view all
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onMouseEnter={() => sound.playHover()}
                    className="group relative p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 backdrop-blur-md shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-0.5 cursor-default flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Icon + Name + Level */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 shrink-0 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 flex items-center justify-center p-1 group-hover:border-emerald-500/30 transition-colors">
                            {skill.iconSrc ? (
                              <img src={skill.iconSrc} alt={skill.name} className="w-4 h-4 object-contain" />
                            ) : (
                              skill.iconComponent && <skill.iconComponent className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-neutral-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold tracking-wider ${
                          skill.level === "Expert" 
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                        }`}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Tagline / Architectural Capability */}
                      <p className="text-[11px] text-slate-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2.5 font-sans">
                        {skill.tagline}
                      </p>
                    </div>

                    {/* Bottom Applied-In Sub-Label */}
                    <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                      <span className="truncate pr-1">
                        <span className="text-slate-400 dark:text-neutral-500">Used:</span> {skill.appliedIn}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
