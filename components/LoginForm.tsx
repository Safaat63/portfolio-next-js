"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: LoginState = {};

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="glass space-y-5 p-8">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <div className="flex flex-col items-center text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950 shadow-lg shadow-teal-500/30">
          <LockKeyhole className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">Admin Access</h1>
        <p className="mt-1 text-sm text-slate-400">
          Sign in to manage your portfolio
        </p>
      </div>

      {state.error && (
        <div className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="label-field">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="login-password" className="label-field">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={cn("input-field")}
          required
        />
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
