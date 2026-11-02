"use client";

import React, { useEffect, useState } from "react";

export default function InteractiveGridBackground() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000, visible: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY, visible: true });
    };

    const handleMouseLeave = () => {
      setCoords((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Primary Soft Ambient Radial Spotlight Mask */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: coords.visible ? 1 : 0,
          background: `radial-gradient(750px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.08), transparent 75%)`,
        }}
      />

      {/* Secondary Cyan Micro-Glow Accent */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: coords.visible ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.05), transparent 60%)`,
        }}
      />
    </div>
  );
}

