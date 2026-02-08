"use client";

interface WorkCardProps {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export default function WorkCard({
  company,
  role,
  duration,
  description,
}: WorkCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      {/* Company + Role */}
      <h3 className="text-xl font-bold text-indigo-700">{company}</h3>
      <p className="text-gray-600">{role} — {duration}</p>

      {/* Description */}
      <p className="mt-4 text-gray-700">{description}</p>
    </div>
  );
}
