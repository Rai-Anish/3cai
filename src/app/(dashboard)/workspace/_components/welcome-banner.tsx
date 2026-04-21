import { GlowBg } from "@/components/glow-bg";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const WelcomeBanner = () => {
  return (
    <section>
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 ">
        <GlowBg />
        {/* Text Content */}
        <div className="relative z-10 space-y-5 max-w-2xl">
          <h1 className="text-4xl md:text-5xl italic uppercase leading-[0.9] text-card-foreground">
            AI Career <span className="text-primary">Coach Agent</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground font-thin font-sans max-w-lg">
            Smarter career decisions start here — get tailored advice, real
            market insights, and roadmap builds just for you with the help of
            AI.
          </p>
        </div>

        <Button
          size="lg"
          className="relative z-10 group h-auto px-6 py-4 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-all font-mono font-bold text-lg italic uppercase"
        >
          Get Started
          <Rocket className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </section>
  );
};
