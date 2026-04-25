import { inngest } from "../client";
import { GetFunctionInput } from "inngest";
import type {
  TokenConsumeEvent,
  TokenGrantEvent,
  TokenResetEvent,
} from "../types";
import {
  consumeTokens,
  grantFreeTokens,
  resetFreeUserTokens,
  getTokenBalance,
} from "@/services/tokens/token-service";

type Ctx = GetFunctionInput<typeof inngest>;

export const consumeTokensFunction = inngest.createFunction(
  {
    id: "consume-tokens",
    name: "Consume Tokens",
    retries: 3,
    triggers: [{ event: "token/consume" }],
  },
  async ({ event, step }: Ctx) => {
    const { userId, feature, toolName } =
      event.data as TokenConsumeEvent["data"];

    const balance = await step.run("check-balance", () =>
      getTokenBalance(userId),
    );
    if (!balance) return { success: false, reason: "no_balance_record" };

    const result = await step.run("consume-tokens", () =>
      consumeTokens(userId, feature),
    );
    if (!result.success) {
      return {
        success: false,
        reason: result.reason,
        currentBalance: balance.subscriptionBalance,
      };
    }

    await step.run("log-success", () => {
      console.log(`[token] consumed for ${toolName}`, {
        userId,
        feature,
        remaining: result.remaining,
      });
    });

    return { success: true, remaining: result.remaining, toolName };
  },
);

export const grantFreeTokensFunction = inngest.createFunction(
  {
    id: "grant-free-tokens",
    name: "Grant Free Tokens on Signup",
    retries: 5,
    triggers: [{ event: "token/grant-free" }],
  },
  async ({ event, step }: Ctx) => {
    const { userId } = event.data as TokenGrantEvent["data"];
    await step.run("grant-tokens", () => grantFreeTokens(userId));
    return { success: true, userId };
  },
);

export const resetFreeUserTokensFunction = inngest.createFunction(
  {
    id: "reset-free-user-tokens",
    name: "Reset Free User Tokens",
    retries: 3,
    triggers: [{ event: "token/reset-free-user" }],
  },
  async ({ event, step }: Ctx) => {
    const { userId } = event.data as TokenResetEvent["data"];
    await step.run("reset-tokens", () => resetFreeUserTokens(userId));
    return { success: true, userId };
  },
);





