// app/actions/consume-tokens.ts
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { consumeTokens } from "@/services/tokens/token-service";
import type { FeatureKey } from "@/services/tokens/token-config";

export async function consumeTokensAction(feature: FeatureKey) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await consumeTokens(session.user.id, feature);
}

