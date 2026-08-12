export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950 bg-ambient-canvas"
    >
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-[120px] animate-orb-drift" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[140px] animate-orb-drift-slow" />
      <div className="absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-violet-600/20 blur-[120px] animate-orb-drift" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] opacity-60 [background-size:32px_32px]" />
    </div>
  );
}
