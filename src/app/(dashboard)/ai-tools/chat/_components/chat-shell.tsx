"use client";

import {
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  FileQuestion,
} from "lucide-react";
import { ChatInput } from "./chat-input";
import type { ChatProvider } from "./chat-input";
import { ChatMessageList } from "./chat-message-list";

export type ChatOptionInput = {
  kind: "single-select" | "multi-select";
  options: string[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  input?: ChatOptionInput;
};

const supportTopics = [
  {
    title: "Career Direction",
    description: "Ask about roles, industries, and long-term growth paths.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Learning Advice",
    description: "Get guidance on what to study next based on your goals.",
    icon: GraduationCap,
  },
  {
    title: "Q&A Support",
    description: "Ask direct questions and get practical career answers.",
    icon: FileQuestion,
  },
];

type ChatShellProps = {
  messages: ChatMessage[];
  userInput: string;
  loading: boolean;
  provider: ChatProvider;
  prompts: string[];
  onInputChange: (value: string) => void;
  onProviderChange: (provider: ChatProvider) => void;
  onPromptClick: (prompt: string) => void;
  onSend: () => void;
  onQuickReply: (answer: string) => void;
};

export function ChatShell({
  messages,
  userInput,
  loading,
  provider,
  prompts,
  onInputChange,
  onProviderChange,
  onPromptClick,
  onSend,
  onQuickReply,
}: ChatShellProps) {
  const hasMessages = messages.length > 0;

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background">

      {/* ── Fixed header ── */}
      <div className="relative shrink-0 overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),linear-gradient(to_bottom,rgba(148,163,184,0.05),transparent)]" />
        <div className="relative px-6 py-5 sm:px-8 sm:py-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Career Chat Q&A
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
              Ask career questions and get clear guidance
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Career guidance for roles, skills, job paths, interviews, and next steps.
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable middle ── */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {!hasMessages ? (
          <div className="chat-scroll h-full overflow-y-auto">
            <div className="shrink-0 border-b px-6 py-4">
              <h2 className="text-base font-semibold tracking-tight">Suggested questions</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Start with one of these common career questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="rounded-full border border-border/60 bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 border-b px-6 py-4 md:grid-cols-3">
              {supportTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.title}
                    className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold">{topic.title}</h3>
                    <p className="text-sm leading-5 text-muted-foreground">{topic.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center px-6 py-8">
              <div className="w-full max-w-2xl rounded-3xl border border-dashed border-border/70 bg-muted/20 px-8 py-12 text-center">
                <h3 className="text-xl font-semibold tracking-tight">Ask your next career question</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Example: &quot;What skills do I need for a frontend developer role?&quot;
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ChatMessageList
            messages={messages}
            loading={loading}
            onQuickReply={onQuickReply}
          />
        )}
      </div>

      {/* ── Fixed input — always at bottom ── */}
      <div className="shrink-0 border-t">
        <ChatInput
          value={userInput}
          loading={loading}
          provider={provider}
          onChange={onInputChange}
          onProviderChange={onProviderChange}
          onSend={onSend}
        />
      </div>
    </section>
  );
}



