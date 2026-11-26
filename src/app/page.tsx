import {
  Banknote,
  BookCheck,
  ChartColumn,
  Cloud,
  DatabaseBackup,
  FileText,
  KeyRound,
  Landmark,
  Laptop,
  LockKeyhole,
  Package,
  Receipt,
  Repeat,
  ScrollText,
  ShieldCheck,
  ArrowRight,
  CircleCheck,
} from "lucide-react";
import { Accountants } from "@/components/accountants";
import { AIFeatures } from "@/components/ai-features";
import { AssistantShowcase } from "@/components/assistant-showcase";
import { Contact } from "@/components/contact";
import { Control } from "@/components/control";
import { FAQ } from "@/components/faq";
import { HeroDashboard } from "@/components/hero-dashboard";
import { Logo } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { Pricing } from "@/components/pricing";
import { Reports } from "@/components/reports";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { faqs, navLinks, plans, SIGN_IN_URL, SIGN_UP_URL, SITE_URL } from "@/content/site";

const coreFeatures = [
  { icon: FileText, title: "Invoicing", body: "Branded invoices with your logo and colours. Customers pay online by card or ACH with Pay Now, and overdue reminders go out automatically — up to six steps." },
  { icon: Receipt, title: "Bills & expenses", body: "Record bills and bank or card expenses with attachments, then pay several bills in one pay run." },
  { icon: Landmark, title: "Banking & reconciliation", body: "Connect your bank and card accounts securely. Ailegr suggests matches, turns unmatched lines into expenses in one click, and keeps going until every cent agrees." },
  { icon: Package, title: "Inventory", body: "Track products, services and stock on hand. Cost of goods sold is recorded automatically with every sale." },
  { icon: Laptop, title: "Fixed assets", body: "Keep a register of equipment and other assets, with depreciation calculated automatically every month." },
  { icon: Repeat, title: "Recurring & reminders", body: "Recurring invoices and bills post on schedule and catch up if missed. Overdue reminders go out daily." },
  { icon: ChartColumn, title: "Reports", body: "P&L, balance sheet, cash flow, aging, general ledger and more — compare periods and export to PDF or CSV." },
  { icon: BookCheck, title: "Year-end close", body: "Period locks and a one-click year-end close with preview. Reopen if you need to — it's recorded in the audit log." },
];

const heroPoints = ["Free trial on every plan", "Connect your bank in minutes", "Built for small businesses and accountants"];

const security = [
  { icon: KeyRound, title: "Two-step sign-in", body: "Add a second check at sign-in to keep your account safe." },
  { icon: ShieldCheck, title: "Private to each company", body: "Every company's books are kept completely separate." },
  { icon: LockKeyhole, title: "Secure bank connections", body: "Bank links are encrypted and your login details are never shared." },
  { icon: DatabaseBackup, title: "Backed up every 3 hours", body: "Daily, weekly and monthly copies kept safely off-site." },
  { icon: Cloud, title: "Documents kept safe", body: "Receipts and attachments stored securely with each company." },
  { icon: ScrollText, title: "Full audit trail", body: "See who deleted a record or reopened a closed year." },
  { icon: Banknote, title: "Accurate to the cent", body: "Every amount adds up exactly, so your books always balance." },
];

