"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

interface WorkEntry {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
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
    entries: { display: "flex" as const, flexDirection: "column" as const, gap: "1rem" },
    card: { backgroundColor: "#fff", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", transition: "border-color 0.3s ease" },
    cardHeader: { display: "flex" as const, justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" },
    cardTitle: { fontSize: "1.125rem", fontWeight: "600", color: "#111827" },
    cardCompany: { fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" },
    cardDuration: { fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" },
    cardDesc: { color: "#4b5563" },
    cardActions: { display: "flex" as const, gap: "0.5rem" },
    editBtn: { padding: "0.5rem", color: "#0d9488", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", border: "none", transition: "background-color 0.3s ease" },
    deleteBtn: { padding: "0.5rem", color: "#dc2626", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", border: "none", transition: "background-color 0.3s ease" },
    empty: { color: "#6b7280" },
};

export default function AdminWork() {
    const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        duration: "",
        description: "",
    });

    useEffect(() => {
        fetchWorkEntries();
    }, []);

    async function fetchWorkEntries() {
        try {
            setLoading(true);
            const response = await fetch("/api/work");
            if (response.ok) {
                const data = await response.json();
                setWorkEntries(data);
            }
        } catch (error) {
            console.error("Failed to fetch work entries:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setSaving(true);
            const url = editingId ? `/api/work/${editingId}` : "/api/work";
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchWorkEntries();
                resetForm();
                alert(editingId ? "Work entry updated!" : "Work entry created!");
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save work entry");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Delete this work entry?")) return;

        try {
            const response = await fetch(`/api/work/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                await fetchWorkEntries();
                alert("Work entry deleted!");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete work entry");
        }
    }

    function startEdit(entry: WorkEntry) {
        setEditingId(entry.id);
        setFormData({
            company: entry.company,
            role: entry.role,
            duration: entry.duration,
            description: entry.description,
        });
    }

    function resetForm() {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ company: "", role: "", duration: "", description: "" });
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
                <h3 style={styles.title}>Work Experience</h3>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        style={styles.button}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#099268"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d9488"}
                    >
                        <MdAdd size={18} /> Add Work
                    </button>
                )}
            </div>

            {isAdding || editingId ? (
                <form style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Company</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
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
                            placeholder="Company name"
                        />
                    </div>

                    <div style={{ ...styles.grid, ...(true && styles.gridMd) }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Role/Position</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
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
                                placeholder="Your role"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
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
                                placeholder="e.g., Jan 2020 - Dec 2023"
                            />
                        </div>
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
                            placeholder="Describe your responsibilities and achievements..."
                        />
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
                <div style={styles.entries}>
                    {workEntries.length > 0 ? (
                        workEntries.map((entry) => (
                            <div
                                key={entry.id}
                                style={styles.card}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#0d9488"}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                            >
                                <div style={styles.cardHeader}>
                                    <div>
                                        <h4 style={styles.cardTitle}>{entry.role}</h4>
                                        <p style={styles.cardCompany}>{entry.company}</p>
                                    </div>
                                    <div style={styles.cardActions}>
                                        <button
                                            onClick={() => startEdit(entry)}
                                            style={styles.editBtn}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            title="Edit"
                                        >
                                            <MdEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(entry.id)}
                                            style={styles.deleteBtn}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fef2f2"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            title="Delete"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                                <p style={styles.cardDuration}>{entry.duration}</p>
                                <p style={styles.cardDesc}>{entry.description}</p>
                            </div>
                        ))
                    ) : (
                        <p style={styles.empty}>No work entries yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
