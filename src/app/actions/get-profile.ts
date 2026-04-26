"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, tokenBalance, tokenUsageLog, account } from "@/db/schemas";
import { eq, sum, count, max } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// ─── Get full profile data ────────────────────────────────────────────────────

export async function getProfileData() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const userId = session.user.id;

  const [userData, tokenData, usageStats, linkedAccounts] = await Promise.all([
    // User basic info
    db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: { id: true, name: true, email: true, image: true, createdAt: true },
    }),

    // Token balances
    db.query.tokenBalance.findFirst({
      where: eq(tokenBalance.userId, userId),
    }),

    // Usage stats: total tokens used + count of requests + last used feature
    db
      .select({
        totalUsed: sum(tokenUsageLog.tokensUsed),
        totalRequests: count(tokenUsageLog.id),
        lastUsed: max(tokenUsageLog.createdAt),
      })
      .from(tokenUsageLog)
      .where(eq(tokenUsageLog.userId, userId))
      .then((r) => r[0]),

    // Linked OAuth accounts
    db.query.account.findMany({
      where: eq(account.userId, userId),
      columns: { providerId: true, accountId: true, createdAt: true },
    }),
  ]);

  return {
    user: userData!,
    tokens: tokenData ?? null,
    stats: {
      totalUsed: Number(usageStats?.totalUsed ?? 0),
      totalRequests: Number(usageStats?.totalRequests ?? 0),
      lastUsed: usageStats?.lastUsed ?? null,
    },
    linkedAccounts,
  };
}

// ─── Update display name ──────────────────────────────────────────────────────

export async function updateNameAction(name: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized" };

  const trimmed = name.trim();
  if (!trimmed || trimmed.length < 2) return { error: "Name must be at least 2 characters." };
  if (trimmed.length > 50) return { error: "Name must be under 50 characters." };

  try {
    await db.update(user).set({ name: trimmed }).where(eq(user.id, session.user.id));
    revalidatePath("/profile");
    return { success: true };
  } catch {
    return { error: "Failed to update name. Please try again." };
  }
}

// ─── Change password ──────────────────────────────────────────────────────────

export async function changePasswordAction(currentPassword: string, newPassword: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized" };

  if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
  if (currentPassword === newPassword) return { error: "New password must differ from current password." };

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: { currentPassword, newPassword, revokeOtherSessions: true },
    });
    return { success: true };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message :
      typeof err === "object" && err !== null && "body" in err
        ? String((err as { body?: { message?: unknown } }).body?.message ?? "")
        : "";
    if (msg.toLowerCase().includes("incorrect") || msg.toLowerCase().includes("invalid")) {
      return { error: "Current password is incorrect." };
    }
    return { error: "Failed to change password. Please try again." };
  }
}

// ─── Delete account ───────────────────────────────────────────────────────────

export async function deleteAccountAction(password: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized" };

  try {
    await auth.api.deleteUser({
      headers: await headers(),
      body: { password },
    });
    return { success: true };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message :
      typeof err === "object" && err !== null && "body" in err
        ? String((err as { body?: { message?: unknown } }).body?.message ?? "")
        : "";
    if (msg.toLowerCase().includes("incorrect") || msg.toLowerCase().includes("invalid")) {
      return { error: "Password is incorrect." };
    }
    return { error: "Failed to delete account. Please try again." };
  }
}