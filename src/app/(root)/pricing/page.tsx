"use client";

import { billingPlan } from "@/constant/billing";
import { PricingCard } from "./_components/pricing-card";

export default function PricingPage() {
  const handleSelect = (priceId: string) => {
    console.log("Selected Price ID:", priceId);
  };

  return (
    <section className="min-h-screen bg-black text-zinc-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase italic">
            Choose Your Evolution
          </h1>
          <p className="text-zinc-500 text-lg">Unlock the full power of 3CAI&apos;s intelligence engine with a plan tailored to your career goals.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {billingPlan.map((plan) => (
            <PricingCard key={plan.name} plan={plan}/>
          ))}
        </div>
      </div>
    </section>
  );
}

