"use client";

import { useEffect, useState } from "react";

type About = {
    id: number;
    title: string;
    content: string;
};

export default function AboutPage() {
    const [about, setAbout] = useState<About | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            <div className="container mx-auto px-6 py-16 text-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );

    return (
        <div className="container mx-auto px-6 py-16">
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-8">{error}</div>
            )}

            {!about ? (
                <div className="text-center py-16">
                    <h1 className="text-4xl font-bold mb-4">About Me</h1>
                    <p className="text-gray-500 mb-4">
                        No about page content yet. (Set it up in the admin dashboard)
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
                        <p className="text-sm text-gray-600">
                            Go to Admin Dashboard → About tab to add your about page content
                        </p>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">{about.title}</h1>
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: about.content }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
