"use server";
import { withTokenGate } from "@/services/tokens/gated";

export async function generateChatContent(prompt: string) {
  return withTokenGate("ai_chat", async () => {
    return { output: "..." };
  });
}

export async function generateRoadmapContent(prompt: string) {
  return withTokenGate("ai_roadmap", async () => {
    return { output: "..." };
  });
}

export async function generateResumeAnalysisContent(prompt: string) {
  return withTokenGate("ai_resume_analysis", async () => {
    return { output: "..." };
  });
}

export async function generateCoverLetterContent(prompt: string) {
  return withTokenGate("ai_cover_letter_generation", async () => {
    return { output: "..." };
  });
}
