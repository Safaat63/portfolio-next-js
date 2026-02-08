"use client";

import React, { useEffect, useState } from 'react';
import { MdDelete, MdReply, MdMarkEmailRead, MdClose } from 'react-icons/md';

interface Message {
    id: number;
    senderName: string;
    senderEmail: string;
    content: string;
    contactMethod: string;
    isRead: boolean;
    hasReply: boolean;
    createdAt: string;
    attachments: any[];
}

interface Conversation {
    id: number;
    subject: string;
    senderEmail: string;
    isActive: boolean;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

const styles = {
    container: {
        display: "grid" as const,
        gridTemplateColumns: "1fr",
        gap: "1.5rem",
        height: "100%",
    },
    containerMd: {
        gridTemplateColumns: "1fr 3fr",
    },
    conversationList: {
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden" as const,
        display: "flex" as const,
        flexDirection: "column" as const,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    listHeader: {
        padding: "1rem",
        borderBottom: "1px solid #e2e8f0",
        backgroundColor: "#0d9488",
        color: "white",
        fontWeight: "600",
    },
    listContent: {
        overflowY: "auto" as const,
        flex: 1,
    },
    emptyList: {
        padding: "1rem",
        color: "#6b7280",
        textAlign: "center" as const,
    },
    conversationButton: {
        width: "100%",
        padding: "1rem",
        textAlign: "left" as const,
        borderBottom: "1px solid #f3f4f6",
        backgroundColor: "transparent",
        transition: "background-color 0.3s ease",
        border: "none",
        cursor: "pointer",
        display: "block",
    },
    conversationButtonActive: {
        backgroundColor: "#f0fdfa",
        borderLeft: "4px solid #0d9488",
        paddingLeft: "calc(1rem - 4px)",
    },
    conversationSubject: {
        fontWeight: "600",
        fontSize: "0.875rem",
        color: "#111827",
        overflow: "hidden" as const,
        textOverflow: "ellipsis" as const,
        whiteSpace: "nowrap" as const,
    },
    conversationEmail: {
        fontSize: "0.75rem",
        color: "#6b7280",
        overflow: "hidden" as const,
        textOverflow: "ellipsis" as const,
        whiteSpace: "nowrap" as const,
        marginBottom: "0.25rem",
    },
    conversationDate: {
        fontSize: "0.75rem",
        color: "#9ca3af",
    },
    badge: {
        marginTop: "0.5rem",
        display: "inline-block",
        backgroundColor: "#f59e0b",
        color: "white",
        fontSize: "0.75rem",
        padding: "0.25rem 0.5rem",
        borderRadius: "9999px",
        fontWeight: "600",
    },
    messageViewer: {
        display: "flex" as const,
        flexDirection: "column" as const,
    },
    errorBox: {
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#fee2e2",
        border: "1px solid #fecaca",
        color: "#dc2626",
        borderRadius: "0.5rem",
        display: "flex" as const,
        alignItems: "center",
        gap: "0.5rem",
    },
    messagesContainer: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1rem",
        flex: 1,
    },
    headerBox: {
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    headerContent: {
        display: "flex" as const,
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerTitle: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#111827",
    },
    headerMeta: {
        fontSize: "0.875rem",
        color: "#4b5563",
        marginTop: "0.5rem",
    },
    headerMetaLabel: {
        fontWeight: "600",
    },
    headerSmall: {
        fontSize: "0.75rem",
        color: "#6b7280",
        marginTop: "0.5rem",
    },
    deleteButton: {
        marginLeft: "1rem",
        padding: "0.5rem",
        color: "#dc2626",
        backgroundColor: "transparent",
        borderRadius: "0.5rem",
        transition: "background-color 0.3s ease",
        border: "none",
        cursor: "pointer",
    },
    messagesBox: {
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        padding: "1.5rem",
        flex: 1,
        overflowY: "auto" as const,
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    messageItem: {
        padding: "1rem",
        borderRadius: "0.5rem",
        borderLeft: "4px solid #e5e7eb",
        backgroundColor: "#f9fafb",
    },
    messageItemFromAdmin: {
        borderLeftColor: "#0d9488",
        backgroundColor: "#f0fdfa",
    },
    messageSender: {
        display: "flex" as const,
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "0.5rem",
    },
    messageSenderName: {
        fontWeight: "600",
        fontSize: "0.875rem",
        color: "#111827",
    },
    adminBadge: {
        color: "#0d9488",
        marginLeft: "0.5rem",
        fontSize: "0.75rem",
        fontWeight: "600",
    },
    messageTime: {
        fontSize: "0.75rem",
        color: "#6b7280",
        marginTop: "0.25rem",
    },
    messageContent: {
        fontSize: "0.875rem",
        color: "#374151",
        whiteSpace: "pre-wrap" as const,
        marginTop: "0.75rem",
        lineHeight: "1.6",
    },
    attachments: {
        marginTop: "0.75rem",
        paddingTop: "0.75rem",
        borderTop: "1px solid #e2e8f0",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "0.25rem",
    },
    attachment: {
        fontSize: "0.75rem",
        color: "#0d9488",
        textDecoration: "none",
        fontWeight: "600",
        transition: "color 0.3s ease",
    },
    replySection: {
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    replyButton: {
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
    },
    replyForm: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: "1rem",
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
    textarea: {
        width: "100%",
        padding: "0.75rem 1rem",
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontFamily: "inherit",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    buttonGroup: {
        display: "flex" as const,
        gap: "0.5rem",
        justifyContent: "flex-end",
    },
    cancelButton: {
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid #d1d5db",
        color: "#374151",
        backgroundColor: "transparent",
        transition: "background-color 0.3s ease",
        fontWeight: "600",
        cursor: "pointer",
    },
    sendButton: {
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        backgroundColor: "#0d9488",
        color: "white",
        transition: "background-color 0.3s ease",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        opacity: 1,
    },
    sendButtonDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
    emptyState: {
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        padding: "3rem",
        textAlign: "center" as const,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    emptyStateText: {
        color: "#6b7280",
        fontWeight: "600",
    },
};

export default function AdminMessaging() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showReplyBox, setShowReplyBox] = useState(false);

    useEffect(() => {
        fetchConversations();
    }, []);

    async function fetchConversations() {
        try {
            const response = await fetch('/api/messages');
            if (!response.ok) throw new Error('Failed to fetch conversations');
            const data = await response.json();
            setConversations(data);
            if (data.length > 0) {
                await fetchConversation(data[0].id);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchConversation(id: number) {
        try {
            const response = await fetch(`/api/messages/${id}`);
            if (!response.ok) throw new Error('Failed to fetch conversation');
            const data = await response.json();
            setSelectedConversation(data);
        } catch (err: any) {
            setError(err.message);
        }
    }

    async function handleReply() {
        if (!selectedConversation || !replyText.trim()) return;

        try {
            const response = await fetch(`/api/messages/${selectedConversation.id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: replyText }),
            });

            if (!response.ok) throw new Error('Failed to send reply');

            setReplyText('');
            setShowReplyBox(false);
            await fetchConversation(selectedConversation.id);
            await fetchConversations(); // Refresh list
        } catch (err: any) {
            setError(err.message);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this conversation?')) return;

        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete conversation');

            await fetchConversations();
            if (selectedConversation?.id === id) {
                setSelectedConversation(null);
            }
        } catch (err: any) {
            setError(err.message);
        }
    }

    if (loading) {
        return <div style={{ textAlign: "center", padding: "2rem" }}>Loading messages...</div>;
    }

    return (
        <div style={{ ...styles.container, ...(window.innerWidth >= 768 && styles.containerMd) }}>
            {/* Conversation List */}
            <div style={styles.conversationList}>
                <div style={styles.listHeader}>
                    Conversations ({conversations.length})
                </div>
                <div style={styles.listContent}>
                    {conversations.length === 0 ? (
                        <div style={styles.emptyList}>No conversations yet</div>
                    ) : (
                        conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => {
                                    setSelectedConversation(conv);
                                    fetchConversation(conv.id);
                                }}
                                style={{
                                    ...styles.conversationButton,
                                    ...(selectedConversation?.id === conv.id && styles.conversationButtonActive),
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedConversation?.id !== conv.id) {
                                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedConversation?.id !== conv.id) {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }
                                }}
                            >
                                <div style={styles.conversationSubject}>
                                    {conv.subject}
                                </div>
                                <div style={styles.conversationEmail}>
                                    {conv.senderEmail}
                                </div>
                                <div style={styles.conversationDate}>
                                    {new Date(conv.updatedAt).toLocaleDateString()}
                                </div>
                                {conv.messages.some(
                                    (m) => !m.isRead && m.contactMethod !== 'admin-reply'
                                ) && (
                                        <div style={styles.badge}>
                                            New Message
                                        </div>
                                    )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Message Viewer */}
            <div style={styles.messageViewer}>
                {error && (
                    <div style={styles.errorBox}>
                        <span style={{ fontWeight: "600" }}>Error:</span>
                        {error}
                    </div>
                )}

                {selectedConversation ? (
                    <div style={styles.messagesContainer}>
                        {/* Header */}
                        <div style={styles.headerBox}>
                            <div style={styles.headerContent}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={styles.headerTitle}>
                                        {selectedConversation.subject}
                                    </h3>
                                    <p style={styles.headerMeta}>
                                        From:{' '}
                                        <span style={styles.headerMetaLabel}>
                                            {selectedConversation.senderEmail}
                                        </span>
                                    </p>
                                    <p style={styles.headerSmall}>
                                        Created:{' '}
                                        {new Date(selectedConversation.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedConversation.id)}
                                    style={styles.deleteButton}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    title="Delete conversation"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={styles.messagesBox}>
                            {selectedConversation.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        ...styles.messageItem,
                                        ...(msg.contactMethod === 'admin-reply' && styles.messageItemFromAdmin),
                                    }}
                                >
                                    <div style={styles.messageSender}>
                                        <div>
                                            <p style={styles.messageSenderName}>
                                                {msg.senderName}
                                                {msg.contactMethod === 'admin-reply' && (
                                                    <span style={styles.adminBadge}>
                                                        (Admin)
                                                    </span>
                                                )}
                                            </p>
                                            <p style={styles.messageTime}>
                                                {msg.contactMethod} •{' '}
                                                {new Date(msg.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p style={styles.messageContent}>
                                        {msg.content}
                                    </p>
                                    {msg.attachments.length > 0 && (
                                        <div style={styles.attachments}>
                                            {msg.attachments.map((att) => (
                                                <a
                                                    key={att.id}
                                                    href={att.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.attachment}
                                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#099268")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
                                                >
                                                    📎 {att.fileName}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Reply Section */}
                        <div style={styles.replySection}>
                            {!showReplyBox ? (
                                <button
                                    onClick={() => setShowReplyBox(true)}
                                    style={styles.replyButton}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#099268")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                                >
                                    <MdReply size={18} /> Reply
                                </button>
                            ) : (
                                <div style={styles.replyForm}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            Your Reply
                                        </label>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write your reply..."
                                            rows={5}
                                            style={styles.textarea}
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
                                    <div style={styles.buttonGroup}>
                                        <button
                                            onClick={() => {
                                                setShowReplyBox(false);
                                                setReplyText('');
                                            }}
                                            type="button"
                                            style={styles.cancelButton}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleReply}
                                            disabled={!replyText.trim()}
                                            style={{
                                                ...styles.sendButton,
                                                ...(!replyText.trim() && styles.sendButtonDisabled),
                                            }}
                                            onMouseEnter={(e) => {
                                                if (replyText.trim()) {
                                                    e.currentTarget.style.backgroundColor = "#099268";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (replyText.trim()) {
                                                    e.currentTarget.style.backgroundColor = "#0d9488";
                                                }
                                            }}
                                        >
                                            Send Reply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyStateText}>
                            Select a conversation to view messages
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
