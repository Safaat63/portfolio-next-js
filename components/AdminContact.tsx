"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const styles = {
    container: { display: "flex" as const, flexDirection: "column" as const, gap: "1.5rem" },
    header: { display: "flex" as const, justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    title: { fontSize: "1.5rem", fontWeight: "700", color: "#111827" },
    button: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#0d9488", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", transition: "background-color 0.3s ease" },
    loading: { display: "flex" as const, alignItems: "center", justifyContent: "center", height: "16rem" },
    spinner: { display: "inline-block", animation: "spin 1s linear infinite", borderRadius: "50%", height: "2rem", width: "2rem", borderWidth: "2px", borderStyle: "solid", borderColor: "#0d9488", borderTopColor: "transparent" },
    form: { display: "flex" as const, flexDirection: "column" as const, gap: "1rem", backgroundColor: "#fff", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" },
    grid: { display: "grid" as const, gridTemplateColumns: "1fr", gap: "1rem" },
    gridMd: { gridTemplateColumns: "1fr 1fr" },
    formGroup: { display: "flex" as const, flexDirection: "column" as const },
    label: { fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" },
    input: { width: "100%", padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", fontFamily: "inherit", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
    buttons: { display: "flex" as const, gap: "0.75rem", justifyContent: "flex-end" },
    cancelBtn: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", border: "1px solid #d1d5db", color: "#374151", background: "transparent", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", transition: "background-color 0.3s ease" },
    saveBtn: { display: "flex" as const, alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#0d9488", color: "white", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.875rem", opacity: 1 },
    saveBtnDisabled: { opacity: 0.6, cursor: "not-allowed" },
    viewBox: { backgroundColor: "#fff", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" },
    viewGrid: { display: "grid" as const, gridTemplateColumns: "1fr", gap: "1.5rem" },
    viewGridMd: { gridTemplateColumns: "1fr 1fr" },
    fieldLabel: { fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.25rem" },
    fieldValue: { fontWeight: "600", color: "#111827" },
    fieldLink: { fontWeight: "600", color: "#0d9488", textDecoration: "none", transition: "color 0.3s ease" },
    empty: { color: "#6b7280" },
};

export default function AdminContact() {
    const [contact, setContact] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        twitter: "",
    });

    useEffect(() => {
        fetchContact();
    }, []);

    async function fetchContact() {
        try {
            setLoading(true);
            const response = await fetch("/api/contact");
            if (response.ok) {
                const data = await response.json();
                setContact(data);
                if (data && data.length > 0) {
                    const contactData = data[0];
                    setFormData({
                        email: contactData.email || "",
                        phone: contactData.phone || "",
                        address: contactData.address || "",
                        linkedin: contactData.linkedin || "",
                        github: contactData.github || "",
                        twitter: contactData.twitter || "",
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch contact:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setSaving(true);
            const method = contact && contact.length > 0 ? "PUT" : "POST";
            const response = await fetch("/api/contact", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchContact();
                setIsEditing(false);
                alert("Contact information updated successfully!");
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save contact information");
        } finally {
            setSaving(false);
        }
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
                <h3 style={styles.title}>Contact Information</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={styles.button}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#099268"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d9488"}
                    >
                        <MdEdit size={18} /> Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <form style={styles.form}>
                    <div style={{ ...styles.grid, ...(true && styles.gridMd) }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
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
                                placeholder="your@email.com"
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
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#0d9488";
                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                placeholder="Your phone number"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>LinkedIn</label>
                            <input
                                type="url"
                                value={formData.linkedin}
                                onChange={(e) =>
                                    setFormData({ ...formData, linkedin: e.target.value })
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
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>GitHub</label>
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
                            <label style={styles.label}>Twitter</label>
                            <input
                                type="url"
                                value={formData.twitter}
                                onChange={(e) =>
                                    setFormData({ ...formData, twitter: e.target.value })
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
                                placeholder="https://twitter.com/..."
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
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
                                placeholder="Your address"
                            />
                        </div>
                    </div>

                    <div style={styles.buttons}>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
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
                <div style={styles.viewBox}>
                    {contact && contact.length > 0 ? (
                        <div style={{ ...styles.viewGrid, ...(true && styles.viewGridMd) }}>
                            <div>
                                <p style={styles.fieldLabel}>Email</p>
                                <p style={styles.fieldValue}>{contact[0].email || "-"}</p>
                            </div>
                            <div>
                                <p style={styles.fieldLabel}>Phone</p>
                                <p style={styles.fieldValue}>{contact[0].phone || "-"}</p>
                            </div>
                            <div>
                                <p style={styles.fieldLabel}>LinkedIn</p>
                                {contact[0].linkedin ? (
                                    <a
                                        href={contact[0].linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.fieldLink}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#0a7368"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#0d9488"}
                                    >
                                        View Profile
                                    </a>
                                ) : (
                                    <p style={styles.fieldValue}>-</p>
                                )}
                            </div>
                            <div>
                                <p style={styles.fieldLabel}>GitHub</p>
                                {contact[0].github ? (
                                    <a
                                        href={contact[0].github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.fieldLink}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#0a7368"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#0d9488"}
                                    >
                                        View Profile
                                    </a>
                                ) : (
                                    <p style={styles.fieldValue}>-</p>
                                )}
                            </div>

                            <div>
                                <p style={styles.fieldLabel}>Twitter</p>
                                {contact[0].twitter ? (
                                    <a
                                        href={contact[0].twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.fieldLink}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#0a7368"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#0d9488"}
                                    >
                                        View Profile
                                    </a>
                                ) : (
                                    <p style={styles.fieldValue}>-</p>
                                )}
                            </div>

                            <div>
                                <p style={styles.fieldLabel}>Address</p>
                                <p style={styles.fieldValue}>{contact[0].address || "-"}</p>
                            </div>
                        </div>
                    ) : (
                        <p style={styles.empty}>No contact information created yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
