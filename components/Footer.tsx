import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";

const socials = [
  { href: "https://github.com/miftahcoding", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/in/miftahcoding", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://twitter.com/miftahcoding", label: "Twitter", icon: XIcon },
  { href: "mailto:safaatmunajat63@gmail.com", label: "Email", icon: Mail },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 pt-10">
      <div className="glass mx-auto flex max-w-6xl flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400 text-zinc-950">
              <Image
                src="/Three-Bodies-Problem.png"
                alt="Safaat Munazat"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </span>
            <span className="font-mono text-sm font-bold text-white">
              Safaat<span className="text-yellow-400">Munazat</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-mono font-medium text-yellow-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
            </span>
            Available for Projects
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-yellow-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-yellow-400/40 hover:text-yellow-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-4 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Safaat Munazat. All rights reserved.</p>
          <p className="font-mono text-[11px] text-zinc-600">Built with Next.js, Postgres & Glassmorphism</p>
        </div>
      </div>
    </footer>
  );
}
