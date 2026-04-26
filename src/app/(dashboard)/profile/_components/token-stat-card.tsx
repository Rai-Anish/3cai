"use client";

import { GlowBg } from "@/components/glow-bg";

interface TokenStatsCardProps {
  subscriptionBalance: number;
  creditBalance: number;
  lifetimeGranted: number;
  totalUsed: number;
  totalRequests: number;
  lastUsed: Date | null;
}

function StatBar({
  value,
  max,
  color = "bg-primary",
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="h-1.5 w-full rounded-full bg-border/50 overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function TokenStatsCard({
  subscriptionBalance,
  creditBalance,
  lifetimeGranted,
  totalUsed,
  totalRequests,
  lastUsed,
}: TokenStatsCardProps) {
  const totalAvailable = subscriptionBalance + creditBalance;
  const usagePercent =
    lifetimeGranted > 0 ? Math.round((totalUsed / lifetimeGranted) * 100) : 0;

  const lastUsedStr = lastUsed
    ? new Date(lastUsed).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Never";

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
      <GlowBg className="bg-secondary/5" />
      <div className="p-6">
        <h3 className="font-mono text-[13px] uppercase tracking-[0.2em]  mb-5">
          Token Usage
        </h3>

        {/* Available balance — hero stat */}
        <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/15">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Available Balance
          </p>
          <p className="font-mono text-3xl font-bold text-primary mt-1">
            {fmt(totalAvailable)}
          </p>
          <div className="flex gap-4 mt-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Subscription
              </p>
              <p className="font-mono text-xs font-semibold text-foreground">
                {fmt(subscriptionBalance)}
              </p>
            </div>
            <div className="w-px bg-border/40" />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Credits
              </p>
              <p className="font-mono text-xs font-semibold text-foreground">
                {fmt(creditBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Lifetime stats */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Lifetime Used
              </p>
              <p className="font-mono text-xs font-bold text-foreground">
                {fmt(totalUsed)}
              </p>
            </div>
            <StatBar value={totalUsed} max={lifetimeGranted} />
            <p className="font-mono text-[9px] text-muted-foreground mt-1">
              {usagePercent}% of {fmt(lifetimeGranted)} lifetime tokens granted
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/30">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/20">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Total Requests
              </p>
              <p className="font-mono text-lg font-bold text-foreground mt-0.5">
                {fmt(totalRequests)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/20">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Last Active
              </p>
              <p className="font-mono text-xs font-bold text-foreground mt-1 leading-tight">
                {lastUsedStr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
