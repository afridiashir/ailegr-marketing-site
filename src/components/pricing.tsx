"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { comingSoon, planMatrix, plans, SIGN_UP_URL } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

type Billing = "monthly" | "yearly";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="px-3 pb-24 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-surface-2 px-4 py-20 sm:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Choose your plan"
          body="Every plan includes full double-entry accounting. Start with a free trial on the plan you choose; pay monthly or yearly."
        />

        <Reveal className="mt-8 flex justify-center">
          <div role="tablist" aria-label="Billing period" className="relative grid grid-cols-2 rounded-full border border-border bg-white p-1 text-sm">
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-soft ring-1 ring-brand/30 transition-transform duration-300 ease-out"
              style={{ transform: billing === "yearly" ? "translateX(100%)" : "none" }}
            />
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                role="tab"
                aria-selected={billing === b}
                onClick={() => setBilling(b)}
                className={`relative z-10 rounded-full px-7 py-1.5 capitalize transition-colors ${billing === b ? "font-medium text-brand-ink" : "text-muted"}`}
              >
                {b}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = billing === "yearly" ? p.yearly : p.monthly;
            return (
              <Reveal key={p.code} delay={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
                    p.featured
                      ? "border-brand shadow-[0_24px_60px_-28px_var(--brand)] ring-4 ring-brand/10"
                      : "border-border hover:shadow-[0_24px_50px_-28px_rgba(4,60,40,0.35)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.name}</h3>
                    {p.featured && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand">AI Copilot</span>}
                  </div>
                  <div className="mt-3 flex h-12 items-baseline gap-1.5">
                    {price !== null ? (
                      <>
                        <span key={`${billing}${price}`} className="inline-block animate-[price-in_.35s_ease-out] font-display text-[34px] font-semibold tracking-tight tabular-nums">
                          ${price}
                        </span>
                        <span className="text-xs text-muted">/ month{billing === "yearly" && ", billed yearly"}</span>
                      </>
                    ) : (
                      <span className="text-lg font-medium text-muted">Price coming soon</span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{p.tagline}</p>

                  <div className="my-6 h-px bg-border" />

                  <ul className="flex-1 space-y-3 text-sm">
                    {planMatrix.map((row) => {
                      const v = row[p.code];
                      return (
                        <li key={row.feature} className={`flex items-start gap-2.5 ${v ? "" : "text-muted/60"}`}>
                          <span
                            className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${v ? "bg-brand-soft text-brand" : "bg-surface-2 text-muted/60"}`}
                          >
                            {v ? <Check className="size-2.5" strokeWidth={3} aria-label="Included" /> : <Minus className="size-2.5" strokeWidth={3} aria-label="Not included" />}
                          </span>
                          <span>
                            {row.feature}
                            {typeof v === "string" && <span className="ml-1 text-xs text-muted">({v})</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={SIGN_UP_URL}
                    className={`mt-8 rounded-xl py-2.5 text-center text-sm font-medium transition-colors ${
                      p.featured ? "bg-brand text-white hover:bg-brand-strong" : "border border-border bg-white hover:border-foreground/25 hover:bg-surface-2"
                    }`}
                  >
                    Start free trial
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
          <span>AI usage runs on monthly credits included with your plan, refilled every month.</span>
          <span className="hidden sm:inline">·</span>
          <span>Coming soon:</span>
          {comingSoon.map((c) => (
            <span key={c} className="rounded-full border border-dashed border-border bg-white px-2.5 py-0.5 text-xs">
              {c}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
