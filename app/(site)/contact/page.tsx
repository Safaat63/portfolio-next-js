import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Safaat Munazat — project inquiries, freelance work, or just to say hello.",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email",
    value: "safaatmunajat63@gmail.com",
    href: "mailto:safaatmunajat63@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Working remotely, worldwide",
    href: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
  {
    icon: MessageSquare,
    title: "Prefer Chat?",
    value: "Email is best for project details",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <div className="mb-12 text-center">
        <span className="code-tag">&lt;contact /&gt;</span>
        <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
          Let&apos;s Build Something <span className="text-yellow-400">Great</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Whether you have a project in mind, a role to fill, or just want to
          talk shop — my inbox is always open.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {contactCards.map(({ icon: Icon, title, value, href }) => (
              <GlassCard key={title} className="glass-hover p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  {title}
                </h3>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm font-medium text-white transition-colors hover:text-yellow-400"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-zinc-200">{value}</p>
                )}
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6">
            <h3 className="font-semibold text-white">Project Availability</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Currently taking on select freelance and contract engagements for
              frontend architecture, design systems, and full-stack Next.js products.
            </p>
          </GlassCard>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
