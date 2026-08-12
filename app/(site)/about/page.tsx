import type { Metadata } from "next";
import { User, GraduationCap, Briefcase } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Timeline, type Milestone } from "@/components/Timeline";
import { SkillSlider, type Skill } from "@/components/SkillSlider";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind MiftahCoding — frontend engineering, design systems, and the milestones along the way.",
};

const milestones: Milestone[] = [
  {
    year: "2024",
    title: "MiftahCoding Is Born",
    description:
      "Launched MiftahCoding as a digital ecosystem: a portfolio, content hub, and admin suite built on a serverless stack.",
    icon: "rocket",
  },
  {
    year: "2025",
    title: "Nexus Admin Ecosystem",
    description:
      "Shipped a unified glassmorphic control plane with messaging, content pipelines, and cloud media workflows.",
    icon: "code",
  },
  {
    year: "2026",
    title: "Client Projects & Recognition",
    description:
      "Delivered production web experiences for clients, focused on performance budgets and accessible design systems.",
    icon: "award",
  },
  {
    year: "Now",
    title: "Building the Next Chapter",
    description:
      "Exploring realtime collaboration, edge rendering, and AI-assisted design tooling for the open web.",
    icon: "globe",
  },
];

const skills: Skill[] = [
  {
    name: "React / Next.js",
    level: 95,
    blurb: "Server components, streaming, and app router architecture.",
  },
  {
    name: "TypeScript",
    level: 92,
    blurb: "Strict typing, generics, and type-safe server actions.",
  },
  {
    name: "Tailwind CSS",
    level: 94,
    blurb: "Design tokens, glassmorphic systems, and responsive layouts.",
  },
  {
    name: "PostgreSQL / Neon",
    level: 86,
    blurb: "Serverless Postgres, raw SQL, and data modeling.",
  },
  {
    name: "Motion & Interaction",
    level: 88,
    blurb: "Framer Motion page transitions and micro-interactions.",
  },
  {
    name: "Cloud & Email",
    level: 82,
    blurb: "Cloudinary media pipelines and Resend transactional email.",
  },
];

export default async function AboutPage() {
  const [projectRows] = await Promise.all([
    sql`SELECT count(*)::int AS count FROM projects`,
  ]);
  const projectCount = projectRows[0]?.count ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <div className="mb-14 text-center">
        <p className="font-mono text-sm text-teal-300">&lt;about-me /&gt;</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Engineer. Builder. <span className="text-gradient">Problem Solver.</span>
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/15 text-teal-300">
              <User className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-semibold text-white">Who I Am</h2>
          </div>
          <p className="mt-4 leading-relaxed text-slate-300">
            I&apos;m a frontend developer and Next.js architect who cares about
            the details most users never notice — the 60fps scroll, the
            animation that doesn&apos;t stutter, the form that validates before
            you finish typing.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            My work spans the full stack: glassmorphic interface systems,
            serverless Postgres on Neon, edge authentication, cloud media
            delivery, and transactional email. Every project is treated as an
            ecosystem — resilient, measurable, and human-centered.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            I&apos;ve shipped {projectCount}+ projects and counting, each one a
            chance to push a little harder on performance, accessibility, and
            craft.
          </p>
        </GlassCard>

        <div className="flex flex-col gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-white">Focus Areas</h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                Frontend Architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Design Systems & UI Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Full-Stack Product Work
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/15 text-violet-300">
                <Briefcase className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-white">Currently</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Open to freelance projects and full-time frontend engineering
              roles. Let&apos;s build something worth shipping.
            </p>
          </GlassCard>
        </div>
      </div>

      <section className="mt-20">
        <div className="mb-10 text-center">
          <p className="font-mono text-sm text-teal-300">&lt;journey /&gt;</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Milestone <span className="text-gradient">Timeline</span>
          </h2>
        </div>
        <Timeline milestones={milestones} />
      </section>

      <section className="mt-20">
        <div className="mb-10 text-center">
          <p className="font-mono text-sm text-teal-300">&lt;skills /&gt;</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Mastery <span className="text-gradient">Levels</span>
          </h2>
        </div>
        <SkillSlider skills={skills} />
      </section>
    </div>
  );
}
