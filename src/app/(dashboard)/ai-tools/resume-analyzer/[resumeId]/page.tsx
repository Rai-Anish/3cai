import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { resumeAnalysis } from "@/db/schemas";
import ResumeWorkspace from "./_components/resume-workspace";
import { getTokenBalance } from "@/services/tokens/token-service";
import { TOKEN_CONFIG } from "@/services/tokens/token-config";

export default async function ResumeDetailPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/sign-in");

  const tokenBalance = await getTokenBalance(session.user.id);
  const totalTokens = (tokenBalance?.subscriptionBalance ?? 0) + (tokenBalance?.creditBalance ?? 0);
  const canReanalyze = totalTokens >= TOKEN_CONFIG.COSTS.ai_resume_analysis;
  const [resume] = await db
    .select()
    .from(resumeAnalysis)
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)))
    .limit(1);

  if (!resume) notFound();

  return <ResumeWorkspace resume={resume} canReanalyze={canReanalyze} totalTokens={totalTokens} />;
}



