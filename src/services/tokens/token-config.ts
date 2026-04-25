import { billingPlan } from "@/constant/billing";

const FREE_PLAN = billingPlan.find((p) => p.name === "free")!;

export const TOKEN_CONFIG = {
  FREE_INITIAL_GRANT: FREE_PLAN.limits.tokens,   // 100
  FREE_BIWEEKLY_RESET: FREE_PLAN.limits.tokens,  // 100
  RESET_INTERVAL_DAYS: 14,
  COSTS: {
    ai_generation: 10,
    export: 5,
    analysis: 15,
  },
} as const;

export type FeatureKey = keyof typeof TOKEN_CONFIG.COSTS;