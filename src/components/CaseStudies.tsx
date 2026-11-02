"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Laptop, 
  Smartphone, 
  Zap, 
  Code2, 
  FileText, 
  X, 
  Layers, 
  ShieldCheck,
  Server
} from "lucide-react";
import dynamic from "next/dynamic";
import { sound } from "../utils/audio";

// Next.js App Router Dynamic Imports for Interactive Preview Canvases
const DialogueDubsVisualizer = dynamic(() => import("./case-studies/DialogueDubsVisualizer"), {
  ssr: false,
  loading: () => <div className="h-44 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse" />,
});

const JaavapotWebhookFlow = dynamic(() => import("./case-studies/JaavapotWebhookFlow"), {
  ssr: false,
  loading: () => <div className="h-44 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse" />,
});

const MsmeChatbotWidget = dynamic(() => import("./case-studies/MsmeChatbotWidget"), {
  ssr: false,
  loading: () => <div className="h-44 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse" />,
});

export interface CaseStudy {
  num: string;
  title: string;
  subtitle: string;
  illustration: string;
  tagline: string;
  metrics: { label: string; value: string }[];
  overview: string;
  architecture: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  codeSnippet: string;
  archDetails: {
    pattern: string;
    runtime: string;
    database: string;
    security: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    num: "01",
    title: "Dialogue Dubs Application",
    subtitle: "Enterprise Multimedia AI Dubbing Platform",
    illustration: "/projects/dialogue-dubs.svg",
    tagline: "Scalable audio/video localization engine with AI microservice pipeline.",
    metrics: [
      { label: "Processing Pipeline", value: "6 AI Services" },
      { label: "Storage Architecture", value: "Azure Blob" },
      { label: "Role Hierarchy", value: "3 Tier RBAC" },
    ],
    overview:
      "Engineered an automated end-to-end multimedia dubbing suite designed for creators and enterprise agencies. Featuring dynamic React.js interfaces with role-governed access (User, Admin, SuperAdmin), built on Node.js/Express and MongoDB (Cosmos DB).",
    architecture:
      "Integrated microservices for speech-to-text, text-to-speech, translation, speaker diarization, and background noise removal. Utilized Multer with streaming direct uploads to Azure Blob Storage, reducing server RAM pressure by 60%. Implemented Redis-compatible caching and robust automated API tests.",
    highlights: [
      "Dynamic multi-role dashboard with fine-grained access control (SuperAdmin/Admin/User)",
      "Asynchronous streaming pipeline for multi-gigabyte video localization renders",
      "Secure JWT authentication with automated cryptographic refresh rotations",
      "Automated fallback routes ensuring zero-loss pipeline reliability under peak traffic",
    ],
    tech: ["React.js", "Node.js", "Express", "Cosmos DB", "AI Microservices", "Azure Blob", "Multer"],
    liveUrl: "#simulator",
    repoUrl: "https://github.com/1mohsinbaba",
    codeSnippet: `// Asynchronous Streaming Video/Audio Pipeline (Multer -> Azure Blob)
router.post('/dub/process', 
  verifyJWT, 
  checkRole(['SuperAdmin', 'Admin']), 
  upload.single('mediaFile'), 
  async (req: Request, res: Response) => {
    const { sourceLang, targetLangs, speechRate } = req.body;
    
    // Direct stream pipe to Azure Blob Storage (RAM footprint reduced by 60%)
    const blobStream = await azureBlobClient.uploadStream(req.file.stream);
    
    // Dispatch to microservice diarization & Whisper worker pool
    const jobId = await workerPool.dispatch({
      mediaUri: blobStream.url,
      sourceLang,
      targetLangs,
      transcribe: true,
      diarize: true
    });
    
    return res.status(202).json({ 
      jobId, 
      status: 'DISPATCHED_TO_PIPELINE',
      estimatedDurationMs: 1400 
    });
  }
);`,
    archDetails: {
      pattern: "Event-Driven Microservices with Worker Thread Pool",
      runtime: "Node.js 20 LTS + Express.js + Multer Stream",
      database: "Azure Cosmos DB (MongoDB API) + Redis Cache",
      security: "JWT + HMAC-SHA256 Token Rotation + RBAC",
    },
  },
  {
    num: "02",
    title: "The JaavaPot Commerce Platform",
    subtitle: "High-Throughput Omnichannel Commerce Ecosystem",
    illustration: "/projects/jaavapot.svg",
    tagline: "Full-stack web storefront, React Native mobile app & real-time analytics hub.",
    metrics: [
      { label: "Traffic Surge Handling", value: "10×" },
      { label: "API Response Optimization", value: "-40%" },
      { label: "Payment Gateway", value: "Razorpay" },
    ],
    overview:
      "Designed and deployed a unified commerce ecosystem serving thousands of concurrent shoppers across mobile and web. Synchronizes inventory, cart states, and order fulfillment in real-time between consumer apps and admin operations.",
    architecture:
      "Architected decoupling microservices for order management, product catalogs, and review engines. Integrated secure Razorpay payment gateway webhooks with cryptographic signature verification. Automated CI/CD deployments via GitHub Actions to DigitalOcean droplets with Nginx reverse proxy.",
    highlights: [
      "React Native iOS/Android app with offline-first cart persistence and instant 1-click checkout",
      "Scalable RESTful microservices modeling complex inventory lifecycles with Redis caching",
      "Cryptographically verified Razorpay payment transaction pipelines with webhook verification",
      "Zero-downtime rolling deployments via GitHub Actions CI/CD and PM2 cluster daemon",
    ],
    tech: ["React Native", "React.js", "Node.js", "MongoDB", "Razorpay", "DigitalOcean", "CI/CD"],
    liveUrl: "#simulator",
    repoUrl: "https://github.com/1mohsinbaba",
    codeSnippet: `// Cryptographic Webhook Verification & Inventory Synchronization
router.post('/webhooks/razorpay', async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  const payload = JSON.stringify(req.body);
  
  // Verify HMAC-SHA256 cryptographic signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET!)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Tampered webhook payload signature' });
  }

  const { order_id, amount, status } = req.body.payload.payment.entity;
  
  // Atomic inventory lock & cache invalidation
  await redisClient.del(\`inventory:catalog:\${order_id}\`);
  await orderService.commitTransaction({ order_id, amount, status });

  return res.status(200).json({ status: 'ACKNOWLEDGED' });
});`,
    archDetails: {
      pattern: "Omnichannel RESTful Microservices with Reverse Proxy",
      runtime: "Node.js + Express + React Native (Expo) + Next.js",
      database: "MongoDB Atlas + Redis Pub/Sub Cache",
      security: "Razorpay HMAC-SHA256 Webhook Verification + CORS Guards",
    },
  },
  {
    num: "03",
    title: "MSME Scheme Chat-bot Engine",
    subtitle: "Govt. of Telangana (AI4TG Initiative)",
    illustration: "/projects/ai4tg-chatbot.svg",
    tagline: "Multilingual AI advisory interface simplifying state government schemes.",
    metrics: [
      { label: "Languages Supported", value: "Multilingual" },
      { label: "User Drop-off Reduction", value: "30%" },
      { label: "Query Latency", value: "<150ms" },
    ],
    overview:
      "Developed an intuitive, accessible conversational portal for micro, small, and medium business owners across Telangana. Supports queries in regional vernaculars through text, audio, and documents.",
    architecture:
      "Engineered high-performance React.js chatbot frontend with instant streaming response rendering. Connected to custom AI scheme query engines with dynamic language detection algorithms, drastically eliminating bureaucratic onboarding friction.",
    highlights: [
      "Real-time audio, text, and file upload query processing with instant token streaming",
      "Vernacular language detection with automatic locale adaptation (English, Telugu, Urdu)",
      "Accessible WCAG 2.1 compliant UI with high contrast and screen reader accessibility",
      "Instant scheme qualification matching reducing citizen manual intake time by 75%",
    ],
    tech: ["React.js", "AI Integration", "Multilingual API", "Tailwind CSS", "Audio Processing"],
    liveUrl: "#simulator",
    repoUrl: "https://github.com/1mohsinbaba",
    codeSnippet: `// Vernacular Neural Token Streamer & Scheme Resolver
export async function POST(req: Request) {
  const { query, languagePreference, citizenProfile } = await req.json();
  
  // Real-time locale detection & dialect mapping
  const detectedLocale = languagePreference || await detectVernacular(query);
  
  // Stream response tokens via ReadableStream
  const tokenStream = await schemeNeuralEngine.generateStream({
    prompt: query,
    locale: detectedLocale,
    citizenCategory: citizenProfile?.category || 'GENERAL',
    stream: true
  });

  return new Response(tokenStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  });
}`,
    archDetails: {
      pattern: "Streaming Token Pipeline with Vernacular Dialect Adapters",
      runtime: "Next.js Route Handlers + Edge Runtime",
      database: "MongoDB Schema Registry + Local Vector Embeddings",
      security: "Govt-Grade Data Privacy + Strict PII Redaction",
    },
  },
];

