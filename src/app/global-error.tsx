"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-neutral-100 min-h-screen flex items-center justify-center font-mono p-6">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-red-500/30 max-w-md w-full text-center shadow-2xl">
          <h2 className="text-xl font-bold text-red-400 uppercase tracking-widest mb-3">
            System Fault Detected
          </h2>
          <p className="text-xs text-neutral-400 mb-6 font-sans">
            An unexpected error occurred during execution.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-red-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-400 transition-colors cursor-pointer"
          >
            Reboot Interface
          </button>
        </div>
      </body>
    </html>
  );
}

