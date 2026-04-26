// src/app/actions/consume-tokens-action.ts
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { consumeTokens, getTokenBalance } from "@/services/tokens/token-service";
import type { FeatureKey } from "@/services/tokens/token-config";

export type ConsumeActionResult =
  | { success: true; remaining: number }
  | { success: false; reason: string; remaining: number };

export async function consumeTokensAction(
  feature: FeatureKey,
): Promise<ConsumeActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return { success: false, reason: "unauthenticated", remaining: 0 };
  }

  const result = await consumeTokens(session.user.id, feature, crypto.randomUUID());

  if (!result.success) {
    const balance = await getTokenBalance(session.user.id);
    return {
      success: false,
      reason: result.reason,
      remaining: balance?.subscriptionBalance ?? 0,
    };
  }

  return { success: true, remaining: result.remaining };
}
