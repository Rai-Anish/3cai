// src/inngest/functions/resume/resume-worker.ts
import { eq } from "drizzle-orm";
import { inngest } from "@/inngest/client";
import { db } from "@/db";
import { resumeAnalysis } from "@/db/schemas";
import { ai_resume_analysis } from "@/lib/ai/resume-analysis";
import type { ResumeAnalysis } from "@/lib/ai/resume/resume-types";

export const AiResumeAnalyzerWorker = inngest.createFunction(
  {
    id: "ai-resume-analyzer-worker",
    name: "Generate Resume Analyzer Worker",
    triggers: [{ event: "ai/resume.analyze" }],
  },
  async ({ event, step }) => {
    const { analysisId, resumeText, targetRole, jobDescription, model, instruction } = event.data;

    try {
      const result = (await ai_resume_analysis({
        resumeText,
        targetRole,
        jobDescription,
        model,
        instruction,
      })) as ResumeAnalysis;

      await step.run("save-analysis", async () => {
        await db
          .update(resumeAnalysis)
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
    } catch (error) {
      await db
        .update(resumeAnalysis)
        .set({
          status: "failed",
          error: error instanceof Error ? error.message : "Resume analysis failed",
          updatedAt: new Date(),
        })
        .where(eq(resumeAnalysis.id, analysisId));

      throw error;
    }
  },
);

