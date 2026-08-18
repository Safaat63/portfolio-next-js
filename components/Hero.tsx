"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

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
    <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-teal-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Open to new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl"
          >
            Frontend Developer at{" "}
            <span className="text-gradient">MiftahCoding</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex h-10 items-center gap-2 font-mono text-lg text-slate-300 sm:text-xl"
          >
            <span className="text-teal-300">&gt;</span>
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
            <span className="animate-pulse text-teal-300">_</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400"
          >
            I design and build resilient, human-centered digital ecosystems — from
            glassmorphic interfaces to full-stack products powered by serverless
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-1/2"
          >
            <Image
              src="/Three-Bodies-Problem.png"
              alt=""
              width={1080}
              height={1080}
              className="h-[170%] w-auto object-contain opacity-40 blur-2xl"
            />
          </motion.div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
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
                <span className="font-mono text-3xl font-bold text-gradient">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
