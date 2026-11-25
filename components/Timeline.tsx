"use client";

import { motion } from "framer-motion";
import { Rocket, Code, Award, Globe } from "lucide-react";

export type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: "rocket" | "code" | "award" | "globe";
};

const icons = {
  rocket: Rocket,
  code: Code,
  award: Award,
  globe: Globe,
};

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2" />

      {milestones.map((milestone, index) => {
        const Icon = icons[milestone.icon];
        const leftSide = index % 2 === 0;

        return (
          <motion.div
            key={`${milestone.year}-${milestone.title}`}
            initial={{ opacity: 0, x: leftSide ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${
              leftSide ? "sm:mr-auto sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
            }`}
          >
            <span
              className={`absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-yellow-400/40 bg-zinc-950 text-yellow-400 sm:top-0 ${
                leftSide
                  ? "sm:left-auto sm:-right-4"
                  : "sm:-left-4"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>

            <div className="glass glass-hover p-5">
              <span className="font-mono text-xs font-bold text-yellow-400">{milestone.year}</span>
              <h3 className="mt-1 font-semibold text-white">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
