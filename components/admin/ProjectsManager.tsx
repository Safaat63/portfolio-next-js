"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  LoaderCircle,
  Save,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { CldUploadWrapper } from "@/components/CldUploadWrapper";
import {
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  type ActionResult,
} from "@/app/actions";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectFormValue = {
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: string;
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  featured: boolean;
};

const emptyForm: ProjectFormValue = {
  title: "",
  slug: "",
  description: "",
  content: "",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
  featured: false,
};

function toForm(project: Project | null): ProjectFormValue {
  if (!project) return emptyForm;
  return {
    title: project.title,
    slug: project.slug,
    description: project.description,
    content: project.content,
    techStack: project.techStack.join(", "),
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    imageUrl: project.imageUrl ?? "",
    featured: project.featured,
  };
}

export function ProjectsManager({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormValue>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm(toForm(project));
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
      description: form.description,
      content: form.content,
      techStack: form.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      imageUrl: form.imageUrl,
      featured: form.featured,
    };

    let result: ActionResult;
    if (editing) {
      result = await updateProject(editing.id, payload);
    } else {
      result = await createProject(payload);
    }

    setSaving(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    closeModal();
    router.refresh();
  };

  const handleToggleFeatured = async (project: Project) => {
    setBusyId(project.id);
    await toggleProjectFeatured(project.id, !project.featured);
    setBusyId(null);
    router.refresh();
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setBusyId(project.id);
    await deleteProject(project.id);
    setBusyId(null);
    router.refresh();
  };

  const updateField = <K extends keyof ProjectFormValue>(key: K, value: ProjectFormValue[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{projects.length} projects in the database</p>
        <button type="button" onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <GlassCard className="p-10 text-center text-slate-400">
          No projects yet. Create your first one.
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[11px] text-slate-500">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      project.featured
                        ? "border-teal-400/40 bg-teal-400/10 text-teal-300"
                        : "border-white/10 bg-white/5 text-slate-500"
                    )}
                  >
                    {project.featured ? "Featured" : "Standard"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500">/{project.slug}</p>
                <p className="mt-1 line-clamp-1 text-sm text-slate-400">{project.description}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(project)}
                  disabled={busyId === project.id}
                  title={project.featured ? "Unfeature" : "Feature"}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl border transition-all duration-200",
                    project.featured
                      ? "border-teal-400/50 bg-teal-400/15 text-teal-300"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/40 hover:text-teal-300"
                  )}
                >
                  {project.featured ? (
                    <Star className="h-4 w-4 fill-teal-300" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(project)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-sky-400/50 hover:text-sky-300"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project)}
                  disabled={busyId === project.id}
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
        <Modal
          title={editing ? "Edit Project" : "New Project"}
          onClose={closeModal}
        >
          <div className="space-y-4">
            {error && (
              <div className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="project-title" className="label-field">
                Title
              </label>
              <input
                id="project-title"
                className="input-field"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="My Amazing Project"
                required
              />
            </div>

            <div>
              <label htmlFor="project-slug" className="label-field">
                Slug <span className="normal-case text-slate-500">(auto from title if empty)</span>
              </label>
              <input
                id="project-slug"
                className="input-field"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="my-amazing-project"
              />
            </div>

            <div>
              <label htmlFor="project-desc" className="label-field">
                Description
              </label>
              <textarea
                id="project-desc"
                className="input-field resize-y"
                rows={2}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Short summary shown on cards"
              />
            </div>

            <div>
              <label htmlFor="project-content" className="label-field">
                Content
              </label>
              <textarea
                id="project-content"
                className="input-field resize-y font-mono"
                rows={5}
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder="Full case study write-up"
              />
            </div>

            <div>
              <label htmlFor="project-tech" className="label-field">
                Tech Stack <span className="normal-case text-slate-500">(comma separated)</span>
              </label>
              <input
                id="project-tech"
                className="input-field"
                value={form.techStack}
                onChange={(e) => updateField("techStack", e.target.value)}
                placeholder="Next.js, TypeScript, Tailwind CSS"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="project-live" className="label-field">
                  Live URL
                </label>
                <input
                  id="project-live"
                  type="url"
                  className="input-field"
                  value={form.liveUrl}
                  onChange={(e) => updateField("liveUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label htmlFor="project-github" className="label-field">
                  GitHub URL
                </label>
                <input
                  id="project-github"
                  type="url"
                  className="input-field"
                  value={form.githubUrl}
                  onChange={(e) => updateField("githubUrl", e.target.value)}
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            <CldUploadWrapper
              label="Project Image"
              value={form.imageUrl}
              onUploaded={(url) => updateField("imageUrl", url)}
            />

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 accent-teal-400"
              />
              <span className="text-sm text-slate-300">
                Feature this project on the homepage
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
                    Save Project
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
