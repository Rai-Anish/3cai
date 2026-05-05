// (dashboard)/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/side-bar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./_components/dashboard-header";
import { MobileBottomNav } from "./_components/mobile-menu";
import { Container } from "@/components/container";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <Container className="flex max-h-fit">
        {/* Sidebar — hidden on mobile, visible on md+ */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* Global Header */}
          <DashboardHeader />

          <div>{children}</div>
        </main>
      </Container>

      {/* Mobile bottom nav — only visible on mobile */}
      <MobileBottomNav />
    </SidebarProvider>
  );
}
