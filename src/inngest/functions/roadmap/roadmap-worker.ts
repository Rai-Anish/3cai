import { inngest } from "@/inngest/client";
import { roadmapModal } from "./roadmap-agents";
import { consumeTokens } from "@/services/tokens/token-service";
import { roadmap } from "@/db/schemas";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { parseRoadmapOutput } from "@/lib/ai/parser/parse-roadmap";

export const AiRoadmapWorker = inngest.createFunction(
  {
    id: "ai-roadmap-worker",
    name: "Generate Roadmap Worker",
    triggers: [{ event: "roadmap/generate.requested" }],
  },
  async ({ event, step }) => {
    const { roadmapId, userInput, userId, model } = event.data;

    // consume token
    await step.run("consume-user-token", async () => {
      const result = await consumeTokens(userId, "ai_roadmap", `roadmap-${roadmapId}`);
      if (!result.success) throw new Error("Failed to consume tokens");
      return result;
    });

    // generate roadmap
    const agent = model === 'groq' ? roadmapModal.groq : roadmapModal.gemini;
    const result = await agent.run(userInput);

    if (!result?.output) throw new Error("No output from AI");

    await step.run("parse-and-save-roadmap", async () => {
      const parsed = parseRoadmapOutput(result.output as any);

      await db.update(roadmap)
        .set({
          title: parsed.roadmapTitle,
          userInput: userInput,
          description: parsed.description,
          duration: parsed.duration,
          nodes: parsed.initialNodes,
          edges: parsed.initialEdges,
          status: "completed",
        })
        .where(eq(roadmap.id, roadmapId));

      return parsed;
    });

    return { roadmapId, status: "completed" };
  }
);
