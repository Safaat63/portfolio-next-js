import type { Metadata } from "next";
import Link from "next/link";
import { FolderKanban, FileText, Inbox, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Overview",
  description: "At-a-glance stats for the MiftahCoding portfolio.",
};

export default async function AdminDashboardPage() {
  const [projectRows, blogRows, messageRows] = await Promise.all([
    sql`SELECT count(*)::int AS count FROM projects`,
    sql`SELECT count(*)::int AS count FROM blogs`,
    sql`SELECT count(*)::int AS total, count(*) FILTER (WHERE read = false)::int AS unread FROM messages`,
  ]);

  const projects = projectRows[0]?.count ?? 0;
  const blogs = blogRows[0]?.count ?? 0;
  const messages = messageRows[0]?.total ?? 0;
  const unreadMessages = messageRows[0]?.unread ?? 0;

  const stats = [
    {
      label: "Projects",
      value: projects,
      href: "/admin/projects",
      icon: FolderKanban,
      accent: "from-teal-400 to-emerald-500",
    },
    {
      label: "Blog Posts",
      value: blogs,
      href: "/admin/blogs",
      icon: FileText,
      accent: "from-sky-400 to-blue-500",
    },
    {
      label: "Messages",
      value: messages,
      badge: unreadMessages,
      href: "/admin/messages",
      icon: Inbox,
      accent: "from-violet-400 to-fuchsia-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, badge, href, icon: Icon, accent }) => (
          <Link key={label} href={href} className="group block">
            <GlassCard className="glass-hover p-5">
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent} text-slate-950`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                {typeof badge === "number" && badge > 0 && (
                  <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-2 py-0.5 text-[11px] font-medium text-teal-300">
                    {badge} unread
                  </span>
                )}
              </div>
              <p className="mt-4 font-mono text-3xl font-bold text-white">{value}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-400 transition-colors group-hover:text-teal-300">
                {label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>

      <GlassCard className="p-6">
        <h2 className="font-semibold text-white">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-400">
          Manage your portfolio content from the sidebar. Changes go live on the
          public site immediately.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/projects" className="btn-primary !py-2">
            Manage Projects
          </Link>
          <Link href="/admin/blogs" className="btn-ghost !py-2">
            Write a Post
          </Link>
          <Link href="/admin/messages" className="btn-ghost !py-2">
            Check Messages
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
