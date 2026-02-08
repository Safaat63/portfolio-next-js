"use client";

import React, { useState } from 'react';
import { MdUploadFile, MdDelete } from 'react-icons/md';

interface ProfileImage {
    id?: string;
    url: string;
    isPrimary?: boolean;
}

const styles = {
    container: { maxWidth: "56rem", margin: "0 auto", display: "flex" as const, flexDirection: "column" as const, gap: "1.5rem" },
    alert: { padding: "1rem", borderRadius: "0.5rem", border: "1px solid", display: "flex" as const, alignItems: "center" },
    errorAlert: { backgroundColor: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" },
    successAlert: { backgroundColor: "#f0fdf4", borderColor: "#86efac", color: "#166534" },
    uploadZone: { padding: "2rem", borderRadius: "0.5rem", border: "2px dashed", cursor: "pointer", transition: "all 0.3s ease" },
    uploadZoneDefault: { borderColor: "#d1d5db", backgroundColor: "#f9fafb" },
    uploadZoneActive: { borderColor: "#0d9488", backgroundColor: "#f0fdfa" },
    uploadLabel: { cursor: "pointer", textAlign: "center" as const },
    uploadIcon: { margin: "0 auto 0.5rem", color: "#0d9488" },
    uploadTitle: { fontSize: "1.125rem", fontWeight: "600", color: "#374151" },
    uploadSubtitle: { fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" },
    uploadHint: { fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" },
    uploadLoading: { fontSize: "0.875rem", color: "#0d9488", marginTop: "1rem", fontWeight: "600" },
    gallerySection: { display: "flex" as const, flexDirection: "column" as const },
    galleryTitle: { fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem", color: "#111827" },
    galleryGrid: { display: "grid" as const, gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" },
    galleryGridMd: { gridTemplateColumns: "repeat(4, 1fr)" },
    imageCard: { position: "relative" as const, borderRadius: "0.5rem", overflow: "hidden", border: "4px solid", transition: "all 0.3s ease" },
    imageCardPrimary: { borderColor: "#0d9488", boxShadow: "0 10px 15px -3px rgba(13, 148, 136, 0.1)" },
    imageCardDefault: { borderColor: "#e5e7eb" },
    image: { width: "100%", height: "8rem", objectFit: "cover" as const },
    imageOverlay: { position: "absolute" as const, inset: 0, backgroundColor: "rgba(0, 0, 0, 0)", transition: "background-color 0.3s ease", display: "flex" as const, alignItems: "center", justifyContent: "center", gap: "0.5rem" },
    primaryBadge: { position: "absolute" as const, top: "0.5rem", right: "0.5rem", backgroundColor: "#0d9488", color: "white", fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "9999px", fontWeight: "600" },
    imageButton: { padding: "0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: "600", color: "white", transition: "background-color 0.3s ease" },
    setButtonPrimary: { backgroundColor: "#0d9488" },
    deleteButton: { backgroundColor: "#dc2626" },
};

export default function ProfileImageUpload() {
    const [images, setImages] = useState<ProfileImage[]>([]);
    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [dragActive, setDragActive] = useState(false);

    async function uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'profile');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();

            const newImage: ProfileImage = {
                url: data.fileUrl,
                isPrimary: primaryImage === null,
            };

            setImages([...images, newImage]);

            // Update primary image if first upload
            if (primaryImage === null) {
                setPrimaryImage(data.fileUrl);
            }

            // Save to database
            await fetch('/api/profile/images', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageUrl: data.fileUrl,
                    mainImage: primaryImage === null,
                }),
            });

            setSuccess('Image uploaded successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.currentTarget.files;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                await uploadFile(files[i]);
            }
            setLoading(false);
        }
    }

    async function handleDrag(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }

    async function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.startsWith('image/')) {
                    await uploadFile(files[i]);
                }
            }
            setLoading(false);
        }
    }

    async function setPrimary(imageUrl: string) {
        setPrimaryImage(imageUrl);

        await fetch('/api/profile/images', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageUrl,
                mainImage: true,
            }),
        });

        setSuccess('Primary image updated!');
        setTimeout(() => setSuccess(''), 3000);
    }

    async function deleteImage(imageUrl: string) {
        setImages(images.filter((img) => img.url !== imageUrl));
        if (primaryImage === imageUrl && images.length > 0) {
            setPrimary(images[0].url);
        }
    }

    return (
        <div style={styles.container}>
            {error && (
                <div style={{ ...styles.alert, ...styles.errorAlert }}>
                    {error}
                </div>
            )}
            {success && (
                <div style={{ ...styles.alert, ...styles.successAlert }}>
                    {success}
                </div>
            )}

            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                    ...styles.uploadZone,
                    ...(dragActive ? styles.uploadZoneActive : styles.uploadZoneDefault),
                }}
                onMouseEnter={(e) => !dragActive && (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                onMouseLeave={(e) => !dragActive && (e.currentTarget.style.backgroundColor = "#f9fafb")}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                    style={{ display: "none" }}
                    id="imageInput"
                />
                <label htmlFor="imageInput" style={styles.uploadLabel}>
                    <div>
                        <div style={styles.uploadIcon}>
                            <MdUploadFile size={40} />
                        </div>
                        <p style={styles.uploadTitle}>
                            Drag and drop images here
                        </p>
                        <p style={styles.uploadSubtitle}>
                            or click to select from your device
                        </p>
                        <p style={styles.uploadHint}>
                            Supported: JPG, PNG, GIF, WebP (Max 10MB each)
                        </p>
                        {loading && <p style={styles.uploadLoading}>Uploading...</p>}
                    </div>
                </label>
            </div>

            {/* Image Gallery */}
            {images.length > 0 && (
                <div style={styles.gallerySection}>
                    <h3 style={styles.galleryTitle}>Your Profile Images</h3>
                    <div style={{ ...styles.galleryGrid, ...(true && styles.galleryGridMd) }}>
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...styles.imageCard,
                                    ...(primaryImage === img.url ? styles.imageCardPrimary : styles.imageCardDefault),
                                }}
                                onMouseEnter={(e) => {
                                    const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                                    if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                                    if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
                                }}
                            >
                                <img
                                    src={img.url}
                                    alt={`Profile ${idx + 1}`}
                                    style={styles.image}
                                />
                                {primaryImage === img.url && (
                                    <div style={styles.primaryBadge}>
                                        Primary
                                    </div>
                                )}
                                <div style={styles.imageOverlay} data-overlay>
                                    {primaryImage !== img.url && (
                                        <button
                                            onClick={() => setPrimary(img.url)}
                                            style={{ ...styles.imageButton, ...styles.setButtonPrimary }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#099268"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0d9488"}
                                        >
                                            Set Primary
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteImage(img.url)}
                                        style={{ ...styles.imageButton, ...styles.deleteButton }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#b91c1c"}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                                    >
                                        <MdDelete size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
}
