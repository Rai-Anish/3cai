"use client";

import React, { useEffect, useRef, useState } from "react";
import { Target, Zap, BookOpen, Code2, Cpu, Trophy } from "lucide-react";

const MILESTONES = [
  {
    id: 0,
    label: "You Now",
    role: "Junior Developer",
    sublabel: "React · Node.js · 2 yrs",
    icon: Zap,
    color: "#ac89ff",
    isStart: true,
  },
  {
    id: 1,
    label: "Month 2",
    role: "ML Foundations",
    sublabel: "Python · NumPy · Sklearn",
    icon: BookOpen,
    color: "#e9ffb9",
  },
  {
    id: 2,
    label: "Month 4",
    role: "Applied AI",
    sublabel: "Fine-tuning · LangChain · APIs",
    icon: Code2,
    color: "#e9ffb9",
  },
  {
    id: 3,
    label: "Month 6",
    role: "MLOps Ready",
    sublabel: "Docker · CI/CD · Model Serving",
    icon: Cpu,
    color: "#e9ffb9",
  },
  {
    id: 4,
    label: "Target",
    role: "AI Engineer",
    sublabel: "Senior · $180k+",
    icon: Trophy,
    color: "#ff6b98",
    isEnd: true,
  },
];

export function RoadmapTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame: number;
    let current = 0;
    const target = (activeIndex / (MILESTONES.length - 1)) * 100;

    const animate = () => {
      current += (target - current) * 0.06;
      setProgress(current);
      if (Math.abs(target - current) > 0.3) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(target);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  return (
    <>
      <div className="relative w-full flex flex-col items-center gap-10">
        {/* Track */}
        <div className="relative w-full max-w-2xl">
          {/* Base track */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/5 rounded-full" />
          {/* Glowing progress fill */}
          <div
            className="absolute top-6 left-0 h-0.5 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #ac89ff, #e9ffb9, #ff6b98)",
              boxShadow: "0 0 12px 2px rgba(233,255,185,0.3)",
            }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between items-start">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              const isFuture = i > activeIndex;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center gap-3 group focus:outline-none"
                  style={{ minWidth: 0 }}
                >
                  {/* Node circle */}
                  <div
                    className={[
                      "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                      isActive
                        ? m.isStart
                          ? "node-purple border-[#ac89ff] bg-[#ac89ff]/15"
                          : m.isEnd
                            ? "node-pink border-[#ff6b98] bg-[#ff6b98]/15"
                            : "node-lime border-[#e9ffb9] bg-[#e9ffb9]/10"
                        : isPast
                          ? "border-[#e9ffb9]/40 bg-[#e9ffb9]/5"
                          : "border-white/10 bg-white/3",
                    ].join(" ")}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{
                        color: isActive
                          ? m.color
                          : isPast
                            ? "#e9ffb9"
                            : "rgba(255,255,255,0.2)",
                      }}
                    />
                    {/* Active ring */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-full border opacity-40 animate-ping"
                        style={{ borderColor: m.color }}
                      />
                    )}
                  </div>

                  {/* Label below node */}
                  <div className="text-center">
                    <div
                      className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-300"
                      style={{
                        color: isActive ? m.color : isFuture ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card for active milestone */}
        <div
          key={activeIndex}
          className="w-full max-w-sm rounded-2xl border p-6 transition-all duration-300"
          style={{
            borderColor: `${MILESTONES[activeIndex].color}30`,
            background: `${MILESTONES[activeIndex].color}08`,
            boxShadow: `0 0 40px ${MILESTONES[activeIndex].color}10`,
            animation: "cs-fadeUp 0.35s ease both",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `${MILESTONES[activeIndex].color}15`,
                border: `1px solid ${MILESTONES[activeIndex].color}30`,
              }}
            >
              {React.createElement(MILESTONES[activeIndex].icon, {
                className: "w-6 h-6",
                style: { color: MILESTONES[activeIndex].color },
              })}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-mono text-[10px] uppercase tracking-widest mb-1"
                style={{ color: MILESTONES[activeIndex].color }}
              >
                {MILESTONES[activeIndex].label}
              </div>
              <div className="font-black text-lg text-white uppercase italic tracking-tight leading-none">
                {MILESTONES[activeIndex].role}
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-1">
                {MILESTONES[activeIndex].sublabel}
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              Roadmap Progress
            </span>
            <span
              className="font-mono text-sm font-bold"
              style={{ color: MILESTONES[activeIndex].color }}
            >
              {Math.round((activeIndex / (MILESTONES.length - 1)) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(activeIndex / (MILESTONES.length - 1)) * 100}%`,
                background: `linear-gradient(to right, #ac89ff, ${MILESTONES[activeIndex].color})`,
              }}
            />
          </div>
        </div>

        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] opacity-40">
          Click nodes to navigate through different sections
        </p>
      </div>
    </>
  );
}