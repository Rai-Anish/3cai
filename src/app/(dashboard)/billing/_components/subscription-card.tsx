"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BillingPlan } from "@/constant/billing";

interface SubscriptionCardProps {
  subscription: any;
  tokenBalance: any;
  planDetails?: BillingPlan;
  isFree: boolean;
}

export function SubscriptionCard({
  subscription,
  tokenBalance,
  planDetails,
  isFree,
}: SubscriptionCardProps) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const isScheduledToCancel = !!subscription?.cancelAt;
  const stripeSubscriptionId = subscription?.stripeSubscriptionId;
  const referenceId = subscription?.referenceId;

  const getDisplayDate = () => {
    if (subscription?.periodEnd) {
      return new Date(subscription.periodEnd).toLocaleDateString();
    }

    if (tokenBalance?.nextResetAt) {
      return new Date(tokenBalance.nextResetAt).toLocaleDateString();
    }

    return "N/A";
  };

  const handleCancel = async () => {
    if (!stripeSubscriptionId) {
      toast.error("System Error", {
        description: "No active Stripe subscription found to deactivate.",
      });
      return;
    }

    try {
      setIsCancelling(true);

      const { error } = await authClient.subscription.cancel({
        subscriptionId: stripeSubscriptionId,
        referenceId,
        customerType: "user",
        returnUrl: `${window.location.origin}/cancelled`,
      });

      if (error) {
        if (
          error.message?.toLowerCase().includes("already set to be canceled") ||
          error.message?.toLowerCase().includes("already canceled")
        ) {
          toast.info("Cancellation already scheduled", {
            description: `Your plan will stay active until ${getDisplayDate()}.`,
          });
          router.refresh();
          return;
        }

        toast.error("Cancellation Failed", {
          description: error.message,
        });
        return;
      }

      toast.success("Subscription Deactivated", {
        description: "Plan will remain active until the end of this cycle.",
      });

      router.refresh();
    } catch {
      toast.error("System Error", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleRestore = async () => {
    if (!stripeSubscriptionId) {
      toast.error("System Error", {
        description: "No Stripe subscription found to restore.",
      });
      return;
    }

    try {
      setIsRestoring(true);

      const { error } = await authClient.subscription.restore({
        subscriptionId: stripeSubscriptionId,
        referenceId,
        customerType: "user",
      });

      if (error) {
        toast.error("Restore Failed", {
          description: error.message,
        });
        return;
      }

      toast.success("Subscription Restored", {
        description: "Your subscription will continue renewing normally.",
      });

      router.refresh();
    } catch {
      toast.error("System Error", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[100px]" />

      <div>
        <Badge
          variant="secondary"
          className="mb-6 border-zinc-800 bg-zinc-900 text-[10px] tracking-widest text-lime-400 uppercase"
        >
          ● {isFree ? "Free Access" : isScheduledToCancel ? "Cancellation Scheduled" : "Subscription Active"}
        </Badge>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-5xl leading-none font-black tracking-tighter text-white uppercase italic">
              {planDetails?.name ?? "Free"}
            </h2>
            <p className="mt-4 max-w-85 text-sm leading-relaxed text-zinc-500">
              3CAI uses advanced semantic modeling to analyze CV structures and
              simulate 1-on-1 human-expert interview environments.
            </p>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold tracking-tighter text-white">
              {planDetails?.price ?? "$0"}
              <span className="text-lg font-medium text-zinc-500">/mo</span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-zinc-500 uppercase">
              {isFree ? "Token Reset: " : isScheduledToCancel ? "Access Until: " : "Next Billing: "}
              {" "}
              {getDisplayDate()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-900 pt-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
            CV Parsing
          </span>
          <span className="mt-1 font-mono text-xs text-zinc-300">
            {planDetails?.features?.[0] || "Basic"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
            Interview Mode
          </span>
          <span className="mt-1 font-mono text-xs text-zinc-300 italic underline underline-offset-4 decoration-zinc-800">
            {isFree ? "5 Sessions" : "Unlimited"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
            Analysis Depth
          </span>
          <span className="mt-1 font-mono text-xs text-zinc-300">
            {isFree ? "Standard" : "Deep-Dive + Metrics"}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        {!isFree && !isScheduledToCancel && (
          <Button
            variant="ghost"
            disabled={isCancelling || isRestoring}
            onClick={handleCancel}
            className="text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:bg-rose-500/10 hover:text-rose-500"
          >
            {isCancelling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Deactivate Plan"
            )}
          </Button>
        )}

        {!isFree && isScheduledToCancel && (
          <>
            <div className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              Cancels on {getDisplayDate()}
            </div>

            <Button
              variant="ghost"
              disabled={isCancelling || isRestoring}
              onClick={handleRestore}
              className="text-xs font-bold tracking-widest text-emerald-400 uppercase transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              {isRestoring ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Restore Plan"
              )}
            </Button>
          </>
        )}

        <Button
          onClick={() => router.push("/pricing")}
          className="h-12 rounded-lg bg-gradient-to-r from-rose-400 to-fuchsia-500 px-10 font-black tracking-tight text-black uppercase transition-transform hover:opacity-90 active:scale-95"
        >
          {isFree ? "Upgrade to Pro" : "Manage 3CAI Plan"}
        </Button>
      </div>
    </div>
  );
}
