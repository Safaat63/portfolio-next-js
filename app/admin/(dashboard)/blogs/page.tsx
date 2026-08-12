import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { mapBlog } from "@/lib/types";
import { BlogsManager } from "@/components/admin/BlogsManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Manager",
  description: "Write, edit, publish, and manage blog posts.",
};

export default async function AdminBlogsPage() {
  const rows = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
  const blogs = rows.map(mapBlog);

  return (
    <div>
      <h2 className="text-xl font-bold text-white">Blog</h2>
      <p className="mt-1 text-sm text-slate-400">
        Write posts in Markdown, manage drafts, and publish when ready.
      </p>
      <div className="mt-6">
        <BlogsManager blogs={blogs} />
      </div>
    </div>
  );
}
