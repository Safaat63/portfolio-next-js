"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="glass flex flex-col items-center gap-4 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-teal-400/40 bg-teal-400/10">
          <CircleCheck className="h-7 w-7 text-teal-300" />
        </span>
        <h3 className="text-xl font-semibold text-white">Message sent!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-slate-400">
          Thanks for reaching out. I&apos;ll get back to you at the email you
          provided — usually within 24 hours.
        </p>
      </div>
    );
  }

  const fieldError = (key: "name" | "email" | "subject" | "message") =>
    state.fieldErrors?.[key];

  return (
    <form action={formAction} className="glass space-y-5 p-6 sm:p-8">
      {state.error && (
        <div className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-field">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            className={cn("input-field", fieldError("name") && "border-rose-400/60")}
          />
          {fieldError("name") && (
            <p className="mt-1.5 text-xs text-rose-300">{fieldError("name")}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="label-field">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            className={cn("input-field", fieldError("email") && "border-rose-400/60")}
          />
          {fieldError("email") && (
            <p className="mt-1.5 text-xs text-rose-300">{fieldError("email")}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="label-field">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Project inquiry"
          className={cn("input-field", fieldError("subject") && "border-rose-400/60")}
        />
        {fieldError("subject") && (
          <p className="mt-1.5 text-xs text-rose-300">{fieldError("subject")}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="label-field">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell me about your project, timeline, and goals..."
          className={cn("input-field resize-y", fieldError("message") && "border-rose-400/60")}
        />
        {fieldError("message") && (
          <p className="mt-1.5 text-xs text-rose-300">{fieldError("message")}</p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
