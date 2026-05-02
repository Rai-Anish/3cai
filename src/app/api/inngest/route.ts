import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  toolActionRequestedFunction,
  grantFreeTokensFunction,
  resetFreeUserTokensFunction,
} from "@/inngest/functions/token-functions";
import { AiRoadmapWorker } from "@/inngest/functions/roadmap/roadmap-worker";
import { AiResumeAnalyzerWorker } from "@/inngest/functions/resume/resume-worker";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    toolActionRequestedFunction,
    grantFreeTokensFunction,
    resetFreeUserTokensFunction,
    AiRoadmapWorker,
    AiResumeAnalyzerWorker
  ],
});


