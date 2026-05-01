import { inngest } from "@/inngest/client";
import { resumeModal } from "./resume-agents";
import { consumeTokens } from "@/services/tokens/token-service";
import { roadmap } from "@/db/schemas";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { parseRoadmapOutput } from "@/lib/ai/parser/parse-roadmap";

export const AiResumeWorker = inngest.createFunction(
  {
    id: "ai-resume-worker",
    name: "Generate Resume Worker",
    triggers: [{ event: "resumeAnalyzer/generate.requested" }],
  },
  async ({ event, step }) => {
    const { resumeId, userInput, userId, model } = event.data;

    // consume token
    await step.run("consume-user-token", async () => {
      const result = await consumeTokens(userId, "ai_resume_analysis", `resume-${resumeId}`);
      if (!result.success) throw new Error("Failed to consume tokens");
      return result;
    });

    // analyze resume
    const agent = model === 'groq' ? resumeModal.groq : resumeModal.gemini;
    const result = await agent.run(userInput);

    if (!result?.output) throw new Error("No output from AI");

    console.log("resume from fn: ", result.output);

    // await step.run("parse-and-save-resume", async () => {
    //   const parsed = parseRoadmapOutput(result.output as any);

    //   await db.update(roadmap)
    //     .set({
    //       title: parsed.roadmapTitle,
    //       userInput: userInput,
    //       description: parsed.description,
    //       duration: parsed.duration,
    //       nodes: parsed.initialNodes,
    //       edges: parsed.initialEdges,
    //       status: "completed",
    //     })
    //     .where(eq(roadmap.id, roadmapId));

    //   return parsed;
    // });

    // return { roadmapId, status: "completed" };
  }
);