export default function CaseStudies() {
  const [deviceViews, setDeviceViews] = useState<{ [key: string]: "desktop" | "mobile" }>({
    "01": "desktop",
    "02": "desktop",
    "03": "desktop",
  });

  const [activeTabs, setActiveTabs] = useState<{ [key: string]: "overview" | "architecture" | "highlights" }>({
    "01": "overview",
    "02": "overview",
    "03": "overview",
  });

  const [selectedArchModal, setSelectedArchModal] = useState<CaseStudy | null>(null);

  const toggleDevice = (num: string, mode: "desktop" | "mobile") => {
    sound.playClick();
    setDeviceViews((prev) => ({ ...prev, [num]: mode }));
  };

  const setTab = (num: string, tab: "overview" | "architecture" | "highlights") => {
    sound.playHover();
    setActiveTabs((prev) => ({ ...prev, [num]: tab }));
  };

  const openArchModal = (project: CaseStudy) => {
    sound.playClick();
    setSelectedArchModal(project);
  };

  const closeArchModal = () => {
    sound.playClick();
    setSelectedArchModal(null);
  };

  return (
    <section 
      id="projects"
      className="min-h-screen w-full bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-grid-pattern"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-900/10 rounded-full blur-[180px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <p className="text-emerald-600 dark:text-emerald-400 font-mono tracking-[0.25em] text-xs uppercase mb-3 font-semibold">
            Phase 3 : Production Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-neutral-100 dark:to-neutral-500 uppercase mb-4">
            Mission Files & Case Studies
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            High-impact production applications tested under load. Interact with live audio synthesizers, simulated webhook telemetry, and streaming vernacular AI widgets.
          </p>
        </header>

        {/* Case Studies Stack */}
        <div className="flex flex-col gap-20 w-full">
          {caseStudies.map((project, index) => {
            const currentTab = activeTabs[project.num] || "overview";
            const currentDevice = deviceViews[project.num] || "desktop";

            return (
              <div
                key={project.num}
                className="group relative flex flex-col md:flex-row gap-6 md:gap-10 w-full"
              >
                
                {/* Numeric Indicator */}
                <div className="hidden md:flex flex-col items-start w-20 shrink-0">
                  <span className="text-5xl font-black font-mono text-black/[0.08] dark:text-white/[0.08] group-hover:text-emerald-500/40 transition-colors duration-500 tracking-tighter select-none">
                    {project.num}
                  </span>
                  {index !== caseStudies.length - 1 && (
                    <div className="w-[2px] h-full bg-black/5 dark:bg-white/5 mt-4 ml-5 group-hover:bg-emerald-500/20 transition-colors duration-500" />
                  )}
                </div>

                {/* Card Container */}
                <div className="relative w-full rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 p-6 md:p-10 transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/30 backdrop-blur-xl overflow-hidden flex flex-col gap-8 shadow-lg">
                  
                  {/* Subtle Top Ambient Gradient */}
                  <div className="absolute top-0 right-0 w-64 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Header & Metrics */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-mono font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                        {project.subtitle}
                      </span>
                      <span className="md:hidden text-xs font-mono font-bold text-slate-400 dark:text-neutral-500">
                        PROJ.{project.num}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-neutral-50 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-neutral-400 mb-6 font-sans leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 mb-6">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex flex-col items-center text-center">
                          <span className="text-sm md:text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                            {m.value}
                          </span>
                          <span className="text-[10px] md:text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Sub-Navigation Tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 w-fit mb-6">
                      {(["overview", "architecture", "highlights"] as const).map((tab) => {
                        const isActive = currentTab === tab;
                        const label = tab === "overview" ? "Impact & Scope" : tab === "architecture" ? "Architecture" : "Key Highlights";
                        return (
                          <button
                            key={tab}
                            onClick={() => setTab(project.num, tab)}
                            className={`relative px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-lg text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer select-none uppercase touch-manipulation ${
                              isActive 
                                ? "text-emerald-600 dark:text-emerald-400 font-bold" 
                                : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId={`activeProjectTab-${project.num}`}
                                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-950 border border-emerald-500/30 shadow-sm"
                              />
                            )}
                            <span className="relative z-10">{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tab Contents with Framer Motion Crossfade */}
                    <div className="min-h-[90px] mb-6">
                      <AnimatePresence mode="wait">
                        {currentTab === "overview" && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-sm md:text-base text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                              {project.overview}
                            </p>
                          </motion.div>
                        )}

                        {currentTab === "architecture" && (
                          <motion.div
                            key="architecture"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-sm md:text-base text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                              {project.architecture}
                            </p>
                          </motion.div>
                        )}

                        {currentTab === "highlights" && (
                          <motion.div
                            key="highlights"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ul className="space-y-2.5">
                              {project.highlights.map((h, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-neutral-300 leading-snug">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Device Viewport Morphing Frame */}
                  <div className="w-full">
                    {/* Viewport Mode Switcher Controls */}
                    <div className="flex items-center justify-between pb-3 mb-3 text-xs font-mono">
                      <span className="text-slate-500 dark:text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Interactive Workbench Preview</span>
                      </span>

                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                        <button
                          onClick={() => toggleDevice(project.num, "desktop")}
                          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg transition-all cursor-pointer text-xs font-mono font-medium touch-manipulation ${
                            currentDevice === "desktop"
                              ? "bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm"
                              : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200"
                          }`}
                        >
                          <Laptop className="w-3.5 h-3.5" />
                          <span>Desktop View</span>
                        </button>
                        <button
                          onClick={() => toggleDevice(project.num, "mobile")}
                          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg transition-all cursor-pointer text-xs font-mono font-medium touch-manipulation ${
                            currentDevice === "mobile"
                              ? "bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm"
                              : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200"
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Mobile App</span>
                        </button>
                      </div>
                    </div>

                    {/* Smooth Morphed Preview Frame */}
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                      className={`mx-auto transition-all duration-500 overflow-hidden ${
                        currentDevice === "mobile"
                          ? "max-w-[400px] w-full rounded-[38px] border-[6px] border-slate-700/80 bg-slate-950 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
                          : "w-full rounded-2xl border border-slate-800 bg-slate-950 shadow-xl"
                      }`}
                    >
                      {/* Mobile Top Notch / Dynamic Island */}
                      {currentDevice === "mobile" && (
                        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-mono mb-2">
                          <span className="font-bold text-slate-300">09:41</span>
                          <div className="w-20 h-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-emerald-400 font-bold">5G 100%</span>
                        </div>
                      )}

                      {/* Desktop Browser Window Chrome */}
                      {currentDevice === "desktop" && (
                        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 text-neutral-400 text-[11px] truncate max-w-[200px] sm:max-w-none">
                              {project.num === "01" 
                                ? "app.dialoguedubs.io/workbench/pipeline" 
                                : project.num === "02" 
                                ? "jaavapot.com/admin/telemetry/webhooks" 
                                : "ai4tg.telangana.gov.in/msme-advisory"}
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 font-bold">
                            {project.num === "01" ? "AI DUB STUDIO" : project.num === "02" ? "COMMERCE HUB" : "GOVT AI POC"}
                          </span>
                        </div>
                      )}

                      {/* Dynamic Interactive Preview Canvas Content */}
                      <div className="p-2 sm:p-4 bg-slate-950">
                        {project.num === "01" && (
                          <DialogueDubsVisualizer isMobile={currentDevice === "mobile"} />
                        )}

                        {project.num === "02" && (
                          <JaavapotWebhookFlow isMobile={currentDevice === "mobile"} />
                        )}

                        {project.num === "03" && (
                          <MsmeChatbotWidget isMobile={currentDevice === "mobile"} />
                        )}
                      </div>

                      {/* Mobile Bottom Home Bar */}
                      {currentDevice === "mobile" && (
                        <div className="py-2 flex items-center justify-center">
                          <div className="w-24 h-1 bg-slate-700 rounded-full" />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Bottom Action Buttons & Tech Badges */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-mono tracking-wider bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-slate-700 dark:text-neutral-300 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Distinct Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => openArchModal(project)}
                        className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-800 dark:text-neutral-200 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation"
                      >
                        <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Inspect Architecture</span>
                      </button>

                      <a
                        href={project.liveUrl}
                        onClick={() => sound.playClick()}
                        className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 text-xs font-mono transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-1.5 cursor-pointer touch-manipulation"
                      >
                        <span>Live Application</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-slate-600 dark:text-neutral-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors touch-manipulation"
                        title="Repository / Case Details"
                        aria-label="View project repository and case study files"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Architecture Spec Inspector Modal */}
      <AnimatePresence>
        {selectedArchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl rounded-3xl bg-slate-950 border border-emerald-500/40 p-6 md:p-8 text-neutral-100 shadow-2xl font-mono overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Architectural Blueprint : {selectedArchModal.title}
                  </span>
                </div>
                <button
                  onClick={closeArchModal}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="overflow-y-auto space-y-6 pr-1 scrollbar-thin">
                {/* Architecture Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      <span>Architecture Pattern</span>
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedArchModal.archDetails.pattern}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Server className="w-3 h-3 text-cyan-400" />
                      <span>Runtime Environment</span>
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedArchModal.archDetails.runtime}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Layers className="w-3 h-3 text-indigo-400" />
                      <span>Persistence & Storage</span>
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedArchModal.archDetails.database}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Security & Verification</span>
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {selectedArchModal.archDetails.security}
                    </span>
                  </div>
                </div>

                {/* Formatted Code Snippet */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Production Contract</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      TypeScript
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed text-emerald-300 overflow-x-auto">
                    <code>{selectedArchModal.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Ready for enterprise technical review
                </span>
                <button
                  onClick={closeArchModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
