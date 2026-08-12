import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { sql } from "@/lib/db";
import { mapBlog } from "@/lib/types";
import { BlogCard } from "@/components/BlogCard";
import { BlogFilters } from "@/components/BlogFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on frontend engineering, Next.js architecture, glassmorphic design, and building for the modern web.",
};

type SearchParams = Promise<{ q?: string; tag?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { q, tag } = await searchParams;
  const query = q?.trim() ?? "";
  const activeTag = tag?.trim() ?? "";

  const conditions: string[] = ["published = true"];
  const values: unknown[] = [];

  if (query) {
    values.push(`%${query}%`, `%${query}%`, `%${query}%`);
    conditions.push(
      `(title ILIKE $${values.length - 2} OR excerpt ILIKE $${values.length - 1} OR content ILIKE $${values.length})`
    );
  }
  if (activeTag) {
    values.push(activeTag);
    conditions.push(`$${values.length} = ANY(tags)`);
  }

  const [blogRows, tagRows] = await Promise.all([
    sql.query(
      `SELECT * FROM blogs WHERE ${conditions.join(" AND ")} ORDER BY created_at DESC`,
      values
    ),
    sql`SELECT DISTINCT unnest(tags) AS tag FROM blogs WHERE published = true ORDER BY tag`,
  ]);

  const blogs = blogRows.map(mapBlog);
  const allTags = tagRows.map((row) => row.tag as string);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <div className="mb-10 text-center">
        <p className="font-mono text-sm text-teal-300">&lt;articles /&gt;</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          The <span className="text-gradient">Blog</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Notes on frontend engineering, architecture decisions, and building
          production software for the modern web.
        </p>
      </div>

      <div className="mb-10">
        <BlogFilters tags={allTags} />
      </div>

      {blogs.length === 0 ? (
        <div className="glass flex flex-col items-center gap-4 p-12 text-center">
          <FileText className="h-10 w-10 text-slate-600" />
          <h2 className="text-lg font-semibold text-white">No articles found</h2>
          <p className="max-w-sm text-sm text-slate-400">
            Try a different search term or clear the filters to browse everything.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
