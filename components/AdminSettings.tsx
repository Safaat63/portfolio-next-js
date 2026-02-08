"use client";

import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const styles = {
    container: { maxWidth: "56rem", margin: "0 auto", display: "flex" as const, flexDirection: "column" as const, gap: "1.5rem" },
    alert: { padding: "1rem", borderRadius: "0.5rem", border: "1px solid", display: "flex" as const, alignItems: "center", gap: "0.5rem", fontWeight: "600" },
    errorAlert: { backgroundColor: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" },
    successAlert: { backgroundColor: "#f0fdf4", borderColor: "#86efac", color: "#166534" },
    tabContainer: { backgroundColor: "#fff", borderRadius: "0.5rem", border: "1px solid #e5e7eb", overflow: "hidden" },
    tabBar: { display: "flex" as const, gap: 0, borderBottom: "1px solid #e5e7eb" },
    tab: { flex: 1, padding: "1rem", fontWeight: "600", fontSize: "0.875rem", transition: "all 0.3s ease", borderBottom: "2px solid transparent", cursor: "pointer", border: "none", background: "transparent" },
    tabActive: { borderBottomColor: "#0d9488", color: "#0d9488", backgroundColor: "#f0fdfa" },
    tabInactive: { color: "#4b5563", backgroundColor: "transparent" },
    tabHover: { backgroundColor: "#f3f4f6" },
    formSection: { padding: "2rem" },
    formTitle: { fontSize: "1.25rem", fontWeight: "700", color: "#111827", marginBottom: "0.5rem" },
    formSubtitle: { color: "#4b5563", fontSize: "0.875rem" },
    formGroup: { display: "flex" as const, flexDirection: "column" as const },
    label: { fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" },
    input: { width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", fontFamily: "inherit", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
    textarea: { width: "100%", padding: "0.75rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", fontFamily: "inherit", transition: "border-color 0.3s ease, box-shadow 0.3s ease" },
    passwordContainer: { position: "relative" as const },
    passwordToggle: { position: "absolute" as const, right: "1rem", top: "0.875rem", background: "none", border: "none", cursor: "pointer", color: "#6b7280", transition: "color 0.3s ease" },
    grid: { display: "grid" as const, gridTemplateColumns: "1fr", gap: "1.5rem" },
    gridMd: { gridTemplateColumns: "1fr 1fr" },
    hint: { fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" },
    button: { width: "100%", padding: "0.75rem 1.5rem", backgroundColor: "#0d9488", color: "white", fontWeight: "600", borderRadius: "0.5rem", border: "none", cursor: "pointer", transition: "background-color 0.3s ease" },
    buttonDisabled: { opacity: 0.5, cursor: "not-allowed" },
    checkboxContainer: { display: "flex" as const, alignItems: "center", gap: "0.75rem", cursor: "pointer", padding: "1rem", borderRadius: "0.5rem", transition: "background-color 0.3s ease" },
    checkboxBorder: { border: "1px solid #e5e7eb" },
    checkbox: { width: "1.25rem", height: "1.25rem", cursor: "pointer", accentColor: "#0d9488" },
    divider: { borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem" },
    space: { display: "flex" as const, flexDirection: "column" as const, gap: "1rem" },
    spaceLarge: { display: "flex" as const, flexDirection: "column" as const, gap: "1.5rem" },
};

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState<'password' | 'notifications' | 'autoreply'>('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Password state
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Auto-reply state
    const [autoReply, setAutoReply] = useState({
        enabled: false,
        subject: '',
        message: '',
    });

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        whatsappNotifications: false,
        linkedinNotifications: false,
        messageRetentionDays: 30,
    });

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adminId: '1', // This should come from your auth context
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                    confirmPassword: passwordForm.confirmPassword,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to change password');
            }

            setSuccess('Password changed successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSaveAutoReply(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('/api/auto-reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(autoReply),
            });

            if (!response.ok) throw new Error('Failed to save auto-reply settings');

            setSuccess('Auto-reply settings saved!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSaveNotifications(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('/api/message-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notifications),
            });

            if (!response.ok) throw new Error('Failed to save notification settings');

            setSuccess('Notification settings saved!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            {error && (
                <div style={{ ...styles.alert, ...styles.errorAlert }}>
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div style={{ ...styles.alert, ...styles.successAlert }}>
                    <span>✓</span> {success}
                </div>
            )}

            {/* Tabs */}
            <div style={styles.tabContainer}>
                <div style={styles.tabBar}>
                    {['password', 'notifications', 'autoreply'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            style={{
                                ...styles.tab,
                                ...(activeTab === tab ? styles.tabActive : styles.tabInactive),
                            }}
                            onMouseEnter={(e) => !activeTab.includes(tab) && (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                            onMouseLeave={(e) => !activeTab.includes(tab) && (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            {tab === 'autoreply' ? 'Auto Reply' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Password Management */}
                {activeTab === 'password' && (
                    <form onSubmit={handleChangePassword} style={{ ...styles.formSection, ...styles.spaceLarge }}>
                        <div>
                            <h3 style={styles.formTitle}>Change Password</h3>
                            <p style={styles.formSubtitle}>Keep your account secure by using a strong password</p>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Current Password</label>
                            <div style={styles.passwordContainer}>
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) =>
                                        setPasswordForm({
                                            ...passwordForm,
                                            currentPassword: e.target.value,
                                        })
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
                                    placeholder="Enter current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={styles.passwordToggle}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#374151"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}
                                >
                                    {showCurrentPassword ? (
                                        <MdVisibilityOff size={20} />
                                    ) : (
                                        <MdVisibility size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ ...styles.grid, ...(true && styles.gridMd) }}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>New Password</label>
                                <div style={styles.passwordContainer}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={passwordForm.newPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                newPassword: e.target.value,
                                            })
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
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        style={styles.passwordToggle}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#374151"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}
                                    >
                                        {showNewPassword ? (
                                            <MdVisibilityOff size={20} />
                                        ) : (
                                            <MdVisibility size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Confirm Password</label>
                                <div style={styles.passwordContainer}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                confirmPassword: e.target.value,
                                            })
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
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.passwordToggle}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#374151"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}
                                    >
                                        {showConfirmPassword ? (
                                            <MdVisibilityOff size={20} />
                                        ) : (
                                            <MdVisibility size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p style={styles.hint}>Password must be at least 8 characters long</p>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#099268")}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0d9488")}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <form onSubmit={handleSaveNotifications} style={{ ...styles.formSection, ...styles.spaceLarge }}>
                        <div>
                            <h3 style={styles.formTitle}>Notification Settings</h3>
                            <p style={styles.formSubtitle}>Choose how you want to be notified about messages</p>
                        </div>

                        <div style={styles.divider}>
                            <div style={styles.space}>
                                <label style={{ ...styles.checkboxContainer, ...styles.checkboxBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.emailNotifications}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                emailNotifications: e.target.checked,
                                            })
                                        }
                                        style={styles.checkbox}
                                    />
                                    <span style={{ fontWeight: "600", color: "#111827" }}>
                                        Email Notifications
                                    </span>
                                </label>

                                <label style={{ ...styles.checkboxContainer, ...styles.checkboxBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.whatsappNotifications}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                whatsappNotifications: e.target.checked,
                                            })
                                        }
                                        style={styles.checkbox}
                                    />
                                    <span style={{ fontWeight: "600", color: "#111827" }}>
                                        WhatsApp Notifications
                                    </span>
                                </label>

                                <label style={{ ...styles.checkboxContainer, ...styles.checkboxBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}>
                                    <input
                                        type="checkbox"
                                        checked={notifications.linkedinNotifications}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                linkedinNotifications: e.target.checked,
                                            })
                                        }
                                        style={styles.checkbox}
                                    />
                                    <span style={{ fontWeight: "600", color: "#111827" }}>
                                        LinkedIn Notifications
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div style={styles.divider}>
                            <label style={styles.label}>Message Retention (Days)</label>
                            <input
                                type="number"
                                min="1"
                                max="365"
                                value={notifications.messageRetentionDays}
                                onChange={(e) =>
                                    setNotifications({
                                        ...notifications,
                                        messageRetentionDays: parseInt(e.target.value),
                                    })
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
                            />
                            <p style={styles.hint}>Messages older than this will be automatically deleted</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#099268")}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0d9488")}
                        >
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </form>
                )}

                {/* Auto-Reply Settings */}
                {activeTab === 'autoreply' && (
                    <form onSubmit={handleSaveAutoReply} style={{ ...styles.formSection, ...styles.spaceLarge }}>
                        <div>
                            <h3 style={styles.formTitle}>Auto-Reply Settings</h3>
                            <p style={styles.formSubtitle}>Send automatic replies to messages you receive</p>
                        </div>

                        <label style={{ ...styles.checkboxContainer, ...styles.checkboxBorder }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}>
                            <input
                                type="checkbox"
                                checked={autoReply.enabled}
                                onChange={(e) =>
                                    setAutoReply({ ...autoReply, enabled: e.target.checked })
                                }
                                style={styles.checkbox}
                            />
                            <span style={{ fontWeight: "600", color: "#111827" }}>
                                Enable Auto-Reply
                            </span>
                        </label>

                        {autoReply.enabled && (
                            <div style={styles.divider}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Subject</label>
                                    <input
                                        type="text"
                                        value={autoReply.subject}
                                        onChange={(e) =>
                                            setAutoReply({
                                                ...autoReply,
                                                subject: e.target.value,
                                            })
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
                                        placeholder="Thank you for reaching out"
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Message</label>
                                    <textarea
                                        value={autoReply.message}
                                        onChange={(e) =>
                                            setAutoReply({
                                                ...autoReply,
                                                message: e.target.value,
                                            })
                                        }
                                        style={styles.textarea}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#0d9488";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "#d1d5db";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                        placeholder="I appreciate your message and will get back to you soon..."
                                        rows={6}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#099268")}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0d9488")}
                        >
                            {loading ? 'Saving...' : 'Save Auto-Reply'}
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
}
