"use client";

import React from "react";
import axios from "axios";
import { DashboardContainer } from "../../_components/container";
import { ChatShell } from "./_components/chat-shell";
import type { ChatMessage } from "./_components/chat-shell";
import type { ChatProvider } from "./_components/chat-input";

const questionPrompts = [
  "What career path fits my skills?",
  "How do I switch into tech from another field?",
  "What should I learn to become job-ready faster?",
  "How can I improve my chances of getting hired?",
];

type AssistantResponse = {
  role: "assistant";
  content: string;
  input?: {
    kind: "single-select" | "multi-select";
    options: string[];
  };
};

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [provider, setProvider] = React.useState<ChatProvider>("gemini");

  const sendMessage = async (input?: string) => {
    const messageSource = typeof input === "string" ? input : userInput;
    const message = messageSource.trim();

    if (!message || loading) return;

    const history: ChatHistoryItem[] = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const result = await axios.post<AssistantResponse>("/api/ai-chat", {
        userInput: message,
        history,
        provider,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          typeof result.data?.content === "string" && result.data.content.trim()
            ? result.data.content
            : "I could not generate a response.",
        input:
          result.data?.input &&
            Array.isArray(result.data.input.options) &&
            result.data.input.options.length > 0
            ? result.data.input
            : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);

      let fallbackMessage =
        "Something went wrong while getting your career guidance. Please try again.";

      if (axios.isAxiosError(error)) {
        const apiMessage = error.response?.data?.content;
        const status = error.response?.status;

        if (typeof apiMessage === "string" && apiMessage.trim()) {
          fallbackMessage = apiMessage;
        } else if (status === 429) {
          fallbackMessage =
            "The AI is temporarily rate-limited. Please wait a bit and try again.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: fallbackMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // overflow-hidden so the page itself never scrolls
    <DashboardContainer className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden py-0">
      <ChatShell
        messages={messages}
        userInput={userInput}
        loading={loading}
        provider={provider}
        prompts={questionPrompts}
        onInputChange={setUserInput}
        onProviderChange={setProvider}
        onPromptClick={sendMessage}
        onSend={sendMessage}
        onQuickReply={sendMessage}
      />
    </DashboardContainer>
  );
}
