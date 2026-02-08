"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const styles = {
    container: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1.5rem",
    },
    header: {
        display: "flex" as const,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#111827",
    },
    editButton: {
        display: "flex" as const,
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#0d9488",
        color: "white",
        borderRadius: "0.5rem",
        transition: "background-color 0.3s ease",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        fontSize: "0.875rem",
    },
    loadingContainer: {
        display: "flex" as const,
        alignItems: "center",
        justifyContent: "center",
        height: "16rem",
    },
    spinner: {
        display: "inline-block",
        animation: "spin 1s linear infinite",
        borderRadius: "50%",
        height: "2rem",
        width: "2rem",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#0d9488",
        borderTopColor: "transparent",
    },
    form: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1rem",
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
    },
    formGroup: {
        display: "flex" as const,
        flexDirection: "column" as const,
    },
    label: {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "0.5rem",
    },
    input: {
        width: "100%",
        padding: "0.5rem 1rem",
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        fontFamily: "inherit",
    },
    textarea: {
        width: "100%",
        padding: "0.5rem 1rem",
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontFamily: "inherit",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    grid: {
        display: "grid" as const,
        gridTemplateColumns: "1fr",
        gap: "1rem",
    },
    gridMd: {
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    buttonGroup: {
        display: "flex" as const,
        gap: "0.75rem",
        justifyContent: "flex-end",
    },
    cancelButton: {
        display: "flex" as const,
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        border: "1px solid #d1d5db",
        color: "#374151",
        backgroundColor: "transparent",
        borderRadius: "0.5rem",
        transition: "background-color 0.3s ease",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.875rem",
    },
    saveButton: {
        display: "flex" as const,
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#0d9488",
        color: "white",
        borderRadius: "0.5rem",
        transition: "background-color 0.3s ease",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        fontSize: "0.875rem",
        opacity: 1,
    },
    saveButtonDisabled: {
        opacity: 0.6,
        cursor: "not-allowed",
    },
    viewBox: {
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1rem",
    },
    viewSection: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "0.5rem",
    },
    viewTitle: {
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "#111827",
    },
    viewContent: {
        color: "#4b5563",
        whiteSpace: "pre-wrap" as const,
    },
    viewGrid: {
        display: "grid" as const,
        gridTemplateColumns: "1fr",
        gap: "1rem",
        paddingTop: "1rem",
        borderTop: "1px solid #e2e8f0",
    },
    viewGridMd: {
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    viewItem: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "0.25rem",
    },
    viewItemLabel: {
        fontSize: "0.875rem",
        color: "#6b7280",
    },
    viewItemValue: {
        fontWeight: "600",
        color: "#111827",
    },
    emptyText: {
        color: "#6b7280",
    },
};

export default function AdminAbout() {
    const [about, setAbout] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isMd, setIsMd] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        email: "",
        phone: "",
        location: "",
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMd(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchAbout();
    }, []);

    async function fetchAbout() {
        try {
            setLoading(true);
            const response = await fetch("/api/about");
            if (response.ok) {
                const data = await response.json();
                setAbout(data);
                if (data && data.length > 0) {
                    const aboutData = data[0];
                    setFormData({
                        title: aboutData.title || "",
                        content: aboutData.content || "",
                        email: aboutData.email || "",
                        phone: aboutData.phone || "",
                        location: aboutData.location || "",
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch about:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setSaving(true);
            const method = about && about.length > 0 ? "PUT" : "POST";
            const response = await fetch("/api/about", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchAbout();
                setIsEditing(false);
                alert("About section updated successfully!");
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save about section");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>About Section</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={styles.editButton}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#099268")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                    >
                        <MdEdit size={18} /> Edit
                    </button>
                )}
            </div>

            {isEditing ? (
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
                            placeholder="About title"
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#0d9488";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#d1d5db";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({ ...formData, content: e.target.value })
                            }
                            rows={6}
                            style={styles.textarea}
                            placeholder="Your about content..."
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#0d9488";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "#d1d5db";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    <div style={{ ...styles.grid, ...(isMd && styles.gridMd) }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                style={styles.input}
                                placeholder="your@email.com"
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                style={styles.input}
                                placeholder="Your phone number"
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                style={styles.input}
                                placeholder="Your location"
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        </div>
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            style={styles.cancelButton}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            <MdCancel size={18} /> Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                ...styles.saveButton,
                                ...(saving && styles.saveButtonDisabled),
                            }}
                            onMouseEnter={(e) => {
                                if (!saving) {
                                    e.currentTarget.style.backgroundColor = "#099268";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!saving) {
                                    e.currentTarget.style.backgroundColor = "#0d9488";
                                }
                            }}
                        >
                            <MdSave size={18} /> {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            ) : (
                <div style={styles.viewBox}>
                    {about && about.length > 0 ? (
                        <>
                            <div style={styles.viewSection}>
                                <h4 style={styles.viewTitle}>
                                    {about[0].title || "No title"}
                                </h4>
                                <p style={styles.viewContent}>
                                    {about[0].content || "No content"}
                                </p>
                            </div>
                            <div style={{ ...styles.viewGrid, ...(isMd && styles.viewGridMd) }}>
                                <div style={styles.viewItem}>
                                    <p style={styles.viewItemLabel}>Email</p>
                                    <p style={styles.viewItemValue}>
                                        {about[0].email || "-"}
                                    </p>
                                </div>
                                <div style={styles.viewItem}>
                                    <p style={styles.viewItemLabel}>Phone</p>
                                    <p style={styles.viewItemValue}>
                                        {about[0].phone || "-"}
                                    </p>
                                </div>
                                <div style={styles.viewItem}>
                                    <p style={styles.viewItemLabel}>Location</p>
                                    <p style={styles.viewItemValue}>
                                        {about[0].location || "-"}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p style={styles.emptyText}>No about section created yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
