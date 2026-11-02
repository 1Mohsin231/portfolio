"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Sparkles } from "lucide-react";
import { sound } from "../../utils/audio";

export interface MsmeChatbotWidgetProps {
  isMobile?: boolean;
}

const PRESET_QUERIES = [
  {
    chip: "T-PRIDE Subsidy",
    query: "How do I qualify for the Telangana T-PRIDE capital subsidy?",
    response:
      "Under T-PRIDE, eligible SC/ST entrepreneurs receive a 35% investment subsidy on plant & machinery (up to ₹75 Lakhs), 100% stamp duty reimbursement, and 16% power tariff rebate. Prerequisites: Udyam Registration & approved DPR.",
    latency: "118ms",
    confidence: "99.4%",
    lang: "English / Telugu Dual NLP",
  },
  {
    chip: "Collateral-Free Loan",
    query: "What are the requirements for CGTMSE collateral-free financing?",
    response:
      "Under the state credit guarantee scheme, loans up to ₹2 Crores require no collateral or third-party guarantee. Key requirement: Active GSTIN, 1-year bank statements, and audited project viability report.",
    latency: "124ms",
    confidence: "98.8%",
    lang: "Vernacular NLP v3",
  },
  {
    chip: "Vernacular Submission",
    query: "Can I submit project documents and voice notes in Telugu?",
    response:
      "Yes. The AI4TG engine transcribes Telugu and Dakhni voice queries with 94.2% WER accuracy. Supporting documents in Telugu are processed via local OCR tokenizers without manual translation fees.",
    latency: "112ms",
    confidence: "99.1%",
    lang: "Telugu / Urdu Audio Engine",
  },
];

export default function MsmeChatbotWidget({ isMobile = false }: MsmeChatbotWidgetProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState(PRESET_QUERIES[0].response);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeQueries = isMobile ? PRESET_QUERIES.slice(0, 2) : PRESET_QUERIES;
  const activeData = PRESET_QUERIES[selectedIdx];

  const handleQuerySelect = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    sound.playClick();
    setSelectedIdx(idx);
    setIsTyping(true);
    setDisplayedResponse("");

    const fullText = PRESET_QUERIES[idx].response;
    let charIdx = 0;

    timerRef.current = setInterval(() => {
      charIdx += 3;
      setDisplayedResponse(fullText.slice(0, charIdx));

      if (charIdx >= fullText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTyping(false);
      }
    }, 20);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-emerald-500/30 p-4 md:p-5 text-neutral-100 shadow-2xl font-mono relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-[11px]">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            AI4TG Citizen Advisor : Interactive Stream
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {activeData.lang}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {activeData.latency}
          </span>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="mb-3.5">
        <div className="text-[10px] text-slate-400 mb-1.5 font-sans font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Click a sample citizen query to test streaming response:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySelect(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedIdx === idx
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <span>{q.chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col gap-3 min-h-[140px]">
        {/* User Message */}
        <div className="flex items-start gap-2.5 max-w-[90%] self-end">
          <div className="p-2.5 rounded-2xl rounded-tr-none bg-emerald-600/20 border border-emerald-500/30 text-emerald-200 text-xs font-sans">
            {activeData.query}
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* AI Streamed Response */}
        <div className="flex items-start gap-2.5 max-w-[95%] self-start">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="p-3 rounded-2xl rounded-tl-none bg-slate-950/80 border border-slate-800 text-slate-200 text-xs font-sans leading-relaxed">
            {displayedResponse}
            {isTyping && <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 animate-pulse" />}
          </div>
        </div>
      </div>

      {/* Footer Benchmark */}
      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span>Confidence Score: <strong className="text-emerald-400">{activeData.confidence}</strong></span>
        <span>WCAG 2.1 Accessibility Certified</span>
      </div>
    </div>
  );
}
