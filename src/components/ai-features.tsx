"use client";

import { Check, FileImage, FileSpreadsheet, FileText, ScanLine, Sparkles, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";
import { Avatar, Card, Checkbox, SectionHeading, money } from "./ui";

/* ---------- 1. Ask your books anything ---------- */

const questions = [
  { q: "Who owes me money?", kind: "aging" },
  { q: "Top 5 customers by revenue", kind: "ranking" },
  { q: "Cash forecast, next 3 months", kind: "forecast" },
] as const;

function AskMock() {
  const [i, setI] = useState(0);
  const kind = questions[i].kind;
  return (
    <div className="absolute inset-0 p-6 sm:p-8">
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, j) => (
          <button
            key={q.q}
            type="button"
            onClick={() => setI(j)}
            className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
              i === j ? "border-brand bg-white text-brand shadow-sm" : "border-border bg-white/60 text-muted hover:text-foreground"
            }`}
          >
            {q.q}
          </button>
        ))}
      </div>
      <Card key={kind} className="mt-4 max-w-[420px] animate-[price-in_.35s_ease-out] p-4">
        {kind === "aging" && (
          <>
            <div className="text-[11px] font-semibold">Receivables aging · as of today</div>
            <div className="mt-3 flex h-24 items-end gap-3">
              {[
                ["Current", 12400],
                ["1–30", 6800],
                ["31–60", 3100],
                ["61–90", 1200],
                ["90+", 650],
              ].map(([l, v], k) => (
                <div key={l} className="group flex flex-1 flex-col items-center gap-1">
                  <span className="text-[9px] text-muted opacity-0 transition-opacity group-hover:opacity-100">{money(v as number, false)}</span>
                  <span className={`w-full rounded-md ${k > 2 ? "bg-amber-400" : "bg-brand"}`} style={{ height: `${((v as number) / 12400) * 64 + 6}px` }} />
                  <span className="text-[9px] text-muted">{l}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted">3 customers are over 60 days late, totalling {money(1850, false)}.</p>
          </>
        )}
        {kind === "ranking" && (
          <>
            <div className="text-[11px] font-semibold">Top customers · this fiscal year</div>
            <ul className="mt-3 space-y-2">
              {[
                ["Acme", 48200],
                ["Fabrikam", 36900],
                ["Northwind", 28400],
                ["Contoso", 19700],
                ["Litware", 12100],
              ].map(([n, v], k) => (
                <li key={n} className="flex items-center gap-2 text-[11px]">
                  <Avatar name={n as string} i={k} />
                  <span className="w-16">{n}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${((v as number) / 48200) * 100}%` }} />
                  </span>
                  <span className="w-14 text-right tabular-nums">{money(v as number, false)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {kind === "forecast" && (
          <>
            <div className="text-[11px] font-semibold">Cash forecast</div>
            <svg viewBox="0 0 300 90" className="mt-3 w-full">
              <path d="M0,60 L60,52 L120,56 L180,40" fill="none" stroke="var(--brand)" strokeWidth="2.5" />
              <path d="M180,40 L240,34 L300,24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="5 5" />
              <path d="M180,40 L240,34 L300,24 L300,44 L240,50 L180,40Z" fill="var(--brand)" opacity=".12" />
              <circle cx="180" cy="40" r="4" fill="white" stroke="var(--brand)" strokeWidth="2" />
            </svg>
            <div className="mt-1 flex justify-between text-[9px] text-muted">
              <span>Aug</span><span>Sep</span><span>Oct</span><span className="font-semibold text-foreground">Today</span><span>Dec</span><span>Jan</span>
            </div>
            <p className="mt-3 text-[11px] text-muted">Based on open invoices, bills and recurring items.</p>
          </>
        )}
      </Card>
    </div>
  );
}

/* ---------- 2. AI does the bookkeeping (Copilot bulk drafts) ---------- */

const drafts = [
  { type: "Customer", name: "Litware Inc.", detail: "Net 30 · billing@litware.com" },
  { type: "Vendor", name: "Adatum Supplies", detail: "Matched → Office Supplies" },
  { type: "Journal", name: "Accrue November rent", detail: "Dr Rent 2,400.00 · Cr Accrued liabilities" },
  { type: "Asset", name: "MacBook Pro 14”", detail: "Straight-line · 36 months" },
];

