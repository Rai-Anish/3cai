// components/token-balance.tsx
import { getTokenBalance } from "@/lib/tokens/token-service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function TokenBalance() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const balance = await getTokenBalance(session.user.id);
  if (!balance) return null;

  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-medium">{balance.balance}</span> tokens remaining
      {balance.nextResetAt && (
        <span className="ml-1">
          · resets {new Date(balance.nextResetAt).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}