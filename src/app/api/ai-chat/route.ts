import { NextRequest, NextResponse } from "next/server";
import { aiCareerQnA } from "@/inngest/functions/career-agent";

export const maxDuration = 60;
export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    const result = await aiCareerQnA.run(userInput);

    const firstTextMessage = Array.isArray(result.output)
      ? result.output.find(
          (message) =>
            typeof message === "object" &&
            message !== null &&
            "type" in message &&
            message.type === "text" &&
            "content" in message &&
            typeof message.content === "string",
        )
      : null;

    const content =
      firstTextMessage && "content" in firstTextMessage
        ? firstTextMessage.content
        : "";

    return NextResponse.json({
      role: "assistant",
      content,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("AI Chat Error:", errorMessage);

    return NextResponse.json(
      {
        role: "assistant",
        content: "",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}





