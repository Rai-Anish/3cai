// (dashboard)/workspace/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WorkspaceClient from "./_components/workspace-client";

export default async function WorkspacePage() {
  // Server-side session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Immediate redirect if unauthorized (No flicker)
  if (!session) {
    redirect("/sign-in");
  }

  return <WorkspaceClient initialSession={session} />;
}
