"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "./chat-shell";

type ChatMessageListProps = {
  messages: ChatMessage[];
  loading: boolean;
  onQuickReply: (answer: string) => void;
};

export function ChatMessageList({
  messages,
  loading,
  onQuickReply,
}: ChatMessageListProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedByMessage, setSelectedByMessage] = React.useState<
    Record<string, string[]>
  >({});

  React.useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, loading]);

  const toggleOption = (messageId: string, option: string) => {
    setSelectedByMessage((prev) => {
      const current = prev[messageId] ?? [];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [messageId]: next };
    });
  };

  return (
    // h-full fills the flex parent, overflow-y-auto makes only this scroll
    <div ref={containerRef} className="chat-scroll h-full overflow-y-auto px-6 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const selections = selectedByMessage[message.id] ?? [];

          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={[
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/60 bg-card text-card-foreground",
                ].join(" ")}
              >
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wide opacity-70">
                  {isUser ? "You" : "AI Coach"}
                </div>

                <div className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 dark:prose-invert">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>

                {!isUser && message.input?.options?.length ? (
                  <div className="mt-4">
                    {message.input.kind === "single-select" ? (
                      <div className="flex flex-wrap gap-2">
                        {message.input.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            disabled={loading}
                            onClick={() => onQuickReply(option)}
                            className="rounded-full border border-border/60 bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {message.input.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={selections.includes(option)}
                                disabled={loading}
                                onChange={() => toggleOption(message.id, option)}
                                className="h-4 w-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                        <button
                          type="button"
                          disabled={loading || selections.length === 0}
                          onClick={() => onQuickReply(selections.join(", "))}
                          className="rounded-xl border border-border/60 bg-background px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Submit selection
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
              <span className="inline-flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

