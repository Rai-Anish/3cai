import { gemini, openai, openaiResponses } from "inngest";
import { createAgent } from "@inngest/agent-kit";
import { roadmapCareerPrompt } from "@/lib/ai/prompt/roadmap-career-prompt";

export const roadmapModal = {
    gemini: createAgent({
        name: "Roadmap Career Agent",
        description: "Provides expert support for roadmap-related questions",
        system: roadmapCareerPrompt,
        model: gemini({
            model: "gemini-2.5-flash-lite",
            apiKey: process.env.GEMINI_API_KEY,
        }),
    }),

    groq: createAgent({
        name: "Roadmap Career Agent",
        description: "Provides expert support for roadmap-related questions",
        system: roadmapCareerPrompt,
        model: openai({
            baseUrl: "https://api.groq.com/openai/v1",
            model: "llama-3.1-8b-instant",
            apiKey: process.env.GROQ_API_KEY,
        }),
    }),
}


export type RoadmapProvider = keyof typeof roadmapModal;