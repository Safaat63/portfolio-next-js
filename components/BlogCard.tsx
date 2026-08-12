import { CloudImage } from "@/components/ui/CloudImage";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Blog } from "@/lib/types";
import { formatDate, estimateReadTime } from "@/lib/utils";
import { withTransform } from "@/lib/cloudinary";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <GlassCard className="glass-hover group flex flex-col overflow-hidden p-0">
      {blog.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden">
          <CloudImage
            src={withTransform(blog.coverImage, "w_1000,q_auto,f_auto")}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(blog.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {estimateReadTime(blog.content)} min read
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-teal-300">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
          {blog.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-teal-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${blog.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassCard>
  );
}
