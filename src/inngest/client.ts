// lib/inngest/client.ts
import { Inngest } from "inngest";
import type { FeatureKey } from "@/services/tokens/token-config";

export const inngest = new Inngest({
  id: "3cai",
  schemas: {
    "token/consume": {} as {
      data: {
        userId: string;
        feature: FeatureKey;
        toolName: string;
        sessionId: string;
      };
    },
    "token/grant-free": {} as {
      data: { userId: string };
    },
    "token/reset-free-user": {} as {
      data: { userId: string };
    },
  },
});
