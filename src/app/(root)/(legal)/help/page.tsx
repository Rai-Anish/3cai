"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Zap,
  CreditCard,
  MessageCircle,
  FileText,
  Map,
  ExternalLink,
  Mail,
  ArrowRight,
  LayoutDashboard,
  User,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Action {
  label: string;
  description: string;
  href: string;
  external?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
  actions: Action[];
}

interface FaqItem {
  q: string;
  a: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "#e9ffb9",
    description: "Set up your account and start using 3CAI in minutes.",
    actions: [
      { label: "Go to your workspace", description: "Your main dashboard and overview", href: "/workspace" },
      { label: "View your token balance", description: "See how many tokens you have left", href: "/billing" },
      { label: "Explore AI tools", description: "Browse everything 3CAI can do for you", href: "/ai-tools" },
      { label: "Upgrade your plan", description: "Get more tokens and unlock premium features", href: "/pricing" },
    ],
  },
  {
    id: "resume",
    label: "Resume Analyzer",
    icon: FileText,
    color: "#ac89ff",
    description: "Upload your resume and get AI-powered feedback instantly.",
    actions: [
      { label: "Analyze a resume", description: "Upload a PDF and get your score report", href: "/ai-tools/resume-analyzer" },
      { label: "View past analyses", description: "Browse your resume history", href: "/ai-tools/resume-analyzer" },
    ],
  },
  {
    id: "roadmap",
    label: "Career Roadmap",
    icon: Map,
    color: "#ff6b98",
    description: "Build a step-by-step path from where you are to where you want to be.",
    actions: [
      { label: "Generate a roadmap", description: "Describe your goal and get a full career plan", href: "/ai-tools/career-roadmap" },
      { label: "View my roadmaps", description: "Browse and continue previous roadmaps", href: "/ai-tools/career-roadmap" },
    ],
  },
  {
    id: "chat",
    label: "Career Chat",
    icon: MessageCircle,
    color: "#e9ffb9",
    description: "Ask anything career-related and get real, specific advice.",
    actions: [
      { label: "Start a coaching session", description: "Chat with your AI career coach now", href: "/ai-tools/chat" },
      { label: "Switch AI model", description: "Change between Gemini and Groq in the chat bar", href: "/ai-tools/chat" },
    ],
  },
  {
    id: "billing",
    label: "Billing & Plans",
    icon: CreditCard,
    color: "#ac89ff",
    description: "Manage your subscription, tokens, and payment history.",
    actions: [
      { label: "View billing dashboard", description: "See your current plan and token usage", href: "/billing" },
      { label: "Upgrade or change plan", description: "Compare plans and pick what fits you", href: "/pricing" },
      { label: "Download invoices", description: "Find your payment history in the billing terminal", href: "/billing" },
      { label: "Cancel subscription", description: "Manage cancellation from your billing page", href: "/billing" },
    ],
  },
  {
    id: "account",
    label: "Account & Security",
    icon: ShieldCheck,
    color: "#ff6b98",
    description: "Update your profile, password, and privacy settings.",
    actions: [
      { label: "Edit your profile", description: "Change your name, photo, and preferences", href: "/profile" },
      { label: "Sign out", description: "Log out of your 3CAI session securely", href: "/profile" },
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "What happens when I run out of tokens?",
    a: "AI features are paused until your bi-weekly reset (free plan) or until you top up. Your data and history are never deleted. You can upgrade anytime from the Billing page.",
  },
  {
    q: "Is my resume stored or used to train the AI?",
    a: "Your resume is uploaded to secure cloud storage for analysis only. We do not use your personal data to train any model. You can request deletion from your account settings.",
  },
  {
    q: "Can I use 3CAI without paying?",
    a: "Yes. The free plan gives you 50 tokens per bi-weekly. Each AI feature costs different amount of tokens. Upgrade anytime from the Billing page for more.",
  },
  {
    q: "Which AI model should I use?",
    a: "Gemini 2.5 Flash is best for resume analysis and structured tasks. Groq (Llama) is faster for back-and-forth Career Chat conversations. You can switch models at any time.",
  },
  {
    q: "Why is my resume ATS score low?",
    a: "Scores measure ATS compatibility, not writing quality. Common causes: missing measurable achievements, weak action verbs, or skills not matching target role keywords. Check the Tips section in your report for specific fixes.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to Billing → click 'Deactivate Plan'. Your access continues until the end of your billing cycle. You can restore anytime before it ends.",
  },
];

