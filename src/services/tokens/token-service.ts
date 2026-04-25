
import { db } from "@/db";
import { tokenBalance, tokenUsageLog } from "@/db/schemas";
import { and, eq, gte, sql } from "drizzle-orm";
import { TOKEN_CONFIG, FeatureKey } from "./token-config";

export async function grantFreeTokens(userId: string) {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setDate(nextReset.getDate() + TOKEN_CONFIG.RESET_INTERVAL_DAYS);

  await db.insert(tokenBalance).values({
    userId,
    subscriptionBalance: TOKEN_CONFIG.FREE_INITIAL_GRANT,
    lifetimeGranted: TOKEN_CONFIG.FREE_INITIAL_GRANT,
    lastResetAt: now,
    nextResetAt: nextReset,
  }).onConflictDoNothing(); // safety: idempotent
}

export async function getTokenBalance(userId: string) {
  const result = await db
    .select()
    .from(tokenBalance)
    .where(eq(tokenBalance.userId, userId))
    .limit(1);

  return result[0] ?? null;
}

type ConsumeResult =
  | { success: true; remaining: number }
  | { success: false; reason: "insufficient_tokens" | "no_balance_record" };

// lib/tokens/service.ts
export async function consumeTokens(userId: string, feature: FeatureKey): Promise<ConsumeResult> {
  const cost = TOKEN_CONFIG.COSTS[feature];

  // Atomic Update: Only update if balance >= cost
  const result = await db
    .update(tokenBalance)
    .set({ 
        subscriptionBalance: sql`${tokenBalance.subscriptionBalance} - ${cost}`, 
        updatedAt: new Date() 
    })
    .where(
        and(
            eq(tokenBalance.userId, userId),
            gte(tokenBalance.subscriptionBalance, cost) // SQL-level check prevents race conditions
        )
    )
    .returning();

  if (result.length === 0) {
    return { success: false, reason: "insufficient_tokens" };
  }

  // Log usage after successful deduction
  await db.insert(tokenUsageLog).values({
    userId,
    tokensUsed: cost,
    feature,
  });

  return { success: true, remaining: result[0].subscriptionBalance };
}

export async function resetFreeUserTokens(userId: string) {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setDate(nextReset.getDate() + TOKEN_CONFIG.RESET_INTERVAL_DAYS);

  await db
    .update(tokenBalance)
    .set({
      subscriptionBalance: TOKEN_CONFIG.FREE_BIWEEKLY_RESET,
      lastResetAt: now,
      nextResetAt: nextReset,
      updatedAt: now,
    })
    .where(eq(tokenBalance.userId, userId));
}