function CopilotMock() {
  const [sel, setSel] = useState<Set<number>>(new Set([0, 1, 2]));
  const [posted, setPosted] = useState<Set<number>>(new Set());
  const pending = [...sel].filter((i) => !posted.has(i));
  const toggle = (i: number) =>
    setSel((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className="sky absolute inset-0">
      <Card className="absolute inset-x-5 top-6 overflow-hidden sm:inset-x-8">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Sparkles className="size-3.5 text-brand" aria-hidden /> Copilot drafts
          </span>
          <button
            type="button"
            onClick={() => setPosted((p) => new Set([...p, ...pending]))}
            disabled={!pending.length}
            className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-medium text-white transition-colors hover:bg-brand-strong disabled:bg-border disabled:text-muted"
          >
            {pending.length ? `Approve ${pending.length} selected` : posted.size ? "All approved" : "Select drafts"}
          </button>
        </div>
        <ul>
          {drafts.map((d, i) => {
            const done = posted.has(i);
            return (
              <li key={d.name} className={`flex items-center gap-3 border-t border-border px-4 py-2.5 text-[11px] first:border-t-0 ${done ? "bg-brand-soft/60" : "hover:bg-surface-2"}`}>
                <Checkbox checked={sel.has(i) || done} disabled={done} onChange={() => toggle(i)} label={`Select ${d.name}`} />
                <span className="w-14 shrink-0 rounded bg-surface-2 px-1.5 py-0.5 text-center text-[9px] font-medium text-muted">{d.type}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{d.name}</div>
                  <div className="truncate text-[10px] text-muted">{d.detail}</div>
                </div>
                <span className={`shrink-0 text-[10px] font-medium ${done ? "text-brand" : "text-amber-600"}`}>
                  {done ? <Check className="size-3.5" aria-label="Posted" /> : "Draft"}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* ---------- 3. Snap a receipt (Smart Scan) ---------- */

const extracted = [
  ["Vendor", "Blue Bottle Coffee"],
  ["Date", "12 Nov 2026"],
  ["Account", "Meals & Entertainment"],
  ["Tax", "$1.86"],
  ["Total", "$23.40"],
];

function ScanMock() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [shown, setShown] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scan = () => {
    timers.current.forEach(clearTimeout);
    setShown(0);
    setPhase("scanning");
    timers.current = [
      ...extracted.map((_, i) => setTimeout(() => setShown(i + 1), 500 + i * 220)),
      setTimeout(() => setPhase("done"), 500 + extracted.length * 220),
    ];
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-4 p-6 sm:gap-6">
      <button
        type="button"
        onClick={scan}
        className="group relative h-52 w-36 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-3 text-left shadow-[0_8px_30px_-12px_rgba(10,40,30,0.25)] transition-transform hover:-rotate-1"
        aria-label="Scan sample receipt"
      >
        <div className="text-center text-[9px] font-bold tracking-wider">BLUE BOTTLE</div>
        <div className="mt-2 space-y-1.5">
          {[70, 55, 80, 40, 65, 50].map((w, i) => (
            <div key={i} className="h-1 rounded bg-surface-2" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 border-t border-dashed border-border pt-2 text-[9px]">
          <div className="flex justify-between"><span>Tax</span><span>1.86</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>23.40</span></div>
        </div>
        {phase === "scanning" && (
          <span className="absolute inset-x-0 top-0 h-8 animate-[scan_1.2s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-brand/30 to-transparent" />
        )}
        {phase === "idle" && (
          <span className="absolute inset-0 grid place-items-center bg-white/70 opacity-100 backdrop-blur-[1px] transition-opacity">
            <span className="flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[10px] font-medium text-white">
              <ScanLine className="size-3" aria-hidden /> Scan it
            </span>
          </span>
        )}
      </button>

      <Card className="w-52 shrink-0 p-3">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          Draft bill
          <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${phase === "done" ? "bg-brand-soft text-brand" : "bg-surface-2 text-muted"}`}>
            {phase === "done" ? "Ready to approve" : phase === "scanning" ? "Reading…" : "Waiting"}
          </span>
        </div>
        <dl className="mt-2 divide-y divide-border text-[10px]">
          {extracted.map(([k, v], i) => (
            <div key={k} className="flex justify-between py-1.5">
              <dt className="text-muted">{k}</dt>
              <dd className={`font-medium transition-opacity duration-300 ${i < shown ? "opacity-100" : "opacity-0"}`}>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-2 flex gap-1.5 text-[9px] text-muted">
          <span className="flex items-center gap-0.5"><FileText className="size-3" aria-hidden />PDF</span>
          <span className="flex items-center gap-0.5"><FileImage className="size-3" aria-hidden />Photo</span>
          <span className="flex items-center gap-0.5"><FileSpreadsheet className="size-3" aria-hidden />CSV</span>
        </div>
      </Card>
    </div>
  );
}

/* ---------- 4. Smart categorization ---------- */

type Source = "History" | "Rule" | "AI";
const txns: { desc: string; amt: number; account: string; source: Source }[] = [
  { desc: "UBER *TRIP 8812", amt: 18.4, account: "Uncategorized", source: "AI" },
  { desc: "Adobe Creative Cloud", amt: 59.99, account: "Software", source: "History" },
  { desc: "UBER EATS 2210", amt: 32.1, account: "Uncategorized", source: "AI" },
  { desc: "Staples #1123", amt: 74.25, account: "Office Supplies", source: "History" },
];

function CategorizeMock() {
  const [rule, setRule] = useState(false);
  const sourceStyle: Record<Source, string> = {
    History: "bg-sky-50 text-sky-700",
    Rule: "bg-violet-50 text-violet-700",
    AI: "bg-brand-soft text-brand",
  };
  return (
    <div className="absolute inset-0 p-5 sm:p-8">
      <Card className="overflow-hidden">
        <ul>
          {txns.map((t) => {
            const isUber = t.desc.startsWith("UBER");
            const account = isUber ? (rule ? "Travel" : "Travel?") : t.account;
            const source: Source = isUber && rule ? "Rule" : t.source;
            return (
              <li key={t.desc} className="flex items-center gap-3 border-t border-border px-4 py-2.5 text-[11px] first:border-t-0">
                <span className="min-w-0 flex-1 truncate font-medium">{t.desc}</span>
                <span className="w-14 text-right tabular-nums text-muted">{money(t.amt)}</span>
                <span className={`w-24 truncate text-right font-medium transition-colors ${account.endsWith("?") ? "text-muted" : ""}`}>{account}</span>
                <span className={`w-14 rounded px-1.5 py-0.5 text-center text-[9px] font-medium transition-colors ${sourceStyle[source]}`}>{source}</span>
              </li>
            );
          })}
        </ul>
      </Card>
      <button
        type="button"
        onClick={() => setRule((r) => !r)}
        aria-pressed={rule}
        className={`mt-4 flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left text-[11px] transition-colors ${rule ? "border-brand" : "border-border hover:border-brand/50"}`}
      >
        <Wand2 className="size-4 text-brand" aria-hidden />
        <span className="flex-1">
          Import rule: anything containing <b>&ldquo;Uber&rdquo;</b> → <b>Travel</b>
        </span>
        <span className={`relative h-5 w-9 rounded-full transition-colors ${rule ? "bg-brand" : "bg-border"}`}>
          <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${rule ? "left-[18px]" : "left-0.5"}`} />
        </span>
      </button>
    </div>
  );
}

/* ---------- section ---------- */

const items = [
  { title: "Ask your books anything", body: "P&L, cash forecast, aging, top customers, variance vs last period — ask in plain English and get answers as real report cards, built from your own data.", Mock: AskMock },
  { title: "AI does the bookkeeping", body: "Expenses, invoices, bills, payments, customers, fixed assets, recurring rules — even add up to 50 at once. Every draft waits for your approval.", Mock: CopilotMock },
  { title: "Snap a receipt", body: "Drop in a receipt, bill or invoice — PDF, a photo from your phone, or a spreadsheet — and Smart Scan turns it into a ready-to-approve expense or bill.", Mock: ScanMock },
  { title: "Smart categorization", body: "Suggests the right account from your own history first, then your import rules and keywords, with AI for the rest.", Mock: CategorizeMock },
];

export function AIFeatures() {
  return (
    <section id="ai" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <SectionHeading
        eyebrow="AI built in"
        title={<>An AI accountant that<br className="hidden sm:block" /> works for you</>}
        body="Ailegr's assistant answers questions about your finances and does the bookkeeping for you — but never posts anything without your approval."
      />
      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {items.map(({ title, body, Mock }, i) => (
          <Reveal key={title} delay={(i % 2) * 120} className="group">
            <div className="mock-bg relative h-[320px] overflow-hidden rounded-2xl border border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_-24px_rgba(4,60,40,0.35)]">
              <Mock />
            </div>
            <h3 className="mt-6 text-lg font-semibold">{title}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
