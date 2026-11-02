"use client";

import React, { useRef } from "react";
import { useInspector } from "../context/InspectorContext";
import { sound } from "../utils/audio";

export interface InspectableProps {
  id: string;
  name: string;
  propsSummary?: string;
  renderTiming?: string;
  architectureNotes?: string;
  hierarchy?: string[];
  techStack?: string[];
  children: React.ReactNode;
  className?: string;
}

export default function Inspectable({
  id,
  name,
  propsSummary = "",
  renderTiming = "< 1ms (Hydrated)",
  architectureNotes = "",
  hierarchy = ["App", "Page", name],
  techStack = ["React 19", "Next.js 16", "Tailwind CSS"],
  children,
  className = "",
}: InspectableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isInspectorActive, setHoveredMeta, setSelectedMeta, hoveredMeta } = useInspector();

  const handleMouseEnter = () => {
    if (!isInspectorActive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    sound.playHover();
    setHoveredMeta({
      id,
      name,
      propsSummary,
      renderTiming,
      architectureNotes,
      hierarchy,
      techStack,
      rect: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX),
      },
    });
  };

  const handleMouseLeave = () => {
    if (!isInspectorActive) return;
    setHoveredMeta(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isInspectorActive || !ref.current) return;
    e.stopPropagation();
    sound.playClick();
    const rect = ref.current.getBoundingClientRect();
    setSelectedMeta({
      id,
      name,
      propsSummary,
      renderTiming,
      architectureNotes,
      hierarchy,
      techStack,
      rect: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX),
      },
    });
  };

  const isHovered = isInspectorActive && hoveredMeta?.id === id;

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative transition-all duration-200 ${
        isInspectorActive ? "cursor-crosshair" : ""
      } ${
        isHovered
          ? "outline-2 outline-emerald-400 outline-dashed outline-offset-4 shadow-[0_0_35px_rgba(16,185,129,0.3)] z-30"
          : ""
      } ${className}`}
    >
      {/* DevTools Floating Badge Tag on Hover */}
      {isHovered && (
        <div className="absolute top-3 left-3 z-50 px-3 py-1.5 rounded-lg bg-slate-950/95 border border-emerald-400/80 text-emerald-300 font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 pointer-events-none animate-fade-in backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white">&lt;{name} /&gt;</span>
          <span className="text-slate-400 font-normal">
            {hoveredMeta?.rect?.width} × {hoveredMeta?.rect?.height}px
          </span>
          <span className="text-cyan-400 font-normal border-l border-slate-700 pl-2">
            {renderTiming}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

