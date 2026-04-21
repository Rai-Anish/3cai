"use client";

import { MdDashboard, MdChevronRight } from "react-icons/md";
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
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const items = [
  { title: "Workspace", url: "/workspace", icon: MdDashboard },
  { title: "AI Tools", url: "/ai-tools", icon: TbTools },
  { title: "My History", url: "/history", icon: RiFileHistoryLine },
  { title: "Billing", url: "/billing", icon: IoWalletSharp },
  { title: "Profile", url: "/profile", icon: IoPerson },
   { title: "Plans", url: "/pricing", icon: IoDiamondOutline },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async() => await  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push("/");
      },
    }
  });

  return (
    <Sidebar className="border-r border-border/50 bg-card/30 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex  items-center gap-3">
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
            <span className="font-mono text-xs tracking-tighter  text-foreground">
              Ask Learn Build
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 px-4">
            Navigation_Nodes
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-3 px-4 py-6 transition-all group ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <item.icon
                          className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`}
                        />
                        <span className="font-mono text-xs uppercase tracking-widest">
                          {item.title}
                        </span>
                        {isActive && (
                          <MdChevronRight className="ml-auto w-3 h-3" />
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

      <SidebarFooter className="p-4 border-t border-border/10">
        
          <Button onClick={handleSignOut}>
            Sign Out
          </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
