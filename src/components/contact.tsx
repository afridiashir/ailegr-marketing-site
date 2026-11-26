"use client";

import { CircleCheck, Clock, Loader2, Mail, MessageSquareText, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactMessage, type ContactField, type ContactState } from "@/app/actions/contact";
import { CONTACT_TOPICS } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

const initialState: ContactState = { status: "idle" };

const inputCls = (invalid?: boolean) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:ring-4 ${
    invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "border-border focus:border-brand focus:ring-brand/10"
  }`;

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: ContactField;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-1.5 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} className="mt-1.5 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const startedAt = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState<number | null>(null);

  // Record when the form was shown; submissions faster than a person can type are dropped.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[460px] flex-col items-center justify-center text-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-sm text-muted">{state.message ?? "Thanks! We'll get back to you by email."}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const describe = (id: ContactField) => (e[id] ? `contact-${id}-error` : undefined);

  return (
    // Re-mount with the submitted values so every field (including the select) keeps what was typed after an error.
    <form key={JSON.stringify(v)} action={formAction} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" error={e.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={v.name}
            aria-invalid={!!e.name}
            aria-describedby={describe("name")}
            className={inputCls(!!e.name)}
            placeholder="Jane Smith"
          />
        </Field>
        <Field id="email" label="Work email" error={e.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            defaultValue={v.email}
            aria-invalid={!!e.email}
            aria-describedby={describe("email")}
            className={inputCls(!!e.email)}
            placeholder="jane@company.com"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="company" label="Company" optional error={e.company}>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            maxLength={120}
            defaultValue={v.company}
            aria-invalid={!!e.company}
            aria-describedby={describe("company")}
            className={inputCls(!!e.company)}
            placeholder="Company name"
          />
        </Field>
        <Field id="topic" label="Topic" error={e.topic}>
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue={v.topic ?? CONTACT_TOPICS[0]}
            aria-invalid={!!e.topic}
            aria-describedby={describe("topic")}
            className={inputCls(!!e.topic)}
          >
            {CONTACT_TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={e.message}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          defaultValue={v.message}
          onChange={(ev) => setTyped(ev.target.value.length)}
          aria-invalid={!!e.message}
          aria-describedby={describe("message")}
          className={`${inputCls(!!e.message)} resize-y`}
          placeholder="How can we help?"
        />
        <div className="mt-1 text-right text-[11px] text-muted tabular-nums">{(typed ?? v.message?.length ?? 0).toLocaleString("en-US")} / 5,000</div>
      </Field>

      {/* Spam traps: hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-col-reverse items-center gap-3 pt-1 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">We&apos;ll only use your details to reply to you.</p>
        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-wait disabled:bg-brand/70 sm:w-auto"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

const points = [
  { icon: MessageSquareText, title: "Sales & pricing", body: "Questions about plans, AI credits or adding users." },
  { icon: Mail, title: "Support", body: "Help with your account, bank connections or reports." },
  { icon: Clock, title: "We reply by email", body: "Your message goes straight to our team's inbox." },
];

export function Contact() {
  const [formKey, setFormKey] = useState(0);
  return (
    <section id="contact" className="px-3 pb-24 sm:px-4 lg:pb-32">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[28px] bg-white px-5 py-14 sm:px-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14 lg:py-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact us"
            title="Talk to the Ailegr team"
            body="Have a question about Ailegr, pricing or your account? Send us a message and we'll get back to you by email."
          />
          <Reveal delay={100}>
            <ul className="mt-8 space-y-4">
              {points.map(({ icon: I, title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <I className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-sm text-muted">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative rounded-2xl border border-border bg-surface-2/60 p-5 sm:p-7">
          <ContactForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />
        </Reveal>
      </div>
    </section>
  );
}
