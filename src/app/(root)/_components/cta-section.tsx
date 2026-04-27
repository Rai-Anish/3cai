"use client";

import React from "react";

const STATS = [
  { value: "91%", label: "Average ATS score after optimization" },
  { value: "3.2×", label: "More interview callbacks" },
  { value: "6 wks", label: "Average time to first offer" },
];

export function FeaturesCta() {
  return (
    <section className="relative px-6 py-24 overflow-hidden">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,255,185,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,255,185,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-75 w-150 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Label */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-primary/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/60">
            Everything you need
          </span>
          <div className="h-px w-12 bg-primary/30" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto max-w-3xl text-center text-5xl font-black uppercase italic tracking-tighter leading-[0.9] md:text-7xl">
          Five tools.
          <br />
          <span className="text-primary">One career.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          From your resume to your roadmap, 3CAI handles every layer of your
          job search — so you spend less time preparing and more time getting
          offers.
        </p>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center gap-2 px-8 py-8"
            >
              {/* Vertical dividers */}
              {i !== 0 && (
                <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/5 sm:block" />
              )}

              <span className="font-mono text-4xl font-black text-primary md:text-5xl">
                {s.value}
              </span>
              <span className="text-center text-xs leading-relaxed text-zinc-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-700">
            Scroll to explore
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

      </div>
    </section>
  );
}