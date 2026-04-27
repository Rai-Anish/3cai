"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Brain,
  CheckCircle2,
  TrendingUp,
  Clock,
  ThumbsUp,
  BadgeCheck,
  BookMarked,
  BarChart3,
} from "lucide-react";
import { RoadmapTimeline } from "./roadmap-timeline";

// ── Resume Visual ─────────────────────────────────────────────────────────────

function ResumeVisual() {
  const [hovered, setHovered] = useState<number | null>(null);

  const suggestions = [
    {
      original: "Managed a team of developers",
      improved: "Led 6-engineer squad, shipping 3 products in 90 days",
      gain: "+34% interview rate",
      color: "#e9ffb9",
    },
    {
      original: "Built internal tools",
      improved: "Engineered internal tooling adopted by 200+ employees",
      gain: "+28% ATS score",
      color: "#ac89ff",
    },
    {
      original: "Worked on frontend features",
      improved: "Delivered 14 features reducing churn by 18%",
      gain: "+41% callback rate",
      color: "#ff6b98",
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Resume — Before → After
        </span>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e9ffb9]/10 border border-[#e9ffb9]/20">
          <TrendingUp className="w-3 h-3 text-[#e9ffb9]" />
          <span className="font-mono text-[10px] text-[#e9ffb9]">ATS Score: 91%</span>
        </div>
      </div>

      {suggestions.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/5 bg-zinc-900/50 p-4 cursor-default transition-all duration-300 hover:border-white/10"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={`flex items-start gap-3 transition-all duration-300 ${hovered === i ? "opacity-30 line-through" : "opacity-60"}`}>
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/60 shrink-0" />
            <p className="text-sm text-zinc-400">{s.original}</p>
          </div>
          <div className={`flex items-start gap-3 mt-2 transition-all duration-300 ${hovered === i ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"}`}>
            <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0" style={{ color: s.color }} />
            <p className="text-sm text-white font-medium">{s.improved}</p>
          </div>
          <div className={`mt-2 transition-all duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              {s.gain}
            </span>
          </div>
        </div>
      ))}

      <p className="text-[11px] text-zinc-600 text-center mt-1 font-mono">
        Hover each line to see the AI rewrite
      </p>
    </div>
  );
}

// ── Career Coach Visual ───────────────────────────────────────────────────────

function CoachVisual() {
  const messages = [
    {
      from: "user",
      text: "I have a gap year on my resume. Will that kill my chances at Google?",
    },
    {
      from: "ai",
      text: "Not if you frame it right. Google cares about what you built, not when. What did you actually do during that year?",
      badge: null,
    },
    {
      from: "user",
      text: "I freelanced a bit and built a side project that got 2,000 users.",
    },
    {
      from: "ai",
      text: "That's your answer. Lead with: 'I spent a year building and scaling a product to 2K users.' Suddenly it's not a gap — it's founder experience.",
      badge: "High-impact reframe",
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1 px-1">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Live coaching session
        </span>
      </div>

      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex gap-2.5 ${m.from === "user" ? "flex-row-reverse" : ""}`}
          style={{ animation: `cs-fadeUp 0.4s ease ${i * 0.08}s both` }}
        >
          {m.from === "ai" && (
            <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
          )}
          <div className={`max-w-[82%] flex flex-col gap-1.5 ${m.from === "user" ? "items-end" : "items-start"}`}>
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === "user"
              ? "bg-zinc-800 text-zinc-300 rounded-tr-sm"
              : "bg-zinc-900/80 border border-white/8 text-white rounded-tl-sm"
              }`}>
              {m.text}
            </div>
            {m.badge && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e9ffb9]/8 border border-[#e9ffb9]/20">
                <ThumbsUp className="w-3 h-3 text-[#e9ffb9]" />
                <span className="font-mono text-[10px] text-[#e9ffb9]">{m.badge}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Cover Letter Visual ───────────────────────────────────────────────────────

function CoverLetterVisual() {
  const [active, setActive] = useState(0);

  const tones = [
    {
      label: "Startup",
      color: "#ff6b98",
      preview: "I focus on outcomes, not just code. In my previous role, I shipped a feature that became the company’s leading driver of user retention within 60 days.",
    },
    {
      label: "Enterprise",
      color: "#ac89ff",
      preview: "With over five years of experience in full-stack development, I have consistently delivered scalable, reliable solutions aligned with business and organizational goals.",
    },
    {
      label: "Creative",
      color: "#e9ffb9",
      preview: "Rather than a traditional cover letter, I prefer to demonstrate my work. Here’s a brief look at what I’ve built and the impact it has delivered.",
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Tone Engine</span>
        <BadgeCheck className="w-4 h-4 text-[#e9ffb9]" />
      </div>

      <div className="flex gap-2">
        {tones.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="flex-1 py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all duration-200 border"
            style={{
              borderColor: active === i ? `${t.color}50` : "rgba(255,255,255,0.06)",
              background: active === i ? `${t.color}10` : "transparent",
              color: active === i ? t.color : "rgba(255,255,255,0.3)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        className="rounded-2xl border p-5 text-sm leading-relaxed text-zinc-300"
        style={{
          borderColor: `${tones[active].color}20`,
          background: `${tones[active].color}05`,
          animation: "cs-fadeUp 0.25s ease both",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: tones[active].color }} />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tones[active].color }}>
            {tones[active].label} Tone
          </span>
        </div>
        <p className="text-zinc-400 text-[13px] leading-relaxed italic">
          "{tones[active].preview}"
        </p>
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[10px] text-zinc-600">Role-matched · 1-click export</span>
        <span className="font-mono text-[10px]" style={{ color: tones[active].color }}>↑ 3.2× open rate</span>
      </div>
    </div>
  );
}

// ── Courses Visual ────────────────────────────────────────────────────────────

function CoursesVisual() {
  const courses = [
    {
      tag: "Closes skill gap",
      title: "Transformers & Attention Mechanisms",
      provider: "Fast.ai",
      duration: "6 hrs",
      match: 98,
      color: "#e9ffb9",
      icon: Brain,
    },
    {
      tag: "High market demand",
      title: "MLOps: From Model to Production",
      provider: "DeepLearning.AI",
      duration: "8 hrs",
      match: 94,
      color: "#ac89ff",
      icon: BarChart3,
    },
    {
      tag: "Interview signal",
      title: "System Design for ML Engineers",
      provider: "Educative",
      duration: "5 hrs",
      match: 91,
      color: "#ff6b98",
      icon: BookMarked,
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          Curated for your roadmap
        </span>
        <span className="font-mono text-[10px] text-zinc-600">3 of 24 matches</span>
      </div>

      {courses.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-4 hover:border-white/10 transition-all duration-200 cursor-default"
          >
            <div
              className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center"
              style={{ background: `${c.color}12`, border: `1px solid ${c.color}25` }}
            >
              <Icon className="w-5 h-5" style={{ color: c.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ color: c.color, background: `${c.color}12` }}
                >
                  {c.tag}
                </span>
              </div>
              <p className="text-sm font-semibold text-white truncate">{c.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-zinc-500">{c.provider}</span>
                <span className="text-zinc-700">·</span>
                <Clock className="w-3 h-3 text-zinc-600" />
                <span className="text-[11px] text-zinc-500">{c.duration}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-sm font-bold" style={{ color: c.color }}>{c.match}%</div>
              <div className="text-[10px] text-zinc-600">match</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Services config ───────────────────────────────────────────────────────────

const services = [
  {
    title: "AI Resume Intelligence",
    description:
      "75% of resumes never reach a human. Our AI rewrites every bullet point to pass ATS filters and make hiring managers stop scrolling.",
    points: ["ATS Score Optimizer", "Bullet Point Rewriter", "Keyword Gap Analysis"],
    visual: <ResumeVisual />,
  },
  {
    title: "Career Q&A Coach",
    description:
      "Real answers to real questions — gap years, salary negotiation, tough interview moments. Not generic advice. Coaching that adapts to your exact situation.",
    points: ["Situation-Specific Advice", "Negotiation Scripts", "Interview Prep"],
    visual: <CoachVisual />,
  },
  {
    title: "Interactive Roadmap Builder",
    description:
      "Stop guessing what to learn next. We map every skill, course, and milestone between where you are now and the role you actually want.",
    points: ["Skill Matrix Mapping", "Milestone Tracking", "Market Demand Analytics"],
    isRoadmap: true,
  },
  {
    title: "Dynamic Cover Letter Engine",
    description:
      "One job description in, one high-converting cover letter out — matched to the company's culture, the role's tone, and what actually gets responses.",
    points: ["Tone Matching", "Culture Alignment", "Role-Specific Targeting"],
    visual: <CoverLetterVisual />,
  },
  {
    title: "Personalized Course Recommendations",
    description:
      "We don't recommend courses. We prescribe them. Every suggestion is tied to a specific gap in your roadmap that's blocking your next move.",
    points: ["Gap-Specific Learning", "Curated Resource Hub", "Roadmap-Linked"],
    visual: <CoursesVisual />,
  },
];

// ── Main export ───────────────────────────────────────────────────────────────

export function FeaturesGrid() {
  return (
    <section className="px-6 max-w-7xl mx-auto space-y-32 md:space-y-48 py-24">
      {services.map((service, index) => {

        if (service.isRoadmap) {
          return (
            <div key={index} className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
                    {service.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {service.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full rounded-3xl border border-white/5 bg-zinc-950/60 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(172,137,255,0.04)_0%,transparent_70%)]" />
                <RoadmapTimeline />
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1 w-full">
              <div className="rounded-3xl border border-white/5 bg-zinc-950/60 backdrop-blur-xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(233,255,185,0.03)_0%,transparent_60%)]" />
                <div className="relative z-10">{service.visual}</div>
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
                  {service.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {service.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}