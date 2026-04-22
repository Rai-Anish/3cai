// src/lib/inngest/types.ts
import type { FeatureKey } from "@/services/tokens/token-config";

export type TokenConsumeEvent = {
  name: "token/consume";
  data: {
    userId: string;
    feature: FeatureKey;
    toolName: string;
    sessionId: string;
  };
};

export type TokenGrantEvent = {
  name: "token/grant-free";
  data: { userId: string };
};

export type TokenResetEvent = {
  name: "token/reset-free-user";
  data: { userId: string };
};