/** Structured data for search engines: the product with real plan prices, and the FAQ. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ailegr",
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web",
    description:
      "AI-powered accounting software for small and growing businesses: double-entry bookkeeping with an AI assistant that drafts entries for your approval.",
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.monthly.toFixed(2),
      priceCurrency: "USD",
      url: `${SITE_URL}/#pricing`,
      priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthly.toFixed(2), priceCurrency: "USD", unitCode: "MON" },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="p-3 sm:p-4">
          <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-white">
            <div className="px-5 sm:px-8 lg:px-10">
              <Navbar />
            </div>

            <div className="mx-auto max-w-3xl px-5 pt-12 pb-14 text-center sm:pt-16">
              <Reveal>
                <a
                  href="#ai"
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-white py-1 pr-3 pl-1 text-xs shadow-sm transition-colors hover:border-brand/40 sm:text-[13px]"
                >
                  <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">NEW</span>
                  <span className="truncate">Meet your AI accountant</span>
                  <ArrowRight className="size-3.5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-7 text-[40px] leading-[1.06] font-bold tracking-tight text-balance sm:text-[60px] xl:text-[68px]">
                  Your books, done by AI. <span className="text-brand">Approved by you.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  Invoices, bills, banking, inventory and reports in one place, with an AI assistant
                  that answers questions about your business and does the bookkeeping for you.
                  Nothing is recorded until you approve it.
                </p>
              </Reveal>

              <Reveal delay={240} className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={SIGN_UP_URL}
                  className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_var(--brand)] transition-all hover:-translate-y-0.5 hover:bg-brand-strong"
                >
                  Start free trial
                </a>
                <a
                  href="#assistant"
                  className="rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground/25"
                >
                  See how it works
                </a>
              </Reveal>

              <Reveal delay={300}>
                <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
                  {heroPoints.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <CircleCheck className="size-4 text-brand" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="sky px-3 pt-10 sm:px-8 sm:pt-14 lg:px-14">
              <Reveal delay={200} className="mx-auto max-w-[1180px]">
                <HeroDashboard />
              </Reveal>
            </div>
          </div>
        </section>

        <AssistantShowcase />

        <AIFeatures />

        <Control />

        {/* Core features */}
        <section id="features" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
          <SectionHeading
            eyebrow="Real accounting underneath"
            title={<>Everything you need<br className="hidden sm:block" /> to run the books</>}
            body="A proper double-entry ledger, balanced to the cent. Accountant-grade, not a spreadsheet toy."
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreFeatures.map(({ icon: I, title, body }, i) => (
              <Reveal key={title} delay={(i % 4) * 80}>
                <div className="group h-full rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_-24px_rgba(5,150,105,0.5)]">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <I className="size-4" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reports />

        {/* Security */}
        <section id="security" className="px-3 pb-24 sm:px-4 lg:pb-32">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-brand-ink px-4 py-20 text-white sm:px-10 lg:py-24"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0 71px, rgb(255 255 255 / 0.07) 71px 72px, transparent 72px), repeating-linear-gradient(180deg, transparent 0 35px, rgb(255 255 255 / 0.04) 35px 36px), radial-gradient(120% 80% at 100% 0%, rgb(16 185 129 / 0.3), transparent 60%)",
            }}
          >
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium">
                <ShieldCheck className="size-3.5 text-emerald-300" aria-hidden /> Security & trust
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-[42px] sm:leading-[1.15]">
                Your financial data, locked down
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
                Your books stay private, backed up and correct, so you can focus on running the business.
              </p>
            </Reveal>
            <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {security.map(({ icon: I, title, body }, i) => (
                <Reveal key={title} delay={(i % 4) * 80}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors hover:border-emerald-300/40 hover:bg-white/[0.09]">
                    <I className="size-5 text-emerald-300 transition-transform group-hover:scale-110" aria-hidden />
                    <h3 className="mt-4 font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-white/65">{body}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={240}>
                <a
                  href={SIGN_UP_URL}
                  className="flex h-full flex-col justify-between rounded-2xl bg-emerald-400 p-5 text-brand-ink transition-colors hover:bg-emerald-300"
                >
                  <span className="font-semibold">See it for yourself</span>
                  <span className="mt-6 text-sm font-medium">Start free trial →</span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <Accountants />

        <Pricing />

        <FAQ />

        <Contact />

        {/* Final CTA */}
        <section id="cta" className="px-3 pb-16 sm:px-4">
          <Reveal className="sky relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-6 py-20 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-5xl sm:leading-[1.1]">
              Ask your books anything.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/90">
              Real double-entry accounting, without the busywork. Let the AI draft it — you approve it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={SIGN_UP_URL} className="rounded-full bg-foreground px-7 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90">
                Start free trial
              </a>
              <a href={SIGN_IN_URL} className="rounded-full bg-white px-7 py-3 text-sm font-medium transition-all hover:-translate-y-0.5">
                Sign in
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 rounded-[28px] bg-white px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href={SIGN_IN_URL} className="hover:text-foreground">Sign in</a>
          </nav>
          <p>© <CopyrightYear /> Ailegr</p>
        </div>
      </footer>
    </>
  );
}
