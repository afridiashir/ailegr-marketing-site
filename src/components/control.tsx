"use client";

import { Check, CircleCheck, Lock, MousePointerClick, Pencil, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, useInView } from "./reveal";
import { Card, SectionHeading } from "./ui";

const steps = [
  { title: "AI drafts", body: "Ask in plain English. The assistant prepares the entry and matches names to your real customers, vendors and accounts." },
  { title: "You review", body: "Every write shows up as an approval card. Change the amount, account or date right on the card before anything is saved." },
  { title: "You approve", body: "Click Approve and it's recorded in your books — once, with no accidental duplicates." },
];

const guarantees = [
  { icon: Lock, text: "Drafts never post on their own" },
  { icon: Pencil, text: "Edit anything on the card first" },
  { icon: UserCheck, text: "Names matched to your real records" },
  { icon: ShieldCheck, text: "Permissions follow your role" },
  { icon: MousePointerClick, text: "No accidental duplicate entries" },
];

function StateCard({ step }: { step: number }) {
  const status = ["Drafting…", "Awaiting approval", "Posted"][step];
  return (
    <Card className="w-full max-w-sm p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles className="size-3.5 text-brand" aria-hidden /> Draft bill · Adatum Supplies
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
            step === 2 ? "bg-brand-soft text-brand" : step === 1 ? "bg-amber-50 text-amber-700" : "bg-surface-2 text-muted"
          }`}
        >
          {status}
        </span>
      </div>
      <dl className="mt-3 divide-y divide-border text-xs">
        {[
          ["Vendor", "Adatum Supplies", true],
          ["Account", "Office Supplies", true],
          ["Due", "Net 30 · 13 Dec 2026", false],
          ["Amount", "$312.80", false],
        ].map(([k, v, m], i) => (
          <div key={k as string} className="flex items-center justify-between py-2">
            <dt className="text-muted">{k}</dt>
            <dd
              className={`flex items-center gap-1.5 font-medium transition-all duration-300 ${
                step === 0 && i > 1 ? "opacity-30 blur-[2px]" : ""
              } ${step === 1 && k === "Amount" ? "rounded bg-amber-50 px-1.5 ring-1 ring-amber-300" : ""}`}
            >
              {v}
              {m && step > 0 && <span className="rounded bg-brand-soft px-1 text-[9px] font-semibold text-brand">Matched</span>}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex gap-2 text-xs">
        <span className={`flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 ${step === 1 ? "border-amber-300 bg-amber-50" : ""}`}>
          <Pencil className="size-3" aria-hidden /> Edit
        </span>
        <span className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 font-medium text-white transition-colors ${step === 2 ? "bg-brand" : "bg-brand/60"}`}>
          {step === 2 ? <CircleCheck className="size-3.5" aria-hidden /> : <Check className="size-3.5" aria-hidden />}
          {step === 2 ? "Approved" : "Approve"}
        </span>
      </div>
      {step === 2 && (
        <p className="mt-3 animate-[price-in_.3s_ease-out] rounded-lg bg-surface-2 px-3 py-2 font-mono text-[10px] text-muted">
          Dr Office Supplies 312.80 · Cr Accounts Payable 312.80
        </p>
      )}
    </Card>
  );
}

export function Control() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 3200);
    return () => clearInterval(t);
  }, [inView, paused]);

  return (
    <section id="control" className="px-3 pb-24 sm:px-4 lg:pb-32">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-white px-4 py-20 sm:px-10 lg:py-24">
        <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Human in the loop"
              title="You stay in control"
              body="The AI never posts on its own. Every change it wants to make is a draft you can see, edit and approve."
            />
            <ol className="mt-10 space-y-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={step === i}
                    className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors ${
                      step === i ? "border-brand/40 bg-brand-soft/50" : "border-transparent hover:bg-surface-2"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid size-7 place-items-center rounded-full text-xs font-semibold transition-colors ${
                          step >= i ? "bg-brand text-white" : "bg-surface-2 text-muted"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-semibold">{s.title}</span>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-300 ${step === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className="min-h-0 overflow-hidden pl-10 text-sm leading-relaxed text-muted">
                        <span className="block pt-2">{s.body}</span>
                      </p>
                    </div>
                    {step === i && inView && !paused && (
                      <span key={`p${step}`} className="absolute bottom-0 left-0 h-0.5 origin-left animate-[progress_3.2s_linear] bg-brand" style={{ width: "100%" }} />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <Reveal className="mock-bg flex min-h-[420px] items-center justify-center rounded-3xl border border-border p-6">
            <StateCard step={step} />
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-3 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {guarantees.map(({ icon: I, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-sm">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <I className="size-4" aria-hidden />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
