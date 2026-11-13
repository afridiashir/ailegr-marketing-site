"use client";

import { Building2, Check, ChevronsUpDown, History, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./reveal";
import { Avatar, Card, SectionHeading, money } from "./ui";

const companies = [
  { name: "Northwind Traders", cash: 128400, open: 14, role: "Owner" },
  { name: "Fabrikam Studio", cash: 42150, open: 6, role: "Admin" },
  { name: "Contoso Bakery", cash: 18920, open: 3, role: "Member" },
];

const roles = [
  { role: "Owner", desc: "Billing, team and everything else" },
  { role: "Admin", desc: "Full bookkeeping and settings" },
  { role: "Member", desc: "Day-to-day bookkeeping" },
];

const audit = [
  { who: "Sam Lee", what: "reopened fiscal year 2025", when: "2h ago" },
  { who: "Ana Ruiz", what: "deleted bill BILL-0412", when: "Yesterday" },
  { who: "Sam Lee", what: "closed fiscal year 2025", when: "3 Jan" },
];

function SwitcherMock() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const c = companies[i];
  return (
    <Card className="relative w-full max-w-sm p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl border border-border p-2.5 text-left transition-colors hover:bg-surface-2"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
          <Building2 className="size-4" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">{c.name}</span>
          <span className="block text-[11px] text-muted">You are {c.role}</span>
        </span>
        <ChevronsUpDown className="size-4 text-muted" aria-hidden />
      </button>

      {open && (
        <ul className="absolute inset-x-4 top-[72px] z-10 animate-[price-in_.2s_ease-out] rounded-xl border border-border bg-white p-1 shadow-xl">
          {companies.map((co, j) => (
            <li key={co.name}>
              <button
                type="button"
                onClick={() => {
                  setI(j);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-surface-2"
              >
                <Avatar name={co.name} i={j} />
                <span className="flex-1">{co.name}</span>
                {j === i && <Check className="size-4 text-brand" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div key={c.name} className="mt-4 grid animate-[price-in_.3s_ease-out] grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-2 p-3">
          <div className="text-[11px] text-muted">Cash</div>
          <div className="mt-1 font-semibold tabular-nums">{money(c.cash, false)}</div>
        </div>
        <div className="rounded-xl bg-surface-2 p-3">
          <div className="text-[11px] text-muted">Open invoices</div>
          <div className="mt-1 font-semibold tabular-nums">{c.open}</div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-muted">Each company&apos;s data is strictly isolated.</p>
    </Card>
  );
}

export function Accountants() {
  const [invited, setInvited] = useState(false);
  return (
    <section id="accountants" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <SectionHeading
        eyebrow="For bookkeepers & accountants"
        title={<>One login for every<br className="hidden sm:block" /> client company</>}
        body="Manage many companies from one account, give your team the right access, and keep a record of sensitive changes."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Reveal className="mock-bg flex flex-col rounded-2xl border border-border p-6">
          <div className="flex min-h-64 flex-1 items-start justify-center">
            <SwitcherMock />
          </div>
          <h3 className="mt-6 font-semibold">Multiple companies, one login</h3>
          <p className="mt-1.5 text-sm text-muted">Jump between clients with the company switcher.</p>
        </Reveal>

        <Reveal delay={100} className="mock-bg flex flex-col rounded-2xl border border-border p-6">
          <div className="flex min-h-64 flex-1 items-start justify-center">
            <Card className="w-full max-w-sm p-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-1.5"><Users className="size-4 text-muted" aria-hidden /> Team</span>
                <button
                  type="button"
                  onClick={() => setInvited(true)}
                  disabled={invited}
                  className="flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[11px] font-medium text-white hover:bg-brand-strong disabled:bg-brand-soft disabled:text-brand"
                >
                  {invited ? <Check className="size-3" aria-hidden /> : <UserPlus className="size-3" aria-hidden />}
                  {invited ? "Invite sent" : "Invite"}
                </button>
              </div>
              <ul className="mt-3 space-y-2">
                {roles.map((r, i) => (
                  <li key={r.role} className="flex items-center gap-2.5 rounded-lg border border-border p-2">
                    <Avatar name={["Sam Lee", "Ana Ruiz", "Ben Oh"][i]} i={i} className="size-7 text-[10px]" />
                    <span className="flex-1 text-[11px]">
                      <span className="block font-medium">{r.role}</span>
                      <span className="block text-muted">{r.desc}</span>
                    </span>
                  </li>
                ))}
                {invited && (
                  <li className="flex animate-[price-in_.3s_ease-out] items-center gap-2.5 rounded-lg border border-dashed border-brand/50 p-2 text-[11px]">
                    <Avatar name="New Teammate" i={3} className="size-7 text-[10px]" />
                    <span className="flex-1">new.teammate@firm.com</span>
                    <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px]">Member</span>
                  </li>
                )}
              </ul>
            </Card>
          </div>
          <h3 className="mt-6 font-semibold">Owner, Admin and Member roles</h3>
          <p className="mt-1.5 text-sm text-muted">Owners invite teammates and decide what each can do.</p>
        </Reveal>

        <Reveal delay={200} className="mock-bg flex flex-col rounded-2xl border border-border p-6">
          <div className="flex min-h-64 flex-1 items-start justify-center">
            <Card className="w-full max-w-sm p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <History className="size-4 text-muted" aria-hidden /> Audit log
              </div>
              <ol className="relative mt-4 space-y-4 border-l border-border pl-4">
                {audit.map((a) => (
                  <li key={a.what} className="relative text-[11px]">
                    <span className="absolute top-1 -left-[21px] size-2.5 rounded-full border-2 border-white bg-brand" />
                    <span className="font-medium">{a.who}</span> <span className="text-muted">{a.what}</span>
                    <div className="text-[10px] text-muted">{a.when}</div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
          <h3 className="mt-6 font-semibold">Audit log for sensitive actions</h3>
          <p className="mt-1.5 text-sm text-muted">Deletes and reopening a closed year are always recorded.</p>
        </Reveal>
      </div>
    </section>
  );
}
