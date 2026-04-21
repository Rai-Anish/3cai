// app/actions/generate.ts
"use server";
import { withTokenGate } from "@/lib/tokens/gated";

export async function generateContent(prompt: string) {
  return withTokenGate("ai_generation", async () => {
    // your AI call here
    return { output: "..." };
  });
}