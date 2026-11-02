"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Volume2, 
  VolumeX, 
  Sliders, 
  Zap, 
  Monitor, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Activity, 
  Layers, 
  Palette,
  Search,
  X
} from "lucide-react";
import { useSoundFx } from "../utils/audio";
import { useInspector } from "../context/InspectorContext";

export type AccentColor = "emerald" | "cyan" | "violet";

export default function DevDeck() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [domCount, setDomCount] = useState(0);
  const [scanlines, setScanlines] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [accent, setAccent] = useState<AccentColor>("emerald");

  const { soundEnabled, toggleSound, playHover, playClick, playFanfare, playLaser } = useSoundFx();
  const { isInspectorActive, toggleInspector } = useInspector();

  // Real-time FPS Monitor using requestAnimationFrame
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFPS = (now: number) => {
      frameCount++;
      const delta = now - lastTime;
      if (delta >= 600) {
        setFps(Math.min(120, Math.round((frameCount * 1000) / delta)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFPS);
    };

    animId = requestAnimationFrame(calcFPS);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Monitor DOM Nodes count
  useEffect(() => {
    if (typeof document !== "undefined") {
      setDomCount(document.getElementsByTagName("*").length);
    }
  }, [isOpen]);

  const handleAccentChange = (color: AccentColor) => {
    playClick();
    setAccent(color);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.accent = color;
    }
  };

  const toggleScanlines = () => {
    playClick();
    const next = !scanlines;
    setScanlines(next);
    const body = document.body;
    if (next) {
      body.classList.add("crt-scanlines");
    } else {
      body.classList.remove("crt-scanlines");
    }
  };

  const toggleMatrix = () => {
    playLaser();
    const next = !matrixMode;
    setMatrixMode(next);
    const root = document.documentElement;
    if (next) {
      root.classList.add("matrix-theme");
    } else {
      root.classList.remove("matrix-theme");
    }
  };

  const boostProtocol = () => {
    playFanfare();
    const notification = document.createElement("div");
    notification.innerText = "🚀 TURBO COMPUTE ENGAGED: SUB-SECOND CORE WEB VITALS (99/100)";
    notification.className = 
      "fixed bottom-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-mono text-xs font-bold shadow-2xl animate-bounce border border-emerald-300";
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-mono">
      {/* Expanded Deck Controls with Smooth Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="mb-3 p-4 md:p-5 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-neutral-200 flex flex-col gap-4 min-w-[280px] max-w-[320px] select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] tracking-widest uppercase text-emerald-400 font-bold">
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>HUD DEV DECK</span>
              </span>
              <button
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Metrics: FPS & DOM Nodes */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span>Display FPS</span>
                </span>
                <span className="text-base font-bold text-white flex items-center gap-1">
                  <span>{fps}</span>
                  <span className="text-[10px] text-emerald-400 font-normal">FPS</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <Layers className="w-3 h-3 text-emerald-400" />
                  <span>DOM Nodes</span>
                </span>
                <span className="text-base font-bold text-white flex items-center gap-1">
                  <span>{domCount}</span>
                  <span className="text-[10px] text-slate-400 font-normal">NODES</span>
                </span>
              </div>
            </div>

            {/* Audio Mute Switch */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => playHover()}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
                <span>Audio Micro-Haptics</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                soundEnabled ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
              }`}>
                {soundEnabled ? "ONLINE" : "MUTED"}
              </span>
            </button>

            {/* Component Inspector Mode Toggle */}
            <button
              onClick={toggleInspector}
              onMouseEnter={() => playHover()}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                isInspectorActive
                  ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>DevTools Inspector</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                isInspectorActive ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
              }`}>
                {isInspectorActive ? "ACTIVE [I]" : "STANDBY [I]"}
              </span>
            </button>

            {/* Accent Theme Switcher */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-cyan-400" />
                <span>Cyber Accent Tone</span>
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(["emerald", "cyan", "violet"] as const).map((col) => {
                  const isSelected = accent === col;
                  const label = col === "emerald" ? "Emerald" : col === "cyan" ? "Cyber" : "Violet";
                  return (
                    <button
                      key={col}
                      onClick={() => handleAccentChange(col)}
                      className={`py-1 px-2 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer text-center ${
                        isSelected
                          ? col === "emerald"
                            ? "bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                            : col === "cyan"
                            ? "bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                            : "bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CRT & Matrix Toggles */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={toggleScanlines}
                onMouseEnter={() => playHover()}
                className={`p-2 rounded-xl border text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  scanlines 
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-300" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>Scanlines</span>
              </button>

              <button
                onClick={toggleMatrix}
                onMouseEnter={() => playHover()}
                className={`p-2 rounded-xl border text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  matrixMode 
                    ? "bg-emerald-950/60 border-emerald-500 text-emerald-300" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Matrix Theme</span>
              </button>
            </div>

            {/* Turbo Boost Button */}
            <button
              onClick={boostProtocol}
              onMouseEnter={() => playHover()}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-lg hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Engage Turbo Boost</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <button
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => playHover()}
        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 text-neutral-100 text-xs font-mono tracking-wider shadow-2xl hover:border-emerald-400 hover:scale-105 transition-all cursor-pointer group"
      >
        <Sliders className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
        <span className="font-bold text-emerald-400">DEV DECK</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
