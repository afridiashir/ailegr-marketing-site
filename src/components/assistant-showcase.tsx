"use client";

import { CircleCheck, MessageSquareText, Pause, Play, ReceiptText, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { SIGN_UP_URL } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

/** Chapters of public/ailegr-assistant-loop.webm (18s loop). Times in seconds. */
const chapters: { start: number; end: number; title: string; body: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { start: 0, end: 2.5, title: "Ask in plain English", body: "“How did we do last month?” No menus, no report builder.", icon: MessageSquareText },
  { start: 2.5, end: 7, title: "Get answers from your books", body: "Revenue, expenses and profit, compared with prior months, straight from your ledger.", icon: Sparkles },
  { start: 7, end: 10.5, title: "Tell it what to record", body: "“Record a $120 Uber ride, paid by card.” It drafts the expense and picks the account.", icon: ReceiptText },
  { start: 10.5, end: 18, title: "Approve, and it’s posted", body: "Nothing is recorded until you approve. Then the journal entry is created for you.", icon: CircleCheck },
];

const DURATION = 18;

export function AssistantShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Play while on screen, pause when scrolled away (saves battery and data).
  // Respect reduced motion: never autoplay, let the visitor press play.
  useEffect(() => {
    const v = videoRef.current;
    const el = wrapRef.current;
    if (!v || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce && !userPaused.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Smooth progress while playing.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      if (videoRef.current) setTime(videoRef.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    setTime(t);
    userPaused.current = false;
    v.play().catch(() => {});
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const activeIndex = Math.max(0, chapters.findIndex((c) => time >= c.start && time < c.end));

  return (
    <section id="assistant" className="px-3 py-24 sm:px-4 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AI assistant"
          title={<>Ask your books anything.<br className="hidden sm:block" /> Record it in one sentence.</>}
          body="The Ailegr assistant answers questions about your business and drafts the bookkeeping for you. You stay in charge: nothing is posted until you approve it."
        />

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
          {/* Chapters */}
          <Reveal className="order-2 lg:order-1">
            <ol className="space-y-2">
              {chapters.map((c, i) => {
                const active = i === activeIndex;
                const progress = active ? Math.min(1, (time - c.start) / (c.end - c.start)) : time >= c.end ? 1 : 0;
                const Icon = c.icon;
                return (
                  <li key={c.title}>
                    <button
                      type="button"
                      onClick={() => seek(c.start + 0.05)}
                      aria-current={active ? "step" : undefined}
                      className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active ? "border-brand/30 bg-white shadow-[0_16px_40px_-24px_rgba(4,60,40,0.45)]" : "border-transparent hover:bg-white/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${
                            active ? "bg-brand text-white" : "bg-white text-muted ring-1 ring-border"
                          }`}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className={`block font-semibold transition-colors ${active ? "text-foreground" : "text-foreground/70"}`}>{c.title}</span>
                          <span
                            className={`grid transition-[grid-template-rows] duration-300 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                          >
                            <span className="min-h-0 overflow-hidden">
                              <span className="block pt-1 text-sm leading-relaxed text-muted">{c.body}</span>
                            </span>
                          </span>
                        </span>
                      </div>
                      <span className="absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full bg-border/60">
                        <span className="block h-full origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-3 px-1">
              <a
                href={SIGN_UP_URL}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Try the assistant free
              </a>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <ShieldCheck className="size-4 text-brand" aria-hidden /> In every plan
              </span>
            </div>
          </Reveal>

          {/* Video */}
          <Reveal className="order-1 lg:order-2">
            <div ref={wrapRef} className="group relative overflow-hidden rounded-[22px] border border-border bg-white shadow-[0_40px_90px_-40px_rgba(4,60,40,0.5)]">
              <video
                ref={videoRef}
                className="block aspect-video w-full max-sm:scale-[1.18]"
                src="/ailegr-assistant-loop.webm"
                poster="/ailegr-assistant-poster.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Ailegr AI assistant answering 'How did we do last month?' and recording a $120 expense after approval"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onSeeked={(e) => setTime(e.currentTarget.currentTime)}
              />

              {/* Play/pause */}
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause video" : "Play video"}
                className={`absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-foreground/80 text-white backdrop-blur transition-opacity hover:bg-foreground ${
                  playing ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100" : "opacity-100"
                }`}
              >
                {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
              </button>

              {!playing && time === 0 && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label="Play video"
                  className="absolute inset-0 grid place-items-center bg-white/10 transition-colors hover:bg-white/20"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-brand text-white shadow-[0_12px_30px_-8px_var(--brand)] transition-transform hover:scale-105">
                    <Play className="size-6 translate-x-0.5" aria-hidden />
                  </span>
                </button>
              )}

              {/* Timeline */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/5">
                <div className="h-full bg-brand/80" style={{ width: `${(time / DURATION) * 100}%` }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
