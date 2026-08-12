"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, Trash2, LoaderCircle, Reply } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { markMessageRead, deleteMessage, replyToMessage } from "@/app/actions";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export function MessagesManager({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState<string | null>(null);
  const [replySending, setReplySending] = useState(false);

  const unread = messages.filter((m) => !m.read).length;

  const handleToggleRead = async (message: Message) => {
    setBusyId(message.id);
    await markMessageRead(message.id, !message.read);
    setBusyId(null);
    router.refresh();
  };

  const handleDelete = async (message: Message) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    setBusyId(message.id);
    await deleteMessage(message.id);
    setBusyId(null);
    router.refresh();
  };

  const openReply = (message: Message) => {
    setReplyTarget(message);
    setReplyText("");
    setReplyError(null);
  };

  const closeReply = () => {
    setReplyTarget(null);
    setReplyText("");
    setReplyError(null);
  };

  const handleReplySubmit = async () => {
    if (!replyTarget || !replyText.trim()) return;
    setReplySending(true);
    setReplyError(null);
    const result = await replyToMessage(replyTarget.id, { body: replyText.trim() });
    setReplySending(false);
    if (!result.success) {
      setReplyError(result.error);
      return;
    }
    closeReply();
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-400">
        {messages.length} total &middot; <span className="text-teal-300">{unread} unread</span>
      </p>

      {messages.length === 0 ? (
        <GlassCard className="p-10 text-center text-slate-400">
          No messages yet. Contact submissions will appear here.
        </GlassCard>
      ) : (
        <>
          <div className="space-y-4">
            {messages.map((message) => (
            <GlassCard
              key={message.id}
              className={cn("flex flex-col gap-4 p-5 sm:flex-row sm:items-start", !message.read && "border-teal-400/40")}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={cn(
                      "font-semibold",
                      message.read ? "text-slate-300" : "text-white"
                    )}
                  >
                    {message.subject}
                  </h3>
                  {!message.read && (
                    <span className="rounded-full border border-teal-400/40 bg-teal-400/10 px-2 py-0.5 text-[11px] font-medium text-teal-300">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {message.name} &middot;{" "}
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sky-300 hover:underline"
                  >
                    {message.email}
                  </a>
                  <span className="mx-2 text-slate-600">&middot;</span>
                  <span className="text-slate-500">{formatDate(message.createdAt)}</span>
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {message.message}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:flex-col">
                <button
                  type="button"
                  onClick={() => handleToggleRead(message)}
                  disabled={busyId === message.id}
                  title={message.read ? "Mark as unread" : "Mark as read"}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl border transition-all duration-200",
                    message.read
                      ? "border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/40 hover:text-teal-300"
                      : "border-teal-400/50 bg-teal-400/15 text-teal-300"
                  )}
                >
                  {message.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => openReply(message)}
                  disabled={busyId === message.id}
                  title="Reply"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-sky-400/50 hover:text-sky-300"
                >
                  <Reply className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(message)}
                  disabled={busyId === message.id}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-rose-400/50 hover:text-rose-300"
                  title="Delete"
                >
                  {busyId === message.id ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </GlassCard>
          ))}
</div>
        {replyTarget && (
          <Modal title={`Reply to ${replyTarget.name}`} onClose={closeReply} className="max-w-xl">
            <div className="space-y-4">
              {replyError && (
                <div className="rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                  {replyError}
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                <p className="font-medium text-slate-300 mb-2">Original message:</p>
                <p className="whitespace-pre-wrap">{replyTarget.message}</p>
              </div>

              <div>
                <label htmlFor="reply-body" className="label-field">
                  Your reply
                </label>
                <textarea
                  id="reply-body"
                  className="input-field resize-y font-mono"
                  rows={6}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button type="button" onClick={closeReply} className="btn-ghost" disabled={replySending}>
                  Cancel
                </button>
                <button type="button" onClick={handleReplySubmit} disabled={replySending || !replyText.trim()} className="btn-primary">
                  {replySending ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Reply className="h-4 w-4" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}
        </>
      )}
    </div>
  );
}
