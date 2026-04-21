// lib/tokens/service.ts
import { db } from "@/db";
import { tokenBalance, tokenUsageLog } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { TOKEN_CONFIG, FeatureKey } from "./token-config";

export async function grantFreeTokens(userId: string) {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setDate(nextReset.getDate() + TOKEN_CONFIG.RESET_INTERVAL_DAYS);

  await db.insert(tokenBalance).values({
    userId,
    balance: TOKEN_CONFIG.FREE_INITIAL_GRANT,
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
export async function consumeTokens(
  userId: string,
  feature: FeatureKey,
): Promise<ConsumeResult> {
  const balance = await getTokenBalance(userId);
  if (!balance) return { success: false, reason: "no_balance_record" };

  const cost = TOKEN_CONFIG.COSTS[feature];
  if (balance.balance < cost) {
    return { success: false, reason: "insufficient_tokens" };
  }

  await db.transaction(async (tx) => {
    await tx
      .update(tokenBalance)
      .set({ balance: balance.balance - cost, updatedAt: new Date() })
      .where(eq(tokenBalance.userId, userId));

    await tx.insert(tokenUsageLog).values({
      userId,
      tokensUsed: cost,
      feature,
    });
  });

  return { success: true, remaining: balance.balance - cost };
}

export async function resetFreeUserTokens(userId: string) {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setDate(nextReset.getDate() + TOKEN_CONFIG.RESET_INTERVAL_DAYS);

  await db
    .update(tokenBalance)
    .set({
      balance: TOKEN_CONFIG.FREE_BIWEEKLY_RESET,
      lastResetAt: now,
      nextResetAt: nextReset,
      updatedAt: now,
    })
    .where(eq(tokenBalance.userId, userId));
}