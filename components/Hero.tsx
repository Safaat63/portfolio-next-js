"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

const roles = [
  "Frontend Developer",
  "Next.js Architect",
  "UI Systems Builder",
  "Full-Stack Engineer",
];

export type HeroStats = {
  projects: number;
  articles: number;
  clients: number;
};

export function Hero({ stats }: { stats: HeroStats }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-mono font-medium text-zinc-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl"
          >
            Frontend Developer at{" "}
            <span className="text-yellow-400">MiftahCoding</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex h-10 items-center gap-2 font-mono text-lg text-zinc-300 sm:text-xl"
          >
            <span className="font-bold text-yellow-400">&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="animate-pulse font-bold text-yellow-400">_</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400"
          >
            I design and build resilient, human-centered digital ecosystems — from
            frosted glassmorphic interfaces to full-stack products powered by serverless
            Postgres, edge auth, and modern media pipelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/contact" className="btn-primary">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="btn-ghost">
              <FileText className="h-4 w-4" />
              Read the Blog
            </Link>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: stats.projects, label: "Projects Shipped", delay: 0.15 },
              { value: stats.articles, label: "Articles Written", delay: 0.25 },
              { value: stats.clients, label: "Happy Clients", delay: 0.35 },
              { value: "+2", label: "Years Building", delay: 0.45 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                className="glass glass-hover flex flex-col gap-1 p-6"
              >
                <span className="font-mono text-3xl font-extrabold text-yellow-400">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-zinc-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
