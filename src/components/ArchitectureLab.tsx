"use client";

import { useState } from "react";
import { sound } from "../utils/audio";

export default function ArchitectureLab() {
  const [traffic, setTraffic] = useState(25000); // 1,000 to 100,000
  const [archMode, setArchMode] = useState<"optimized" | "monolith">("optimized");

  const isOptimized = archMode === "optimized";

  // Dynamic calculations based on slider and mode
  const trafficMultiplier = traffic / 10000;
  const nodes = isOptimized ? Math.min(Math.max(Math.floor(traffic / 8000), 2), 14) : 1;
  const latency = isOptimized ? Math.max(Math.floor(22 + (traffic / 100000) * 12), 22) : Math.floor(180 + trafficMultiplier * 95);
  const cpuLoad = isOptimized ? Math.min(Math.floor(25 + trafficMultiplier * 4), 65) : Math.min(Math.floor(45 + trafficMultiplier * 18), 100);
  const cacheHit = isOptimized ? "98.4%" : "38.2%";
  const errorRate = isOptimized ? "0.00%" : traffic > 40000 ? "14.2%" : "2.1%";

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTraffic(Number(e.target.value));
    sound.playSliderTick();
  };

  const handleModeChange = (mode: "optimized" | "monolith") => {
    sound.playClick();
    setArchMode(mode);
  };

  return (
    <section 
      id="simulator"
      className="min-h-screen w-full bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-dot-pattern"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/20 dark:bg-emerald-900/30 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full">
        
        {/* Header */}
        <header className="mb-14 text-center">
          <p className="text-emerald-600 dark:text-emerald-400 font-mono tracking-[0.25em] text-xs uppercase mb-3 font-semibold">
            Interactive Architecture Lab
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-neutral-100 dark:to-neutral-500 uppercase mb-4">
            Live Traffic Surge Simulator
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Test how my decoupled MERN microservice architecture scales under 10× traffic surges compared to a legacy monolith. Drag the slider to simulate traffic.
          </p>
        </header>

        {/* Workbench Container */}
        <div className="w-full rounded-3xl bg-slate-950 border border-slate-800 text-neutral-100 p-6 md:p-10 shadow-2xl backdrop-blur-2xl flex flex-col gap-8">
          
          {/* Top Controls: Mode Switcher & Slider */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            
            {/* Architecture Mode Toggle */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => handleModeChange("optimized")}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2.5 min-h-[44px] rounded-lg transition-all cursor-pointer flex items-center justify-center touch-manipulation ${
                  isOptimized
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                ● Mohsin&apos;s Decoupled Architecture
              </button>
              <button
                onClick={() => handleModeChange("monolith")}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2.5 min-h-[44px] rounded-lg transition-all cursor-pointer flex items-center justify-center touch-manipulation ${
                  !isOptimized
                    ? "bg-red-500 text-white font-bold shadow-lg shadow-red-500/20"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Legacy Monolith (Unoptimized)
              </button>
            </div>

            {/* Slider Control */}
            <div className="flex flex-col gap-2 w-full lg:w-96">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-wider">Simulated Traffic Load</span>
                <span className="text-emerald-400 font-bold text-sm">{traffic.toLocaleString()} req / sec</span>
              </div>
              <div className="min-h-[44px] flex items-center w-full">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={traffic}
                  onChange={handleSliderChange}
                  aria-label="Simulated traffic load slider from 1,000 to 100,000 requests per second"
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 touch-pan-x"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>1,000 (Idle)</span>
                <span>50,000 (Flash Sale)</span>
                <span>100,000 (10× Surge)</span>
              </div>
            </div>

          </div>

          {/* Telemetry Dials Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Latency */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                API Response Time
              </span>
              <span className={`text-3xl font-extrabold font-mono mb-1 ${
                isOptimized ? "text-emerald-400" : latency > 300 ? "text-red-400" : "text-yellow-400"
              }`}>
                {latency} ms
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {isOptimized ? "✓ Sub-second SLA achieved" : "⚠ Server bottlenecking"}
              </span>
            </div>

            {/* Auto-Scaled Pods */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                Active Scaled Nodes
              </span>
              <span className="text-3xl font-extrabold font-mono text-cyan-400 mb-1">
                {nodes} {nodes === 1 ? "Pod" : "Pods"}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {isOptimized ? "Dynamic horizontal scale" : "Fixed single instance"}
              </span>
            </div>

            {/* Cache Hit */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                Cache Hit Ratio
              </span>
              <span className="text-3xl font-extrabold font-mono text-teal-400 mb-1">
                {cacheHit}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {isOptimized ? "Redis / Memory caching" : "Direct DB queries"}
              </span>
            </div>

            {/* CPU & Error */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                Error Rate & Load
              </span>
              <span className={`text-3xl font-extrabold font-mono mb-1 ${
                errorRate === "0.00%" ? "text-emerald-400" : "text-red-500 animate-pulse"
              }`}>
                {errorRate}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                CPU Load: {cpuLoad}%
              </span>
            </div>

          </div>

          {/* Interactive Topology Graph Flow */}
          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-black/40 border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Live Topology & Data Ingestion Pipeline
            </span>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Step 1: Ingestion */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-2">1</span>
                <span className="text-xs font-bold text-neutral-100">Client Devices</span>
                <span className="text-[11px] font-mono text-neutral-400 mt-1">Web & React Native</span>
                <span className="text-[10px] font-mono text-emerald-400 mt-2 px-2 py-0.5 rounded bg-emerald-500/10">
                  {traffic.toLocaleString()} req/s
                </span>
              </div>

              {/* Step 2: Edge & Gateway */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold mb-2">2</span>
                <span className="text-xs font-bold text-neutral-100">API Gateway</span>
                <span className="text-[11px] font-mono text-neutral-400 mt-1">Express / JWT Auth</span>
                <span className="text-[10px] font-mono text-cyan-400 mt-2 px-2 py-0.5 rounded bg-cyan-500/10">
                  Rate Limiting OK
                </span>
              </div>

              {/* Step 3: Decoupled Cluster */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-2">3</span>
                <span className="text-xs font-bold text-neutral-100">Microservices Cluster</span>
                <span className="text-[11px] font-mono text-neutral-400 mt-1">Catalog • Cart • Razorpay</span>
                <span className="text-[10px] font-mono text-emerald-400 mt-2 px-2 py-0.5 rounded bg-emerald-500/10">
                  {nodes} Active Pods
                </span>
              </div>

              {/* Step 4: Storage */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold mb-2">4</span>
                <span className="text-xs font-bold text-neutral-100">Persistence Layer</span>
                <span className="text-[11px] font-mono text-neutral-400 mt-1">MongoDB & Azure Blob</span>
                <span className="text-[10px] font-mono text-teal-400 mt-2 px-2 py-0.5 rounded bg-teal-500/10">
                  0% Data Loss
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
