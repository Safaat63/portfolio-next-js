import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the Safaat Munazat admin dashboard.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="mt-6 text-center font-mono text-xs text-slate-600">
          Protected area &middot; Safaat Munazat
        </p>
      </div>
    </div>
  );
}
