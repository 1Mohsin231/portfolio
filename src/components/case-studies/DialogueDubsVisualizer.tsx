"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Radio, Cpu, CheckCircle } from "lucide-react";
import { sound } from "../../utils/audio";

export interface DialogueDubsVisualizerProps {
  isMobile?: boolean;
}

const CHANNELS = [
  { id: "es", label: "EN → Spanish (ES)", dialect: "Castilian Neural", latency: "1.2s" },
  { id: "hi", label: "EN → Hindi (HI)", dialect: "Standard Hindi v2", latency: "1.4s" },
  { id: "te", label: "EN → Telugu (TE)", dialect: "Deccan Vernacular", latency: "1.1s" },
];

export default function DialogueDubsVisualizer({ isMobile = false }: DialogueDubsVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0]);
  const barCount = isMobile ? 18 : 24;
  const [barHeights, setBarHeights] = useState<number[]>(() =>
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 20)
  );
  const animationRef = useRef<number | null>(null);

  // Animate Equalizer Waveform
  useEffect(() => {
    let phase = 0;
    const animate = () => {
      if (isPlaying) {
        phase += 0.08;
        setBarHeights(
          Array.from({ length: barCount }, (_, i) => {
            const wave = Math.sin(phase + i * 0.3) * 35;
            const jitter = Math.random() * 25;
            return Math.min(95, Math.max(12, Math.floor(45 + wave + jitter)));
          })
        );
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, barCount]);

  const togglePlayback = () => {
    sound.playClick();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-emerald-500/30 p-4 md:p-5 text-neutral-100 shadow-2xl overflow-hidden font-mono relative">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-emerald-400" : "bg-neutral-500"}`} />
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            {isPlaying ? "AI Dubbing Engine : Live Synthesizing" : "Pipeline Paused"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">48kHz / 24-bit</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {selectedChannel.latency} latency
          </span>
        </div>
      </div>

      {/* Main Interactive Visualizer Canvas */}
      <div className="relative rounded-xl bg-slate-900/80 border border-slate-800 p-4 sm:p-6 mb-4 flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
        {/* Ambient Grid and Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Audio Equalizer Bars */}
        <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-24 w-full max-w-md px-2 z-10">
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{ height: `${isPlaying ? h : 12}%` }}
              className={`w-1.5 sm:w-2 rounded-full transition-all duration-75 ${
                i % 3 === 0
                  ? "bg-gradient-to-t from-emerald-500 to-teal-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : i % 3 === 1
                  ? "bg-gradient-to-t from-teal-500 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  : "bg-gradient-to-t from-cyan-500 to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              }`}
            />
          ))}
        </div>

        {/* Center Control Overlay Pill */}
        <div className="mt-4 flex items-center gap-3 z-10">
          <button
            onClick={togglePlayback}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer hover:scale-105"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Waveform</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language Channel Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-cyan-400" />
          <span>Active Localization Target:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {CHANNELS.map((ch) => {
            const isSelected = selectedChannel.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedChannel(ch);
                }}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.15)] text-emerald-300"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>{ch.label}</span>
                  {isSelected && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                </div>
                <div className="text-[10px] opacity-75 font-sans">Model: {ch.dialect}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pipeline Status Subtext */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span>Azure Blob Streaming: Active (Multer RAM -60%)</span>
        </span>
        <span className="text-emerald-400 font-bold">100% In-Sync</span>
      </div>
    </div>
  );
}
