"use client";

import { useEffect, useState } from "react";
import { fetchTokenBalance } from "@/app/actions/get-token-balance";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Balance = {
  balance: number;
  nextResetAt: Date | null;
  lastResetAt: Date;
};

export function TokenBalance() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokenBalance()
      .then((data) => {
        console.log("Token Data fetched:", data);
        if (data) {
          setBalance(data);
        }
      })
      .catch((err) => console.error("Failed to fetch balance:", err))
      .finally(() => setLoading(false));
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <Zap className="w-4 h-4" />
        <span>Loading...</span>
      </div>
    );
  }

  // 2. No Balance State (Render nothing if user has no token record)
  if (!balance) return null;

  const isLow = balance.balance <= 20;
  const isEmpty = balance.balance === 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Zap
        className={cn(
          "w-4 h-4",
          isEmpty && "text-destructive",
          isLow && !isEmpty && "text-amber-500",
          !isLow && "text-primary",
        )}
      />
      <span
        className={cn(
          "font-mono font-bold",
          isEmpty && "text-destructive",
          isLow && !isEmpty && "text-amber-500",
          !isLow && "text-foreground",
        )}
      >
        {balance.balance}
      </span>
      <span className="text-muted-foreground ml-1">tokens</span>
      {balance.nextResetAt && (
        <span className="text-xs text-muted-foreground ml-1">
          · resets {new Date(balance.nextResetAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}