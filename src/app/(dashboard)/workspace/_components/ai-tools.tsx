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
import { testConsumeToken } from "@/lib/test-consume-token";
import { useRouter } from "next/navigation";

export const AiTools = () => {
  const [loadingTool, setLoadingTool] = useState<string | null>(null);
  const router = useRouter();

  const cardList = [
    {
      icon: IoChatboxEllipsesOutline,
      title: "AI Career Q&A Chat",
      description: "Get answers to your career questions with AI",
      buttontxt: "Chat with AI",
      color: "text-secondary",
      feature: "ai_generation" as const,
    },
    {
      icon: AiOutlineFileSearch,
      title: "AI Resume Analyzer",
      description: "Get a detailed analysis of your resume with AI",
      buttontxt: "Analyze Resume",
      color: "text-primary",
      feature: "ai_generation" as const,
    },
    {
      icon: FaRegMap,
      title: "AI Career Roadmap Builder",
      description: "Build a personalized career roadmap with AI",
      buttontxt: "Build Roadmap",
      color: "text-accent",
      feature: "analysis" as const,
    },
    {
      icon: IoDocumentTextSharp,
      title: "Cover Letter Generator",
      description: "Generate a professional cover letter with AI",
      buttontxt: "Generate Cover Letter",
      color: "text-secondary",
      feature: "export" as const,
    },
  ];

  async function handleToolClick(feature: "ai_generation" | "export" | "analysis", title: string) {
    setLoadingTool(title);
    try {
      const result = await testConsumeToken(feature);

      if (!result.success) {
        if (result.reason === "insufficient_tokens") {
          toast.error("You're out of tokens", {
            description: "Upgrade your plan to continue using AI tools.",
            action: {
              label: "Upgrade",
              onClick: () => router.push("/pricing"),
            },
          });
        } else if (result.reason === "unauthenticated") {
          router.push("/sign-in");
        } else {
          toast.error("Something went wrong", {
            description: result.reason,
          });
        }
        return;
      }

      toast.success(`${title} started`, {
        description: `${result.remaining} tokens remaining.`,
      });
    } catch {
      toast.error("Request failed", {
        description: "Please try again.",
      });
    } finally {
      setLoadingTool(null);
    }
  }

  return (
    <section className="py-12">
      <div className="flex items-center gap-4 mb-8 px-1">
        <h2 className="uppercase italic text-xl font-black tracking-tighter whitespace-nowrap">
          Available AI Tools
        </h2>
        <Separator className="flex-1 bg-border/50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardList.map((card) => (
          <Card
            key={card.title}
            className="relative group h-full flex flex-col items-start overflow-hidden border-border/40 bg-card/40 transition-all hover:border-border rounded-2xl p-8 gap-6"
          >
            <GlowBg className="opacity-40 group-hover:opacity-70 transition-opacity" />
            <div
              className={cn(
                "relative z-10 p-3 rounded-xl border border-border/50 bg-background/50",
                card.color,
              )}
            >
              <card.icon className="w-7 h-7" />
            </div>

            <div className="relative z-10 flex-1 space-y-2">
              <h3 className="font-mono text-lg font-bold leading-tight tracking-tighter uppercase">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>

            <Button
              variant="tactical"
              size="tactical"
              disabled={loadingTool === card.title}
              onClick={() => handleToolClick(card.feature, card.title)}
              className={cn(
                "relative z-10 w-full font-mono font-bold text-[10px] tracking-[0.2em] uppercase italic",
                card.color,
              )}
            >
              {loadingTool === card.title ? "Processing..." : card.buttontxt}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};
