import Link from "next/link";
import { Mail, Hexagon } from "lucide-react";
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
    <footer className="relative z-10 px-4 pb-6 pt-10">
      <div className="glass mx-auto flex max-w-6xl flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950">
              <Hexagon className="h-5 w-5" />
            </span>
            <span className="font-mono text-sm font-bold text-white">
              Miftah<span className="text-teal-300">Coding</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/10 px-4 py-1.5 text-sm font-medium text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
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
                className="text-sm text-slate-400 transition-colors hover:text-teal-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-teal-400/50 hover:bg-teal-400/10 hover:text-teal-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center text-xs text-slate-500 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()} MiftahCoding. Crafted with care in the digital ecosystem.
          </p>
          <p className="font-mono">
            Next.js &middot; Neon &middot; Cloudinary &middot; Resend
          </p>
        </div>
      </div>
    </footer>
  );
}
