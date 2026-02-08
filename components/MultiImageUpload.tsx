"use client";

import React, { useEffect, useState } from 'react';
import { MdAdd, MdDelete, MdUploadFile } from 'react-icons/md';

interface Image {
    id?: number;
    imageUrl: string;
    description?: string;
    displayOrder: number;
}

interface MultiImageUploadProps {
    type: 'project' | 'work';
    itemId: number;
    initialImages?: Image[];
    onSave?: (images: Image[]) => void;
}

export default function MultiImageUpload({
    type,
    itemId,
    initialImages = [],
    onSave,
}: MultiImageUploadProps) {
    const [images, setImages] = useState<Image[]>(initialImages);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    async function uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type === 'project' ? 'project' : 'work');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();

            const newImage: Image = {
                imageUrl: data.fileUrl,
                description: '',
                displayOrder: images.length,
            };

            const updatedImages = [...images, newImage];
            setImages(updatedImages);

            // Save to database
            if (type === 'project') {
                // Create ProjectImage
                await fetch(`/api/projects/${itemId}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newImage),
                });
            } else if (type === 'work') {
                // Create WorkImage
                await fetch(`/api/work/${itemId}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newImage),
                });
            }

            onSave?.(updatedImages);
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

    async function deleteImage(idx: number) {
        const imageToDelete = images[idx];
        const updatedImages = images.filter((_, i) => i !== idx);
        setImages(updatedImages);

        if (imageToDelete.id) {
            if (type === 'project') {
                await fetch(`/api/projects/${itemId}/images/${imageToDelete.id}`, {
                    method: 'DELETE',
                });
            } else if (type === 'work') {
                await fetch(`/api/work/${itemId}/images/${imageToDelete.id}`, {
                    method: 'DELETE',
                });
            }
        }

        onSave?.(updatedImages);
    }

    async function updateDescription(idx: number, description: string) {
        const updatedImages = [...images];
        updatedImages[idx].description = description;
        setImages(updatedImages);
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`p-6 rounded-lg border-2 border-dashed transition-all cursor-pointer ${dragActive
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="hidden"
                    id={`imageInput-${type}-${itemId}`}
                />
                <label htmlFor={`imageInput-${type}-${itemId}`} className="cursor-pointer">
                    <div className="text-center">
                        <MdUploadFile className="mx-auto mb-2 text-green-600" size={32} />
                        <p className="text-sm font-semibold text-gray-700">
                            Add {type === 'project' ? 'project' : 'work'} images
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            Drag drop or click to select
                        </p>
                        {loading && <p className="text-xs text-green-600 mt-2">Uploading...</p>}
                    </div>
                </label>
            </div>

            {/* Image Gallery */}
            {images.length > 0 && (
                <div>
                    <p className="text-sm font-medium mb-2">Images ({images.length})</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={img.imageUrl}
                                    alt={`${type} ${idx + 1}`}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center">
                                    <button
                                        onClick={() => deleteImage(idx)}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                                    >
                                        <MdDelete size={16} />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Image description"
                                    value={img.description || ''}
                                    onChange={(e) => updateDescription(idx, e.target.value)}
                                    className="w-full text-xs p-1 border-t border-gray-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
