"use client";

import { useEffect, useRef } from "react";

type ComingSoonProps = {
  feature?: string;
  description?: string;
};

export function ComingSoon({
  feature = "This Feature",
  description = "Currently building this out. Thanks for your patience while I get it right.",
}: ComingSoonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 20, ROWS = 10;
    const dots: { x: number; y: number; opacity: number; speed: number }[] = [];

    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        dots.push({
          x: (i / COLS) * canvas.width + (canvas.width / COLS) * 0.5,
          y: (j / ROWS) * canvas.height + (canvas.height / ROWS) * 0.5,
          opacity: Math.random(),
          speed: 0.003 + Math.random() * 0.006,
        });
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.opacity += d.speed;
        if (d.opacity > 1 || d.opacity < 0) d.speed *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 255, 185, ${d.opacity * 0.25})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-[#0e0e11] px-6">

      {/* Canvas dot grid */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Scanline */}
      <div className="cs-scanline pointer-events-none absolute inset-0 overflow-hidden" />

      {/* Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#e9ffb9]/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#ac89ff]/5 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">

        {/* Status badge */}
        <div className="animate-cs-fadeup-1 mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#e9ffb9]/10 bg-[#e9ffb9]/5 px-4 py-2">
          <span className="animate-cs-pulse-ring h-2 w-2 rounded-full bg-[#e9ffb9]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e9ffb9]/60">
            Implementation In Progress
          </span>
        </div>

        {/* Hero text with glitch */}
        <h1
          className="animate-cs-fadeup-2 cs-glitch mb-2 font-mono text-[clamp(2.5rem,8vw,6rem)] font-black uppercase italic leading-none tracking-tighter text-[#e9ffb9]"
          data-text={`${feature}`}
        >
          {feature}
        </h1>
        <h2 className="animate-cs-fadeup-2 mb-8 font-mono text-[clamp(1.5rem,5vw,3.5rem)] font-black uppercase italic leading-none tracking-tighter text-[#acaaae]/25">
          IS BEING BUILT
        </h2>

        {/* Feature name */}
        <div className="animate-cs-fadeup-3 mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-[#e9ffb9]/20" />
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#e9ffb9]/50">
            {feature}
          </span>
          <div className="h-px w-12 bg-[#e9ffb9]/20" />
        </div>

        {/* Description */}
        <p className="animate-cs-fadeup-3 mb-10 max-w-md text-sm leading-relaxed text-[#acaaae]/50">
          {description}
        </p>

        {/* Terminal line */}
        <div className="animate-cs-fadeup-4 inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-3">
          <span className="font-mono text-xs text-[#acaaae]/30">$</span>
          <span className="font-mono text-xs text-[#e9ffb9]/40">I&apos;m working on it</span>
          <span className="animate-cs-blink font-mono text-xs text-[#e9ffb9]">▋</span>
        </div>
      </div>
    </div>
  );
}