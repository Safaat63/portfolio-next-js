"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/app/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blogs", label: "Blog", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export function AdminSidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <aside className="glass sticky top-24 hidden h-fit w-64 shrink-0 p-4 md:block">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-2 pb-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950">
            <Image
              src="/Three-Bodies-Problem.png"
              alt="Safaat Munazat"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{userName}</p>
            <p className="truncate text-xs text-slate-500">{userEmail}</p>
          </div>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "border border-teal-400/40 bg-teal-400/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <form action={logoutAction} className="mt-6 border-t border-white/10 pt-4">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-rose-400/10 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </aside>

      <div className="sticky top-20 z-40 mb-6 -mx-4 px-4 md:hidden">
        <div className="glass flex items-center justify-between gap-2 p-2">
          <div className="flex items-center gap-1.5 px-1">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950">
              <Image
                src="/Three-Bodies-Problem.png"
                alt="Safaat Munazat"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </span>
            <span className="text-xs font-semibold text-white">{userName}</span>
          </div>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-all duration-200",
                  isActive(item.href)
                    ? "border-teal-400/40 bg-teal-400/10 text-teal-300"
                    : "border-white/10 bg-white/5 text-slate-400"
                )}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </nav>
          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Sign Out"
              title="Sign Out"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
