"use client";

import React, { useState } from "react";
import { IoChatboxEllipsesOutline, IoDocumentTextSharp } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaRegMap } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { GlowBg } from "@/components/glow-bg";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { triggerToolAction } from "@/app/actions/tool-action";
import { useRouter } from "next/navigation";
import type { FeatureKey } from "@/services/tokens/token-config";
import { useSWRConfig } from "swr";

const TOKEN_BALANCE_KEY = "token-balance";

const cardList = [
  {
    icon: IoChatboxEllipsesOutline,
    title: "AI Career Q&A Chat",
    description: "Get answers to your career questions with AI",
    buttontxt: "Chat with AI",
    color: "text-secondary",
    feature: "ai_generation" as FeatureKey,
    href: "/ai-tools/chat",
    consumeOnClick: false,
  },
  {
    icon: AiOutlineFileSearch,
    title: "AI Resume Analyzer",
    description: "Get a detailed analysis of your resume with AI",
    buttontxt: "Analyze Resume",
    color: "text-primary",
    feature: "ai_generation" as FeatureKey,
    href: "/ai-tools/resume-analyzer",
    consumeOnClick: true,
  },
  {
    icon: FaRegMap,
    title: "AI Career Roadmap Builder",
    description: "Build a personalized career roadmap with AI",
    buttontxt: "Build Roadmap",
    color: "text-accent",
    feature: "analysis" as FeatureKey,
    href: "/ai-tools/roadmap",
    consumeOnClick: true,
  },
  {
    icon: IoDocumentTextSharp,
    title: "Cover Letter Generator",
    description: "Generate a professional cover letter with AI",
    buttontxt: "Generate Cover Letter",
    color: "text-secondary",
    feature: "export" as FeatureKey,
    href: "/ai-tools/cover-letter",
    consumeOnClick: true,
  },
] as const;

export const AiTools = () => {
  const [loadingTool, setLoadingTool] = useState<string | null>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  async function handleToolClick(
    feature: FeatureKey,
    title: string,
    href: string,
    consumeOnClick: boolean,
  ) {
    if (loadingTool) return;

    if (!consumeOnClick) {
      router.push(href);
      return;
    }

    setLoadingTool(title);

    try {
      const result = await triggerToolAction(feature, title);

      if (!result.success) {
        switch (result.reason) {
          case "insufficient_tokens":
            if (result.isPaidUser) {
              toast.error("Monthly token limit reached", {
                description: "Your tokens will refresh on your next billing date.",
              });
            } else {
              toast.error("Out of tokens", {
                description: "Upgrade your plan to get more tokens.",
                action: {
                  label: "Upgrade",
                  onClick: () => router.push("/pricing"),
                },
                duration: 6000,
              });
            }
            break;
          case "unauthenticated":
            router.push("/sign-in");
            break;
          case "no_balance_record":
            toast.error("Account issue", {
              description:
                "Your token balance could not be found. Please contact support.",
            });
            break;
          default:
            toast.error("Something went wrong", {
              description: "Please try again.",
            });
        }
        return;
      }

      await mutate(
        TOKEN_BALANCE_KEY,
        (current: { balance?: number } | undefined) => ({
          ...(current ?? {}),
          balance: result.remaining,
        }),
        false,
      );

      mutate(TOKEN_BALANCE_KEY);

      toast.success(`${title} started`, {
        description: `${result.remaining} tokens remaining.`,
      });

      router.push(href);
    } catch {
      toast.error("Request failed", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setLoadingTool(null);
    }
  }

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center gap-4 px-1">
        <h2 className="whitespace-nowrap text-xl font-black tracking-tighter uppercase italic">
          Available AI Tools
        </h2>
        <Separator className="flex-1 bg-border/50" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardList.map((card) => (
          <Card
            key={card.title}
            className="group relative flex h-full flex-col items-start gap-6 overflow-hidden rounded-2xl border-border/40 bg-card/40 p-8 transition-all hover:border-border"
          >
            <GlowBg className="opacity-40 transition-opacity group-hover:opacity-70" />
            <div
              className={cn(
                "relative z-10 rounded-xl border border-border/50 bg-background/50 p-3",
                card.color,
              )}
            >
              <card.icon className="h-7 w-7" />
            </div>

            <div className="relative z-10 flex-1 space-y-2">
              <h3 className="font-mono text-lg font-bold leading-tight tracking-tighter uppercase">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>

            <Button
              variant="tactical"
              size="tactical"
              disabled={!!loadingTool}
              onClick={() =>
                handleToolClick(
                  card.feature,
                  card.title,
                  card.href,
                  card.consumeOnClick,
                )
              }
              className={cn(
                "relative z-10 w-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase italic",
                card.color,
                loadingTool === card.title && "cursor-not-allowed opacity-50",
              )}
            >
              {loadingTool === card.title ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                card.buttontxt
              )}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

