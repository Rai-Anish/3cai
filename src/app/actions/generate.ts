"use server";
import { withTokenGate } from "@/services/tokens/gated";

export async function generateContent(prompt: string) {
  return withTokenGate("ai_generation", async () => {
    return { output: "..." };
  });
}
