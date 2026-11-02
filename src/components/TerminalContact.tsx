"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal as TerminalIcon, Copy, Check, Download, Phone, Sparkles, Gamepad2, Trophy, ArrowRight, Mail, CornerDownLeft } from "lucide-react";
import { sound } from "../utils/audio";

type HistoryEntry = {
  cmd: string;
  output: React.ReactNode;
};

interface TriviaQuestion {
  question: string;
  options: { key: "a" | "b" | "c"; text: string }[];
  answer: "a" | "b" | "c";
  explanation: string;
}

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "What is the primary architectural win of React 19 Action Hooks (useActionState)?",
    options: [
      { key: "a", text: "Replaces Redux and Zustand entirely" },
      { key: "b", text: "Automatic pending states, optimistic mutations, & async transitions" },
      { key: "c", text: "Compiles React components directly into WebAssembly" },
    ],
    answer: "b",
    explanation: "Action hooks handle pending states, optimistic mutations, and transitions natively without manual useEffect cascades.",
  },
  {
    question: "In Next.js App Router, how do React Server Components (RSC) optimize Core Web Vitals?",
    options: [
      { key: "a", text: "Disables JavaScript execution on all mobile clients" },
      { key: "b", text: "Runs all database queries inside the user's browser" },
      { key: "c", text: "Ships 0kb client JS for static subtrees & streams HTML instantly" },
    ],
    answer: "c",
    explanation: "RSC renders on the server and streams pure HTML, removing non-interactive dependencies from client bundles to achieve sub-second LCP.",
  },
  {
    question: "Which strategy guarantees zero-loss webhook processing under 10× traffic surges?",
    options: [
      { key: "a", text: "Idempotency keys, HMAC signature check & async Redis queue workers" },
      { key: "b", text: "Synchronous database table locks on every incoming HTTP POST" },
      { key: "c", text: "Increasing client timeout to 120 seconds" },
    ],
    answer: "a",
    explanation: "Idempotency keys prevent duplicate charges, HMAC verifies authenticity, and background queues prevent server memory exhaustion.",
  },
];

