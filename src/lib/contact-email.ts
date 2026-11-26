/**
 * Email the team receives for each contact-form submission.
 * Built for email clients: table layout, inline styles, no external CSS or fonts, one small hosted logo.
 */

import { SITE_URL } from "../content/site";

export type ContactEmailInput = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

/** Hosted on the marketing site (public/email). If images are blocked, the green tile still shows. */
const LOGO_URL = `${SITE_URL}/email/ailegr-mark.png`;

const BRAND = "#059669";
const BRAND_DARK = "#047857";
const BRAND_SOFT = "#ecfdf5";
const INK = "#0f1714";
const MUTED = "#5f6b66";
const BORDER = "#e3e8e5";
const PAGE = "#eef2f0";
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Topic → accent colours for the pill. */
const topicStyle: Record<string, { bg: string; fg: string }> = {
  "Sales & pricing": { bg: "#fef3c7", fg: "#92400e" },
  "Technical support": { bg: "#e0f2fe", fg: "#075985" },
  "Accountants & partners": { bg: "#ede9fe", fg: "#5b21b6" },
  "General question": { bg: BRAND_SOFT, fg: BRAND_DARK },
};

const formatSentAt = (d: Date) =>
  d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }) + " UTC";

export function buildContactEmail(v: ContactEmailInput, sentAt = new Date()) {
  const firstName = v.name.split(/\s+/)[0] || v.name;
  const subject = `[Contact] ${v.topic}: ${v.name}${v.company ? ` (${v.company})` : ""}`;
  const replyHref = `mailto:${encodeURIComponent(v.email)}?subject=${encodeURIComponent(`Re: Your message to Ailegr`)}`;
  const pill = topicStyle[v.topic] ?? topicStyle["General question"];
  const when = formatSentAt(sentAt);
  const preheader = `${v.name} wrote about ${v.topic.toLowerCase()}: ${v.message.slice(0, 90)}`;

  const detail = (label: string, value: string, href?: string) => `
              <tr>
                <td style="padding:10px 0;border-top:1px solid ${BORDER};font:13px ${FONT};color:${MUTED};width:110px;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-top:1px solid ${BORDER};font:600 14px ${FONT};color:${INK};vertical-align:top;">${
                  href ? `<a href="${href}" style="color:${BRAND_DARK};text-decoration:none;">${esc(value)}</a>` : esc(value)
                }</td>
              </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<style>
  @media (max-width: 620px) {
    .card { border-radius: 0 !important; }
    .pad { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 22px !important; }
    .btn a { display: block !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PAGE};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}&#8203;&#160;&#8203;&#160;&#8203;&#160;&#8203;&#160;&#8203;&#160;&#8203;&#160;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="card" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${BORDER};">

          <!-- Brand bar -->
          <tr>
            <td style="height:6px;background:${BRAND};background-image:linear-gradient(90deg, ${BRAND_DARK}, #10b981);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td class="pad" style="padding:26px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:34px;height:34px;background:#d1fae5;border-radius:9px;vertical-align:middle;"><img src="${LOGO_URL}" width="34" height="34" alt="" style="display:block;border:0;border-radius:9px;"></td>
                        <td style="padding-left:10px;font:700 19px ${FONT};color:${INK};letter-spacing:-0.3px;"><span style="color:${BRAND};">Ai</span>legr</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${pill.bg};color:${pill.fg};font:600 12px ${FONT};">${esc(v.topic)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td class="pad" style="padding:26px 36px 4px;">
              <p style="margin:0 0 6px;font:600 12px ${FONT};letter-spacing:1px;text-transform:uppercase;color:${BRAND};">New website message</p>
              <h1 class="h1" style="margin:0;font:700 25px/1.25 ${FONT};color:${INK};letter-spacing:-0.4px;">${esc(v.name)} wants to get in touch</h1>
              <p style="margin:8px 0 0;font:13px ${FONT};color:${MUTED};">Sent from the contact form on ailegr.com &middot; ${when}</p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="pad" style="padding:22px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7f6;border-radius:14px;">
                <tr>
                  <td style="border-left:4px solid ${BRAND};border-radius:14px;padding:18px 20px;font:15px/1.65 ${FONT};color:${INK};white-space:pre-wrap;">${esc(v.message)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td class="pad" style="padding:22px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detail("Name", v.name)}${detail(
                "Email",
                v.email,
                `mailto:${encodeURIComponent(v.email)}`,
              )}${detail("Company", v.company || "Not provided")}${detail("Topic", v.topic)}
              </table>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td class="pad btn" style="padding:26px 36px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:999px;background:${BRAND};">
                    <a href="${replyHref}" style="display:inline-block;padding:13px 26px;font:600 15px ${FONT};color:#ffffff;text-decoration:none;border-radius:999px;">Reply to ${esc(firstName)} &rarr;</a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font:13px ${FONT};color:${MUTED};">Or just hit reply: your answer goes straight to <a href="mailto:${encodeURIComponent(v.email)}" style="color:${BRAND_DARK};word-break:break-all;">${esc(v.email)}</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="pad" style="padding:26px 36px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid ${BORDER};padding-top:18px;font:12px/1.6 ${FONT};color:${MUTED};">
                  This message was sent to eze@ailegr.com and tech@ailegr.com from the contact form at
                  <a href="https://ailegr.com/#contact" style="color:${MUTED};">ailegr.com</a>.
                </td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `NEW WEBSITE MESSAGE: ${v.topic}`,
    `${v.name} wants to get in touch`,
    `Sent from the contact form on ailegr.com, ${when}`,
    "",
    "Message",
    "-------",
    v.message,
    "",
    "Details",
    "-------",
    `Name:    ${v.name}`,
    `Email:   ${v.email}`,
    `Company: ${v.company || "Not provided"}`,
    `Topic:   ${v.topic}`,
    "",
    `Reply to this email to answer ${firstName} directly.`,
  ].join("\n");

  return { subject, html, text };
}
