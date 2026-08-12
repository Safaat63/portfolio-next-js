import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { mapProject } from "@/lib/types";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects Manager",
  description: "Create, edit, and delete portfolio projects.",
};

export default async function AdminProjectsPage() {
  const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
  const projects = rows.map(mapProject);

  return (
    <div>
      <h2 className="text-xl font-bold text-white">Projects</h2>
      <p className="mt-1 text-sm text-slate-400">
        Full CRUD for your portfolio projects. Featured projects appear on the
        homepage.
      </p>
      <div className="mt-6">
        <ProjectsManager projects={projects} />
      </div>
    </div>
  );
}
