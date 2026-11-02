"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Download, ArrowRight, Activity, Terminal, Sparkles } from "lucide-react";
import { sound } from "../utils/audio";
import ProfileTiltCard from "./ProfileTiltCard";

const ROLES = [
  "SENIOR FRONTEND & REACT ARCHITECT",
  "FULL-STACK MERN & NEXT.JS SPECIALIST",
  "PERFORMANCE & DESIGN SYSTEMS ENGINEER",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [clientPing, setClientPing] = useState(18);
  const [networkType, setNetworkType] = useState<string>("5G");

  // Client-side telemetry & network inspection
  useEffect(() => {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      if (conn?.effectiveType) {
        setNetworkType(conn.effectiveType.toUpperCase());
      }
    }
  }, []);

  // Smooth Role Carousel Cycling (Slide-up + Fade)
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // Ping jitter simulator
  useEffect(() => {
    const pingInt = setInterval(() => {
      setClientPing(Math.floor(Math.random() * 8) + 16);
    }, 2500);
    return () => clearInterval(pingInt);
  }, []);

  // Mouse radial light tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText("1mohsinbaba@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sound.playSuccess();
    navigator.clipboard.writeText("+916360463695");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    sound.playClick();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const metrics = [
    { label: "Engineering Exp.", value: "3+ Yrs", detail: "MERN & React Ecosystem" },
    { label: "Surge Handled", value: "10×", detail: "Traffic Scalability" },
    { label: "Core Web Vitals", value: "99/100", detail: "Sub-Second FCP & LCP" },
    { label: "Production SLA", value: "99.9%", detail: "High Availability" },
  ];

  const techBadges = [
    "TypeScript", "React 19", "Next.js 16", "Node.js", "React Native", "Redux Toolkit", "MongoDB", "Cosmos DB", "Azure Blob", "Razorpay", "Tailwind CSS"
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-24 w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 selection:bg-emerald-500/30 group transition-colors duration-300 bg-grid-pattern"
    >
      {/* Dynamic Cursor Reactive Ambient Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.09), transparent 45%)`
        }}
      />
      
      {/* Background ambient lighting blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-900/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-indigo-900/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen" />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">
        
        {/* Telemetry Cockpit Top Status Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 text-[11px] font-mono">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>STATUS: CLEARANCE L5 • READY FOR HIRE</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-slate-600 dark:text-neutral-400">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>PING: {clientPing}ms ({networkType})</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-slate-600 dark:text-neutral-400">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>GATEWAY: HYDERABAD, IN</span>
          </div>
        </div>

        {/* Tactile 3D Interactive Profile Tilt Card with Spotlight & Cyberpunk HUD */}
        <ProfileTiltCard
          imageSrc="/profile/mohsinDP.jfif"
          altText="Mohsin Baba"
          className="mb-6"
        />

        {/* Smooth Role Carousel Pill Badge */}
        <div className="h-10 flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.12)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <div className="relative overflow-hidden h-5 flex items-center min-w-[280px] sm:min-w-[340px] justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-mono text-xs sm:text-sm uppercase font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-neutral-50 dark:via-neutral-200 dark:to-neutral-500 drop-shadow-sm">
          MOHSIN BABA
        </h1>
        
        {/* Bio Copy Tuning */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-neutral-300 max-w-3xl leading-relaxed tracking-normal mb-7 font-normal">
          Senior Frontend & Full-Stack Engineer with 3+ years architecting high-performance web applications. 
          Specialized in modern <span className="text-slate-900 dark:text-white font-semibold">Next.js/React ecosystems</span>, 
          sub-second <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">Core Web Vitals</span>, 
          and resilient <span className="text-slate-900 dark:text-white font-semibold">MERN systems</span> that scale effortlessly.
        </p>

        {/* Contact Pill Badges with Audio Click-To-Copy */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs font-mono">
          <button 
            onClick={copyEmail}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-700 dark:text-neutral-300 transition-all cursor-pointer shadow-sm group/btn"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-emerald-500 transition-colors" />}
            <span>1mohsinbaba@gmail.com</span>
            {copiedEmail && <span className="text-[10px] text-emerald-500 font-sans font-bold">Copied!</span>}
          </button>

          <button 
            onClick={copyPhone}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-700 dark:text-neutral-300 transition-all cursor-pointer shadow-sm group/btn"
          >
            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-emerald-500 transition-colors" />}
            <span>+91 63604 63695</span>
            {copiedPhone && <span className="text-[10px] text-emerald-500 font-sans font-bold">Copied!</span>}
          </button>
        </div>
        
        {/* Polished CTA Button Row (2-Action Primary Group + 1 Secondary Link) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          {/* Primary CTA */}
          <a
            href="#simulator"
            onMouseEnter={() => sound.playHover()}
            onClick={(e) => handleScrollTo(e, "simulator")}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold tracking-wide hover:from-emerald-400 hover:to-teal-300 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Explore Interactive Labs</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="/resume/frontend_cv_mohsin.docx" 
            download="frontend_cv_mohsin.docx"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSuccess()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent border border-slate-300 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-400 text-slate-800 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </a>

          {/* Tertiary Link */}
          <a
            href="#projects"
            onMouseEnter={() => sound.playHover()}
            onClick={(e) => handleScrollTo(e, "projects")}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 px-3"
          >
            <span>View Mission Studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Enterprise Key Highlights / Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-black/10 dark:border-white/10 mb-8">
          {metrics.map((item, idx) => (
            <div 
              key={idx} 
              onMouseEnter={() => sound.playHover()}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-sm hover:border-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <span className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">
                {item.value}
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                {item.label}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-500">
                {item.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Marquee Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl opacity-80">
          {techBadges.map((tech) => (
            <span
              key={tech}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1 text-xs font-mono tracking-wider bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-md text-slate-600 dark:text-neutral-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
