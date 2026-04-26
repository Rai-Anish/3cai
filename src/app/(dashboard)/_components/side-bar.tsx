"use client";

import * as React from "react";
import { MdDashboard, MdChevronRight, MdExpandMore } from "react-icons/md";
import { TbTools } from "react-icons/tb";
import { RiFileHistoryLine } from "react-icons/ri";
import { IoWalletSharp, IoPerson, IoDiamondOutline } from "react-icons/io5";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const items = [
  { title: "Workspace", url: "/workspace", icon: MdDashboard },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: TbTools,
    subItems: [
      { title: "Chat", url: "/ai-tools/chat" },
      { title: "CV Analyzer", url: "/ai-tools/cv-analyzer" },
      { title: "Career Roadmap", url: "/ai-tools/career-roadmap" },
      { title: "CV Generator", url: "/ai-tools/cover-letter-generator" },
    ],
  },
  { title: "My History", url: "/history", icon: RiFileHistoryLine },
  { title: "Billing", url: "/billing", icon: IoWalletSharp },
  { title: "Profile", url: "/profile", icon: IoPerson },
  { title: "Plans", url: "/pricing", icon: IoDiamondOutline },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const aiToolsItem = items.find((item) => item.title === "AI Tools");
  const aiToolsActive =
    pathname === aiToolsItem?.url ||
    aiToolsItem?.subItems?.some((subItem) => pathname === subItem.url);

  const [aiToolsOpen, setAiToolsOpen] = React.useState(Boolean(aiToolsActive));

  const handleSignOut = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });

  return (
    <Sidebar className="border-r border-border/50 bg-card/30 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/main_logo.png"
              alt="3CAI"
              width={40}
              height={40}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-mono text-md tracking-tighter">
              3CAI Career Engine
            </h3>
            <span className="font-mono text-xs tracking-tighter text-foreground">
              Ask Learn Build
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Navigation_Nodes
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  item.subItems?.some((subItem) => pathname === subItem.url);

                if (item.subItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={aiToolsOpen}
                      onOpenChange={setAiToolsOpen}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger
                          render={
                            <button
                              type="button"
                              className={`flex w-full items-center gap-3 rounded-md px-4 py-6 text-left transition-all duration-200 ease-out ${
                                isActive
                                  ? "bg-primary/5 text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <item.icon
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isActive ? "animate-pulse" : ""
                                }`}
                              />
                              <span className="font-mono text-xs uppercase tracking-widest">
                                {item.title}
                              </span>
                              <MdExpandMore className="ml-auto h-4 w-4 transition-transform duration-300 ease-in-out group-data-open/collapsible:rotate-180" />
                            </button>
                          }
                        />

                        <CollapsibleContent className="overflow-hidden data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0">
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => {
                              const isSubActive = pathname === subItem.url;

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    isActive={isSubActive}
                                    className={`transition-colors duration-200 ${
                                      isSubActive
                                        ? "font-medium text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    <Link href={subItem.url}>
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      className={` px-4 py-6 transition-all duration-200 ${
                        isActive
                          ? "bg-primary/5 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`}
                        />
                        <span className="font-mono text-xs uppercase tracking-widest">
                          {item.title}
                        </span>
                        {isActive && (
                          <MdChevronRight className="ml-auto h-3 w-3" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/10 p-4">
        <Button onClick={handleSignOut}>Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
