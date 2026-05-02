import { NextResponse } from "next/server";
import { db } from "@/db";
import { resumeAnalysis } from "@/db/schemas";
import { uploadResumeToCloudinary } from "@/lib/cloudinary";
import { extractResumeText } from "@/lib/ai/parser/parse-resume";
import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const targetRole = String(formData.get("targetRole") || "");
    const jobDescription = String(formData.get("jobDescription") || "");
    const model = String(formData.get("model") || "gemini");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    const resumeText = await extractResumeText(file);

    if (!resumeText.trim()) {
      return NextResponse.json({ error: "Could not extract text from resume" }, { status: 400 });
    }

    const hasCloudinary =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    const uploaded = hasCloudinary
      ? await uploadResumeToCloudinary(file)
      : null;

    const [record] = await db
      .insert(resumeAnalysis)
      .values({
        userId: session.user.id,
        title: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileUrl: uploaded?.secure_url ?? null,
        cloudinaryPublicId: uploaded?.public_id ?? null,
        targetRole,
        jobDescription,
        model,
        originalText: resumeText,
        editedText: resumeText,
        status: "processing",
      })
      .returning();

    await inngest.send({
      name: "ai/resume.analyze",
      data: {
        analysisId: record.id,
        userId: session.user.id,
        resumeText,
        targetRole,
        jobDescription,
        model,
      },
    });

    return NextResponse.json({ id: record.id, status: record.status });
  } catch (error) {
    console.error("Resume analyzer upload failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Resume analyzer upload failed",
      },
      { status: 500 },
    );
  }
}
