import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MiftahCoding — project inquiries, freelance work, or just to say hello.",
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
        <p className="font-mono text-sm text-teal-300">&lt;contact /&gt;</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Let&apos;s Build Something <span className="text-gradient">Great</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Whether you have a project in mind, a role to fill, or just want to
          talk shop — my inbox is always open.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {contactCards.map(({ icon: Icon, title, value, href }) => (
              <GlassCard key={title} className="glass-hover p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/15 text-teal-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {title}
                </h3>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 block text-sm font-medium text-white transition-colors hover:text-teal-300"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                )}
              </GlassCard>
            ))}
          </div>

          <div className="glass flex items-center gap-3 p-5">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-400" />
            </span>
            <p className="text-sm text-slate-300">
              Currently <span className="font-semibold text-teal-300">available</span> for
              new projects starting soon.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
