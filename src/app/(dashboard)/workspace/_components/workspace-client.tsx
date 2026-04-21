"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DashboardLoading } from "../../_components/loading-state";
import { WelcomeBanner } from "./welcome-banner";
import { AiTools } from "./ai-tools";
import { History } from "./history";

interface WorkspaceClientProps {
  initialSession: typeof auth.$Infer.Session;
}

export default function WorkspaceClient({
  initialSession,
}: WorkspaceClientProps) {
  const { data: session, isPending } = authClient.useSession();
  const activeSession = session || initialSession;

  // Only show loading if we have NEITHER a server session nor a client session
  if (isPending && !activeSession) return <DashboardLoading />;

  return (
    <div className="">
      <WelcomeBanner />
      <AiTools />
      <History />
    </div>
  );
}
