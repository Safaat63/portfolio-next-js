import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
      <header className="mb-2 flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-teal-300">&lt;admin /&gt;</p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Control <span className="text-gradient">Center</span>
          </h1>
        </div>
        <Link href="/" className="btn-ghost !py-2 text-sm">
          View Site
        </Link>
      </header>

      <div className="flex flex-col gap-6 md:flex-row">
        <AdminSidebar
          userName={session.user.name ?? "Admin"}
          userEmail={session.user.email ?? ""}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
