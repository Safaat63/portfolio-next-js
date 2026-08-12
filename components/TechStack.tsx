import { Boxes } from "lucide-react";

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
];

const dotColors = [
  "bg-teal-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-teal-300",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-fuchsia-400",
  "bg-cyan-400",
  "bg-indigo-400",
  "bg-teal-500",
];

export function TechStack() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="glass relative overflow-hidden p-8">
        <div className="mb-8 flex items-center justify-center gap-3 text-center">
          <Boxes className="h-6 w-6 text-teal-300" />
          <h2 className="text-3xl font-bold text-white">
            The <span className="text-gradient">Tech Stack</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-900 to-transparent" />

          <div className="marquee-track flex w-max gap-4 py-2">
            {[...primaryStack, ...primaryStack].map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="glass glass-hover flex items-center gap-2.5 rounded-xl px-5 py-3"
              >
                <span
                  className={`h-2 w-2 rounded-full ${dotColors[index % dotColors.length]}`}
                />
                <span className="whitespace-nowrap font-mono text-sm text-slate-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400">
          A battle-tested toolkit for shipping fast, accessible, and beautiful
          web applications — from server components to serverless databases,
          edge authentication to cloud media delivery.
        </p>
      </div>
    </section>
  );
}
