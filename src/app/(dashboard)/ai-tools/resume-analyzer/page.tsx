import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { resumeAnalysis } from "@/db/schemas";
import ResumeAnalyzerClient from "./_components/resume-analyzer-client";

export default async function ResumeAnalyzerPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const resumes = await db
    .select({
      id: resumeAnalysis.id,
      title: resumeAnalysis.title,
      fileName: resumeAnalysis.fileName,
      score: resumeAnalysis.score,
      status: resumeAnalysis.status,
      targetRole: resumeAnalysis.targetRole,
      createdAt: resumeAnalysis.createdAt,
      updatedAt: resumeAnalysis.updatedAt,
    })
    .from(resumeAnalysis)
    .where(eq(resumeAnalysis.userId, session.user.id))
    .orderBy(desc(resumeAnalysis.updatedAt));

  return <ResumeAnalyzerClient initialResumes={resumes} />;
}



