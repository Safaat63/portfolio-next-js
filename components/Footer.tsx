"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-700 mt-12 rounded-t-xl shadow-inner">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6">
        
        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Safaat.dev — All rights reserved.</p>
        
        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="https://github.com/yourGithub" target="_blank" className="hover:text-indigo-600 transition">
            <FaGithub size={22} />
          </Link>
          <Link href="https://linkedin.com/in/yourLinkedIn" target="_blank" className="hover:text-indigo-600 transition">
            <FaLinkedin size={22} />
          </Link>
          <Link href="mailto:yourEmail@example.com" className="hover:text-indigo-600 transition">
            <FaEnvelope size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
