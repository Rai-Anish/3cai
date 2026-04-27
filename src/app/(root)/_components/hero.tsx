import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">

        <Badge
          variant="outline"
          className="mb-6 px-4 py-1 border-primary/20 bg-primary/5 text-primary animate-cs-fadeup-1"
        >
          <Sparkles className="w-3.5 h-3.5 mr-2" />
          AI Career Acceleration Platform
        </Badge>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl leading-[0.9] animate-cs-fadeup-2">
          GET HIRED FASTER <br />
          WITH <span className="font-serif italic font-normal text-primary tracking-wide">AI THAT ACTUALLY UNDERSTANDS YOU</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-cs-fadeup-3">
          From resume optimization to real-time career coaching and personalized roadmaps —
          everything you need to stand out, get interviews, and land better roles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-cs-fadeup-4">
          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-lg font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          >
            Try for Free →
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 w-full border-y border-white/5 py-12 animate-in fade-in duration-1000 delay-500">
          <StatItem label="Resumes Improved" value="140k+" />
          <StatItem label="Interview Rate Increase" value="3.2×" />
          <StatItem label="Coaching Sessions" value="50k+" />
          <StatItem label="Avg. Time to Interview" value="-65%" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <span className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-1">
        {value}
      </span>
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
