"use server";

import { headers } from "next/headers";
import { CONTACT_TOPICS } from "@/content/site";

/** Recipients are fixed on the server, never taken from the form. */
const CONTACT_RECIPIENTS = ["eze@ailegr.com", "tech@ailegr.com"];
const RESEND_URL = "https://api.resend.com/emails";

export type ContactField = "name" | "email" | "company" | "topic" | "message";
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echo of what was typed, so a failed submit doesn't wipe the form. */
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit: 5 submissions per 10 minutes per IP, per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const field = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    company: field(formData, "company"),
    topic: field(formData, "topic"),
    message: field(formData, "message"),
  };

  // Spam traps: a hidden field people never fill in, and a form submitted impossibly fast.
  // Pretend success so bots learn nothing.
  const startedAt = Number(field(formData, "startedAt"));
  if (field(formData, "website") || (startedAt && Date.now() - startedAt < 2500)) {
    return { status: "success" };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
  if (values.company.length > 120) errors.company = "Please keep this under 120 characters.";
  if (!CONTACT_TOPICS.includes(values.topic as (typeof CONTACT_TOPICS)[number])) errors.topic = "Please choose a topic.";
  if (values.message.length < 10) errors.message = "Please write a little more (at least 10 characters).";
  else if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "You've sent several messages in a short time. Please try again in a few minutes.", values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return { status: "error", message: "Sorry, we couldn't send your message right now. Please try again later.", values };
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Ailegr Website <billing@ailegr.com>";
  const subject = `[Contact] ${values.topic}: ${values.name}${values.company ? ` (${values.company})` : ""}`;
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Company", values.company || "—"],
    ["Topic", values.topic],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${values.message}\n\n— Sent from the contact form on ailegr.com`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f1714">
<h2 style="margin:0 0 12px;font-size:18px">New message from the Ailegr website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5f6b66">${k}</td><td><b>${escapeHtml(v)}</b></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;line-height:1.5;border-left:3px solid #059669;padding-left:12px;margin:16px 0">${escapeHtml(values.message)}</p>
<p style="color:#5f6b66;font-size:12px">Reply to this email to answer ${escapeHtml(values.name)} directly.</p>
</div>`;

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: CONTACT_RECIPIENTS, reply_to: values.email, subject, text, html }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the message:", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "Sorry, we couldn't send your message right now. Please try again later.", values };
    }
  } catch (err) {
    console.error("[contact] Could not reach Resend:", err);
    return { status: "error", message: "Sorry, we couldn't send your message right now. Please try again later.", values };
  }

  return { status: "success", message: "Thanks! Your message is on its way. We'll reply to you by email." };
}
