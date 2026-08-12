import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

export const resend = new Resend(apiKey);

type SendEmailParams = {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(params: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: params.from ?? process.env.RESEND_FROM_EMAIL ?? "MiftahCoding <onboarding@resend.dev>",
    to: params.to,
    subject: params.subject,
    html: params.html,
    replyTo: params.replyTo,
  });

  if (error) {
    throw new Error(`Resend failed: ${error.message}`);
  }

  return data;
}

export function contactAlertHtml(input: { name: string; email: string; subject: string; message: string }) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      <div style="padding: 24px 28px; background: linear-gradient(135deg, #2dd4bf, #3b82f6); color: #020617;">
        <h1 style="margin: 0; font-size: 20px;">New Contact Message</h1>
      </div>
      <div style="padding: 28px;">
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(input.email)}" style="color:#2dd4bf;">${escapeHtml(input.email)}</a></p>
        <p style="margin: 0 0 20px;"><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
        <div style="padding: 16px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;">
          ${escapeHtml(input.message).replace(/\n/g, "<br/>")}
        </div>
      </div>
    </div>
  `;
}

export function replyEmailHtml(input: {
  reply: string;
  originalName: string;
  originalEmail: string;
  originalSubject: string;
  originalMessage: string;
}) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0f172a; color: #e2e8f0; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      <div style="padding: 24px 28px; background: linear-gradient(135deg, #2dd4bf, #3b82f6); color: #020617;">
        <h1 style="margin: 0; font-size: 20px;">Re: ${escapeHtml(input.originalSubject)}</h1>
      </div>
      <div style="padding: 28px;">
        <p style="margin: 0 0 8px;">Hi ${escapeHtml(input.originalName)},</p>
        <div style="padding: 16px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;">
          ${escapeHtml(input.reply).replace(/\n/g, "<br/>")}
        </div>
        <div style="margin-top: 28px; padding: 16px 18px; background: rgba(0,0,0,0.25); border-left: 3px solid #334155; border-radius: 8px;">
          <p style="margin: 0 0 6px; font-size: 13px; color: #94a3b8;">On your original message:</p>
          <p style="margin: 0; font-size: 13px; color: #94a3b8; font-style: italic;">${escapeHtml(input.originalMessage).replace(/\n/g, "<br/>")}</p>
        </div>
        <p style="margin: 28px 0 0; font-size: 13px; color: #64748b;">
          — Sent from the MiftahCoding contact inbox
        </p>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
