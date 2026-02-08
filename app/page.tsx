"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          {loading ? (
            <p>Loading profile...</p>
          ) : profile ? (
            <>
              {profile.avatar && (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white"
                />
              )}
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {profile.name}
              </h1>
              <p className="text-2xl md:text-3xl text-blue-100 mb-8">
                {profile.title}
              </p>
              <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {profile.bio}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                Welcome to My Portfolio
              </h1>
              <p className="text-2xl text-blue-100 mb-8">
                Full-Stack Developer & Designer
              </p>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Crafting beautiful, functional digital experiences
              </p>
            </>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="bg-white text-indigo-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-100 transition"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-900 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-center text-indigo-600">Featured Work</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A selection of my recent projects showcasing my skills and expertise
          </p>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Explore All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start a Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life. Feel free to reach out anytime.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
