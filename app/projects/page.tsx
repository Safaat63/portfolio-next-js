"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-gray-600 mb-12">
        Explore a selection of my recent work and personal projects
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-8">{error}</div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">
            No projects yet. Check back soon! (Manage projects in the admin
            dashboard)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
