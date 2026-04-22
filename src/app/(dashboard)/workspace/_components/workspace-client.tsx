// src/app/(dashboard)/workspace/_components/workspace-client.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import type { auth } from "@/lib/auth";
import { DashboardLoading } from "../../_components/loading-state";
import { WelcomeBanner } from "./welcome-banner";
import { AiTools } from "./ai-tools";
import { History } from "./history";
import { TokenBalance } from "@/components/token-balance";

interface WorkspaceClientProps {
  initialSession: typeof auth.$Infer.Session;
}

export default function WorkspaceClient({ initialSession }: WorkspaceClientProps) {
  const { data: session, isPending } = authClient.useSession();
  const activeSession = session || initialSession;

  if (isPending && !activeSession) return <DashboardLoading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <WelcomeBanner />
        <TokenBalance />
      </div>
      <AiTools />
      <History />
    </div>
  );
}