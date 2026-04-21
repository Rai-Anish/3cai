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
        "w-4 h-4 mt-1 shrink-0 text-lime-500",
        planName === "Premium" && isFirst ? "text-purple-500" : "text-lime-500"
      )}
    />
    <span className="text-[15px] leading-tight text-zinc-400 group-hover:text-zinc-200 transition-colors">
      {feature}
    </span>
  </li>
);