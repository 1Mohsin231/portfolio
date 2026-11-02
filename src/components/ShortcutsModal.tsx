"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X, Terminal, Cpu, Search, Sparkles } from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: "T", label: "Jump & Focus Terminal Console", icon: Terminal, action: "Scrolls directly to terminal input" },
  { key: "S", label: "Jump to Traffic Surge Simulator", icon: Cpu, action: "Navigates to Architecture Lab" },
  { key: "I", label: "Toggle Component Inspector Mode", icon: Search, action: "DevTools outline & audit drawer" },
  { key: "⌘K", label: "Focus Skills Matrix Search Bar", icon: Command, action: "Search 28+ verified technologies" },
  { key: "?", label: "Toggle Shortcuts Cheat-Sheet", icon: Sparkles, action: "Open / close this cheat-sheet" },
  { key: "ESC", label: "Close Active Modals & Overlays", icon: X, action: "Dismiss inspection drawers or dialogs" },
];

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md font-mono select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-emerald-500/40 p-6 md:p-8 text-neutral-100 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  Keyboard Shortcuts Cheat-Sheet
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Close shortcuts modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-3 mb-6">
              {SHORTCUTS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{s.label}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{s.action}</div>
                      </div>
                    </div>

                    <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-300 shadow-inner">
                      {s.key}
                    </kbd>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Pro-tip: Press &apos;?&apos; anytime to toggle</span>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

