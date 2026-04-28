"use client";

import { GlowBg } from "@/components/glow-bg";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ProofSection() {
    return (
        <section className="relative px-6 py-32 overflow-hidden">

            {/* Background Glow */}
            <GlowBg />
            <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">

                {/* Badge */}
                <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8 animate-cs-fadeup-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Try it in under a minute
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-6 animate-cs-fadeup-2">
                    SEE WHAT’S HOLDING YOU BACK <br />
                    <span className="font-serif italic font-normal text-primary leading-2 tracking-wide ">— AND FIX IT INSTANTLY</span>
                </h2>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-cs-fadeup-3">
                    Most candidates don’t get rejected because they lack skills — they get filtered out before anyone notices them.
                    Our AI shows you exactly where you’re losing opportunities and how to fix it in seconds.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-cs-fadeup-4">
                    <Button
                        size="lg"
                        className="group rounded-full px-10 h-14 text-lg font-bold bg-primary text-primary-foreground hover:scale-105 transition-all shadow-[0_0_30px_rgba(var(--primary),0.35)]"
                    >
                        <Link href="/sign-up">Analyze my profile →</Link>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-10 h-14 text-lg font-bold border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <Link href="/results">See How Others Got Hired →</Link>
                    </Button>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-col items-center gap-3 text-sm text-zinc-500">
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <TrustItem text="1-click signup" />
                        <TrustItem text="No spam. No notifications." />
                        <TrustItem text="Instant analysis" />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Your data stays private — we never share or sell your information
                    </div>
                </div>
            </div>
        </section>
    );
}

function TrustItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span>{text}</span>
        </div>
    );
}