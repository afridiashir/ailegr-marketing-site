import { Zap } from "lucide-react";

/** Matches the product's own brand mark (bolt tile + "Ai" in emerald). */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 ${className}`}>
      <Zap aria-hidden className="size-[55%]" strokeWidth={2.25} />
    </span>
  );
}

export function Logo({ href = "#top" }: { href?: string }) {
  return (
    <a href={href} className="flex items-center gap-2.5" aria-label="Ailegr home">
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">
        <span className="text-emerald-600">Ai</span>legr
      </span>
    </a>
  );
}
