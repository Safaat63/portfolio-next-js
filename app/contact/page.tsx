"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: number;
  email: string;
  phone?: string;
  address?: string;
};

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      // For now, just show success message
      setFormStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormStatus("error");
    }
  };

  if (loading)
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Get In Touch</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Have a project in mind? Let's collaborate and bring your ideas to life.
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-8">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Information */}
        {contact && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a
                href={`mailto:${contact.email}`}
                className="text-indigo-600 hover:underline"
              >
                {contact.email}
              </a>
            </div>

            {contact.phone && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-indigo-600 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            )}

            {contact.address && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-700">{contact.address}</p>
              </div>
            )}

            {/* Social Links */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formState.subject}
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              />
            </div>

            {formStatus === "success" && (
              <div className="bg-green-100 text-green-700 p-3 rounded">
                Message sent successfully!
              </div>
            )}
            {formStatus === "error" && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                Failed to send message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {formStatus === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
