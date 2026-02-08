"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 shadow-lg rounded-b-xl">
      <div className="flex items-center justify-between">
        {/* Logo / Name */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/">Safaat.dev</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/about" className="hover:text-gray-200 transition">About</Link>
          <Link href="/projects" className="hover:text-gray-200 transition">Projects</Link>
          <Link href="/work" className="hover:text-gray-200 transition">Work</Link>
          <Link href="/contact" className="hover:text-gray-200 transition">Contact</Link>
          <Link href="/admin" className="bg-white text-indigo-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition">Admin</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-white text-indigo-600 px-3 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-4 md:hidden bg-white text-indigo-600 rounded-lg shadow-lg flex flex-col items-center space-y-4 py-4">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin" className="bg-indigo-600 text-white px-3 py-1 rounded-lg">Admin</Link>
        </div>
      )}
    </nav>
  );
}
