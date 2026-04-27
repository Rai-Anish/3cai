import { Button } from "@/components/ui/button";
import { MessageSquareText, Sparkles, Mic, Video, ArrowRight, Brain, Target } from "lucide-react";
import Link from "next/link";

export default function MockInterviewsPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden pb-16 md:pb-32">
      {/* Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 max-w-250 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/20 bg-secondary/10 text-secondary text-sm font-mono mb-6 md:mb-8 animate-cs-fadeup-1">
          <MessageSquareText className="w-4 h-4" />
          <span>REAL-TIME BEHAVIORAL AI</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 animate-cs-fadeup-2 leading-[0.9]">
          Master the art of <br />
          <span className="font-serif italic font-normal text-primary">human connection.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-cs-fadeup-3">
          Interviews are about more than just data—they're about confidence and clarity. Practice in a safe, intelligent space so you can show up as your best self.
        </p>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-cs-fadeup-4">
           <Link href="/sign-up">
            <Button size="lg" className="rounded-full px-8 py-7 bg-secondary text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_var(--color-secondary)]">
              Start Mock Interview <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
           </Link>
           <p className="text-sm text-muted-foreground italic">Available 24/7. No human pressure.</p>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Adaptive Difficulty</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI listens to your answers and adjusts the difficulty of follow-up questions in real-time—just like a senior hiring manager would.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Voice & Tone Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              It's not just what you say, it's how you say it. We analyze your pacing, filler words (um, uh), and confidence levels to help you sound more authoritative.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Industry-Specific Scenarios</h3>
            <p className="text-muted-foreground leading-relaxed">
              From FAANG technical rounds to Fortune 500 executive leadership interviews, we have 500+ specialized interview tracks ready for you.
            </p>
          </div>

        </div>
      </section>

      {/* Visual Mockup Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-secondary/20 bg-black/40 backdrop-blur-2xl p-1 md:p-1.5 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-secondary/10 via-transparent to-accent/10 opacity-50" />
          <div className="relative bg-background/80 rounded-[1.4rem] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 w-full max-w-md">
                {/* Mock UI: Interview Dashboard */}
                <div className="bg-card/60 border border-secondary/20 rounded-2xl p-6 font-mono text-sm shadow-2xl">
                   <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold">LIVE SESSION - 14:02</span>
                   </div>
                   <div className="space-y-6">
                      <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
                        <div className="text-xs text-secondary mb-1 uppercase font-bold">AI Interviewer</div>
                        "Tell me about a time you had to handle a major system failure. How did you prioritize tasks?"
                      </div>
                      <div className="flex justify-end">
                        <div className="p-4 bg-muted rounded-xl max-w-[80%] text-xs">
                          <div className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Your Transcript</div>
                          "Um, so last year our database went down and I had to... well, I immediately..."
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <div className="text-[10px] text-secondary uppercase font-bold mb-2">Live Insight</div>
                        <div className="flex items-center gap-2 text-xs">
                           <span className="text-yellow-400">⚠</span> Filler word detected: "Um"
                        </div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black text-secondary">Instant Feedback Loop</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Don't wait days for feedback. Our AI provides a detailed report immediately after your session, highlighting your wins and exactly where you can improve.
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-xl font-bold">85%</div>
                      <div className="text-[10px] text-muted-foreground uppercase">Confidence</div>
                   </div>
                   <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-xl font-bold">12%</div>
                      <div className="text-[10px] text-muted-foreground uppercase">Filler Words</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
