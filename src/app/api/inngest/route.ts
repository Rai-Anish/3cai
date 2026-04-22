// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  consumeTokensFunction,
  grantFreeTokensFunction,
  resetFreeUserTokensFunction,
} from "@/lib/inngest/functions/token-functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    consumeTokensFunction,
    grantFreeTokensFunction,
    resetFreeUserTokensFunction,
  ],
});