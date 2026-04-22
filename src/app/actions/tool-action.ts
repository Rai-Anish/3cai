"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  consumeTokens,
  getTokenBalance,
} from "@/services/tokens/token-service";
import { getUserSubscriptionStatus } from "@/services/tokens/check-subscription";
import { inngest } from "@/lib/inngest/client";
import { FeatureKey } from "@/services/tokens/token-config";

type ToolActionResult =
  | { success: true; remaining: number; jobId: string }
  | { success: false; reason: string; remaining: number; isPaidUser: boolean };

export async function triggerToolAction(
  feature: FeatureKey,
  toolName: string,
): Promise<ToolActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return {
      success: false,
      reason: "unauthenticated",
      remaining: 0,
      isPaidUser: false,
    };

  const userId = session.user.id;
  const { isSubscribed } = await getUserSubscriptionStatus();

  const result = await consumeTokens(userId, feature);

  if (!result.success) {
    const balance = await getTokenBalance(userId);
    return {
      success: false,
      reason: result.reason,
      remaining: balance?.subscriptionBalance ?? 0,
      isPaidUser: isSubscribed,
    };
  }

  const { ids } = await inngest.send({
    name: "token/consume",
    data: {
      userId,
      feature,
      toolName,
      sessionId: session.session.id,
    },
  });

  return {
    success: true,
    remaining: result.remaining,
    jobId: ids[0],
  };
}
