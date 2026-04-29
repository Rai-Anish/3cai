"use client";

import { billingPlan } from "@/constant/billing";
import { PricingCard } from "./_components/pricing-card";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PricingPage() {

  return (
    <section className="relative min-h-screen bg-background text-foreground py-24 md:py-32 px-6 overflow-hidden">
      {/* Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 max-w-250 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
 
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8 animate-cs-fadeup-1">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            Invest in your <br />
            <span className="font-serif italic font-normal text-primary">potential.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose the level of support that matches your ambition. No hidden fees, no complex tiers—just the tools you need to grow.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {billingPlan.map((plan, idx) => (
            <div key={plan.name} className={cn(
              idx === 0 && "animate-cs-fadeup-1",
              idx === 1 && "animate-cs-fadeup-2",
              idx === 2 && "animate-cs-fadeup-3",
            )}>
              <PricingCard plan={plan}/>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-24 flex flex-col items-center gap-6 animate-cs-fadeup-3">
          <div className="flex items-center gap-4 text-muted-foreground text-sm font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_var(--color-success)]" />
              Secure 256-bit SSL
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              Powered by Stripe
            </div>
          </div>
          <div className="flex gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
             {/* Mock payment icons */}
             <div className="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center font-bold text-[10px]">VISA</div>
             <div className="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center font-bold text-[10px]">MASTER</div>
             <div className="w-12 h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center font-bold text-[10px]">APPLE</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-32 max-w-3xl mx-auto animate-cs-fadeup-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-tighter leading-[0.9]">
            Common <span className="font-serif italic font-normal text-primary">questions.</span>
          </h2>
          <Accordion className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="px-2">
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How does the AI Resume Analyzer work?",
    a: "Our engine uses advanced semantic parsing to read your resume exactly how an ATS (Applicant Tracking System) does. It identifies keyword gaps, quantifies your impact, and gives you actionable suggestions to beat the filters."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, absolutely. You can cancel your Pro or Premium plan at any time from your dashboard. You'll still have access to your features until the end of your billing cycle."
  },
  {
    q: "Is the 1-on-1 expert review really human?",
    a: "Yes! On the Premium plan, once you finalize your resume, you can submit it for an async review where a real tech recruiter will give you personalized video or written feedback."
  },
  {
    q: "Do you offer refunds?",
    a: "If you're not happy with 3CAI, we offer a 7-day money-back guarantee. Just contact our support team and we'll process it, no questions asked."
  }
];

