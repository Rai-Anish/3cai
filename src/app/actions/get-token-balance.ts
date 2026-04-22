// src/app/actions/get-token-balance.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenBalance } from "@/services/tokens/token-service";

export async function fetchTokenBalance() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const balance = await getTokenBalance(session.user.id);
  if (!balance) return null;

  return {
    balance: balance.balance,
    nextResetAt: balance.nextResetAt,
    lastResetAt: balance.lastResetAt,
  };
}
