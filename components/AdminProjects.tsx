"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
}

const styles = {
    container: { display: "flex" as const, flexDirection: "column" as const, gap: "1.5rem" },
    header: { display: "flex" as const, justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    title: { fontSize: "1.5rem", fontWeight: "700", color: "#111827" },
    button: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#0d9488", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", transition: "background-color 0.3s ease" },
    loading: { display: "flex" as const, alignItems: "center", justifyContent: "center", height: "16rem" },
    spinner: { display: "inline-block", animation: "spin 1s linear infinite", borderRadius: "50%", height: "2rem", width: "2rem", borderWidth: "2px", borderStyle: "solid", borderColor: "#0d9488", borderTopColor: "transparent" },
    form: { display: "flex" as const, flexDirection: "column" as const, gap: "1rem", backgroundColor: "#fff", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" },
    formGroup: { display: "flex" as const, flexDirection: "column" as const },
    label: { fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" },
    input: { width: "100%", padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", fontFamily: "inherit", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
    textarea: { width: "100%", padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", fontFamily: "inherit", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
    grid: { display: "grid" as const, gridTemplateColumns: "1fr", gap: "1rem" },
    gridMd: { gridTemplateColumns: "1fr 1fr" },
    buttons: { display: "flex" as const, gap: "0.75rem", justifyContent: "flex-end" },
    cancelBtn: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", border: "1px solid #d1d5db", color: "#374151", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", transition: "background-color 0.3s ease" },
    saveBtn: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#0d9488", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", opacity: 1 },
    saveBtnDisabled: { opacity: 0.6, cursor: "not-allowed" },
    projects: { display: "grid" as const, gap: "1rem" },
    card: { backgroundColor: "#fff", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", transition: "border-color 0.3s ease" },
    cardHeader: { display: "flex" as const, justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" },
    cardTitle: { fontSize: "1.125rem", fontWeight: "600", color: "#111827" },
    cardActions: { display: "flex" as const, gap: "0.5rem" },
    cardDesc: { color: "#4b5563", marginBottom: "0.75rem" },
    cardTags: { display: "flex" as const, gap: "0.5rem", flexWrap: "wrap" as const, marginBottom: "0.75rem" },
    tag: { padding: "0.25rem 0.75rem", backgroundColor: "#f0fdfa", color: "#0d9488", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "600", border: "1px solid #a7f3d0" },
    links: { display: "flex" as const, gap: "1rem", fontSize: "0.875rem" },
    link: { color: "#0d9488", textDecoration: "none", fontWeight: "600", transition: "color 0.3s ease" },
    editBtn: { padding: "0.5rem", color: "#0d9488", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", border: "none", transition: "background-color 0.3s ease" },
    deleteBtn: { padding: "0.5rem", color: "#dc2626", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", border: "none", transition: "background-color 0.3s ease" },
    empty: { color: "#6b7280" },
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "",
        github: "",
        demo: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            setLoading(true);
            const response = await fetch("/api/projects");
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setSaving(true);
            const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    tech: formData.tech.split(",").map((t) => t.trim()),
                    github: formData.github,
                    demo: formData.demo,
                }),
            });

            if (response.ok) {
                await fetchProjects();
                resetForm();
                alert(editingId ? "Project updated!" : "Project created!");
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save project");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this project?")) return;

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchProjects();
                alert("Project deleted!");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete project");
        }
    }

    function startEdit(project: Project) {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            description: project.description,
            tech: project.tech.join(", "),
            github: project.github || "",
            demo: project.demo || "",
        });
    }

    function resetForm() {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ title: "", description: "", tech: "", github: "", demo: "" });
    }

    if (loading) {
        return (
            <div style={styles.loading}>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div style={styles.spinner} />
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Projects</h3>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        style={styles.button}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#099268"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d9488"}
                    >
                        <MdAdd size={18} /> Add Project
                    </button>
                )}
            </div>

            {isAdding || editingId ? (
                <form style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            style={styles.input}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#0d9488";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#d1d5db";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            placeholder="Project title"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={4}
                            style={styles.textarea}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#0d9488";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#d1d5db";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            placeholder="Project description..."
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Technologies (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.tech}
                            onChange={(e) =>
                                setFormData({ ...formData, tech: e.target.value })
                            }
                            style={styles.input}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#0d9488";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#d1d5db";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            placeholder="React, Next.js, Tailwind"
                        />
                    </div>

                    <div style={{ ...styles.grid, ...(true && styles.gridMd) }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>GitHub URL</label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) =>
                                    setFormData({ ...formData, github: e.target.value })
                                }
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Demo URL</label>
                            <input
                                type="url"
                                value={formData.demo}
                                onChange={(e) =>
                                    setFormData({ ...formData, demo: e.target.value })
                                }
                                style={styles.input}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                placeholder="https://demo.com"
                            />
                        </div>
                    </div>

                    <div style={styles.buttons}>
                        <button
                            type="button"
                            onClick={resetForm}
                            style={styles.cancelBtn}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                            <MdCancel size={18} /> Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            style={{ ...styles.saveBtn, ...(saving && styles.saveBtnDisabled) }}
                            onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#099268")}
                            onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = "#0d9488")}
                        >
                            <MdSave size={18} /> {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            ) : (
                <div style={styles.projects}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                style={styles.card}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#0d9488"}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                            >
                                <div style={styles.cardHeader}>
                                    <h4 style={styles.cardTitle}>{project.title}</h4>
                                    <div style={styles.cardActions}>
                                        <button
                                            onClick={() => startEdit(project)}
                                            style={styles.editBtn}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f9ff"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            title="Edit"
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            style={styles.deleteBtn}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fef2f2"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            title="Delete"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p style={styles.cardDesc}>{project.description}</p>
                                <div style={styles.cardTags}>
                                    {project.tech.map((t, i) => (
                                        <span key={i} style={styles.tag}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div style={styles.links}>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.link}
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#0a7368"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = "#0d9488"}
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
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#0a7368"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = "#0d9488"}
                                        >
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={styles.empty}>No projects yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
