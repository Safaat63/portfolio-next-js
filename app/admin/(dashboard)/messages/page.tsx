import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { mapMessage } from "@/lib/types";
import { MessagesManager } from "@/components/admin/MessagesManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Messages",
  description: "Inbox for contact form submissions.",
};

export default async function AdminMessagesPage() {
  const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
  const messages = rows.map(mapMessage);

  return (
    <div>
      <h2 className="text-xl font-bold text-white">Messages</h2>
      <p className="mt-1 text-sm text-slate-400">
        Contact form submissions land here and get emailed to you instantly.
      </p>
      <div className="mt-6">
        <MessagesManager messages={messages} />
      </div>
    </div>
  );
}
