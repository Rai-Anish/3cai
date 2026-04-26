import { db } from "@/db";
import { tokenBalance, tokenUsageLog } from "@/db/schemas";
import { and, eq, gte, sql } from "drizzle-orm";
import { TOKEN_CONFIG, FeatureKey } from "./token-config";

export async function grantFreeTokens(userId: string) {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setDate(nextReset.getDate() + TOKEN_CONFIG.RESET_INTERVAL_DAYS);

  await db
    .insert(tokenBalance)
    .values({
      userId,
      subscriptionBalance: TOKEN_CONFIG.FREE_INITIAL_GRANT,
      lifetimeGranted: TOKEN_CONFIG.FREE_INITIAL_GRANT,
      lastResetAt: now,
      nextResetAt: nextReset,
    })
    .onConflictDoNothing();
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

export async function consumeTokens(
  userId: string,
  feature: FeatureKey,
  requestIdInput: unknown,
): Promise<ConsumeResult> {
  const requestId =
    typeof requestIdInput === "string" ? requestIdInput.trim() : "";

  if (!requestId) {
    console.error("consumeTokens invalid requestId:", requestIdInput);
    throw new Error("consumeTokens requires a non-empty requestId");
  }

  const cost = TOKEN_CONFIG.COSTS[feature];

  return db.transaction(async (tx) => {
    const existingLog = await tx
      .select()
      .from(tokenUsageLog)
      .where(eq(tokenUsageLog.requestId, requestId))
      .limit(1);

    if (existingLog[0]) {
      const balance = await tx
        .select()
        .from(tokenBalance)
        .where(eq(tokenBalance.userId, userId))
        .limit(1);

      if (!balance[0]) {
        return { success: false, reason: "no_balance_record" } as const;
      }

      return {
        success: true,
        remaining: balance[0].subscriptionBalance,
      } as const;
    }

    const updated = await tx
      .update(tokenBalance)
      .set({
        subscriptionBalance: sql`${tokenBalance.subscriptionBalance} - ${cost}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(tokenBalance.userId, userId),
          gte(tokenBalance.subscriptionBalance, cost),
        ),
      )
      .returning();

    if (updated.length === 0) {
      const balance = await tx
        .select()
        .from(tokenBalance)
        .where(eq(tokenBalance.userId, userId))
        .limit(1);

      if (!balance[0]) {
        return { success: false, reason: "no_balance_record" } as const;
      }

      return { success: false, reason: "insufficient_tokens" } as const;
    }

    await tx.insert(tokenUsageLog).values({
      userId,
      requestId,
      tokensUsed: cost,
      feature,
    });

    return {
      success: true,
      remaining: updated[0].subscriptionBalance,
    } as const;
  });
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
