"use client";

import { useEffect, useRef, useState } from "react";
import { Boxes, ChevronLeft, ChevronRight } from "lucide-react";

const primaryStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Neon DB",
  "NextAuth",
  "Cloudinary",
  "PostgreSQL",
  "Node.js",
  "Docker",
  "Dokploy",
];

export function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const showControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
  };

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
  };

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const frame = requestAnimationFrame(updateArrows);
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (e.deltaY < 0 && atStart) return;
      if (e.deltaY > 0 && atEnd) return;
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      el.scrollLeft += delta;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      el.removeEventListener("wheel", onWheel);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const animateScroll = (targetLeft: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const start = el.scrollLeft;
    const distance = targetLeft - start;
    if (Math.abs(distance) < 1) return;
    const duration = 450;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.scrollLeft = start + distance * eased;
      updateArrows();
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    animateScroll(el.scrollLeft + (direction === "left" ? -amount : amount));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="glass relative overflow-hidden p-8">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <span className="code-tag mb-3">&lt;technologies /&gt;</span>
          <div className="flex items-center gap-3">
            <Boxes className="h-6 w-6 text-yellow-400" />
            <h2 className="text-3xl font-extrabold text-white">
              The <span className="text-yellow-400">Tech Stack</span>
            </h2>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={showControls}
          onMouseLeave={scheduleHide}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-950/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-950/80 to-transparent" />

          <button
            type="button"
            onClick={() => scrollBy("left")}
            aria-disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center text-white drop-shadow-md transition-all duration-300 hover:text-yellow-400 ${
              controlsVisible
                ? canScrollLeft
                  ? "opacity-100"
                  : "opacity-40"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => scrollBy("right")}
            aria-disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center text-white drop-shadow-md transition-all duration-300 hover:text-yellow-400 ${
              controlsVisible
                ? canScrollRight
                  ? "opacity-100"
                  : "opacity-40"
                : "pointer-events-none opacity-0"
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={scrollRef}
            className="no-scrollbar flex cursor-grab gap-3.5 overflow-x-auto px-16 py-2 active:cursor-grabbing"
          >
            {primaryStack.map((tech) => (
              <div
                key={tech}
                className="glass glass-hover flex shrink-0 items-center gap-2.5 rounded-xl px-5 py-3"
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="whitespace-nowrap font-mono text-sm font-medium text-zinc-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
