"use client";

import { IoChatboxEllipsesOutline, IoDocumentTextSharp } from "react-icons/io5";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaRegMap } from "react-icons/fa";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowBg } from "@/components/glow-bg";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { TOKEN_CONFIG } from "@/services/tokens/token-config";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TOOLS = [
  {
    icon: IoChatboxEllipsesOutline,
    title: "AI Career Q&A Chat",
    description: "Get answers to your career questions with AI",
    buttontxt: "Chat with AI",
    color: "text-secondary",
    bgColor: "bg-secondary/40",
    tokenCost: TOKEN_CONFIG.COSTS.ai_chat,
    href: "/ai-tools/chat",
  },
  {
    icon: AiOutlineFileSearch,
    title: "AI Resume Analyzer",
    description: "Get a detailed analysis of your resume with AI",
    buttontxt: "Analyze Resume",
    color: "text-primary",
    bgColor: "bg-primary/40",
    tokenCost: TOKEN_CONFIG.COSTS.ai_resume_analysis,
    href: "/ai-tools/resume-analyzer",
  },
  {
    icon: FaRegMap,
    title: "AI Career Roadmap Builder",
    description: "Build a personalized career roadmap with AI",
    buttontxt: "Build Roadmap",
    color: "text-accent",
    bgColor: "bg-accent/40",
    tokenCost: TOKEN_CONFIG.COSTS.ai_roadmap,
    href: "/ai-tools/career-roadmap",
  },
  {
    icon: IoDocumentTextSharp,
    title: "Cover Letter Generator",
    description: "Generate a professional cover letter with AI",
    buttontxt: "Generate Cover Letter",
    color: "text-secondary",
    bgColor: "bg-secondary/40",
    tokenCost: TOKEN_CONFIG.COSTS.ai_cover_letter_generation,
    href: "/ai-tools/cover-letter-generator",
  },
] as const;

export const AiTools = () => {
  const router = useRouter();

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center gap-4 px-1">
        <h2 className="whitespace-nowrap text-xl font-black tracking-tighter uppercase italic">
          Available AI Tools
        </h2>
        <Separator className="flex-1 bg-border/50" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TOOLS.map((tool) => (
          <Card
            key={tool.title}
            className="group relative flex h-full flex-col items-start gap-6 overflow-hidden rounded-2xl border-border/40 bg-card/40 p-8 transition-all hover:border-border"
          >
            <GlowBg className="opacity-40 transition-opacity group-hover:opacity-70" />

            <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-border/40 bg-background/80 px-2.5 py-1 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-105">
              <Tooltip>
                <TooltipTrigger 
                    render={
                      <span 
                        className="flex items-center gap-2 font-mono text-[10px]  font-bold text-muted-foreground text-sm"
                      >
                        <Coins className="h-3 w-3 text-muted-foreground" />
                        {tool.tokenCost}
                      </span>
                    } />
                <TooltipContent className={cn(" border-border text-white/80",tool.bgColor)}>Costs {tool.tokenCost} Tokens</TooltipContent>
              </Tooltip>
            </div>

            <div
              className={cn(
                "relative z-10 rounded-xl border border-border/50 bg-background/50 p-3 shadow-inner",
                tool.color,
              )}
            >
              <tool.icon className="h-7 w-7" />
            </div>

            <div className="relative z-10 flex-1 space-y-2">
              <h3 className="font-mono text-lg font-bold uppercase leading-tight tracking-tighter">
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </div>

            <div className="relative z-10 w-full space-y-3">
              <Button
                variant="tactical"
                size="tactical"
                onClick={() => router.push(tool.href)}
                className={cn(
                  "relative w-full font-mono text-[10px] font-bold italic tracking-[0.2em] uppercase shadow-md active:translate-y-px",
                  tool.color,
                )}
              >
                {tool.buttontxt}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
