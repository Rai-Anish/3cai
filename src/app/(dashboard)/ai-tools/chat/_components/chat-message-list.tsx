import ReactMarkdown from "react-markdown";
import { ChatMessage } from "./chat-shell";

type ChatMessageListProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export function ChatMessageList({ messages, loading }: ChatMessageListProps) {
  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      {!hasMessages ? (
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl border border-dashed border-border/70 bg-muted/20 px-8 py-14 text-center">
            <h3 className="text-xl font-semibold tracking-tight">
              Ask your next career question
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Example: &quot;What skills do I need for a frontend developer
              role?&quot;
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {messages.map((message) => {
            const isUser = message.role === "user";

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
                </div>
              </div>
            );
          })}

          {loading ? (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
                AI Coach is typing...
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
