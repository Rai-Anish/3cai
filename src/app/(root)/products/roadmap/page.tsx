import { Button } from "@/components/ui/button";
import { Compass, Sparkles, Map, GraduationCap, ArrowRight, Layers, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function CareerRoadmapPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden pb-16 md:pb-32">
      {/* Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 max-w-250 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent text-sm font-mono mb-6 md:mb-8 animate-cs-fadeup-1">
          <Compass className="w-4 h-4" />
          <span>AUTONOMOUS CAREER ARCHITECT</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 animate-cs-fadeup-2 leading-[0.9]">
          Navigate your path with <br />
          <span className="font-serif italic font-normal text-primary">absolute clarity.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-cs-fadeup-3">
          Career growth shouldn't be a guessing game. We build you a personalized map that respects your ambitions and outlines the exact steps to reach your goals.
        </p>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-cs-fadeup-4">
           <Link href="/sign-up">
            <Button size="lg" className="rounded-full px-8 py-7 bg-accent text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_var(--color-accent)]">
              Build My Roadmap <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
           </Link>
           <p className="text-sm text-muted-foreground italic">Powered by real-time market data</p>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Gap Discovery</h3>
            <p className="text-muted-foreground leading-relaxed">
              We cross-reference your profile with top-tier job requirements to identify the exact technical and soft skills holding you back from your next promotion.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Course Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Don't waste time on generic tutorials. We recommend the most relevant certifications and courses (Udemy, Coursera, Pluralsight) based on your specific gap analysis.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Market Trajectory</h3>
            <p className="text-muted-foreground leading-relaxed">
              Understand where your industry is heading. Our AI predicts which skills will be in highest demand (and highest pay) 24 months from now.
            </p>
          </div>

        </div>
      </section>

      {/* Visual Mockup Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-accent/20 bg-black/40 backdrop-blur-2xl p-1 md:p-1.5 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10 opacity-50" />
          <div className="relative bg-background/80 rounded-[1.4rem] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black">Visual Career Timeline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our interactive roadmap gives you a clear visual timeline of your career progression. Each milestone is accompanied by specific goals and learning resources.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border-l-4 border-accent rounded-r-xl">
                    <div className="text-xs text-accent font-bold mb-1">Month 1-3</div>
                    <div className="text-sm font-bold">Master Advanced TypeScript & System Design</div>
                  </div>
                  <div className="p-4 bg-white/5 border-l-4 border-primary rounded-r-xl opacity-60">
                    <div className="text-xs text-primary font-bold mb-1">Month 4-8</div>
                    <div className="text-sm font-bold">Build Microservices Architecture Portfolio</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                {/* Mock UI: Roadmap Node Graph */}
                <div className="bg-card/60 border border-white/10 rounded-2xl p-8 aspect-square relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent" />
                   <div className="relative w-full h-full border border-dashed border-white/10 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)] flex items-center justify-center text-white font-bold">YOU</div>
                      
                      {/* Floating nodes */}
                      <div className="absolute top-10 left-10 w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] text-primary font-bold">GCP</div>
                      <div className="absolute bottom-10 right-20 w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center text-[10px] text-secondary font-bold">PRINCE2</div>
                      <div className="absolute top-1/2 -right-4 w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-[10px] text-accent font-bold">AI</div>

                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                         <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4" />
                         <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4" />
                         <line x1="90%" y1="50%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4" />
                      </svg>
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
