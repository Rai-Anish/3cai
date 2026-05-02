"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText,  Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "./model-selector";
import { UploadZone } from "./upload-zone";
import { DeleteResumeButton } from "./delete-resume-button";


type ResumeListItem = {
  id: string;
  title: string | null;
  fileName: string | null;
  score: number | null;
  status: string;
  targetRole: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export default function ResumeAnalyzerClient({
  initialResumes,
}: {
  initialResumes: ResumeListItem[];
}) {
  const router = useRouter();
  const [model, setModel] = useState("gemini");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");


  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Resume Intelligence
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold leading-tight">
            Build, score, and improve your resume in one focused workspace.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Upload a PDF, DOCX, or TXT resume. Reopen older resumes anytime to continue editing.
          </p>
        </section>

        <section className="rounded-md border border-border bg-card/80 p-5 shadow-neon">
          <ModelSelector value={model} onChange={setModel} />

          <input
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            placeholder="Target role, e.g. Product Designer"
            className="mt-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />

          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste job description for ATS matching"
            className="mt-3 min-h-36 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />

          <UploadZone
            model={model}
            targetRole={targetRole}
            jobDescription={jobDescription}
            onCreated={(id) => router.push(`/ai-tools/resume-analyzer/${id}`)}
          />
        </section>
      </div>

      <section className="mx-auto mt-10 max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Saved Resumes
            </p>
            <h2 className="mt-1 text-2xl font-bold">Continue editing</h2>
          </div>
        </div>

        {initialResumes.length === 0 ? (
          <div className="rounded-md border border-border bg-card/60 p-6 text-sm text-muted-foreground">
            No resumes yet. Upload one to create your first AI resume workspace.
          </div>
        ) : (
          <div className="grid gap-3">
            {initialResumes.map((resume) => (
              <article
                key={resume.id}
                className="flex flex-col gap-4 rounded-md border border-border bg-card/70 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold">
                      {resume.title || resume.fileName || "Untitled resume"}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {resume.targetRole || "No target role"} · {resume.status}
                      {typeof resume.score === "number" ? ` · ${resume.score}/100` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/ai-tools/resume-analyzer/${resume.id}`)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <DeleteResumeButton resumeId={resume.id} />

                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

