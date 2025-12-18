import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="h-screen w-full bg-black flex flex-col items-center justify-center gap-4 z-50"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"></div>
        <Loader2
          className="relative z-10 text-blue-500 animate-spin"
          size={48}
          aria-label="Loading content"
        />
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-bold tracking-widest text-xl font-almarena">11X</span>
        <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] animate-pulse">
            Initializing...
        </span>
      </div>
    </div>
  );
}