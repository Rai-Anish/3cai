import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { inngest } from "@/inngest/client";
import { resumeAnalysis } from "@/db/schemas";
import { renderResumeDocumentToText } from "@/lib/ai/resume/resume-utils";

function resumeJsonToText(resumeJson: any) {
  if (resumeJson?.editor === "tiptap-v1") {
    return resumeJson.html
      ?.replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .trim();
  }

  if (resumeJson?.editor === "blocks-v1" && Array.isArray(resumeJson.blocks)) {
    return resumeJson.blocks
      .map((block: any) => block.type === "bullet" ? `- ${block.text}` : block.text)
      .join("\n");
  }

  return renderResumeDocumentToText(resumeJson);
}


export async function GET(req: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [resume] = await db
    .select()
    .from(resumeAnalysis)
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)))
    .limit(1);

  if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

  return NextResponse.json(resume);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { editedText, resumeJson } = await req.json();

  const [updated] = await db
    .update(resumeAnalysis)
    .set({ editedText, resumeJson, updatedAt: new Date() })
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)))
    .returning();

  return NextResponse.json(updated);
}

export async function POST(req: Request, { params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const [resume] = await db
    .select()
    .from(resumeAnalysis)
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)))
    .limit(1);

  if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

  const resumeText =
    body.editedText ||
    (body.resumeJson ? resumeJsonToText(body.resumeJson) : "") ||
    resume.editedText ||
    resume.originalText ||
    "";



  await db
    .update(resumeAnalysis)
    .set({
      editedText: resumeText,
      resumeJson: body.resumeJson ?? resume.resumeJson,
      status: "processing",
      updatedAt: new Date(),
    })
    .where(and(eq(resumeAnalysis.id, resumeId), eq(resumeAnalysis.userId, session.user.id)));

  await inngest.send({
    name: "ai/resume.analyze",
    data: {
      analysisId: resume.id,
      userId: session.user.id,
      resumeText,
      targetRole: resume.targetRole,
      jobDescription: resume.jobDescription,
      model: resume.model,
      instruction: body.instruction,
    },
  });

  return NextResponse.json({ id: resume.id, status: "processing" });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const { resumeId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [deleted] = await db
    .delete(resumeAnalysis)
    .where(
      and(
        eq(resumeAnalysis.id, resumeId),
        eq(resumeAnalysis.userId, session.user.id),
      ),
    )
    .returning({ id: resumeAnalysis.id });

  if (!deleted) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
