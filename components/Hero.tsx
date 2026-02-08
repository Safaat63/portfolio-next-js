"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 rounded-xl shadow-lg overflow-hidden">
      
      {/* Background Image (optional) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg" // <-- replace with your own background image in /public folder
          alt="Background"
          fill
          className="object-cover opacity-15" // lighter overlay effect
        />
        {/* If no image is provided, you can fallback to a gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-90"></div>
      </div>

      {/* Profile Image */}
      <div className="mb-6">
        <Image
          src="/me.jpg" // <-- replace with your profile image in /public folder
          alt="Safaat Profile"
          width={160}
          height={160}
          className="rounded-full shadow-lg border-4 border-indigo-200"
        />
      </div>

      {/* Name + Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        Hi, I’m Safaat
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-800 max-w-2xl">
        Web Developer specializing in Next.js, React, and Tailwind — building scalable, elegant solutions.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex space-x-4">
        <Link
          href="/projects"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Contact Me
        </Link>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/yourNumberHere" // <-- replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        💬
      </a>
    </section>
  );
}
