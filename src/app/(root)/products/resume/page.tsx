import { Button } from "@/components/ui/button";
import { FileText, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck, Search } from "lucide-react";
import Link from "next/link";

export default function ResumeAnalyzerPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden pb-16 md:pb-32">
      {/* Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 max-w-250 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
 
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono mb-6 md:mb-8 animate-cs-fadeup-1">
          <FileText className="w-4 h-4" />
          <span>ATS-OPTIMIZED ENGINE</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 md:mb-8 animate-cs-fadeup-2 leading-[0.9]">
          Stop getting lost in <br />
          <span className="font-serif italic font-normal text-primary">the machine.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-cs-fadeup-3">
          The modern job hunt is automated, but your journey shouldn't be. We help you translate your human experience into the language that modern algorithms understand and respect.
        </p>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-cs-fadeup-4">
           <Link href="/sign-up">
            <Button size="lg" className="rounded-full px-8 py-7 bg-primary text-primary-foreground font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_var(--color-primary)]">
              Analyze My Resume <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
           </Link>
           <p className="text-sm text-muted-foreground italic">Takes less than 30 seconds</p>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Semantic Keyword Match</h3>
            <p className="text-muted-foreground leading-relaxed">
              We don't just look for words; we look for context. Our AI identifies the skills hidden in your experience and ensures they match the recruiter's search intent.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Impact Scoring</h3>
            <p className="text-muted-foreground leading-relaxed">
              Resumes that focus on 'duties' fail. We help you transform your bullet points into quantifiable achievements that grab a recruiter's attention in 6 seconds.
            </p>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-card/60 transition-colors group">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">ATS Format Validation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Is your layout breaking the parser? We validate your resume structure to ensure it's 100% readable by Workday, Greenhouse, Lever, and 50+ other systems.
            </p>
          </div>

        </div>
      </section>

      {/* Visual Mockup Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-primary/20 bg-black/40 backdrop-blur-2xl p-1 md:p-1.5 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
          <div className="relative bg-background/80 rounded-[1.4rem] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-black">Identify Missing Skills</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our system compares your CV against thousands of job descriptions in your niche to tell you exactly what skills you're missing—and how to add them authentically.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Real-time competitor benchmarking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>Role-specific keyword injections</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                {/* Mock UI */}
                <div className="bg-card/60 border border-white/10 rounded-2xl p-6 font-mono text-sm shadow-2xl">
                   <div className="flex justify-between mb-4 border-b border-white/10 pb-2">
                      <span className="text-muted-foreground text-xs uppercase">Analysis Result</span>
                      <span className="text-primary animate-pulse">Scanning...</span>
                   </div>
                   <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                           <span>Keyword Match</span>
                           <span className="text-red-400">62%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-red-400 w-[62%]" />
                        </div>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-xs">
                        Missing: "Node.js", "System Design", "Cloud Infrastructure"
                      </div>
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs">
                        Suggested Fix: "Optimized backend performance using Node.js for 10k users."
                      </div>
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
