import { eq } from "drizzle-orm";
import { inngest } from "@/inngest/client";
import { db } from "@/db";
import { resumeAnalysis } from "@/db/schemas";
import { ai_resume_analysis } from "@/lib/ai/resume-analysis";
import type { ResumeAnalysis } from "@/lib/ai/resume/resume-types";
import { consumeTokens, getTokenBalance } from "@/services/tokens/token-service";

export const AiResumeAnalyzerWorker = inngest.createFunction(
  {
    id: "ai-resume-analyzer-worker",
    name: "Generate Resume Analyzer Worker",
    retries: 0,
    triggers: [{ event: "ai/resume.analyze" }],
    onFailure: async ({ event, error }) => {
      const { analysisId } = event.data.event.data;
      await db.update(resumeAnalysis)
        .set({
          status: "failed",
          error: error.message,
          updatedAt: new Date(),
        })
        .where(eq(resumeAnalysis.id, analysisId));
    },
  },
  async ({ event, step }) => {
    const { analysisId, resumeText, targetRole, jobDescription, model, userId } = event.data;

    await step.run("consume-token", async () => {
      const result = await consumeTokens(userId, "ai_resume_analysis", `resume-${analysisId}`);
      if (!result.success) throw new Error(result.reason); // Inngest stops here, onFailure handles DB update
      return result;
    });

    const result = await step.run("analyze-resume", async () => {
      return await ai_resume_analysis({
        resumeText,
        targetRole,
        jobDescription,
        model,
      }) as ResumeAnalysis;
    });

    await step.run("save-analysis", async () => {
      await db.update(resumeAnalysis)
        .set({
          score: result.score,
          originalText: result.originalText ?? resumeText,
          editedText: result.improvedResumeText,
          resumeJson: result.resumeDocument,
          analysis: result,
          status: "completed",
          updatedAt: new Date(),
        })
        .where(eq(resumeAnalysis.id, analysisId));
    });

    return { ok: true, analysisId };
  },
);