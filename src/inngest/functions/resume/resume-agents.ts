// src/lib/ai/resume_agent.ts
import { gemini, openaiResponses } from "inngest";
import { createAgent } from "@inngest/agent-kit";
import { resumeAnalyzerPrompt } from "@/lib/ai/prompt/resume-analyzer-prompt";

export const resumeModal = {
  gemini: createAgent({
    name: "Resume Analyzer Agent",
    description: "Analyze Resume and help improve the Resume",
    system: resumeAnalyzerPrompt,
    model: gemini({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY,
    }),
  }),

  groq: createAgent({
    name: "Resume Analyzer Agent",
    description: "Analyze Resume and help improve the Resume",
    system: resumeAnalyzerPrompt,
    model: openaiResponses({
      model: "llama-3.1-8b-instant",
      apiKey: process.env.GROQ_API_KEY,
    }),
  }),
} as const;

export type ResumeProvider = keyof typeof resumeModal;
