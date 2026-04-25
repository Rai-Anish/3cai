import { Button } from "@/components/ui/button";
import { Send, Sparkles, BriefcaseBusiness, GraduationCap, FileQuestion } from "lucide-react";
import React from "react";
import { DashboardContainer } from "../../_components/container";
import { Input } from "@base-ui/react";
import { cn } from "@/lib/utils";

type Props = {};

const questionPrompts = [
  "What career path fits my skills?",
  "How do I switch into tech from another field?",
  "What should I learn to become job-ready faster?",
  "How can I improve my chances of getting hired?",
];

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

export default function ChatPage({}: Props) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col bg-background">
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),linear-gradient(to_bottom,rgba(148,163,184,0.05),transparent)]" />
        <DashboardContainer className="relative py-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Career Chat Q&A
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Ask career questions and get clear guidance
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              This space is built for career-related Q&A only. Ask about roles,
              skills, job paths, study plans, or next steps in your career.
            </p>
          </div>
        </DashboardContainer>
      </div>

      <DashboardContainer className="flex flex-1 flex-col py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8">
          <div className="grid gap-4 md:grid-cols-3">
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

          <div className="rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">
              Suggested questions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with one of these common career questions.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {questionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-border/60 bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-2xl rounded-3xl border border-dashed border-border/70 bg-muted/20 px-8 py-14 text-center">
              <h3 className="text-xl font-semibold tracking-tight">
                Ask your next career question
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Example: “What skills do I need for a frontend developer role?”
              </p>
            </div>
          </div>
        </div>
      </DashboardContainer>

      <div className="sticky bottom-0 border-t bg-background/85 backdrop-blur-xl">
        <DashboardContainer className="py-5">
          <div className="mx-auto flex w-full max-w-4xl items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3 shadow-sm">
            <Input
              className={cn(
                "h-12 flex-1 border-0 bg-transparent px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground"
              )}
              placeholder="Ask a career-related question..."
            />
            <Button size="icon" className="h-11 w-11 rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DashboardContainer>
      </div>
    </section>
  );
}



