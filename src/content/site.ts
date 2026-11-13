/**
 * Landing page copy. Source of truth: LANDING_CONTEXT.md.
 * Only state what the product does today; label anything else "coming soon".
 */

export const APP_URL = "https://app.ailegr.com";
export const SIGN_UP_URL = `${APP_URL}/sign-up`;
export const SIGN_IN_URL = `${APP_URL}/sign-in`;

export const navLinks = [
  { href: "#ai", label: "AI" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Plan display names and prices live in Stripe / the super-admin app.
 * TODO: fill in `name`, `monthly` and `yearly` (per-month price when billed yearly).
 * While a price is null the card shows "Price coming soon".
 */
export type Plan = {
  code: "basic" | "mid" | "full";
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  featured?: boolean;
};

export const plans: Plan[] = [
  { code: "basic", name: "Basic", tagline: "Full accounting with AI answers about your books.", monthly: null, yearly: null },
  { code: "mid", name: "Mid", tagline: "Adds Smart Scan and bulk chart-of-accounts import.", monthly: null, yearly: null },
  { code: "full", name: "Full", tagline: "Let the AI Copilot do the bookkeeping, with your approval.", monthly: null, yearly: null, featured: true },
];

/** true = included; string = included with a note. */
export const planMatrix: { feature: string; basic: boolean | string; mid: boolean | string; full: boolean | string }[] = [
  { feature: "All accounting — invoices, bills, banking, inventory, assets, reports", basic: true, mid: true, full: true },
  { feature: "Recurring invoices & bills", basic: true, mid: true, full: true },
  { feature: "Advanced reporting — variance, ranking, custom ranges", basic: true, mid: true, full: true },
  { feature: "AI Analysis chat", basic: "50 credits/mo", mid: true, full: true },
  { feature: "Smart Scan (OCR receipts)", basic: false, mid: true, full: true },
  { feature: "Bulk chart of accounts import", basic: false, mid: true, full: true },
  { feature: "AI Copilot — AI does the bookkeeping", basic: false, mid: false, full: true },
  { feature: "AI bulk journal suggester", basic: false, mid: false, full: true },
];

export const comingSoon = ["Multi-currency", "API access", "Custom branding & white-label invoices"];

export const faqs = [
  { q: "Does the AI change my books on its own?", a: "No. It prepares drafts; nothing posts until you approve. You can edit every draft on its approval card first, and permissions follow your role." },
  { q: "Can I connect my bank?", a: "Yes. Link your bank and card accounts securely, then reconcile against your real statements." },
  { q: "Is it real double-entry accounting?", a: "Yes — a full double-entry ledger, trial balance, balance sheet, period locks and one-click year-end close. Every amount adds up to the cent, so your books always balance." },
  { q: "Can I manage more than one company?", a: "Yes. Switch between companies from one login with the company switcher. Each company's data is strictly isolated." },
  { q: "Can my team use it?", a: "Yes — owners invite teammates as Admin or Member and set their roles." },
  { q: "Can I import my existing data?", a: "Yes — chart of accounts, journal entries, customers and vendors via CSV or Excel. AI can even fill in missing account codes on journal imports." },
  { q: "Is my data safe?", a: "Yes. Bank connections are encrypted and your bank login is never shared. You can turn on two-step sign-in, each company's books are kept private, and everything is backed up every 3 hours with copies stored off-site." },
];
