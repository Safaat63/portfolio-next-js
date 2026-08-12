"use client";

import { motion } from "framer-motion";

export type Skill = {
  name: string;
  level: number;
  blurb: string;
};

export function SkillSlider({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="glass glass-hover p-5"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{skill.name}</span>
            <span className="font-mono text-sm text-teal-300">{skill.level}%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-sky-500"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{skill.blurb}</p>
        </motion.div>
      ))}
    </div>
  );
}
