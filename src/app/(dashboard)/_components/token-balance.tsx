"use client";

import useSWR from "swr";
import { fetchTokenBalance } from "@/app/actions/get-token-balance";
import { TOKEN_BALANCE_KEY } from "@/lib/token-balance-key";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function TokenBalance() {
  const { data: balance, isLoading, error } = useSWR(
    TOKEN_BALANCE_KEY,
    fetchTokenBalance,
    {
      refreshInterval: 2000,
      revalidateOnFocus: true,
      dedupingInterval: 3000,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
        <Zap className="w-4 h-4" />
        <span>...</span>
      </div>
    );
  }

  if (!balance || error) return null;

  const isLow = balance.balance <= 20;
  const isEmpty = balance.balance === 0;

  return (
    <div className="flex items-center gap-2 rounded-md border bg-secondary/20 px-2 py-1 text-sm">
      <Zap
        className={cn(
          "h-4 w-4",
          isEmpty ? "text-red-500" : isLow ? "text-amber-500" : "text-blue-500"
        )}
      />
      <span
        className={cn(
          "font-mono font-bold",
          isEmpty
            ? "text-red-500"
            : isLow
              ? "text-amber-500"
              : "text-green-600 dark:text-green-400"
        )}
      >
        {balance.balance ?? 0}
      </span>
      <span className="text-muted-foreground">tokens</span>
    </div>
  );
}

