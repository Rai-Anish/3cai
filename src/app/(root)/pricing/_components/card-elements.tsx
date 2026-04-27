import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const PriceDisplay = ({ price }: { price: string }) => (
  <div className="mb-10">
    <div className="flex items-baseline gap-1">
      <span className="text-6xl font-black tracking-tighter text-white">
        {price}
      </span>
      <span className="text-zinc-600 text-sm font-bold uppercase tracking-widest">/mo</span>
    </div>
  </div>
);


export const FeatureItem = ({ 
  feature,  
  isFirst, 
  planName 
}: { 
  feature: string; 
  isPro: boolean; 
  isFirst: boolean;
  planName: string;
}) => (
  <li className="flex items-start gap-4 group">
    <Check
      className={cn(
        "w-5 h-5 shrink-0 transition-colors",
        planName.toLowerCase() === "pro" ? "text-primary" : "text-muted-foreground"
      )}
    />
    <span className="text-[15px] leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors">
      {feature}
    </span>
  </li>
);