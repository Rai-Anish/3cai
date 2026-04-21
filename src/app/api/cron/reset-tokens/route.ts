// app/api/cron/reset-tokens/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tokenBalance } from "@/db/schemas";
import { and, lte, isNull } from "drizzle-orm";
import { resetFreeUserTokens } from "@/lib/tokens/token-service";

// Protect this route — only your cron runner can call it
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // Find free users whose reset is due
  // Free users have nextResetAt set; paid users don't need resets
  const dueUsers = await db
    .select({ userId: tokenBalance.userId })
    .from(tokenBalance)
    .where(
      and(
        lte(tokenBalance.nextResetAt, now),
        // Optionally: filter only users without active sub
        // (or just reset everyone — paid users get ignored by consumeTokens anyway)
      )
    );

  await Promise.all(dueUsers.map((u) => resetFreeUserTokens(u.userId)));

  return NextResponse.json({ reset: dueUsers.length });
}