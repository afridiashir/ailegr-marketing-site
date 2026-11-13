import { Check, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium shadow-sm">
        <Sparkles className="size-3.5 text-brand" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-[42px] sm:leading-[1.15]">{title}</h2>
      {body && <p className={`mt-4 text-[15px] leading-relaxed text-muted ${align === "center" ? "mx-auto max-w-lg" : ""}`}>{body}</p>}
    </Reveal>
  );
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border border-border bg-white shadow-[0_8px_30px_-12px_rgba(10,40,30,0.18)] ${className}`}>
      {children}
    </div>
  );
}

export function Checkbox({ checked, onChange, label, disabled }: { checked: boolean; onChange: () => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`grid size-4 shrink-0 place-items-center rounded border transition-colors disabled:opacity-50 ${
        checked ? "border-brand bg-brand text-white" : "border-border bg-white hover:border-brand/60"
      }`}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </button>
  );
}

const avatarColors = ["bg-amber-100 text-amber-800", "bg-sky-100 text-sky-800", "bg-emerald-100 text-emerald-800", "bg-violet-100 text-violet-800", "bg-rose-100 text-rose-800"];

export function Avatar({ name, i = 0, className = "size-6 text-[9px]" }: { name: string; i?: number; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span className={`grid shrink-0 place-items-center rounded-full font-semibold ${avatarColors[i % avatarColors.length]} ${className}`}>
      {initials}
    </span>
  );
}

export const money = (n: number, cents = true) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