const POPULAR = [
  "Resume analyzer",
  "Billing",
  "Tokens",
  "Career roadmap",
];

// ── Accordion ─────────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-colors duration-200"
          style={open === i ? { borderColor: "rgba(233,255,185,0.25)" } : {}}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm font-semibold text-foreground">{item.q}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
          {open === i && (
            <div
              className="border-t border-border/40 px-5 pb-5 pt-4"
              style={{ animation: "cs-fadeUp 0.2s ease both" }}
            >
              <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  onClick,
}: {
  cat: Category;
  onClick: () => void;
}) {
  const Icon = cat.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-6 text-left transition-all duration-200 hover:border-border hover:bg-card/80"
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
      >
        <Icon className="h-5 w-5" style={{ color: cat.color }} />
      </div>

      <div className="flex-1">
        <h3 className="mb-1 text-sm font-bold text-foreground">{cat.label}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
      </div>

      <div
        className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest transition-transform group-hover:translate-x-0.5"
        style={{ color: cat.color }}
      >
        {cat.actions.length} quick actions
        <ChevronRight className="h-3 w-3" />
      </div>
    </button>
  );
}

// ── Action list view ──────────────────────────────────────────────────────────

function ActionList({ cat, onBack }: { cat: Category; onBack: () => void }) {
  const Icon = cat.icon;

  return (
    <div className="space-y-6" style={{ animation: "cs-fadeUp 0.3s ease both" }}>
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronRight className="h-3 w-3 rotate-180" />
        All topics
      </button>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
        >
          <Icon className="h-6 w-6" style={{ color: cat.color }} />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tight text-foreground">
            {cat.label}
          </h2>
          <p className="text-sm text-muted-foreground">{cat.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 divide-y divide-border/40">
        {cat.actions.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-card/80"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {action.label}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {action.description}
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Not what you were looking for?{" "}
        <a
          href="mailto:support@3cai.app"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          Email support
        </a>
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const filtered = CATEGORIES.filter((cat) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cat.label.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.actions.some(
        (a) =>
          a.label.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="min-h-screen bg-background pt-20">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,255,185,0.06)_0%,transparent_60%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
        />

        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">
              Help Center
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black uppercase italic tracking-tighter text-foreground sm:text-5xl">
            How can we help?
          </h1>
          <p className="mb-8 text-base text-muted-foreground">
            Search by topic or jump directly to what you need.
          </p>

          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveCategory(null);
              }}
              placeholder="Search topics..."
              className="h-12 rounded-2xl border-border/60 bg-card/70 pl-10 pr-4 text-sm shadow-none focus-visible:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>

          {/* Popular */}
          {!query && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                Popular:
              </span>
              {POPULAR.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setQuery(p);
                    setActiveCategory(null);
                  }}
                  className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {activeCategory ? (
          <ActionList cat={activeCategory} onBack={() => setActiveCategory(null)} />
        ) : (
          <div className="space-y-16">

            {/* Category grid */}
            <div>
              {query && (
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {filtered.length} topic{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setQuery("");
                    }}
                  />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-sm text-muted-foreground">
                    No results for &quot;{query}&quot; —{" "}
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-primary underline underline-offset-2"
                    >
                      clear search
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* FAQ */}
            {!query && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/40" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Frequently asked
                  </span>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                <FaqAccordion />
              </div>
            )}

            {/* Contact CTA */}
            {!query && (
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(172,137,255,0.05)_0%,transparent_70%)]" />
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-card/60">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-black uppercase italic tracking-tight text-foreground">
                    Still need help?
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Describe your issue and we'll get back to you within 24 hours.
                  </p>
                  <a
                    href="mailto:3cai.company@gmail.com"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Email support
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}