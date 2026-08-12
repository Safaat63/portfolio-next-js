import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { CalendarDays, Clock, ArrowLeft, Tag } from "lucide-react";
import { sql } from "@/lib/db";
import { mapBlog } from "@/lib/types";
import { formatDate, estimateReadTime } from "@/lib/utils";
import { withTransform } from "@/lib/cloudinary";
import { CloudImage } from "@/components/ui/CloudImage";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const text = line.replace(/^#+\s+/, "").replace(/[`*_]/g, "").trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return { level, text, id };
    });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const rows = await sql`SELECT * FROM blogs WHERE slug = ${slug} AND published = true LIMIT 1`;
  const blog = rows[0] ? mapBlog(rows[0]) : null;
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const rows = await sql`SELECT * FROM blogs WHERE slug = ${slug} AND published = true LIMIT 1`;
  if (rows.length === 0) notFound();

  const blog = mapBlog(rows[0]);
  const headings = extractHeadings(blog.content);
  const readTime = estimateReadTime(blog.content);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-400">{blog.excerpt}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-teal-300"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {blog.coverImage && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
              <CloudImage
                src={withTransform(blog.coverImage, "w_1600,q_auto,f_auto")}
                alt={blog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose-blog mt-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
              components={{
                a: (props) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
                img: (props) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...props}
                    className="my-6 rounded-xl border border-white/10"
                    alt={props.alt ?? ""}
                  />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="glass sticky top-28 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                On this page
              </h2>
              <nav className="mt-3 flex flex-col gap-1.5">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="text-sm leading-snug text-slate-400 transition-colors hover:text-teal-300"
                    style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
