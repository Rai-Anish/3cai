"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { BillingPlan } from "@/constant/billing";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateSubscribeBtnProps {
  plan: BillingPlan;
  className?: string;
}

export const CreateSubscribeBtn = ({
  plan,
  className,
}: CreateSubscribeBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSubscription = async () => {
    // 1. Auth Guard: Redirect to sign-in if not authenticated
    if (!session) {
      toast.info("Authentication required", {
        description: "Please sign in to proceed with the upgrade protocol.",
      });
      router.push(`/sign-in?callbackUrl=/pricing`);
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.subscription.upgrade({
        plan: plan.name.toLowerCase(),
        
        successUrl: `${window.location.origin}/workspace?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        
      });

      if (error) {
        toast.error("Deployment Failed", {
          description: error.message || "Could not initialize Stripe session.",
        });
        return;
      }

      // 2. The redirect happens automatically by Better Auth if disableRedirect is false.
      // If it doesn't redirect for any reason, manually trigger it:
      if (data?.url) {
        window.location.href = data.url;
      }
      
    } catch (err) {
      console.error("Execution Error:", err);
      toast.error("Critical System Error", {
        description: "An unexpected error occurred during initialization.",
      });
    } finally {
      // Note: If redirect is successful, the page will unload anyway.
      setIsLoading(false);
    }
  };

  // 3. Dynamic Styling based on Plan Name
  const isPro = plan.name === "Pro";

  return (
    <Button
      disabled={isLoading}
      onClick={handleSubscription}
      className={cn(
        "w-full py-8 font-black tracking-[0.25em] transition-all uppercase rounded-xl border-2 shrink-0",
        // Pro styling (Lime)
        isPro && "bg-lime-200 text-black border-lime-200 hover:bg-lime-300 hover:scale-[1.02] hover:shadow-[0_0_50px_-20px_rgba(163,230,53,0.3)]",
        // Standard styling (Tactical Zinc)
        !isPro && "bg-transparent text-zinc-100 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>INITIALIZING...</span>
        </div>
      ) : (
        <span>GET STARTED</span>
      )}
    </Button>
  );
};
