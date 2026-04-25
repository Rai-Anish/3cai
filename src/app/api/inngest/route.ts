import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  consumeTokensFunction,
  grantFreeTokensFunction,
  resetFreeUserTokensFunction,
  aiCareerAgent,
} from "@/inngest/functions/token-functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    consumeTokensFunction,
    grantFreeTokensFunction,
    resetFreeUserTokensFunction,
    aiCareerAgent,
  ],
});

