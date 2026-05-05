"use client";

import * as React from "react";
import { Bell, LogOut, LayoutDashboard, Home, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 px-8 bg-background/50 backdrop-blur-md">
      <div className="flex items-center justify-end w-full gap-6">
        <div className="flex items-center gap-6">
          {/* Notifications Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon" className="relative group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                  </Button>
                }
              />
              <TooltipContent className="font-mono text-[10px] bg-card border-primary/20">
                SYSTEM_NOTIFICATIONS
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="outline-none focus:ring-0 group">
                  <Avatar className="h-9 w-9 border border-primary/20 ring-2 ring-primary/5 ring-offset-2 ring-offset-background transition-all group-hover:ring-primary/20 cursor-pointer">
                    <AvatarImage src={session?.user?.image || undefined} alt="avatar" />
                    <AvatarFallback className="bg-primary/10 text-primary font-mono text-xs">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </button>
              }
            />

            <DropdownMenuContent align="end" className="w-64 mt-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none text-foreground uppercase italic">
                      {session?.user?.name || "Anonymous"}
                    </p>
                    <p className="text-[10px] font-mono leading-none text-muted-foreground">
                      {session?.user?.email || "----"}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => router.push("/")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                onSelect={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}