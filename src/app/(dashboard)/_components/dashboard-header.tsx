// (dashboard)/_components/dashboard-header.tsx
"use client";

import { Bell, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  const pathName = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 px-8 bg-background/50 backdrop-blur-md sticky top-0 z-40">
      {/* Left Side: System Metadata */}
      <div className="flex items-center gap-4 font-mono">
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
          {pathName.split("/")}
        </div>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <Tooltip>
              {/* Add 'render' or use the component directly if using Base UI */}
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative group"
                  >
                    <Bell className="w-5 h-5 ..." />
                    <span className="..." />
                  </Button>
                }
              />
              <TooltipContent>SYSTEM_NOTIFICATIONS</TooltipContent>
            </Tooltip>
            <TooltipContent className="font-mono text-[10px] bg-card border-primary/20">
              SYSTEM_NOTIFICATIONS
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile Identity */}
        <div className="flex items-center gap-3 pl-6 border-l border-border/50">
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-foreground leading-none">
              {session?.user?.name || "GUEST_USER"}
            </span>
          </div>

          <Avatar className="h-9 w-9 border border-primary/20 ring-2 ring-primary/5 ring-offset-2 ring-offset-background">
            <AvatarImage src={session?.user?.image || ""} alt="avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-mono text-xs">
              {session?.user?.name?.substring(0, 2).toUpperCase() || "SY"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
