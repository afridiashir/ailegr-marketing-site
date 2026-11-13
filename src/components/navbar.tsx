"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, SIGN_IN_URL, SIGN_UP_URL } from "@/content/site";
import { Logo } from "./icons";

function NavInner({ open, setOpen, active }: { open: boolean; setOpen: (v: boolean) => void; active: string }) {
  return (
    <>
      <div className="flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-0.5 text-sm md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 transition-colors hover:bg-surface-2 hover:text-foreground ${
                active === l.href ? "bg-surface-2 text-foreground" : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={SIGN_IN_URL}
            className="hidden rounded-full bg-surface-2 px-5 py-2 text-sm font-medium transition-colors hover:bg-border sm:inline-block"
          >
            Sign in
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full bg-surface-2 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 pb-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-[15px] hover:bg-surface-2">
                {l.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={SIGN_IN_URL} className="rounded-full bg-surface-2 px-4 py-2.5 text-center text-sm font-medium">
                Sign in
              </a>
              <a href={SIGN_UP_URL} className="rounded-full bg-brand px-4 py-2.5 text-center text-sm font-medium text-white">
                Start free trial
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navLinks.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative z-20">
        <NavInner open={open} setOpen={setOpen} active={active} />
      </div>

      <div
        className={`fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300 ${
          scrolled ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
        }`}
        aria-hidden={!scrolled}
        inert={!scrolled}
      >
        <div className="mx-auto flex max-w-5xl items-start gap-3 rounded-2xl border border-border bg-white/85 px-4 shadow-[0_10px_40px_-15px_rgba(10,40,30,0.25)] backdrop-blur-md sm:px-5">
          <div className="flex-1">
            <NavInner open={stuckOpen} setOpen={setStuckOpen} active={active} />
          </div>
          <a
            href={SIGN_UP_URL}
            className="mt-3 hidden rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-strong lg:inline-block"
          >
            Start free trial
          </a>
        </div>
      </div>
    </>
  );
}
