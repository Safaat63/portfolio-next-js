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

const styles = {
  main: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1.5rem",
  },
  containerLg: {
    paddingLeft: "5rem",
    paddingRight: "5rem",
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
  loadingContainer: {
    textAlign: "center" as const,
  },
  loadingText: {
    color: "#4b5563",
  },
  header: {
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  subtitle: {
    color: "#4b5563",
    marginBottom: "3rem",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "2rem",
  },
  emptyState: {
    textAlign: "center" as const,
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
  emptyText: {
    color: "#6b7280",
  },
  grid: {
    display: "grid" as const,
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
  gridMd: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  gridLg: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    overflow: "hidden" as const,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
    transition: "box-shadow 0.3s ease",
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  cardHover: {
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
  },
  cardImage: {
    width: "100%",
    height: "12rem",
    objectFit: "cover" as const,
    backgroundColor: "#e5e7eb",
  },
  cardContent: {
    padding: "1.5rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    flex: 1,
    gap: "1rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
  },
  cardDescription: {
    color: "#4b5563",
    fontSize: "0.875rem",
  },
  techStack: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: "0.5rem",
  },
  techTag: {
    fontSize: "0.75rem",
    backgroundColor: "#f0fdfa",
    color: "#0d9488",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontWeight: "600",
    border: "1px solid #a7f3d0",
  },
  cardLinks: {
    display: "flex" as const,
    gap: "0.75rem",
    marginTop: "auto",
    paddingTop: "1rem",
  },
  link: {
    fontSize: "0.875rem",
    color: "#0d9488",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
      setIsLg(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <main style={styles.main}>
        <div style={{ ...styles.container, ...styles.loadingContainer }}>
          <p style={styles.loadingText}>Loading projects...</p>
        </div>
      </main>
    );

  return (
    <main style={styles.main}>
      <div style={{ ...styles.container, ...(isMd && styles.containerLg) }}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Projects</h1>
          <p style={styles.subtitle}>
            Explore a selection of my recent work and personal projects
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>{error}</div>
        )}

        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              No projects yet. Check back soon! (Manage projects in the admin
              dashboard)
            </p>
          </div>
        ) : (
          <div style={{ ...styles.grid, ...(isMd && styles.gridMd), ...(isLg && styles.gridLg) }}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
                }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={styles.cardImage}
                  />
                )}
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{project.title}</h2>
                  <p style={styles.cardDescription}>{project.description}</p>

                  {project.tech.length > 0 && (
                    <div style={styles.techStack}>
                      {project.tech.map((t) => (
                        <span key={t} style={styles.techTag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={styles.cardLinks}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#099268")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#099268")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
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
    </main>
  );
}
