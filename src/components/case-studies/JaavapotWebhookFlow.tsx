"use client";

import React, { useState } from "react";
import { Smartphone, Server, Layers, Database, Zap, CheckCircle2, RefreshCw } from "lucide-react";
import { sound } from "../../utils/audio";

export interface JaavapotWebhookFlowProps {
  isMobile?: boolean;
}

const FLOW_STEPS = [
  {
    step: 1,
    source: "React Native Client",
    icon: Smartphone,
    action: "Dispatches 1-Click Checkout payload ($84.50)",
    status: "HTTP 200 OK",
    latency: "12ms",
  },
  {
    step: 2,
    source: "API Gateway (Nginx / Express)",
    icon: Server,
    action: "Validates HMAC-SHA256 Razorpay webhook signature",
    status: "Verified",
    latency: "18ms",
  },
  {
    step: 3,
    source: "Order & Inventory Microservice",
    icon: Layers,
    action: "Atomic stock decrement, publishes Redis pub/sub event",
    status: "Synced (-40% latency)",
    latency: "24ms",
  },
  {
    step: 4,
    source: "Persistence (MongoDB + Azure Blob)",
    icon: Database,
    action: "Committed Order #JP-8892 with 99.98% delivery SLA",
    status: "ACID Guaranteed",
    latency: "32ms",
  },
];

export default function JaavapotWebhookFlow({ isMobile = false }: JaavapotWebhookFlowProps) {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    if (isSimulating) return;
    sound.playSuccess();
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => {
      sound.playClick();
      setActiveStep(2);
    }, 700);

    setTimeout(() => {
      sound.playClick();
      setActiveStep(3);
    }, 1400);

    setTimeout(() => {
      sound.playSuccess();
      setActiveStep(4);
      setIsSimulating(false);
    }, 2100);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950 border border-emerald-500/30 p-4 md:p-5 text-neutral-100 shadow-2xl font-mono relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-[11px]">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            Real-time Webhook & Pipeline Telemetry
          </span>
        </div>
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] disabled:opacity-60 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
          <span>{isSimulating ? "Dispatching Event..." : "Simulate Webhook"}</span>
        </button>
      </div>

      {/* Node Flow Map */}
      <div className={`grid gap-2.5 mb-4 ${isMobile ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"}`}>
        {FLOW_STEPS.map((node) => {
          const isNodeActive = activeStep >= node.step;
          const isCurrent = activeStep === node.step;
          const Icon = node.icon;

          return (
            <div
              key={node.step}
              onClick={() => {
                sound.playClick();
                setActiveStep(node.step);
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? "bg-emerald-950/50 border-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.25)] scale-[1.02]"
                  : isNodeActive
                  ? "bg-slate-900/80 border-emerald-500/40 text-slate-200"
                  : "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-emerald-400 font-bold">NODE 0{node.step}</span>
                <Icon className={`w-4 h-4 ${isCurrent ? "text-emerald-400 animate-pulse" : "text-slate-400"}`} />
              </div>
              <div className="text-xs font-bold text-slate-100 truncate mb-1">{node.source}</div>
              <div className="text-[10px] text-slate-400 font-sans line-clamp-2">{node.status}</div>
            </div>
          );
        })}
      </div>

      {/* Live Payload Stream Inspector */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
          <span>EVENT: POST /api/v1/webhooks/razorpay</span>
          <span className="text-emerald-400 font-bold">Step {activeStep} of 4 Complete</span>
        </div>
        <div className="flex items-start gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-emerald-300">
              {FLOW_STEPS[activeStep - 1].source}:
            </span>
            <span className="text-[11px] font-sans text-slate-300">
              {FLOW_STEPS[activeStep - 1].action}
            </span>
            <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-400">
              <span>Latency: <strong className="text-emerald-400">{FLOW_STEPS[activeStep - 1].latency}</strong></span>
              <span>Status: <strong className="text-cyan-400">{FLOW_STEPS[activeStep - 1].status}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
