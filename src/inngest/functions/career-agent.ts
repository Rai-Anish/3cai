import { gemini, openai, openaiResponses } from "inngest";
import { createAgent } from "@inngest/agent-kit";
import { geminiCareerPrompt } from "@/lib/ai/prompt/gemini-career-prompt";
import { groqCareerPrompt } from "@/lib/ai/prompt/groq-career-prompt";

export const chatModels = {
  gemini: createAgent({
    name: "Career QnA Gemini",
    description: "Provides expert support for career-related questions",
    system: geminiCareerPrompt,
    model: gemini({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY,
    }),
  }),

  groq: createAgent({
    name: "Career QnA Groq",
    description: "Provides expert support for career-related questions",
    system: groqCareerPrompt,
    model: openai({
      baseUrl: "https://api.groq.com/openai/v1",
      model: "llama-3.1-8b-instant",
      apiKey: process.env.GROQ_API_KEY,
    }),
  }),
};

export type ChatProvider = keyof typeof chatModels;





