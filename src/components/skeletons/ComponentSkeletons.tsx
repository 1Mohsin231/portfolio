"use client";

import React from "react";

export function SimulatorSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto py-28 px-4 flex flex-col items-center">
      {/* Header Skeleton */}
      <div className="w-48 h-5 rounded-full bg-slate-800/60 animate-pulse mb-3" />
      <div className="w-72 h-10 rounded-xl bg-slate-800/80 animate-pulse mb-4" />
      <div className="w-96 max-w-full h-4 rounded-lg bg-slate-800/40 animate-pulse mb-12" />

      {/* Main Workbench Skeleton */}
      <div className="w-full rounded-3xl bg-slate-950 border border-slate-800/80 p-6 md:p-10 min-h-[520px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="w-80 h-10 rounded-xl bg-slate-900 animate-pulse" />
          <div className="w-72 h-10 rounded-xl bg-slate-900 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-900/80 border border-slate-800/60 animate-pulse" />
          ))}
        </div>

        <div className="h-44 rounded-2xl bg-slate-900/60 border border-slate-800/40 animate-pulse" />
      </div>
    </div>
  );
}

export function TerminalSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto py-28 px-4 flex flex-col items-center">
      {/* Header Skeleton */}
      <div className="w-44 h-5 rounded-full bg-slate-800/60 animate-pulse mb-3" />
      <div className="w-64 h-10 rounded-xl bg-slate-800/80 animate-pulse mb-4" />
      <div className="w-80 max-w-full h-4 rounded-lg bg-slate-800/40 animate-pulse mb-12" />

      {/* Terminal Shell Skeleton */}
      <div className="w-full rounded-3xl bg-slate-950 border border-slate-800/80 min-h-[460px] flex flex-col justify-between shadow-2xl overflow-hidden relative">
        <div className="h-12 bg-slate-900/90 border-b border-slate-800 flex items-center px-6 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="w-32 h-4 rounded bg-slate-800 ml-4 animate-pulse" />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="w-3/4 h-4 rounded bg-slate-800/70 animate-pulse" />
          <div className="w-1/2 h-4 rounded bg-slate-800/50 animate-pulse" />
          <div className="w-2/3 h-4 rounded bg-slate-800/60 animate-pulse" />
        </div>

        <div className="h-16 bg-slate-900/80 border-t border-slate-800 flex items-center px-6 gap-3">
          <div className="w-20 h-7 rounded-lg bg-slate-800 animate-pulse" />
          <div className="w-20 h-7 rounded-lg bg-slate-800 animate-pulse" />
          <div className="w-20 h-7 rounded-lg bg-slate-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

