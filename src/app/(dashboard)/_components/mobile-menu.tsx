"use client";

import * as React from "react";
import { MdDashboard } from "react-icons/md";
import { TbTools } from "react-icons/tb";
import { IoWalletSharp, IoPerson, IoDiamondOutline } from "react-icons/io5";
import { ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Workspace", url: "/workspace", icon: MdDashboard },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: TbTools,
    subItems: [
      { title: "Chat", url: "/ai-tools/chat" },
      { title: "Career Roadmap", url: "/ai-tools/career-roadmap" },
      { title: "Resume Analyzer", url: "/ai-tools/resume-analyzer" },
      { title: "Cover Letter Generator", url: "/ai-tools/cover-letter-generator" },
    ],
  },
  { title: "Billing", url: "/billing", icon: IoWalletSharp },
  { title: "Profile", url: "/profile", icon: IoPerson },
  { title: "Plans", url: "/pricing", icon: IoDiamondOutline },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [aiToolsOpen, setAiToolsOpen] = React.useState(false);
  const aiToolsItem = navItems.find((i) => i.title === "AI Tools")!;

  const aiToolsIndex = navItems.findIndex((i) => i.title === "AI Tools");
  const totalItems = navItems.length;
  const popupLeftPercent = (aiToolsIndex / totalItems) * 100;

  React.useEffect(() => {
    setAiToolsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!aiToolsOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-mobile-nav]")) {
        setAiToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [aiToolsOpen]);

  return (
    <div data-mobile-nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">

      {/* AI Tools popup */}
      <div
        style={{ left: `${popupLeftPercent}%` }}
        className={cn(
          "absolute bottom-full mb-3 w-48 transition-all duration-200 ease-out",
          aiToolsOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        )}
      >
        <div className="rounded-xl border border-border/40 bg-card/95 backdrop-blur-xl overflow-hidden shadow-md">
          {aiToolsItem.subItems?.map((sub, i) => {
            const isActive = pathname.startsWith(sub.url);
            const isLast = i === (aiToolsItem.subItems?.length ?? 0) - 1;
            return (
              <Link
                key={sub.url}
                href={sub.url}
                onClick={() => setAiToolsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm transition-colors duration-150",
                  !isLast && "border-b border-border/20",
                  isActive
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-foreground hover:bg-muted/50"
                )}
              >
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  {sub.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Arrow pointing down */}
        <div className="flex justify-center -mt-px">
          <svg width="12" height="7" viewBox="0 0 12 7" className="text-card/95">
            <path d="M0 0 L6 7 L12 0 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Nav bar background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-xl border-t border-border/40" />

      {/* Nav items row */}
      <div className="relative flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            item.url === "/workspace"
              ? pathname === item.url
              : pathname.startsWith(item.url);
          const isAiTools = item.title === "AI Tools";

          if (isAiTools) {
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setAiToolsOpen((prev) => !prev)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-14",
                  isActive || aiToolsOpen ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                    (isActive || aiToolsOpen) && "bg-primary/10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <ChevronUp
                    className={cn(
                      "absolute -top-1 -right-1 h-3.5 w-3.5 transition-transform duration-300",
                      aiToolsOpen ? "rotate-0" : "rotate-180"
                    )}
                    strokeWidth={2.5}
                  />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest leading-none">
                  {item.title}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-14",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/10"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest leading-none">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}