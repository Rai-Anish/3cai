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
  const isPro = plan.name === "Pro";

  return (
    <Card
      className={cn(
        "relative flex flex-col p-10 transition-all duration-500 border-zinc-800 bg-zinc-900/40 rounded-2xl",
        isPro && "border-lime-500/50 bg-[#0A0D08] shadow-[0_0_50px_-20px_rgba(163,230,53,0.3)]"
      )}
    >
      {isPro && (
        <Badge className="absolute top-6 right-6 bg-lime-200 text-black hover:bg-lime-200 font-black italic rounded-sm text-[10px] px-3 py-1">
          POPULAR
        </Badge>
      )}

      <div className="flex justify-between items-start mb-2">
        <h3 className={cn(
          "text-lg font-bold tracking-tight uppercase italic",
          isPro ? "text-lime-200" : "text-zinc-100"
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
      <CreateSubscribeBtn plan={plan} />

    </Card>
  );
};