"use client";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
      {/* Project Image */}
      <Image
        src={image} // <-- place screenshot in /public folder
        alt={title}
        width={600}
        height={400}
        className="object-cover"
      />

      {/* Project Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-indigo-700">{title}</h3>
        <p className="mt-2 text-gray-600 flex-grow">{description}</p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex space-x-4">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Code
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
