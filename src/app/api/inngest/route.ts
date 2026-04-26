import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  toolActionRequestedFunction,
  grantFreeTokensFunction,
  resetFreeUserTokensFunction,
} from "@/inngest/functions/token-functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    toolActionRequestedFunction,
    grantFreeTokensFunction,
    resetFreeUserTokensFunction,
  ],
});


