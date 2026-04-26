import { billingPlan } from "@/constant/billing";

const FREE_PLAN = billingPlan.find((p) => p.name === "free")!;
const PRO_PLAN = billingPlan.find((p) => p.name === "pro")!;
const PREMIUM_PLAN = billingPlan.find((p) => p.name === "premium")!;

export const TOKEN_CONFIG = {
  FREE_INITIAL_GRANT: FREE_PLAN.limits.tokens,
  FREE_BIWEEKLY_RESET: FREE_PLAN.limits.tokens,
  PRO_INITIAL_GRANT: PRO_PLAN.limits.tokens,
  PREMIUM_INITIAL_GRANT: PREMIUM_PLAN.limits.tokens,
  RESET_INTERVAL_DAYS: 14,
  COSTS: {
    ai_generation: 1,
    export: 5,
    analysis: 15,
  },
} as const;

export type FeatureKey = keyof typeof TOKEN_CONFIG.COSTS;
