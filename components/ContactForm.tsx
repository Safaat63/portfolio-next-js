"use client";

import React, { FormEvent, useState } from 'react';

const styles = {
  form: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "1.5rem",
    maxWidth: "32rem",
    margin: "0 auto",
  },
  alertSuccess: {
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f0fdfa",
    border: "1px solid #a7f3d0",
    color: "#0d9488",
    borderRadius: "0.5rem",
    fontWeight: "600",
  },
  alertError: {
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fee2e2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    borderRadius: "0.5rem",
    fontWeight: "600",
  },
  grid: {
    display: "grid" as const,
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
  },
  gridMd: {
    gridTemplateColumns: "1fr 1fr",
  },
  formGroup: {
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    minHeight: "6rem",
  },
  radioGroup: {
    display: "flex" as const,
    gap: "1rem",
  },
  radioLabel: {
    display: "flex" as const,
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  },
  radioInput: {
    cursor: "pointer",
  },
  fileInput: {
    display: "block",
    width: "100%",
    fontSize: "0.875rem",
  },
  uploadedFiles: {
    marginTop: "0.75rem",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  uploadedFilesTitle: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  },
  fileItem: {
    display: "flex" as const,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0fdfa",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    border: "1px solid #a7f3d0",
    fontSize: "0.875rem",
  },
  removeButton: {
    color: "#dc2626",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    backgroundColor: "#0d9488",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isMd, setIsMd] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
    if (!files) return;

    const newFiles = [...uploadedFiles];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('type', 'message');

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newFiles.push(data);
        }
      } catch (err) {
        console.error('File upload error:', err);
      }
    }
    setUploadedFiles(newFiles);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const subject = formData.get('subject') as string;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderName: name,
          senderEmail: email,
          senderPhone: phone,
          content: message,
          contactMethod,
          subject: subject || 'Contact Form Submission',
          attachments: uploadedFiles,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setSuccess(true);
      setUploadedFiles([]);
      event.currentTarget.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      {success && (
        <div style={styles.alertSuccess} role="alert">
          <span>✓ Success!</span> Your message has been sent successfully. I'll get back to you soon!
        </div>
      )}
      {error && (
        <div style={styles.alertError} role="alert">
          <span>✗ Error!</span> {error}
        </div>
      )}

      <div style={{ ...styles.grid, ...(isMd && styles.gridMd) }}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            style={styles.input}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0d9488";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            style={styles.input}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0d9488";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>
      </div>

      <div style={{ ...styles.grid, ...(isMd && styles.gridMd) }}>
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
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
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="subject" style={styles.label}>
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            style={styles.input}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#0d9488";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
            required
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Preferred Contact Method *
        </label>
        <div style={styles.radioGroup}>
          {['email', 'whatsapp', 'linkedin'].map((method) => (
            <label key={method} style={styles.radioLabel}>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={contactMethod === method}
                onChange={(e) => setContactMethod(e.target.value)}
                style={styles.radioInput}
              />
              <span style={{ textTransform: "capitalize" }}>{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="message" style={styles.label}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project or inquiry..."
          style={styles.textarea}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#0d9488";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13, 148, 136, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.boxShadow = "none";
          }}
          required
        ></textarea>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="file" style={styles.label}>
          Attachments (Images, PDF, Docs)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileUpload}
          style={styles.fileInput}
        />
        {uploadedFiles.length > 0 && (
          <div style={styles.uploadedFiles}>
            <p style={styles.uploadedFilesTitle}>Uploaded Files:</p>
            {uploadedFiles.map((file, idx) => (
              <div key={idx} style={styles.fileItem}>
                <span>{file.fileName}</span>
                <button
                  type="button"
                  onClick={() =>
                    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))
                  }
                  style={styles.removeButton}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#b91c1c")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#dc2626")}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.submitButton,
          ...(loading && styles.submitButtonDisabled),
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#099268";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#0d9488";
          }
        }}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
