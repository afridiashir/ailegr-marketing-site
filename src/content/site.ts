/**
 * Landing page copy. Source of truth: LANDING_CONTEXT.md.
 * Only state what the product does today; label anything else "coming soon".
 */

export const SITE_URL = "https://ailegr.com";
export const APP_URL = "https://app.ailegr.com";
export const SIGN_UP_URL = `${APP_URL}/sign-up`;
export const SIGN_IN_URL = `${APP_URL}/sign-in`;

export const navLinks = [
  { href: "#assistant", label: "AI assistant" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

/** Pricing. Source of truth: Ailegr-Pricing.md (Nov 2026). Every AI feature is in every plan. */
export type Plan = {
  code: "basic" | "mid" | "full";
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  credits: number;
  usersIncluded: number;
  extraUser: number;
  featured?: boolean;
};

export const plans: Plan[] = [
  { code: "basic", name: "Basic", tagline: "Full accounting with every AI feature included.", monthly: 19.99, yearly: 199.99, credits: 50, usersIncluded: 1, extraUser: 9.99 },
  { code: "mid", name: "Mid", tagline: "Everything in Basic, with more AI capacity.", monthly: 59.99, yearly: 599.99, credits: 500, usersIncluded: 2, extraUser: 19.99, featured: true },
  { code: "full", name: "Full", tagline: "Everything, with the most AI capacity.", monthly: 159, yearly: 1590, credits: 1500, usersIncluded: 2, extraUser: 29.99 },
];

export const YEARLY_SAVING = "17%";

export const includedInEveryPlan = [
  "Full double-entry accounting: invoices, bills, expenses, journal entries",
  "AI analysis chat: ask questions about your books",
  "AI copilot that records transactions for you",
  "AI bulk journal-entry suggestions",
  "OCR scanning of bills and receipts",
  "Bank and card reconciliation",
  "Recurring invoices and bills",
  "Financial reports: Profit and Loss, Balance Sheet, Cash Flow, aging, Sales by Customer and more",
  "Online invoice payments by card and ACH (Pay Now)",
  "Custom invoice branding: your logo, templates and colours",
  "Bulk Chart of Accounts import",
];

export const comingSoon = ["Multi-currency", "API access"];

/** Formats a plan price: $19.99, $159, $1,590. */
export const price = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });

export const CONTACT_TOPICS = ["General question", "Sales & pricing", "Technical support", "Accountants & partners"] as const;

export const faqs = [
  { q: "Does the AI change my books on its own?", a: "No. It prepares drafts; nothing posts until you approve. You can edit every draft on its approval card first, and permissions follow your role." },
  { q: "Can I connect my bank?", a: "Yes. Link your bank and card accounts securely, then reconcile against your real statements." },
  { q: "Is it real double-entry accounting?", a: "Yes — a full double-entry ledger, trial balance, balance sheet, period locks and one-click year-end close. Every amount adds up to the cent, so your books always balance." },
  { q: "Can I manage more than one company?", a: "Yes. Switch between companies from one login with the company switcher. Each company's data is strictly isolated." },
  { q: "Can my team use it?", a: "Yes — owners invite teammates as Admin or Member and set their roles. Basic includes 1 user and Mid and Full include 2; extra users are $9.99, $19.99 or $29.99 a month depending on your plan." },
  { q: "Are AI features extra?", a: "No. Every plan includes every AI feature: the analysis chat, the copilot, bulk journal suggestions and receipt scanning. Plans differ only in how many AI credits you get each month (50, 500 or 1,500), and credits refill monthly." },
  { q: "Can my customers pay invoices online?", a: "Yes. Every invoice can include a Pay Now link so customers pay by card or ACH, and invoices carry your own logo, template and colours." },
  { q: "Can I import my existing data?", a: "Yes — chart of accounts, journal entries, customers and vendors via CSV or Excel. AI can even fill in missing account codes on journal imports." },
  { q: "Is my data safe?", a: "Yes. Bank connections are encrypted and your bank login is never shared. You can turn on two-step sign-in, each company's books are kept private, and everything is backed up every 3 hours with copies stored off-site." },
];
