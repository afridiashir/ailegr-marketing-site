"use client";

import {
  BookOpen,
  Building2,
  CalendarDays,
  ChartColumn,
  ChevronsUpDown,
  CircleDollarSign,
  FileText,
  Info,
  Landmark,
  LayoutDashboard,
  NotebookPen,
  Package,
  PanelLeft,
  Plus,
  ReceiptText,
  Repeat,
  Search,
  Settings,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./reveal";

/* ------------------------------------------------------------------ */
/* Sample data — a fictional company, not a real customer account.      */
/* ------------------------------------------------------------------ */

const periods = ["1M", "3M", "6M", "1Y", "YTD"] as const;
type Period = (typeof periods)[number];

const periodData: Record<Period, { rev: [number, number]; exp: [number, number]; cash: [number, number]; points: number; range: string }> = {
  "1M": { rev: [48200.0, 44130.5], exp: [31412.4, 30905.1], cash: [182450.32, 171302.9], points: 5, range: "14 Oct – 13 Nov 2026" },
  "3M": { rev: [142810.25, 131520.0], exp: [93104.6, 90230.75], cash: [182450.32, 158911.4], points: 7, range: "14 Aug – 13 Nov 2026" },
  "6M": { rev: [276340.0, 248712.3], exp: [181620.45, 176455.2], cash: [182450.32, 139240.85], points: 9, range: "14 May – 13 Nov 2026" },
  "1Y": { rev: [528930.1, 461245.0], exp: [352710.8, 338104.35], cash: [182450.32, 121830.6], points: 12, range: "14 Nov 2025 – 13 Nov 2026" },
  YTD: { rev: [468350.4, 410120.75], exp: [309812.15, 297430.6], cash: [182450.32, 126904.18], points: 11, range: "1 Jan – 13 Nov 2026" },
};

const spark = {
  rev: [30, 34, 31, 38, 36, 41, 39, 45, 43, 48, 46, 52],
  exp: [28, 27, 30, 29, 31, 30, 33, 31, 32, 31, 34, 33],
  net: [6, 9, 5, 11, 8, 13, 9, 15, 12, 17, 13, 19],
  cash: [20, 22, 21, 25, 24, 28, 27, 30, 29, 33, 32, 36],
};

const attention = [
  { tone: "amber", tag: "Collect", count: "6 invoices", title: "Overdue customer invoices", amount: 18420.0, cta: "See who owes" },
  { tone: "rose", tag: "Pay", count: "4 bills", title: "Bills overdue or due this week", amount: 9860.5, cta: "Pay bills" },
  { tone: "sky", tag: "Post", count: "12 drafts", title: "Draft entries awaiting review", amount: 3214.75, cta: "Review & post" },
  { tone: "emerald", tag: "Send", count: "3 invoices", title: "Invoices not yet sent to customer", amount: 7150.0, cta: "Send invoices" },
] as const;

const toneStyles = {
  amber: { card: "bg-amber-50 border-amber-200", tag: "text-amber-700", btn: "border-amber-300 bg-amber-100 text-amber-800 hover:bg-amber-200" },
  rose: { card: "bg-rose-50 border-rose-100", tag: "text-rose-700", btn: "border-rose-200 bg-white text-rose-700 hover:bg-rose-100" },
  sky: { card: "bg-sky-50 border-sky-100", tag: "text-sky-700", btn: "border-sky-200 bg-white text-sky-700 hover:bg-sky-100" },
  emerald: { card: "bg-emerald-50 border-emerald-100", tag: "text-emerald-700", btn: "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-100" },
};

const questions = [
  {
    q: "Who do I owe next week?",
    a: (
      <ul className="space-y-1.5">
        {[
          ["Adatum Supplies", "Mon 16 Nov", "$2,140.00"],
          ["City Power & Light", "Wed 18 Nov", "$486.30"],
          ["Litware Hosting", "Fri 20 Nov", "$1,250.00"],
        ].map(([v, d, a]) => (
          <li key={v} className="flex justify-between gap-4">
            <span>
              <span className="font-medium">{v}</span> <span className="text-muted">· {d}</span>
            </span>
            <span className="tabular-nums">{a}</span>
          </li>
        ))}
        <li className="flex justify-between border-t border-border pt-1.5 font-semibold">
          <span>Total due next week</span>
          <span className="tabular-nums">$3,876.30</span>
        </li>
      </ul>
    ),
  },
  {
    q: "Why were expenses up in July?",
    a: (
      <p>
        July expenses were <b>$4,820 higher</b> than June, mostly from <b>Contractors (+$3,600)</b> and <b>Software (+$1,150)</b>.
        Other categories were flat.
      </p>
    ),
  },
  {
    q: "Which customers are overdue?",
    a: (
      <ul className="space-y-1.5">
        {[
          ["Contoso Ltd", "42 days", "$8,900.00"],
          ["Fabrikam Studio", "18 days", "$6,320.00"],
          ["Litware Inc.", "9 days", "$3,200.00"],
        ].map(([c, d, a]) => (
          <li key={c} className="flex justify-between gap-4">
            <span>
              <span className="font-medium">{c}</span> <span className="text-amber-700">· {d} late</span>
            </span>
            <span className="tabular-nums">{a}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

const nav: { section?: string; items: { label: string; icon: LucideIcon }[] }[] = [
  { items: [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Reports", icon: ChartColumn },
    { label: "AI assistant", icon: Sparkles },
  ] },
  { section: "Sales", items: [
    { label: "Customers", icon: Users },
    { label: "Invoices", icon: FileText },
  ] },
  { section: "Purchases", items: [
    { label: "Vendors", icon: Store },
    { label: "Bills", icon: ReceiptText },
    { label: "Expenses", icon: Wallet },
  ] },
  { section: "Accounting", items: [
    { label: "Chart of accounts", icon: BookOpen },
    { label: "Journal entries", icon: NotebookPen },
    { label: "Banking", icon: Landmark },
  ] },
  { section: "Operations", items: [
    { label: "Products & services", icon: Package },
    { label: "Fixed assets", icon: Building2 },
    { label: "Recurring", icon: Repeat },
  ] },
];

/* ------------------------------------------------------------------ */

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

/** Tweens from the previous value to the new target. */
function useTween(target: number, run: boolean, duration = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / duration);
      const next = start + (target - start) * (1 - Math.pow(1 - p, 3));
      from.current = next;
      setV(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return v;
}

function Money({ value, run, className = "" }: { value: number; run: boolean; className?: string }) {
  const v = useTween(value, run);
  return <span className={`tabular-nums ${className}`}>{fmt(v)}</span>;
}

function Sparkline({ data, color, id }: { data: number[]; color: string; id: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 260, H = 46;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - 4 - ((v - min) / (max - min || 1)) * (H - 10)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const idx = hover ?? pts.length - 1;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-3 h-12 w-full overflow-visible"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setHover(Math.round(((e.clientX - r.left) / r.width) * (pts.length - 1)));
      }}
      onMouseLeave={() => setHover(null)}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".16" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${W},${H} L0,${H}Z`} fill={`url(#${id})`} className="transition-all duration-500" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" className="transition-all duration-500" />
      {hover !== null && <line x1={pts[idx][0]} x2={pts[idx][0]} y1="0" y2={H} stroke={color} strokeOpacity=".3" />}
      <circle cx={pts[idx][0]} cy={pts[idx][1]} r="4" fill={color} stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function MetricCard({
  label, icon: I, iconCls, now, prev, data, color, run, invert = false,
}: {
  label: string; icon: LucideIcon; iconCls: string; now: number; prev: number; data: number[]; color: string; run: boolean; invert?: boolean;
}) {
  const diff = now - prev;
  const pct = (diff / Math.abs(prev)) * 100;
  const good = invert ? diff <= 0 : diff >= 0;
  return (
    <div className="rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(4,60,40,0.35)]">
      <div className="flex items-start justify-between">
        <span className={`grid size-10 place-items-center rounded-xl ${iconCls}`}>
          <I className="size-5" aria-hidden />
        </span>
        <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-semibold ${good ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {diff >= 0 ? <TrendingUp className="size-3.5" aria-hidden /> : <TrendingDown className="size-3.5" aria-hidden />}
          {Math.abs(pct).toFixed(1)}%
        </span>
      </div>
      <Money value={now} run={run} className="mt-4 block font-display text-[26px] font-bold tracking-tight" />
      <div className="text-[12px] font-medium tracking-wide text-muted uppercase">{label}</div>
      <div className="mt-4 flex items-end justify-between border-t border-border pt-3 text-[12px]">
        <span>
          <span className="block text-muted">Previous period</span>
          <span className="font-medium tabular-nums">{fmt(prev)}</span>
        </span>
        <span className={`font-medium tabular-nums ${good ? "text-emerald-700" : "text-rose-700"}`}>
          {diff >= 0 ? "+" : "−"}
          {fmt(Math.abs(diff))}
        </span>
      </div>
      <Sparkline data={data} color={color} id={`sp-${label.toLowerCase().replace(/\W+/g, "-")}`} />
    </div>
  );
}

function AskBar() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [open, setOpen] = useState(false);

  // Typewriter that cycles through example questions while the answer is closed.
  useEffect(() => {
    if (open) return;
    const q = questions[qi].q;
    let i = 0;
    let hold: ReturnType<typeof setTimeout>;
    const type = setInterval(() => {
      i++;
      setTyped(q.slice(0, i));
      if (i >= q.length) {
        clearInterval(type);
        hold = setTimeout(() => setQi((n) => (n + 1) % questions.length), 2600);
      }
    }, 38);
    return () => {
      clearInterval(type);
      clearTimeout(hold);
    };
  }, [qi, open]);

  return (
    <div className="relative">
      <div className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-2.5 transition-colors ${open ? "border-brand/50 ring-4 ring-brand/10" : "border-border"}`}>
        <Sparkles className="size-[18px] shrink-0 text-brand" aria-hidden />
        <span className="flex-1 truncate text-[15px]">
          {typed ? (
            <span className="text-foreground">
              {typed}
              {!open && <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-foreground" />}
            </span>
          ) : (
            <span className="text-muted">Ask anything…</span>
          )}
        </span>
        <button
          type="button"
          onClick={() => {
            setTyped(questions[qi].q);
            setOpen(true);
          }}
          className="rounded-lg bg-surface-2 px-3.5 py-1.5 text-[14px] font-medium text-muted transition-colors hover:bg-brand hover:text-white"
        >
          Ask
        </button>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 animate-[price-in_.25s_ease-out] rounded-2xl border border-border bg-white p-4 text-[13px] shadow-[0_24px_60px_-20px_rgba(4,60,40,0.4)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-brand">
              <Sparkles className="size-3.5" aria-hidden /> Answered from your books
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close answer" className="grid size-6 place-items-center rounded-md text-muted hover:bg-surface-2">
              <X className="size-3.5" />
            </button>
          </div>
          {questions[qi].a}
        </div>
      )}
    </div>
  );
}

/** Pixel-faithful dashboard rendered at a fixed design width, then scaled to fit. */
function DashboardScreen({ run }: { run: boolean }) {
  const [period, setPeriod] = useState<Period>("YTD");
  const [active, setActive] = useState("Dashboard");
  const d = periodData[period];
  const net: [number, number] = [d.rev[0] - d.exp[0], d.rev[1] - d.exp[1]];
  const s = (arr: number[]) => arr.slice(arr.length - d.points);

  return (
    <div className="flex h-[860px] w-[1280px] bg-[#f6f8f7] text-foreground">
      {/* Sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-border bg-[#eef3f0] px-2.5 py-3">
        <div className="flex items-center gap-2.5 px-2 pb-4">
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
            <Zap className="size-[18px]" strokeWidth={2.25} aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold">Ailegr</span>
            <span className="block text-[12px] text-muted">Automated Bookkeeping</span>
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-hidden">
          {nav.map((g, gi) => (
            <div key={gi} className={g.section ? "pt-3" : ""}>
              {g.section && <div className="px-2.5 pb-1 text-[11px] font-semibold tracking-wider text-muted uppercase">{g.section}</div>}
              {g.items.map(({ label, icon: I }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActive(label)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors ${
                    active === label ? "bg-emerald-700 font-medium text-white" : "text-foreground/80 hover:bg-white/70"
                  }`}
                >
                  <I className="size-4" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2.5 px-2.5 py-2 text-[14px] text-foreground/80">
          <Settings className="size-4" aria-hidden /> Settings
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-[#eef3f0]/60 px-5">
          <PanelLeft className="size-[18px] text-muted" aria-hidden />
          <span className="h-6 w-px bg-border" />
          <span className="flex items-center gap-1.5 text-[15px] font-medium">
            Northwind Traders <ChevronsUpDown className="size-4 text-muted" aria-hidden />
          </span>
          <div className="ml-auto flex w-[400px] items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-[14px] text-muted">
            <Search className="size-4" aria-hidden />
            Search…
            <span className="ml-auto rounded border border-border bg-surface-2 px-1.5 text-[11px]">Ctrl K</span>
          </div>
          <span className="ml-auto grid size-8 place-items-center rounded-full bg-emerald-100 text-[13px] font-semibold text-emerald-700">S</span>
        </header>

        {/* Main */}
        <main className="flex-1 space-y-5 overflow-hidden px-8 py-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="font-display text-[28px] font-bold tracking-tight">Good morning, Sam</h3>
              <p className="mt-1 text-[14px] text-foreground/80">
                You have <b className="tabular-nums">{fmt(d.cash[0])}</b> in the bank and <b>25 items</b> that need your attention today.
              </p>
              <p className="mt-1 flex items-center gap-1 text-[12px] text-muted">
                <CalendarDays className="size-3.5" aria-hidden /> {d.range}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div role="tablist" aria-label="Period" className="flex rounded-xl border border-border bg-white p-1">
                {periods.map((p) => (
                  <button
                    key={p}
                    role="tab"
                    aria-selected={period === p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`rounded-lg px-3.5 py-1.5 text-[14px] font-medium transition-colors ${
                      period === p ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Info className="size-4 text-muted" aria-hidden />
              <span className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-[15px] font-semibold text-white">
                <Plus className="size-4" aria-hidden /> New
              </span>
            </div>
          </div>

          <AskBar />

          <section className="rounded-2xl border border-border bg-white p-5">
            <h4 className="font-display text-[16px] font-semibold">Needs your attention</h4>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {attention.map((a) => {
                const t = toneStyles[a.tone];
                return (
                  <div key={a.tag} className={`rounded-xl border p-4 transition-transform hover:-translate-y-0.5 ${t.card}`}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className={`font-semibold tracking-wide uppercase ${t.tag}`}>{a.tag}</span>
                      <span className="text-muted">{a.count}</span>
                    </div>
                    <div className="mt-2 text-[14px] font-medium">{a.title}</div>
                    <Money value={a.amount} run={run} className="mt-3 block font-display text-[22px] font-bold" />
                    <span className={`mt-3 inline-block rounded-lg border px-3 py-1 text-[13px] font-medium transition-colors ${t.btn}`}>{a.cta}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Revenue" icon={CircleDollarSign} iconCls="bg-emerald-50 text-emerald-600" now={d.rev[0]} prev={d.rev[1]} data={s(spark.rev)} color="#059669" run={run} />
            <MetricCard label="Expenses" icon={TrendingDown} iconCls="bg-rose-50 text-rose-500" now={d.exp[0]} prev={d.exp[1]} data={s(spark.exp)} color="#e11d48" run={run} invert />
            <MetricCard label="Net profit" icon={TrendingUp} iconCls="bg-sky-50 text-sky-600" now={net[0]} prev={net[1]} data={s(spark.net)} color="#2563eb" run={run} />
            <MetricCard label="Cash" icon={Landmark} iconCls="bg-teal-50 text-teal-600" now={d.cash[0]} prev={d.cash[1]} data={s(spark.cash)} color="#0d9488" run={run} />
          </div>
        </main>
      </div>
    </div>
  );
}

export function HeroDashboard() {
  const [ref, inView] = useInView<HTMLDivElement>(0.05);
  const frameRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, crop: 0 });
  const [tilt, setTilt] = useState(1);

  // Scale the fixed-width screen to the available width.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      // On narrow screens, crop the sidebar so the dashboard itself stays readable.
      const crop = w < 768 ? 240 : 0;
      setFit({ scale: Math.min(1, w / (1280 - crop)), crop });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Tilted on load, flattens as you scroll.
  useEffect(() => {
    const onScroll = () => setTilt(Math.max(0, 1 - window.scrollY / 420));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="[perspective:1600px]">
      <div
        className="origin-top rounded-[18px] border border-white/70 bg-white/40 p-1.5 shadow-[0_40px_100px_-30px_rgba(4,60,40,0.55)] backdrop-blur transition-transform duration-200 ease-out sm:p-2"
        style={{ transform: `rotateX(${tilt * 14}deg) scale(${0.94 + (1 - tilt) * 0.06})` }}
      >
        <div ref={frameRef} className="relative overflow-hidden rounded-xl" style={{ height: 860 * fit.scale }}>
          <div className="origin-top-left" style={{ transform: `scale(${fit.scale}) translateX(-${fit.crop}px)`, width: 1280 }}>
            <DashboardScreen run={inView} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f6f8f7] to-transparent" />
        </div>
      </div>
    </div>
  );
}
