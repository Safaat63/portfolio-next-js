"use client";

import { useEffect, useState } from "react";

type Work = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

export default function WorkPage() {
  const [workEntries, setWorkEntries] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWork() {
      try {
        const res = await fetch("/api/work");
        if (!res.ok) throw new Error("Failed to fetch work history");
        const data = await res.json();
        setWorkEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading work history");
      } finally {
        setLoading(false);
      }
    }
    fetchWork();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-600">Loading work history...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
      <p className="text-gray-600 mb-12">
        My professional journey and career highlights
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-8">{error}</div>
      )}

      {workEntries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">
            No work entries yet. (Add work experience in the admin dashboard)
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {workEntries.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{work.role}</h2>
                  <p className="text-indigo-600 font-semibold">{work.company}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                  {work.duration}
                </span>
              </div>
              {work.description && (
                <p className="text-gray-700 mt-3">{work.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
