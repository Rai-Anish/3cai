// src/lib/ai/resume-analysis.ts
import { resumeModal } from "@/inngest/functions/resume/resume-agents";
import { normalizeResumeAnalysis } from "@/lib/ai/resume/resume-utils";
import type { ResumeProvider } from "@/lib/ai/resume/resume-types";

function providerFromModel(model?: string): ResumeProvider {
  return model === "groq" ? "groq" : "gemini";
}

function extractJson(text: string) {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI did not return valid JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

function agentOutput(result: any) {
  if (typeof result === "string") return result;
  if (typeof result?.output === "string") return result.output;
  if (Array.isArray(result?.output)) {
    return result.output.map((part: any) => part?.content ?? part?.text ?? String(part)).join("\n");
  }
  return JSON.stringify(result?.output ?? result);
}

export async function ai_resume_analysis(input: {
  resumeText: string;
  targetRole?: string;
  jobDescription?: string;
  model?: string;
  instruction?: string;
}) {
  const provider = providerFromModel(input.model);
  const agent = resumeModal[provider];

  const result = await agent.run(`
Analyze this resume and return only JSON.

Instruction:
${input.instruction || "Full resume review with structured editor output."}

Target role:
${input.targetRole || "Not provided"}

Job description:
${input.jobDescription || "Not provided"}

Resume:
${input.resumeText}
`);

  return normalizeResumeAnalysis(extractJson(agentOutput(result)), input.resumeText);
}


