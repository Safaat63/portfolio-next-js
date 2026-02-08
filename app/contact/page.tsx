"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

type Contact = {
  id: number;
  email: string;
  phone?: string;
  address?: string;
};

const styles = {
  main: {
    minHeight: "100vh",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    backgroundColor: "#ffffff",
  },
  container: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#4b5563",
    maxWidth: "48rem",
    margin: "0 auto",
  },
  grid: {
    display: "grid" as const,
    gridTemplateColumns: "1fr",
    gap: "3rem",
  },
  gridLg: {
    gridTemplateColumns: "1fr 1fr",
  },
  section: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "2rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  sectionText: {
    color: "#4b5563",
    marginBottom: "1.5rem",
  },
  loadingText: {
    color: "#6b7280",
  },
  errorText: {
    color: "#dc2626",
  },
  contactItem: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  contactItemTitle: {
    fontWeight: "600",
  },
  contactLink: {
    color: "#0d9488",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  contactValue: {
    color: "#374151",
  },
  socialBox: {
    backgroundColor: "#f8fafc",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #e2e8f0",
  },
  socialTitle: {
    fontWeight: "600",
    marginBottom: "0.75rem",
  },
  socialText: {
    fontSize: "0.875rem",
    color: "#4b5563",
    marginBottom: "1rem",
  },
  socialButtons: {
    display: "flex" as const,
    gap: "1rem",
  },
  socialLink: {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #a7f3d0",
    color: "#0d9488",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
    fontSize: "0.875rem",
  },
  formSection: {
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
};

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch("/api/contact");
        if (!res.ok) throw new Error("Failed to fetch contact info");
        const data = await res.json();
        setContact(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading contact");
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, []);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Get In Touch</h1>
          <p style={styles.subtitle}>
            Have a question or want to collaborate? I'd love to hear from you.
            Send me a message and I'll get back to you as soon as possible!
          </p>
        </div>

        {/* Contact Info & Form */}
        <div style={{ ...styles.grid, ...(isMd && styles.gridLg) }}>
          {/* Contact Information */}
          <div style={styles.section}>
            <div>
              <h2 style={styles.sectionTitle}>Contact Information</h2>
              <p style={styles.sectionText}>
                Reach out through any of these methods. I'm available for freelance work,
                partnerships, and career opportunities.
              </p>
            </div>

            {loading ? (
              <div style={styles.loadingText}>Loading contact info...</div>
            ) : error ? (
              <div style={styles.errorText}>Error: {error}</div>
            ) : contact ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {contact.email && (
                  <div style={styles.contactItem}>
                    <h3 style={styles.contactItemTitle}>Email</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      style={styles.contactLink}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#099268")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div style={styles.contactItem}>
                    <h3 style={styles.contactItemTitle}>Phone</h3>
                    <a
                      href={`tel:${contact.phone}`}
                      style={styles.contactLink}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#099268")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#0d9488")}
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.address && (
                  <div style={styles.contactItem}>
                    <h3 style={styles.contactItemTitle}>Address</h3>
                    <p style={styles.contactValue}>{contact.address}</p>
                  </div>
                )}
              </div>
            ) : null}

            {/* Social Links Info */}
            <div style={styles.socialBox}>
              <h3 style={styles.socialTitle}>Connect With Me</h3>
              <p style={styles.socialText}>
                You can also reach me through social media channels below:
              </p>
              <div style={styles.socialButtons}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdfa")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0fdfa")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formSection}>
            <h2 style={styles.formTitle}>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
