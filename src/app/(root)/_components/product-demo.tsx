"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Sparkles, Send } from "lucide-react";

type Sender = "user" | "ai";

interface ChatLine {
  sender: Sender;
  text: string;
}

const CHAT_SCRIPT: ChatLine[] = [
  {
    sender: "user",
    text: "I have 2 years of experience in React and Node.js. I want to transition into AI/ML engineering but I don't know where to start — I feel like I'm already behind.",
  },
  {
    sender: "ai",
    text: "You're not behind — you're repositioning, which is different. Your full-stack background is actually an advantage. Most ML engineers can't build production systems. You already can.",
  },
  {
    sender: "ai",
    text: "The real gap isn't algorithms — it's applied ML intuition. That means learning when to use a model, how to evaluate it honestly, and how to ship it. Start with that, not math theory.",
  },
  {
    sender: "user",
    text: "That makes sense. But what do I actually build? I've done a few Kaggle notebooks but they feel disconnected from real work.",
  },
  {
    sender: "ai",
    text: "Kaggle teaches you to overfit leaderboards — not to solve problems. Instead, pick one thing you understand deeply — say, job postings — and build something end-to-end: scrape data, fine-tune a small model, expose an API, deploy it.",
  },
  {
    sender: "ai",
    text: "That single project will teach you more than 10 notebooks. And it's something you can walk through in an interview with real conviction.",
  },
  {
    sender: "user",
    text: "What about the math? I skipped a lot of the linear algebra and calculus foundations.",
  },
  {
    sender: "ai",
    text: "You need enough to reason, not enough to prove theorems. Focus on three things: matrix multiplication (so you understand what tensors actually do), gradient descent intuitively, and how loss functions shape model behavior. That's the 20% that gives you 80% of the clarity.",
  },
];


const getDelay = (line: ChatLine, isFirst: boolean): number => {
  if (isFirst) return 800;
  if (line.sender === "user") return 1600;
  return Math.min(1200 + line.text.length * 12, 3200);
};

export function ProductDemo() {
  const [messages, setMessages] = useState<ChatLine[]>([]);
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (step >= CHAT_SCRIPT.length) {
      const reset = setTimeout(() => {
        setMessages([]);
        setStep(0);
        setIsTyping(false);
      }, 5000);
      return () => clearTimeout(reset);
    }

    const current = CHAT_SCRIPT[step];
    const delay = getDelay(current, step === 0);

    let typingTimer: ReturnType<typeof setTimeout>;
    if (current.sender === "ai") {
      typingTimer = setTimeout(() => setIsTyping(true), delay - 700);
    }

    const msgTimer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, current]);
      setStep((s) => s + 1);
    }, delay);

    return () => {
      clearTimeout(msgTimer);
      clearTimeout(typingTimer!);
    };
  }, [step]);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter md:text-5xl">
            The Career Conversation
          </h2>
          <p className="text-muted-foreground">
            Practice, learn, and grow with your personal AI coach.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 blur-[120px]" />

          <div className="flex h-140 flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/50 px-8 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">3CAI Career Coach</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="chat-scroll flex-1 overflow-y-auto p-8">
              <div className="flex flex-col gap-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                    style={{ animation: "cs-fadeUp 0.3s ease both" }}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        msg.sender === "user"
                          ? "bg-zinc-800"
                          : "border border-primary/20 bg-primary/20"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <User className="h-4 w-4 text-zinc-400" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                    </div>

                    <div
                      className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                        msg.sender === "user"
                          ? "rounded-tr-sm bg-zinc-800 text-zinc-200"
                          : "rounded-tl-sm border border-primary/10 bg-primary/5 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3" style={{ animation: "cs-fadeUp 0.2s ease both" }}>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-3xl rounded-tl-sm border border-primary/10 bg-primary/5 px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input mockup */}
            <div className="border-t border-white/5 bg-zinc-900/30 p-6">
              <div className="flex items-center justify-between rounded-full border border-white/10 bg-zinc-800/50 px-6 py-4">
                <span className="text-sm italic text-zinc-500">
                  Type your response...
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(233,255,185,0.25)]">
                  <Send className="h-4 w-4 text-zinc-950" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
