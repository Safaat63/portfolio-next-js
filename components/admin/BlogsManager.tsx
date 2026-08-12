"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  LoaderCircle,
  Save,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { CldUploadWrapper } from "@/components/CldUploadWrapper";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublished,
  type ActionResult,
} from "@/app/actions";
import type { Blog } from "@/lib/types";
import { cn } from "@/lib/utils";

type BlogFormValue = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  coverImage: string;
  published: boolean;
};

const emptyForm: BlogFormValue = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  coverImage: "",
  published: false,
};

function toForm(blog: Blog | null): BlogFormValue {
  if (!blog) return emptyForm;
  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    tags: blog.tags.join(", "),
    coverImage: blog.coverImage ?? "",
    published: blog.published,
  };
}

export function BlogsManager({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<BlogFormValue>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm(toForm(blog));
    setError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      coverImage: form.coverImage,
      published: form.published,
    };

    let result: ActionResult;
    if (editing) {
      result = await updateBlog(editing.id, payload);
    } else {
      result = await createBlog(payload);
    }

    setSaving(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    closeModal();
    router.refresh();
  };

  const handleTogglePublished = async (blog: Blog) => {
    setBusyId(blog.id);
    await toggleBlogPublished(blog.id, !blog.published);
    setBusyId(null);
    router.refresh();
  };

  const handleDelete = async (blog: Blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    setBusyId(blog.id);
    await deleteBlog(blog.id);
    setBusyId(null);
    router.refresh();
  };

  const updateField = <K extends keyof BlogFormValue>(key: K, value: BlogFormValue[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {blogs.length} posts ({blogs.filter((b) => b.published).length} published)
        </p>
        <button type="button" onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {blogs.length === 0 ? (
        <GlassCard className="p-10 text-center text-slate-400">
          No blog posts yet. Write your first one.
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <GlassCard key={blog.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{blog.title}</h3>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      blog.published
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                    )}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500">/{blog.slug}</p>
                <p className="mt-1 line-clamp-1 text-sm text-slate-400">{blog.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-teal-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePublished(blog)}
                  disabled={busyId === blog.id}
                  title={blog.published ? "Unpublish" : "Publish"}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl border transition-all duration-200",
                    blog.published
                      ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-emerald-400/40 hover:text-emerald-300"
                  )}
                >
                  {blog.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(blog)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-sky-400/50 hover:text-sky-300"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(blog)}
                  disabled={busyId === blog.id}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-rose-400/50 hover:text-rose-300"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? "Edit Post" : "New Post"} onClose={closeModal} className="max-w-3xl">
          <div className="space-y-4">
            {error && (
              <div className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="blog-title" className="label-field">
                Title
              </label>
              <input
                id="blog-title"
                className="input-field"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="My First Blog Post"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="blog-slug" className="label-field">
                  Slug <span className="normal-case text-slate-500">(auto from title if empty)</span>
                </label>
                <input
                  id="blog-slug"
                  className="input-field"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="my-first-post"
                />
              </div>
              <div>
                <label htmlFor="blog-tags" className="label-field">
                  Tags <span className="normal-case text-slate-500">(comma separated)</span>
                </label>
                <input
                  id="blog-tags"
                  className="input-field"
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                  placeholder="Next.js, Design, CSS"
                />
              </div>
            </div>

            <div>
              <label htmlFor="blog-excerpt" className="label-field">
                Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                className="input-field resize-y"
                rows={2}
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="Short summary shown on cards"
              />
            </div>

            <div>
              <label htmlFor="blog-content" className="label-field">
                Content <span className="normal-case text-slate-500">(Markdown supported)</span>
              </label>
              <textarea
                id="blog-content"
                className="input-field resize-y font-mono"
                rows={12}
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder={"## Heading\n\nWrite your post in Markdown...\n\n```tsx\nconst hello = 'world';\n```"}
              />
            </div>

            <CldUploadWrapper
              label="Cover Image"
              value={form.coverImage}
              onUploaded={(url) => updateField("coverImage", url)}
            />

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateField("published", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 accent-teal-400"
              />
              <span className="text-sm text-slate-300">
                Publish immediately (drafts are hidden from the public site)
              </span>
            </label>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
              <button type="button" onClick={closeModal} className="btn-ghost">
                Cancel
              </button>
              <button type="button" onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Post
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
