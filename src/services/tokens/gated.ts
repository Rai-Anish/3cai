
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { consumeTokens } from "./token-service";
import { FeatureKey } from "./token-config";

type TokenGateResult<T> =
  | { success: true; data: T; remaining: number }
  | { success: false; reason: string };

export async function withTokenGate<T = unknown>(
  feature: FeatureKey,
  fn: () => Promise<T>
): Promise<TokenGateResult<T>> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { success: false, reason: "unauthenticated" };

  const result = await consumeTokens(session.user.id, feature);
  if (!result.success) {
    return { success: false, reason: result.reason };
  }

  const data = await fn();
  return { success: true, data, remaining: result.remaining };
}