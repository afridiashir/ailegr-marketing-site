"use client";

import { Check, Sparkles, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { comingSoon, includedInEveryPlan, plans, price, SIGN_UP_URL, YEARLY_SAVING } from "@/content/site";
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
          title={<>Simple pricing.<br className="hidden sm:block" /> Every AI feature in every plan.</>}
          body="Pay monthly, or yearly and get about 2 months free."
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
                className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full px-6 py-1.5 capitalize transition-colors ${
                  billing === b ? "font-medium text-brand-ink" : "text-muted"
                }`}
              >
                {b}
                {b === "yearly" && (
                  <span className="rounded-full bg-brand px-1.5 text-[10px] font-semibold text-white normal-case">Save {YEARLY_SAVING}</span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((p, i) => {
            const amount = billing === "yearly" ? p.yearly : p.monthly;
            return (
              <Reveal key={p.code} delay={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
                    p.featured
                      ? "border-brand shadow-[0_24px_60px_-28px_var(--brand)] ring-4 ring-brand/10"
                      : "border-border hover:shadow-[0_24px_50px_-28px_rgba(4,60,40,0.35)]"
                  }`}
                >
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 min-h-10 text-sm text-muted">{p.tagline}</p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      key={`${billing}-${amount}`}
                      className="inline-block animate-[price-in_.35s_ease-out] font-display text-[38px] font-bold tracking-tight tabular-nums"
                    >
                      {price(amount)}
                    </span>
                    <span className="text-sm text-muted">/{billing === "yearly" ? "year" : "month"}</span>
                  </div>
                  <p className="h-5 text-xs text-muted">
                    {billing === "yearly" ? (
                      <span className="font-medium text-brand">Save {YEARLY_SAVING} vs monthly</span>
                    ) : (
                      <>or {price(p.yearly)}/year (save {YEARLY_SAVING})</>
                    )}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                    <li className="flex items-center gap-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Sparkles className="size-3.5" aria-hidden />
                      </span>
                      <span>
                        <b className="tabular-nums">{p.credits.toLocaleString("en-US")}</b> AI credits per month
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Users className="size-3.5" aria-hidden />
                      </span>
                      <span>
                        <b>{p.usersIncluded}</b> {p.usersIncluded === 1 ? "user" : "users"} included
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-2 text-muted">
                        <UserPlus className="size-3.5" aria-hidden />
                      </span>
                      <span className="text-muted">Extra users {price(p.extraUser)}/month each</span>
                    </li>
                  </ul>

                  <div className="flex-1" />
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

        <Reveal className="mx-auto mt-6 max-w-5xl rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h3 className="font-semibold">Included in every plan</h3>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            {includedInEveryPlan.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
          <span>AI credits refill every month.</span>
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
