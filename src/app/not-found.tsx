import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-neutral-100 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 max-w-md w-full shadow-2xl flex flex-col items-center">
        <span className="text-6xl font-black text-emerald-400 mb-2">404</span>
        <h1 className="text-xl font-bold uppercase tracking-widest text-neutral-200 mb-2">
          Sector Not Located
        </h1>
        <p className="text-xs text-neutral-400 mb-6 font-sans">
          The requested coordinate does not exist in the current deployment matrix.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
        >
          Return to Gateway
        </Link>
      </div>
    </div>
  );
}

