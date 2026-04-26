
import { useCallback } from "react";
import { setTokenBalance, revalidateTokenBalance } from "@/services/tokens/token-balance-key";

/**
 * Wraps any server action that returns { remaining: number }.
 * Automatically syncs the token balance on success or re-fetches on error.
 */
export function useTokenAction() {
  const run = useCallback(
    async <T extends { remaining: number }>(
      action: () => Promise<T>,
    ): Promise<T> => {
      try {
        const result = await action();
        setTokenBalance(result.remaining);  // always sync on any result
        return result;
      } catch (err) {
        revalidateTokenBalance();           // re-fetch on unexpected error
        throw err;
      }
    },
    [],
  );

  return { run };
}