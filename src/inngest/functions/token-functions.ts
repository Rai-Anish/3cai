import { inngest } from "../client";
import { GetFunctionInput } from "inngest";
import type {
  TokenGrantEvent,
  TokenResetEvent,
} from "../types";
import {
  grantFreeTokens,
  resetFreeUserTokens,
} from "@/services/tokens/token-service";

type Ctx = GetFunctionInput<typeof inngest>;

export const toolActionRequestedFunction = inngest.createFunction(
  {
    id: "tool-action-requested",
    name: "Tool Action Requested",
    retries: 3,
    triggers: [{ event: "tool/action-requested" }],
  },
  async ({ event, step }) => {
    const { userId, feature, toolName, requestId } = event.data as {
      userId: string;
      feature: string;
      toolName: string;
      requestId: string;
    };

    await step.run("log-tool-action", async () => {
      console.log("[tool action]", {
        requestId,
        userId,
        feature,
        toolName,
      });
    });

    return {
      success: true,
      requestId,
    };
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






