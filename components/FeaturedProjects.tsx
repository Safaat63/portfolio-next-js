import { CloudImage } from "@/components/ui/CloudImage";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Project } from "@/lib/types";
import { withTransform } from "@/lib/cloudinary";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <GlassCard className="p-10 text-center text-zinc-400">
        Featured projects are on the way. Check back soon.
      </GlassCard>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="code-tag">&lt;featured-work /&gt;</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
        </div>
        <Link href="/contact" className="btn-ghost !py-2 text-sm">
          Have a project in mind?
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <GlassCard
            key={project.id}
            className="glass-hover group flex flex-col overflow-hidden p-0"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              {project.imageUrl ? (
                <CloudImage
                  src={withTransform(project.imageUrl, "w_1200,q_auto,f_auto")}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-zinc-900/60 border-b border-white/5">
                  <FolderGit2 className="h-12 w-12 text-zinc-600" />
                </div>
              )}
              {project.featured && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-yellow-400 backdrop-blur-md">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-yellow-400">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="font-mono text-[11px] text-zinc-500">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4" />
                    Source
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
