export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#09090b]"
    >
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,#000_40%,transparent_100%)]" />
      {/* Subtle solid dark depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/60 to-[#09090b]" />
    </div>
  );
}
