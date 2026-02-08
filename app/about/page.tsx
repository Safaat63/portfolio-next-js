"use client";

import { useEffect, useState } from "react";

type About = {
    id: number;
    title: string;
    content: string;
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
        padding: "4rem 5rem",
    },
    loadingContainer: {
        textAlign: "center" as const,
        padding: "4rem 1.5rem",
    },
    loadingText: {
        color: "#4b5563",
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
        padding: "4rem 1.5rem",
    },
    emptyTitle: {
        fontSize: "2.25rem",
        fontWeight: "700",
        marginBottom: "1rem",
    },
    emptyText: {
        color: "#6b7280",
        marginBottom: "1rem",
    },
    emptyBox: {
        backgroundColor: "#f0fdfa",
        padding: "1.5rem",
        borderRadius: "0.5rem",
        maxWidth: "32rem",
        margin: "0 auto",
    },
    emptyBoxText: {
        fontSize: "0.875rem",
        color: "#4b5563",
    },
    contentContainer: {
        maxWidth: "48rem",
        margin: "0 auto",
    },
    title: {
        fontSize: "2.25rem",
        fontWeight: "700",
        marginBottom: "2rem",
        textAlign: "center" as const,
    },
    contentText: {
        color: "#374151",
        lineHeight: "1.75",
        fontSize: "1rem",
    },
};

export default function AboutPage() {
    const [about, setAbout] = useState<About | null>(null);
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
        async function fetchAbout() {
            try {
                const res = await fetch("/api/about");
                if (!res.ok) throw new Error("Failed to fetch about page");
                const data = await res.json();
                setAbout(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error loading about page");
            } finally {
                setLoading(false);
            }
        }
        fetchAbout();
    }, []);

    if (loading)
        return (
            <main style={styles.main}>
                <div style={{ ...styles.container, ...styles.loadingContainer }}>
                    <p style={styles.loadingText}>Loading...</p>
                </div>
            </main>
        );

    return (
        <main style={styles.main}>
            <div style={{ ...styles.container, ...(isMd && styles.containerLg) }}>
                {error && (
                    <div style={styles.errorBox}>{error}</div>
                )}

                {!about ? (
                    <div style={styles.emptyState}>
                        <h1 style={styles.emptyTitle}>About Me</h1>
                        <p style={styles.emptyText}>
                            No about page content yet. (Set it up in the admin dashboard)
                        </p>
                        <div style={styles.emptyBox}>
                            <p style={styles.emptyBoxText}>
                                Go to Admin Dashboard → About tab to add your about page content
                            </p>
                        </div>
                    </div>
                ) : (
                    <div style={styles.contentContainer}>
                        <h1 style={styles.title}>{about.title}</h1>
                        <div
                            style={styles.contentText}
                            dangerouslySetInnerHTML={{ __html: about.content }}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
