"use client";

import { useState } from "react";

type Experience = {
  id: string;
  role: string;
  company: string;
  logo: string;
  period: string;
  location: string;
  bullets: string[];
  systemName: string;
  systemMetrics: { label: string; value: string; status: string }[];
  activeModules: { name: string; tech: string; metric: string }[];
  codeSnippet: string;
};

const experiences: Experience[] = [
  {
    id: "pago",
    role: "Full Stack Developer",
    company: "PAGO Analytics Pvt Ltd",
    logo: "/brands/pago-analytics.svg",
    period: "Dec 2022 – Present",
    location: "Hyderabad",
    bullets: [
      "Collaborated on end-to-end product lifecycle: gathered user requirements, defined MVP scope, and planned feature releases.",
      "Developed responsive React.js product-display UIs (TypeScript, Redux Toolkit), boosting user retention by 25%.",
      "Built and maintained RESTful Node.js/Express APIs for product, cart, and user management; modeled data in MongoDB.",
      "Integrated Razorpay payment gateway with JWT-based authentication to secure transactions.",
      "Architected microservices for inventory, order-tracking, and review modules, reducing response times by 40%.",
      "Mentored junior developers on TypeScript, Redux best practices, and frontend component modularity.",
    ],
    systemName: "CLUSTER: PAGO_OMNI_COMMERCE_NODE",
    systemMetrics: [
      { label: "Cluster SLA", value: "99.98%", status: "OPTIMAL" },
      { label: "API Latency", value: "-40%", status: "REDUCED" },
      { label: "User Retention", value: "+25%", status: "SURGE" },
    ],
    activeModules: [
      { name: "Order & Inventory Broker", tech: "Node.js / Express", metric: "24ms avg" },
      { name: "Dynamic Product Display UI", tech: "React / Redux Toolkit", metric: "60 FPS" },
      { name: "Razorpay Webhook Worker", tech: "JWT / HMAC SHA-256", metric: "99.99% Ack" },
      { name: "Review & Analytics Feed", tech: "MongoDB / Cosmos DB", metric: "Indexed" },
    ],
    codeSnippet: `// Microservice Architecture: Razorpay Payment & Order Pipeline
export async function verifyOrderTransaction(
  payload: RazorpayWebhookPayload, 
  signature: string
): Promise<TransactionResult> {
  const isValid = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET!)
    .update(payload.orderId + "|" + payload.paymentId)
    .digest("hex") === signature;

  if (!isValid) throw new SecurityException("Signature validation failed");
  
  await InventoryCluster.decrementStock(payload.items);
  return OrderService.dispatchConfirmation(payload.orderId);
}`,
  },
  {
    id: "ondace",
    role: "FrontEnd Developer",
    company: "ONDACE Solutions Pvt Ltd",
    logo: "/brands/ondace-solutions.svg",
    period: "Jun 2022 – Nov 2022",
    location: "Bengaluru",
    bullets: [
      "Maintained and enhanced React.js EMS (Energy Management Systems) Control Portals with Redux Toolkit and React Native clients.",
      "Ensured 99.9% system uptime, resolving critical production escalations within strict SLAs.",
      "Consumed real-time APIs via WebSocket and optimized REST calls to improve data latency by 30%.",
      "Delivered iterative UI updates with offline-sync support for field operations and dispatch controls.",
    ],
    systemName: "CLUSTER: ONDACE_EMS_DISPATCH_CORE",
    systemMetrics: [
      { label: "System Uptime", value: "99.9%", status: "STABLE" },
      { label: "Data Latency", value: "-30%", status: "OPTIMIZED" },
      { label: "Field Sync", value: "Offline-First", status: "SYNCED" },
    ],
    activeModules: [
      { name: "EMS Live Control Portal", tech: "React.js / Redux", metric: "Real-time" },
      { name: "Field Operations App", tech: "React Native", metric: "Offline Cache" },
      { name: "Real-time Telemetry Pipeline", tech: "REST / WebSockets", metric: "<35ms" },
      { name: "Dispatch Event Broker", tech: "Node.js Service", metric: "Zero Drop" },
    ],
    codeSnippet: `// React Native Offline Sync & Control Dispatch Engine
export const useTelemetryStream = (nodeId: string) => {
  const [telemetry, setTelemetry] = useState<TelemetryPacket | null>(null);

  useEffect(() => {
    const stream = SocketManager.subscribe(\`/nodes/\${nodeId}/stream\`, (packet) => {
      setTelemetry(packet);
      OfflineCache.persist(nodeId, packet);
    });
    return () => stream.unsubscribe();
  }, [nodeId]);

  return { telemetry, isOnline: NetworkStatus.isConnected };
};`,
  },
];

