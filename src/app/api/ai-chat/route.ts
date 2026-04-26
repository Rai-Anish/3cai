import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { chatModels, type ChatProvider } from "@/inngest/functions/career-agent";
import { consumeTokens, getTokenBalance } from "@/services/tokens/token-service";
import { parseStructuredResponse } from "@/lib/ai/chat/parse-structured-response";
import {
  buildConversationPrompt,
  getTextContent,
  isChatHistoryItem,
} from "@/lib/ai/chat/prompt-utils";
import type { ChatHistoryItem } from "@/lib/ai/chat/type";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          role: "assistant",
          content: "Please sign in to use the career chat.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const userInput =
      typeof body.userInput === "string" ? body.userInput.trim() : "";

    const provider: ChatProvider =
      body.provider === "groq" ? "groq" : "gemini";

    const history: ChatHistoryItem[] = Array.isArray(body.history)
      ? body.history.filter(isChatHistoryItem)
      : [];

    if (!userInput) {
      return NextResponse.json(
        {
          role: "assistant",
          content: "Please enter a career-related question.",
        },
        { status: 400 },
      );
    }

    const balance = await getTokenBalance(session.user.id);

    if (!balance || balance.subscriptionBalance < 1) {
      return NextResponse.json(
        {
          role: "assistant",
          content:
            "You do not have enough tokens to continue chatting. Please upgrade or wait for your reset.",
        },
        { status: 402 },
      );
    }

    const prompt = buildConversationPrompt(history, userInput);
    const result = await chatModels[provider].run(prompt);

    const content = Array.isArray(result.output)
      ? result.output
          .map(getTextContent)
          .find((value): value is string => Boolean(value)) ?? ""
      : "";

    const parsed = parseStructuredResponse(content);

    const requestId = crypto.randomUUID();

    const consumeResult = await consumeTokens(
      session.user.id,
      "ai_generation",
      requestId,
    );

    if (!consumeResult.success) {
      return NextResponse.json(
        {
          role: "assistant",
          content:
            "Your reply was generated, but your token balance could not be updated safely. Please try again.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      ...parsed,
      remainingTokens: consumeResult.remaining,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("AI Chat Error:", errorMessage);

    const isQuotaError =
      errorMessage.toLowerCase().includes("quota exceeded") ||
      errorMessage.toLowerCase().includes("rate limit");

    return NextResponse.json(
      {
        role: "assistant",
        content: isQuotaError
          ? "You've hit the current AI usage limit for a short time. Please wait a bit and try again."
          : "Something went wrong while getting your career guidance. Please try again.",
        error: errorMessage,
      },
      { status: isQuotaError ? 429 : 500 },
    );
  }
}













