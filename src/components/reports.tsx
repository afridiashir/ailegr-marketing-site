"use client";

import { AlertCircle, ArrowDownLeft, ArrowUpRight, Check, FileDown } from "lucide-react";
import { useRef, useState } from "react";
import { LogoMark } from "./icons";
import { Reveal, useCountUp, useInView } from "./reveal";
import { SectionHeading, money } from "./ui";

const reports = [
  "Profit and loss",
  "Balance sheet",
  "Cash flow statement",
  "Cash in and out",
  "Trial balance",
  "General ledger",
  "Journal report",
  "Receivables aging",
  "Payables aging",
  "Vendor transactions",
  "Ratios and trends",
];

const trend = [
  { m: "Jun", rev: 62, exp: 44 },
  { m: "Jul", rev: 58, exp: 41 },
  { m: "Aug", rev: 71, exp: 47 },
  { m: "Sep", rev: 66, exp: 45 },
  { m: "Oct", rev: 78, exp: 50 },
  { m: "Nov", rev: 84, exp: 52 },
];

function Metric({ label, value, up, delta, start }: { label: string; value: number; up: boolean; delta: string; start: boolean }) {
  const v = useCountUp(value, start);
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <div className="text-[10px] text-muted">{label}</div>
      <div className="mt-1 text-base font-semibold tracking-tight tabular-nums">{money(Math.round(v), false)}</div>
      <div className={`mt-0.5 flex items-center gap-0.5 text-[10px] font-medium ${up ? "text-brand" : "text-amber-600"}`}>
        {up ? <ArrowUpRight className="size-3" aria-hidden /> : <ArrowDownLeft className="size-3" aria-hidden />}
        {delta} vs last period
      </div>
    </div>
  );
}

function Dashboard() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const [hover, setHover] = useState(5);
  const d = trend[hover];

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/60 bg-surface-2 shadow-[0_30px_70px_-20px_rgba(4,60,40,0.45)]">
      <div className="flex items-center gap-2 border-b border-border bg-white px-4 py-2.5">
        <LogoMark className="size-6" />
        <span className="text-[13px] font-semibold">Dashboard</span>
        <span className="ml-auto rounded-md border border-border px-2 py-0.5 text-[10px] text-muted">This month</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-3">
          <Metric label="Revenue" value={84200} up delta="+8%" start={inView} />
          <Metric label="Expenses" value={51900} up={false} delta="+3%" start={inView} />
          <Metric label="Net profit" value={32300} up delta="+17%" start={inView} />
        </div>

        <div className="rounded-xl border border-border bg-white p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold">Revenue vs expense</span>
            <span className="tabular-nums text-muted">
              {d.m}: <span className="font-medium text-brand">${d.rev}k</span> / <span className="font-medium text-foreground/70">${d.exp}k</span>
            </span>
          </div>
          <div className="mt-3 flex h-28 items-end gap-3" onMouseLeave={() => setHover(5)}>
            {trend.map((t, i) => (
              <button
                key={t.m}
                type="button"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                aria-label={`${t.m}: revenue $${t.rev}k, expenses $${t.exp}k`}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
              >
                <span className="flex h-full w-full items-end justify-center gap-1">
                  {(["rev", "exp"] as const).map((k) => (
                    <span
                      key={k}
                      className={`w-1/2 max-w-3 origin-bottom rounded-t transition-colors ${
                        k === "rev" ? (hover === i ? "bg-brand" : "bg-brand/40") : hover === i ? "bg-foreground/50" : "bg-foreground/15"
                      }`}
                      style={{
                        height: `${(t[k] / 90) * 100}%`,
                        transform: inView ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform .8s cubic-bezier(.2,.7,.2,1) ${i * 60}ms, background-color .2s`,
                      }}
                    />
                  ))}
                </span>
                <span className={`text-[9px] ${hover === i ? "font-semibold text-foreground" : "text-muted"}`}>{t.m}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-white p-3">
            <div className="flex items-center gap-1 text-[11px] font-semibold">
              <AlertCircle className="size-3.5 text-amber-500" aria-hidden /> Needs attention
            </div>
            <ul className="mt-2 space-y-1.5 text-[10px]">
              <li className="flex justify-between"><span>INV-1029 · Contoso</span><span className="text-amber-600">12d overdue</span></li>
              <li className="flex justify-between"><span>INV-1031 · Litware</span><span className="text-amber-600">5d overdue</span></li>
              <li className="flex justify-between"><span>Bill · Adatum</span><span className="text-muted">due Fri</span></li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-white p-3">
            <div className="text-[11px] font-semibold">Recent activity</div>
            <ul className="mt-2 space-y-1.5 text-[10px] text-muted">
              <li className="flex justify-between"><span>Payment from Acme</span><span className="text-brand">+$1,200</span></li>
              <li className="flex justify-between"><span>Expense · Joe&apos;s</span><span>−$45</span></li>
              <li className="flex justify-between"><span>Depreciation run</span><span>auto</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Reports() {
  const [toast, setToast] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const exportReport = (name: string, fmt: "PDF" | "CSV") => {
    clearTimeout(t.current);
    setToast(`${name}.${fmt.toLowerCase()}`);
    t.current = setTimeout(() => setToast(null), 2000);
  };

  return (
    <section id="reports" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Reports"
            title="Reports that are ready the moment you need them"
            body="Every report is built from a balanced double-entry ledger. Compare periods, filter by class, and export any report to PDF or CSV."
          />
          <Reveal delay={100}>
            <ul className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {reports.map((r) => (
                <li key={r} className="group flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-sm transition-colors hover:border-brand/40">
                  <span className="truncate">{r}</span>
                  <span className="flex gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                    {(["PDF", "CSV"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => exportReport(r, f)}
                        className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted transition-colors hover:bg-brand hover:text-white"
                        aria-label={`Export ${r} as ${f}`}
                      >
                        {f}
                      </button>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="sky relative rounded-[22px] p-4 sm:p-8">
          <Dashboard />
          <div
            role="status"
            className={`absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs whitespace-nowrap text-white shadow-lg transition-all duration-300 ${
              toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            {toast && (
              <>
                <FileDown className="size-3.5" aria-hidden /> {toast} <Check className="size-3.5 text-emerald-300" aria-hidden />
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