// Lightweight Canvas Confetti Burst
function ConfettiCanvas({ onDone }: { onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#10b981", "#06b6d4", "#6366f1", "#f59e0b", "#ec4899", "#ffffff"];
    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 8,
      gravity: 0.38,
      drag: 0.985,
      alpha: 1,
    }));

    let animId: number;
    let elapsed = 0;

    const render = () => {
      elapsed++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;
        if (elapsed > 60) {
          p.alpha -= 0.015;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (elapsed < 140) {
        animId = requestAnimationFrame(render);
      } else {
        onDone?.();
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}

export default function TerminalContact() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      cmd: "system --status",
      output: (
        <span className="text-emerald-400">
          All systems operational. Gateway listening on port 443. Clearance Level 5 verified.
        </span>
      ),
    },
    {
      cmd: "help",
      output: (
        <div className="text-neutral-300 leading-relaxed font-mono text-xs sm:text-sm">
          <p className="text-neutral-400 mb-2">Available protocols (type command and press Enter):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <div><span className="text-emerald-400 font-bold">contact</span> : View email & direct voice coordinates</div>
            <div><span className="text-emerald-400 font-bold">resume</span>  : Download technical dossier (DOCX)</div>
            <div><span className="text-emerald-400 font-bold">game</span>    : Launch interactive Cyber Trivia arcade</div>
            <div><span className="text-emerald-400 font-bold">skills</span>  : Output verified competency matrix</div>
            <div><span className="text-emerald-400 font-bold">projects</span>: Display production case studies</div>
            <div><span className="text-emerald-400 font-bold">hire</span>    : Execute VIP instant hiring handshake</div>
            <div><span className="text-emerald-400 font-bold">clear</span>   : Flush terminal display buffer</div>
          </div>
        </div>
      ),
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  // Playable Trivia Game State
  const [gameActive, setGameActive] = useState(false);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [score, setScore] = useState(0);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const autoTypingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Internal terminal scrolling
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Clean up any active auto-typing interval on component unmount
  useEffect(() => {
    return () => {
      if (autoTypingTimerRef.current) clearInterval(autoTypingTimerRef.current);
    };
  }, []);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
  }, []);

  // Auto-typing command animation for shortcut buttons
  const autoTypeCommand = (cmdText: string) => {
    if (isAutoTyping) return;
    if (autoTypingTimerRef.current) clearInterval(autoTypingTimerRef.current);
    setIsAutoTyping(true);
    setInputVal("");
    let charIdx = 0;

    autoTypingTimerRef.current = setInterval(() => {
      charIdx++;
      const current = cmdText.slice(0, charIdx);
      setInputVal(current);
      sound.playTypeKey();

      if (charIdx >= cmdText.length) {
        if (autoTypingTimerRef.current) clearInterval(autoTypingTimerRef.current);
        setTimeout(() => {
          executeCommand(cmdText);
          setInputVal("");
          setIsAutoTyping(false);
        }, 130);
      }
    }, 40);
  };

  // Answer handler for the interactive Trivia Quiz
  const handleAnswerSubmit = (chosenKey: "a" | "b" | "c") => {
    const q = TRIVIA_QUESTIONS[currentQIdx];
    const isCorrect = chosenKey === q.answer;
    const nextScore = isCorrect ? score + 1 : score;

    sound.playClick();
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playLaser();
    }

    const questionResult = (
      <div className="p-3 my-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>✔ CORRECT (+100 PTS)</span>
            </span>
          ) : (
            <span className="text-red-400 font-bold flex items-center gap-1">
              <span>✖ INCORRECT</span>
            </span>
          )}
          <span className="text-slate-400 text-[10px]">
            Correct Answer: [{q.answer.toUpperCase()}]
          </span>
        </div>
        <p className="text-neutral-300 font-sans">{q.explanation}</p>
      </div>
    );

    setHistory((prev) => [
      ...prev,
      {
        cmd: `answer --option ${chosenKey.toUpperCase()}`,
        output: questionResult,
      },
    ]);

    const nextQIdx = currentQIdx + 1;
    if (nextQIdx < TRIVIA_QUESTIONS.length) {
      setCurrentQIdx(nextQIdx);
      setScore(nextScore);
      // Present next question
      const nextQ = TRIVIA_QUESTIONS[nextQIdx];
      setHistory((prev) => [
        ...prev,
        {
          cmd: `trivia --question 0${nextQIdx + 1}`,
          output: renderQuestionPrompt(nextQ, nextQIdx),
        },
      ]);
    } else {
      // Quiz Complete!
      setGameActive(false);
      setScore(nextScore);
      sound.playFanfare();
      triggerConfetti();

      setHistory((prev) => [
        ...prev,
        {
          cmd: "trivia --complete",
          output: (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/50 text-neutral-100 font-mono text-xs sm:text-sm space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Trophy className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>🎉 TRIVIA PROTOCOL COMPLETE: {nextScore}/{TRIVIA_QUESTIONS.length} SCORE!</span>
              </div>
              <p className="text-neutral-300 font-sans">
                {nextScore === 3
                  ? "Flawless score! Verified Mastery across React 19 Action Hooks, Next.js App Router RSC, and Resilient Microservices."
                  : "Great run! All answers validated against enterprise architectural standards."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
                  Clearance Level 5: Granted
                </span>
                <button
                  onClick={() => autoTypeCommand("hire")}
                  className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Handshake & Hire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ),
        },
      ]);
    }
  };

  const renderQuestionPrompt = (q: TriviaQuestion, idx: number) => {
    return (
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-neutral-200 font-mono text-xs space-y-2.5">
        <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px]">
          <span>QUESTION {idx + 1} OF {TRIVIA_QUESTIONS.length}</span>
          <span className="text-emerald-400">Score: {score}</span>
        </div>
        <p className="text-neutral-100 font-sans text-sm font-semibold">{q.question}</p>
        <div className="flex flex-col gap-1.5 pt-1">
          {q.options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleAnswerSubmit(opt.key)}
              className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-left transition-all text-xs flex items-center gap-2 cursor-pointer group"
            >
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold uppercase text-[10px] group-hover:bg-emerald-500 group-hover:text-slate-950">
                {opt.key}
              </span>
              <span className="text-neutral-300 group-hover:text-white font-sans">{opt.text}</span>
            </button>
          ))}
        </div>
        <div className="text-[10px] text-slate-400 pt-1 font-mono">
          Tip: Click an option or type &apos;a&apos;, &apos;b&apos;, &apos;c&apos; and hit Enter.
        </div>
      </div>
    );
  };

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    // If game is active, intercept 'a', 'b', 'c' or 'quit'
    if (gameActive) {
      if (cmd === "a" || cmd === "b" || cmd === "c") {
        handleAnswerSubmit(cmd);
        return;
      }
      if (cmd === "quit" || cmd === "exit") {
        setGameActive(false);
        setHistory((prev) => [
          ...prev,
          {
            cmd: rawCmd,
            output: <span className="text-neutral-400 font-mono text-xs">Trivia arcade session closed.</span>,
          },
        ]);
        return;
      }
    }

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="text-neutral-300 leading-relaxed font-mono text-xs sm:text-sm">
            <p className="text-neutral-400 mb-2">Available protocols:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">contact</span> : Email & direct voice coordinates</div>
              <div><span className="text-emerald-400 font-bold">resume</span>  : Download verified resume dossier</div>
              <div><span className="text-emerald-400 font-bold">game</span>    : Play terminal cyber trivia quiz</div>
              <div><span className="text-emerald-400 font-bold">skills</span>  : Core architecture competencies</div>
              <div><span className="text-emerald-400 font-bold">projects</span>: Signature case studies</div>
              <div><span className="text-emerald-400 font-bold">hire</span>    : VIP hiring handshake</div>
              <div><span className="text-emerald-400 font-bold">clear</span>   : Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "game":
      case "play":
      case "trivia": {
        setGameActive(true);
        setCurrentQIdx(0);
        setScore(0);
        const q0 = TRIVIA_QUESTIONS[0];
        output = (
          <div className="space-y-3 font-mono">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>TERMINAL MINI-GAME : FULL-STACK & REACT ARCHITECTURE TRIVIA</span>
            </div>
            {renderQuestionPrompt(q0, 0)}
          </div>
        );
        break;
      }

      case "hire":
      case "sudo hire":
      case "sudo hire mohsin":
        triggerConfetti();
        sound.playFanfare();
        output = (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-900 border border-emerald-500/60 text-neutral-100 font-mono text-xs sm:text-sm leading-relaxed shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>★ VIP EXECUTIVE HIRING DOSSIER ★</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                CLEARANCE: L5 VERIFIED
              </span>
            </div>

            <div className="space-y-1 text-xs text-neutral-300 font-mono">
              <div><span className="text-slate-400">Candidate: </span><strong className="text-white">Mohsin Baba</strong></div>
              <div><span className="text-slate-400">Domain: </span>Senior Frontend & Full-Stack Architect (3+ Yrs Exp.)</div>
              <div><span className="text-slate-400">Key Impact: </span>10× Traffic Surge Scaling • -40% Latency Reduction • 99.9% Production SLA</div>
              <div><span className="text-slate-400">Availability: </span>Immediate / Flexible Notice (Hyderabad & Remote)</div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="mailto:1mohsinbaba@gmail.com?subject=Offer%20/%20Interview%20Invitation%20for%20Mohsin%20Baba&body=Hi%20Mohsin,%0A%0AWe%20reviewed%20your%20portfolio%20and%20would%20love%20to%20schedule%20a%20technical%20interview."
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Schedule Interview / Send Offer</span>
              </a>
              <a
                href="tel:+916360463695"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call: +91 63604 63695</span>
              </a>
              <a
                href="/resume/frontend_cv_mohsin.docx"
                download="frontend_cv_mohsin.docx"
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        );
        break;

      case "contact":
      case "contact --email":
      case "email":
        output = (
          <div className="flex flex-col gap-2 font-mono text-xs sm:text-sm">
            <div>
              <span className="text-neutral-400">Email: </span>
              <a
                href="mailto:1mohsinbaba@gmail.com"
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
              >
                1mohsinbaba@gmail.com
              </a>
            </div>
            <div>
              <span className="text-neutral-400">Voice / WhatsApp: </span>
              <a
                href="tel:+916360463695"
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
              >
                +91 63604 63695
              </a>
            </div>
            <div className="text-neutral-400">
              Location: Hyderabad, Telangana, India (Open to Remote / Hybrid)
            </div>
          </div>
        );
        break;

      case "phone":
      case "contact --phone":
        output = (
          <div className="font-mono text-xs sm:text-sm">
            <span className="text-neutral-400">Voice Line: </span>
            <a href="tel:+916360463695" className="text-emerald-400 font-semibold underline">
              +91 63604 63695
            </a>
          </div>
        );
        break;

      case "resume":
      case "download":
      case "download --resume":
        sound.playSuccess();
        output = (
          <div className="font-mono text-xs sm:text-sm">
            <p className="text-neutral-300 mb-1">Transferring verified technical dossier from storage...</p>
            <a
              href="/resume/frontend_cv_mohsin.docx"
              download="frontend_cv_mohsin.docx"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>frontend_cv_mohsin.docx (Click to Download)</span>
            </a>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p className="text-emerald-400 font-bold mb-1">CORE ARCHITECTURE & SYSTEMS:</p>
            <p className="mb-2">TypeScript • React 19 • Next.js 16 • React Native • Node.js • Express • Redux Toolkit</p>
            <p className="text-emerald-400 font-bold mb-1">DATA & CLOUD INFRASTRUCTURE:</p>
            <p>MongoDB • Cosmos DB • SQL Server • RESTful / GraphQL APIs • Azure Blob & App Service • Razorpay</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="font-mono text-xs sm:text-sm text-neutral-300 space-y-2">
            <div>
              <span className="text-emerald-400 font-bold">1. Dialogue Dubs:</span> Full-stack AI speech & localization microservices (Azure, Cosmos DB, React).
            </div>
            <div>
              <span className="text-emerald-400 font-bold">2. The JaavaPot:</span> Omnichannel commerce platform (React Native mobile, Web, Razorpay, DigitalOcean).
            </div>
            <div>
              <span className="text-emerald-400 font-bold">3. MSME Chat-bot:</span> Telangana Govt AI scheme advisory portal (Multilingual, audio/text queries).
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Senior Frontend & Full-Stack Developer with 3+ years building scalable MERN web and mobile apps.
            Proven track record scaling APIs for 10× traffic spikes, slashing page load times by 40%, and elevating user retention by 25%.
          </p>
        );
        break;

      case "whoami":
        output = (
          <span className="text-cyan-400 font-mono text-xs sm:text-sm">
            Distinguished engineering leader / recruiter reviewing Mohsin Baba&apos;s technical portfolio.
          </span>
        );
        break;

      case "sudo":
        output = (
          <span className="text-red-400 font-mono text-xs sm:text-sm">
            Access denied: Guest user cannot elevate privileges. Try &apos;hire&apos; for instant administrative handshake.
          </span>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        output = (
          <span className="text-red-400 font-mono text-xs sm:text-sm">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-emerald-400 underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for protocol list.
          </span>
        );
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal("");
        }
      }
    } else {
      // Play subtle mechanical key sound
      sound.playTypeKey();
    }
  };

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText("1mohsinbaba@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sound.playSuccess();
    navigator.clipboard.writeText("+916360463695");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full bg-zinc-50 dark:bg-slate-950 text-slate-900 dark:text-neutral-50 py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 bg-dot-pattern"
    >
      {/* Canvas Confetti Burst Overlay */}
      {showConfetti && <ConfettiCanvas onDone={() => setShowConfetti(false)} />}

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/20 dark:bg-emerald-900/30 rounded-full blur-[170px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* Header */}
        <header className="mb-12 text-center">
          <p className="text-emerald-600 dark:text-emerald-400 font-mono tracking-[0.25em] text-xs uppercase mb-3 font-semibold">
            Phase 4 : Direct Terminal Access
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-neutral-100 dark:to-neutral-500 uppercase mb-4">
            Interactive Terminal
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-neutral-400 max-w-xl mx-auto">
            Execute terminal protocols or click shortcuts below. Features auto-typing, trivia mini-game, and VIP hire handshake.
          </p>
        </header>

        {/* Terminal Shell Window */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="w-full rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col transition-all cursor-text"
        >
          {/* Top Title Bar */}
          <div className="bg-slate-900/90 px-4 md:px-6 py-3 border-b border-slate-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-neutral-400 font-medium">
                guest@mohsinbaba-terminal:~
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>BASH 5.2</span>
              </span>
              <TerminalIcon className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Terminal Logs & Output */}
          <div
            ref={terminalBodyRef}
            className="p-5 md:p-7 min-h-[360px] max-h-[500px] overflow-y-auto font-mono text-xs sm:text-sm flex flex-col gap-4 text-neutral-100 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {history.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-emerald-400 font-bold">guest@mohsinbaba:~$</span>
                  <span className="text-neutral-100 font-semibold">{item.cmd}</span>
                </div>
                <div className="pl-0 sm:pl-4 mt-1.5">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Interactive Prompt Input Line */}
            <div className="flex items-center gap-2 mt-4 text-emerald-400 font-bold">
              <span className="shrink-0 text-xs sm:text-sm">guest@mohsinbaba:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAutoTyping ? "" : "type 'help', 'game', 'hire', 'resume'..."}
                disabled={isAutoTyping}
                className="w-full bg-transparent text-neutral-100 font-mono text-sm focus:outline-none placeholder:text-neutral-600 caret-emerald-400 py-1"
                autoComplete="off"
                spellCheck="false"
              />
              {/* Virtual On-Screen Mobile Enter / Run Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (inputVal.trim()) {
                    executeCommand(inputVal);
                    setInputVal("");
                  }
                }}
                disabled={!inputVal.trim() || isAutoTyping}
                aria-label="Run command in terminal"
                className={`sm:hidden shrink-0 px-3 py-2 min-h-[44px] min-w-[44px] rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer touch-manipulation ${inputVal.trim()
                    ? "bg-emerald-500 text-slate-950 shadow-md active:scale-95"
                    : "bg-slate-800/50 text-slate-500 opacity-60 pointer-events-none"
                  }`}
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Virtual Tap Quick Command Palette */}
            <div className="sm:hidden pt-3 border-t border-slate-800/70 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono select-none">
              <span className="text-neutral-500 text-[10px] shrink-0 uppercase tracking-wider">Quick:</span>
              {(["help", "skills", "projects", "game", "hire", "contact", "clear"] as const).map((cmd) => (
                <button
                  key={cmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    autoTypeCommand(cmd);
                  }}
                  className="px-2.5 py-1.5 min-h-[40px] rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-emerald-400 font-semibold shrink-0 flex items-center justify-center active:scale-95 transition-all touch-manipulation"
                >
                  ${cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons Interface */}
          <div className="bg-slate-900/80 border-t border-slate-800 p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 select-none">

            {/* Shortcut Buttons with Auto-Typing Animation */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); autoTypeCommand("contact"); }}
                aria-label="Run contact command in terminal"
                className="px-3.5 py-2.5 min-h-[44px] bg-slate-800 hover:bg-slate-700 text-neutral-200 border border-slate-700 rounded-lg text-xs font-mono transition-all cursor-pointer hover:border-emerald-500/40 flex items-center justify-center touch-manipulation"
              >
                $ contact
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); autoTypeCommand("game"); }}
                aria-label="Launch interactive cyber arcade trivia game"
                className="px-3.5 py-2.5 min-h-[44px] bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] touch-manipulation"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>$ game</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); autoTypeCommand("hire"); }}
                aria-label="Execute VIP instant hiring protocol"
                className="px-3.5 py-2.5 min-h-[44px] bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 font-bold hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] touch-manipulation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>$ hire</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); autoTypeCommand("resume"); }}
                aria-label="Run resume command in terminal"
                className="px-3.5 py-2.5 min-h-[44px] bg-slate-800 hover:bg-slate-700 text-neutral-200 border border-slate-700 rounded-lg text-xs font-mono transition-all cursor-pointer hover:border-emerald-500/40 flex items-center justify-center touch-manipulation"
              >
                $ resume
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); autoTypeCommand("clear"); }}
                aria-label="Clear terminal console display buffer"
                className="px-3.5 py-2.5 min-h-[44px] bg-slate-800/60 hover:bg-slate-700 text-neutral-400 border border-slate-700/60 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center justify-center touch-manipulation"
              >
                $ clear
              </button>
            </div>

            {/* Quick Copy Action Shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); copyEmail(); }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer touch-manipulation"
                title="Copy Email to Clipboard"
                aria-label="Copy Email address to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); copyPhone(); }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer touch-manipulation"
                title="Copy Phone to Clipboard"
                aria-label="Copy phone number to clipboard"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? "Phone Copied!" : "Copy Phone"}</span>
              </button>
            </div>
            title="Copy Phone to Clipboard"
            aria-label="Copy phone number to clipboard"
              >
            {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
            <span>{copiedPhone ? "Phone Copied!" : "Copy Phone"}</span>
          </button>
        </div>

      </div>

    </div>
      </div >
    </section >
  );
}
