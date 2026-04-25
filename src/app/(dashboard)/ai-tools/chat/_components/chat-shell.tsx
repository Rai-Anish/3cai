import {
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  FileQuestion,
} from "lucide-react";
import { ChatInput } from "./chat-input";
import { ChatMessageList } from "./chat-message-list";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
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
  prompts: string[];
  onInputChange: (value: string) => void;
  onPromptClick: (prompt: string) => void;
  onSend: () => void;
};

export function ChatShell({
  messages,
  userInput,
  loading,
  prompts,
  onInputChange,
  onPromptClick,
  onSend,
}: ChatShellProps) {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-3xl border border-border/60 bg-background">
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),linear-gradient(to_bottom,rgba(148,163,184,0.05),transparent)]" />
        <div className="relative px-6 py-8 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Career Chat Q&A
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Ask career questions and get clear guidance
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Ask about roles, skills, job paths, study plans, interviews, and
              career next steps.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b px-6 py-5 md:grid-cols-3">
        {supportTopics.map((topic) => {
          const Icon = topic.icon;

          return (
            <div
              key={topic.title}
              className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-sm font-semibold">{topic.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {topic.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold tracking-tight">
          Suggested questions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Start with one of these common career questions.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
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

      <ChatMessageList messages={messages} loading={loading} />

      <ChatInput
        value={userInput}
        loading={loading}
        onChange={onInputChange}
        onSend={onSend}
      />
    </section>
  );
}

