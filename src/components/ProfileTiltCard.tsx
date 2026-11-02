"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { sound } from "../utils/audio";

export interface ProfileTiltCardProps {
  imageSrc?: string;
  altText?: string;
  tagCode?: string;
  systemCode?: string;
  authorCode?: string;
  versionCode?: string;
  className?: string;
}

export default function ProfileTiltCard({
  imageSrc = "/profile/mohsinDP.jfif",
  altText = "Mohsin Baba",
  tagCode = "[ 01 ]",
  systemCode = "[ SYS / ]",
  authorCode = "M.BABA",
  versionCode = "2026.PROD",
  className = "",
}: ProfileTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse coordinates normalized to -0.5 ... 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics configuration for realistic, tactile mechanical return
  const springConfig = { stiffness: 280, damping: 22, mass: 0.6 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 3D rotation mappings
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const scale = useTransform(mouseXSpring, [-0.5, 0, 0.5], [1.04, 1, 1.04]);

  // Cursor spotlight coordinates in pixels
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  // Detect touch devices / coarse pointers for graceful degradation to maintain intuitive scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateTouchStatus = () => {
      const matchCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const isTouch = matchCoarse || "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    };

    updateTouchStatus();
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    mediaQuery.addEventListener?.("change", updateTouchStatus);
    return () => mediaQuery.removeEventListener?.("change", updateTouchStatus);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalized coordinates (-0.5 to 0.5)
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);

      setSpotlight({
        x: mouseX,
        y: mouseY,
        opacity: 1,
      });
    },
    [isTouchDevice, x, y]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    sound.playHover();
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Smooth return to zero degrees via spring physics
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, [x, y]);

  return (
    <div
      className={`relative select-none perspective-[1200px] ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          scale: isTouchDevice ? 1 : isHovered ? scale : 1,
          transformStyle: "preserve-3d",
        }}
        className="relative cursor-pointer group rounded-3xl p-[2px] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]"
      >
        {/* Dynamic Multi-Color Ambient Glow Behind Card */}
        <div 
          className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-25 blur-xl group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        />

        {/* Reactive Spotlight Border Glow (Following Cursor) */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl transition-opacity duration-300 z-10"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(240px circle at ${spotlight.x}px ${spotlight.y}px, rgba(16, 185, 129, 0.8), rgba(6, 182, 212, 0.4) 40%, transparent 80%)`,
          }}
        />

        {/* Card Main Housing (Glassmorphism & Cyber Base) */}
        <div className="relative rounded-[22px] bg-slate-950/85 backdrop-blur-2xl border border-emerald-500/30 p-3.5 shadow-2xl overflow-hidden">
          
          {/* Surface Cursor Spotlight Glare Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[22px] transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity * 0.45,
              background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.35), rgba(16, 185, 129, 0.15) 35%, transparent 70%)`,
            }}
          />

          {/* Cyberpunk Scanline Beam (Active on Hover) */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent blur-[1px] animate-[scanline_2.8s_linear_infinite]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
          </div>

          {/* Top Cyberpunk HUD Brackets */}
          <div className="relative z-30 flex items-center justify-between px-1.5 pb-2.5 mb-1 border-b border-emerald-500/15 text-[10px] font-mono tracking-widest text-emerald-400/90 font-bold select-none">
            <span className="flex items-center gap-1.5 group-hover:text-emerald-300 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{tagCode}</span>
            </span>
            <span className="text-cyan-400/90 group-hover:text-cyan-300 transition-colors font-mono">
              {systemCode}
            </span>
          </div>

          {/* Avatar Image Wrapper with next/image CLS Optimization */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-slate-900 border border-emerald-500/25 shadow-inner">
            <Image
              src={imageSrc}
              alt={altText}
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 192px"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              draggable={false}
            />

            {/* Subtle Gradient Shade on Lower Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Cyberpunk HUD Subtext */}
          <div className="relative z-30 flex items-center justify-between px-1.5 pt-2.5 mt-1 border-t border-emerald-500/15 text-[9px] font-mono tracking-widest uppercase select-none">
            <span className="text-neutral-400 font-semibold group-hover:text-neutral-200 transition-colors">
              {authorCode}
            </span>
            <span className="text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>{versionCode}</span>
            </span>
          </div>

          {/* Corner Reticle Accents */}
          <div className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-emerald-400/60" />
          <div className="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-emerald-400/60" />
          <div className="pointer-events-none absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-emerald-400/60" />
          <div className="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-emerald-400/60" />
        </div>
      </motion.div>
    </div>
  );
}

