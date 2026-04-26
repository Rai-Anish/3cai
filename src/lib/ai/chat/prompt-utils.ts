import type { ChatHistoryItem } from "./type";

export function getTextContent(message: unknown): string | null {
  if (!message || typeof message !== "object") return null;
  if (!("type" in message) || message.type !== "text") return null;
  if (!("content" in message)) return null;

  return typeof message.content === "string" ? message.content : null;
}

export function buildConversationPrompt(
  history: ChatHistoryItem[],
  userInput: string,
): string {
  const transcript = history
    .map((message) => {
      const speaker = message.role === "user" ? "User" : "Assistant";
      return `${speaker}: ${message.content}`;
    })
    .join("\n\n");

  return transcript
    ? `${transcript}\n\nUser: ${userInput}`
    : `User: ${userInput}`;
}

export function isChatHistoryItem(item: unknown): item is ChatHistoryItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "role" in item &&
    "content" in item &&
    (item.role === "user" || item.role === "assistant") &&
    typeof item.content === "string"
  );
}
