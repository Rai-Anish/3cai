"use client";

import React from "react";
import axios from "axios";
import { DashboardContainer } from "../../_components/container";
import { ChatShell } from "./_components/chat-shell";
import type { ChatMessage } from "./_components/chat-shell";

const questionPrompts = [
  "What career path fits my skills?",
  "How do I switch into tech from another field?",
  "What should I learn to become job-ready faster?",
  "How can I improve my chances of getting hired?",
];

export default function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendMessage = async (input?: string) => {
    const message = (input ?? userInput).trim();
    if (!message || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-chat", { userInput: message });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          typeof result.data?.content === "string" && result.data.content.trim()
            ? result.data.content
            : "I could not generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something went wrong while getting your career guidance. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer className="py-8">
      <ChatShell
        messages={messages}
        userInput={userInput}
        loading={loading}
        prompts={questionPrompts}
        onInputChange={setUserInput}
        onPromptClick={sendMessage}
        onSend={sendMessage}
      />
    </DashboardContainer>
  );
}



