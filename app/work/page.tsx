"use client";

import { useEffect, useState } from "react";

type Work = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
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
  timeline: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "2rem",
  },
  timelineItem: {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    padding: "1.5rem",
    borderLeft: "4px solid #0d9488",
    transition: "box-shadow 0.3s ease",
  },
  itemHeader: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.5rem",
  },
  itemRole: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
  },
  itemCompany: {
    color: "#0d9488",
    fontWeight: "600",
  },
  itemDuration: {
    fontSize: "0.875rem",
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.25rem",
  },
  itemDescription: {
    color: "#374151",
    marginTop: "0.75rem",
    lineHeight: "1.6",
  },
};

export default function WorkPage() {
  const [workEntries, setWorkEntries] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchWork() {
      try {
        const res = await fetch("/api/work");
        if (!res.ok) throw new Error("Failed to fetch work history");
        const data = await res.json();
        setWorkEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading work history");
      } finally {
        setLoading(false);
      }
    }
    fetchWork();
  }, []);

  if (loading)
    return (
      <main style={styles.main}>
        <div style={{ ...styles.container, ...styles.loadingContainer }}>
          <p style={styles.loadingText}>Loading work history...</p>
        </div>
      </main>
    );

  return (
    <main style={styles.main}>
      <div style={{ ...styles.container, ...(isMd && styles.containerLg) }}>
        <div style={styles.header}>
          <h1 style={styles.title}>Work Experience</h1>
          <p style={styles.subtitle}>
            My professional journey and career highlights
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>{error}</div>
        )}

        {workEntries.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              No work entries yet. (Add work experience in the admin dashboard)
            </p>
          </div>
        ) : (
          <div style={styles.timeline}>
            {workEntries.map((work) => (
              <div
                key={work.id}
                style={styles.timelineItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                }}
              >
                <div style={styles.itemHeader}>
                  <div>
                    <h2 style={styles.itemRole}>{work.role}</h2>
                    <p style={styles.itemCompany}>{work.company}</p>
                  </div>
                  <span style={styles.itemDuration}>
                    {work.duration}
                  </span>
                </div>
                {work.description && (
                  <p style={styles.itemDescription}>
                    {work.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
