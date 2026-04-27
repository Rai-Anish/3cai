"use client";

import { Star, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ResultsPage() {
    const testimonials = [
        {
            name: "Aarav S.",
            role: "Frontend Developer",
            result: "3 interviews in 2 weeks",
            text: "I thought my resume was fine until this showed me everything I was missing. Fixed it in 10 minutes and started getting responses almost immediately.",
            initials: "AS",
            tone: "primary",
        },
        {
            name: "Maya R.",
            role: "Data Analyst",
            result: "Offer at startup",
            text: "The roadmap + resume rewrite combo made everything click. I finally knew what to focus on instead of guessing.",
            initials: "MR",
            tone: "secondary",
        },
        {
            name: "Daniel K.",
            role: "Full-stack Developer",
            result: "Offer after 6 rejections",
            text: "I was getting rejected constantly. Turns out my resume was the problem. This completely changed how I present my work.",
            initials: "DK",
            tone: "accent",
        },
        {
            name: "Sofia L.",
            role: "Product Designer",
            result: "2 offers in 3 weeks",
            text: "The way it reframed my experience was insane. I wasn’t underskilled — I was just underselling myself.",
            initials: "SL",
            tone: "secondary",
        },
        {
            name: "Rohan P.",
            role: "Backend Engineer",
            result: "Interview at top fintech",
            text: "Small changes, big difference. The keyword gaps it found were exactly what recruiters were filtering for.",
            initials: "RP",
            tone: "accent",
        },
        {
            name: "Elena V.",
            role: "ML Engineer",
            result: "Offer in 10 days",
            text: "I applied with the improved version and got a response within 48 hours. That never happened before.",
            initials: "EV",
            tone: "primary",
        },
    ];

    const toneStyles = {
        primary: {
            card: "border-primary/20 bg-primary/10",
            bar: "bg-primary",
            avatar: "border-primary/30 text-primary bg-primary/10",
            badge: "text-primary border-primary/30 bg-primary/10",
        },
        secondary: {
            card: "border-secondary/20 bg-secondary/10",
            bar: "bg-secondary",
            avatar: "border-secondary/30 text-secondary bg-secondary/10",
            badge: "text-secondary border-secondary/30 bg-secondary/10",
        },
        accent: {
            card: "border-accent/20 bg-accent/10",
            bar: "bg-accent",
            avatar: "border-accent/30 text-accent bg-accent/10",
            badge: "text-accent border-accent/30 bg-accent/10",
        },
    };

    return (
        <section className="relative px-6 py-28 overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10 space-y-24">
                {/* HEADER */}
                <div className="text-center space-y-6 animate-cs-fadeup-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary">
                        <Sparkles className="w-3.5 h-3.5" />
                        Real Career Outcomes
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        PEOPLE ARE GETTING HIRED FASTER
                    </h1>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Real candidates using AI-powered resume optimization, career coaching, and roadmap guidance.
                    </p>
                </div>

                {/* RATING */}
                <div className="flex flex-col items-center gap-4 animate-cs-fadeup-2">
                    <div className="flex items-center gap-2 text-primary">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-current" />
                        ))}
                    </div>

                    <div className="flex items-end gap-2">
                        <div className="text-4xl font-black">4.9</div>
                        <div className="text-lg font-mono text-muted-foreground mb-1">/ 5</div>
                    </div>

                    <p className="text-sm text-muted-foreground text-center max-w-md">
                        Based on <span className="text-foreground font-medium">12,400+ resume reviews</span> and
                        early access user feedback across AI career optimization tools.
                    </p>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mt-1">
                        <span className="px-2 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary">
                            App Store: 4.9 ★
                        </span>
                        <span className="px-2 py-1 rounded-full border border-secondary/20 bg-secondary/10 text-secondary">
                            Chrome Extension: 4.8 ★
                        </span>
                    </div>
                </div>

                {/* TESTIMONIALS */}
                <div className="grid md:grid-cols-3 gap-8 animate-cs-fadeup-3">
                    {testimonials.map((t, i) => {
                        const style = toneStyles[t.tone as keyof typeof toneStyles];

                        return (
                            <Card
                                key={i}
                                className={cn(
                                    "relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1",
                                    style.card
                                )}
                            >

                                <CardHeader className="flex flex-row items-center gap-4">
                                    {/* Avatar */}
                                    <div
                                        className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border",
                                            style.avatar
                                        )}
                                    >
                                        {t.initials}
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">
                                            {t.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {t.role}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* TEXT */}
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                        “{t.text}”
                                    </p>

                                    {/* RESULT */}
                                    <span
                                        className={cn(
                                            "inline-block px-3 py-1 w-fit rounded-full text-[10px] font-mono border",
                                            style.badge
                                        )}
                                    >
                                        {t.result}
                                    </span>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center space-y-6 pt-10 animate-cs-fadeup-4">
                    <h3 className="text-3xl font-black tracking-tighter">
                        YOUR TURN NEXT
                    </h3>

                    <p className="text-muted-foreground max-w-xl mx-auto">
                        See what’s holding you back and get a personalized improvement plan in minutes.
                    </p>

                    <Button className="group rounded-full px-10 h-14 text-lg font-bold bg-primary text-primary-foreground hover:scale-105 transition-all shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                        <Link href="/sign-up" className="flex items-center gap-2">
                            <span>Analyze My Profile</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}