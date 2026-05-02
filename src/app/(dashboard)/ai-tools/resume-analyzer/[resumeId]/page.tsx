import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { resumeAnalysis } from "@/db/schemas";
import ResumeWorkspace from "./_components/resume-workspace";

export default async function ResumeDetailPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/sign-in");

  const [resume] = await db
    .select()
    .from(resumeAnalysis)
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)))
    .limit(1);

  if (!resume) notFound();

  return <ResumeWorkspace resume={resume} />;
}



