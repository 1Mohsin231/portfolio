"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Layers, Cpu, Code2, Clock, CheckCircle2 } from "lucide-react";
import { useInspector } from "../context/InspectorContext";
import { sound } from "../utils/audio";

export default function InspectorOverlay() {
  const { isInspectorActive, toggleInspector, selectedMeta, setSelectedMeta } = useInspector();

  const handleCloseDrawer = () => {
    sound.playClick();
    setSelectedMeta(null);
  };

  return (
    <>
      {/* Top Banner when Inspector is active */}
      <AnimatePresence>
        {isInspectorActive && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-950/95 border border-emerald-500/60 shadow-[0_10px_35px_rgba(16,185,129,0.3)] text-neutral-100 font-mono text-xs flex items-center gap-3 select-none backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                DevTools Inspector Mode
              </span>
            </div>
            <span className="hidden sm:inline-block text-slate-400 text-[11px]">
              Hover sections • Click to audit architecture • Press &apos;I&apos; to exit
            </span>
            <button
              onClick={toggleInspector}
              className="ml-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Exit [I]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Architectural Audit Drawer */}
      <AnimatePresence>
        {selectedMeta && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative h-full sm:h-auto max-h-[92vh] w-full sm:max-w-xl sm:rounded-3xl bg-slate-950 border border-emerald-500/40 p-6 md:p-8 text-neutral-100 font-mono shadow-2xl flex flex-col justify-between overflow-y-auto scrollbar-thin"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Component Architectural Audit</span>
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      &lt;{selectedMeta.name} /&gt;
                    </h3>
                  </div>

                  <button
                    onClick={handleCloseDrawer}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                    aria-label="Close component inspector drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Breadcrumb Hierarchy */}
                {selectedMeta.hierarchy && (
                  <div className="mb-5 flex items-center gap-1.5 text-xs text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Hierarchy:</span>
                    <div className="flex items-center gap-1 text-slate-300">
                      {selectedMeta.hierarchy.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <span className={idx === selectedMeta.hierarchy!.length - 1 ? "text-emerald-400 font-bold" : ""}>
                            {step}
                          </span>
                          {idx < selectedMeta.hierarchy!.length - 1 && <span className="text-slate-600">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Render Timing</span>
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      {selectedMeta.renderTiming}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Cpu className="w-3 h-3 text-indigo-400" />
                      <span>Dimensions</span>
                    </span>
                    <span className="text-sm font-bold text-white">
                      {selectedMeta.rect ? `${selectedMeta.rect.width} × ${selectedMeta.rect.height}px` : "Dynamic"}
                    </span>
                  </div>
                </div>

                {/* Architecture Notes */}
                <div className="mb-6">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Architectural Specification</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-sans text-neutral-300 leading-relaxed">
                    {selectedMeta.architectureNotes || "Engineered with modular, accessible React standards."}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                {selectedMeta.techStack && (
                  <div className="mb-6">
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                      Core Technologies Utilized:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMeta.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-emerald-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Props & State Summary */}
                {selectedMeta.propsSummary && (
                  <div className="mb-6">
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                      Props & Runtime Attributes:
                    </div>
                    <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto">
                      <code>{selectedMeta.propsSummary}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Clean Component Tree</span>
                </span>
                <button
                  onClick={handleCloseDrawer}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
                >
                  Close Audit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