export default function ExperienceVault() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"telemetry" | "code">("telemetry");

  const currentExp = experiences[activeIndex];

  return (
    <section className="min-h-screen w-full bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-dot-pattern">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[500px] bg-indigo-500/20 dark:bg-indigo-900/20 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-900/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <p className="text-emerald-600 dark:text-emerald-400 font-mono tracking-[0.25em] text-xs uppercase mb-3 font-semibold">
            Phase 4 : Career Trajectory
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-neutral-100 dark:to-neutral-500 uppercase mb-4">
            Experience & Systems Vault
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Chronological engineering milestones paired with verified architectural deliverables.
          </p>
        </header>

        {/* Split-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 w-full h-full items-start">
          
          {/* Left Pane: The Timeline (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            <div className="flex flex-col gap-4">
              {experiences.map((exp, idx) => {
                const isActive = activeIndex === idx;
                
                return (
                  <div 
                    key={exp.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative flex flex-col p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isActive 
                        ? "bg-white dark:bg-slate-900/80 shadow-xl border-emerald-500/40 translate-x-1" 
                        : "bg-white/40 dark:bg-slate-900/30 hover:bg-white/80 dark:hover:bg-slate-900/50 border-black/5 dark:border-white/5"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 px-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                          <img src={exp.logo} alt={exp.company} className="h-6 w-auto object-contain" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold tracking-tight transition-colors ${
                            isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-neutral-200"
                          }`}>
                            {exp.role}
                          </h3>
                          <p className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase shrink-0 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold"
                          : "bg-black/[0.04] dark:bg-white/[0.04] text-slate-500 dark:text-neutral-500"
                      }`}>
                        {isActive ? "Active View" : "Inspect"}
                      </span>
                    </div>
                    
                    {/* Location & Period */}
                    <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-neutral-400 mb-4">
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Bullets */}
                    <div className="flex flex-col gap-2.5">
                      {exp.bullets.map((point, pIdx) => (
                        <p key={pIdx} className="text-xs leading-relaxed text-slate-600 dark:text-neutral-400 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">▹</span>
                          <span>{point}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Interactive Systems Vault (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-slate-950 border border-slate-800 text-neutral-100 p-6 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Top Mac-style Terminal Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-6 px-2 rounded bg-slate-900 border border-slate-800 flex items-center">
                  <img src={currentExp.logo} alt={currentExp.company} className="h-3.5 w-auto object-contain" />
                </div>
                <span className="text-xs font-mono text-neutral-400 font-semibold">
                  {currentExp.systemName}
                </span>
              </div>

              {/* View Switcher: Telemetry vs Code */}
              <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
                <button
                  onClick={() => setViewMode("telemetry")}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    viewMode === "telemetry" 
                      ? "bg-emerald-500/20 text-emerald-400 font-bold" 
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Live Telemetry
                </button>
                <button
                  onClick={() => setViewMode("code")}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    viewMode === "code" 
                      ? "bg-emerald-500/20 text-emerald-400 font-bold" 
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Architecture Code
                </button>
              </div>
            </div>

            {/* Telemetry View */}
            {viewMode === "telemetry" && (
              <div className="flex flex-col gap-6">
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {currentExp.systemMetrics.map((m, mIdx) => (
                    <div 
                      key={mIdx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col"
                    >
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                        {m.label}
                      </span>
                      <span className="text-xl md:text-2xl font-black font-mono text-emerald-400 mb-1">
                        {m.value}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500/80 font-semibold">
                        ● {m.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subsystems Breakdown */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Deployed Subsystems & Modules
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentExp.activeModules.map((mod, modIdx) => (
                      <div 
                        key={modIdx}
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-neutral-200">
                            {mod.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {mod.metric}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {mod.tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Terminal Status Line */}
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800/60 font-mono text-xs text-neutral-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: OPERATIONAL — ALL MICROSERVICES NOMINAL</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">HEARTBEAT: &lt;10ms</span>
                </div>

              </div>
            )}

            {/* Code Architecture View */}
            {viewMode === "code" && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3 px-1">
                  <span>// System implementation excerpt</span>
                  <span className="text-emerald-400">TypeScript 5.x</span>
                </div>
                <pre className="p-4 rounded-xl bg-black/50 border border-slate-800 font-mono text-xs text-emerald-300/90 leading-relaxed overflow-x-auto selection:bg-emerald-500/30">
                  <code>{currentExp.codeSnippet}</code>
                </pre>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
