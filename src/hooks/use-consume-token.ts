"use client";

import { useSWRConfig } from "swr";
import { consumeTokensAction } from "@/app/actions/consume-tokens";
import { TOKEN_BALANCE_KEY } from "@/lib/token-balance-key";
import type { FeatureKey } from "@/services/tokens/token-config";
import { toast } from "sonner"; // Assuming you use sonner for tactical alerts

export function useConsumeTokens() {
  const { mutate } = useSWRConfig();

  const consume = async (feature: FeatureKey) => {
    try {
      const result = await consumeTokensAction(feature);

      if (result.success) {
        // Trigger SWR to refetch the balance from the server
        mutate(TOKEN_BALANCE_KEY);
        return result;
      }

      // Handle failure (insufficient tokens, etc.)
      if (result.reason === "insufficient_tokens") {
        toast.error("TOKEN_INSUFFICIENT", {
          description: "Recharge required to initialize trajectory.",
        });
      }
      
      return result;
    } catch (err) {
      console.error("TOKEN_CONSUME_ERROR", err);
      return { success: false, reason: "error", remaining: 0 };
    }
  };

  return { consume };
}