// app/api/cron/reset-tokens/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tokenBalance } from "@/db/schemas";
import { lte, isNotNull } from "drizzle-orm";
import { inngest } from "@/lib/inngest/client";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // Only free users have nextResetAt set (paid users have null)
  const dueUsers = await db
    .select({ userId: tokenBalance.userId })
    .from(tokenBalance)
    .where(
      lte(tokenBalance.nextResetAt, now),
    );

  if (dueUsers.length === 0) {
    return NextResponse.json({ reset: 0 });
  }

  // Send one Inngest event per user — each gets retried independently
  await inngest.send(
    dueUsers.map((u) => ({
      name: "token/reset-free-user" as const,
      data: { userId: u.userId },
    }))
  );

  return NextResponse.json({ queued: dueUsers.length });
}