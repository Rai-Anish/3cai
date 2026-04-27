import { cn } from "@/lib/utils";
import { BillingPlan } from "@/constant/billing";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay, FeatureItem } from "./card-elements";
import { CreateSubscribeBtn } from "@/components/create-subscribe-btn";

interface PricingCardProps {
  plan: BillingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  const isPro = plan.name.toLowerCase() === "pro";

  return (
    <Card
      className={cn(
        "relative flex flex-col p-10 transition-all duration-500 bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl hover:scale-105 overflow-visible",
        isPro && "border-primary/30 bg-primary/5 shadow-[0_0_50px_-15px_var(--color-primary)] scale-105 z-10 hover:scale-110"
      )}
    >
      {isPro && (
        <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-black italic rounded-full text-xs px-4 py-1.5 shadow-[0_0_15px_var(--color-primary)]">
          MOST POPULAR
        </Badge>
      )}

      <div className="flex justify-between items-start mb-4">
        <h3 className={cn(
          "text-2xl font-black tracking-tight uppercase",
          isPro ? "text-primary" : "text-foreground"
        )}>
          {plan.name}
        </h3>
      </div>

      <PriceDisplay price={plan.price} />

      <div className="grow mb-12">
        <ul className="space-y-5">
          {plan.features.map((feature, idx) => (
            <FeatureItem
              key={feature}
              feature={feature}
              isPro={isPro}
              isFirst={idx === 0}
              planName={plan.name}
            />
          ))}
        </ul>
      </div>
      
      <div className="mt-auto">
        <CreateSubscribeBtn plan={plan} />
      </div>

    </Card>
  );
};