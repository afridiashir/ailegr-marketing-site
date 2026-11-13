"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs, SIGN_UP_URL } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          body={
            <>
              The quickest answer is to try it:{" "}
              <a href={SIGN_UP_URL} className="font-medium text-brand underline-offset-4 hover:underline">
                start a free trial
              </a>
              .
            </>
          }
        />
        <Reveal>
          <ul className="space-y-2">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className={`rounded-2xl border bg-white transition-colors ${isOpen ? "border-brand/30" : "border-border"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 p-5 text-left font-medium"
                  >
                    {f.q}
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-surface-2 text-muted"
                      }`}
                    >
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
